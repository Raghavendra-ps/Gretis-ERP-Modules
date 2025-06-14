import os
from urllib.parse import quote

import frappe
from frappe import _
from frappe.integrations.google_oauth import GoogleOAuth
from frappe.integrations.offsite_backup_utils import (
    get_latest_backup_file,
    send_email,
    validate_file_size,
)
from frappe.model.document import Document
from frappe.utils import get_backups_path, get_bench_path, get_absolute_path
from frappe.utils.background_jobs import enqueue
from frappe.utils.backups import new_backup

from googleapiclient.http import MediaFileUpload
from googleapiclient.errors import HttpError


class GoogleDrive(Document):
    def validate(self):
        doc_before_save = self.get_doc_before_save()
        if doc_before_save and doc_before_save.backup_folder_name != self.backup_folder_name:
            self.backup_folder_id = ""

    def get_access_token(self):
        if not self.refresh_token:
            button_label = frappe.bold(_("Allow Google Drive Access"))
            raise frappe.ValidationError(_("Click on {0} to generate Refresh Token.").format(button_label))

        oauth_obj = GoogleOAuth("drive")
        r = oauth_obj.refresh_access_token(
            self.get_password(fieldname="refresh_token", raise_exception=False)
        )

        return r.get("access_token")


@frappe.whitelist(methods=["POST"])
def authorize_access(reauthorize=False, code=None):
    oauth_code = frappe.db.get_single_value("Google Drive", "authorization_code") if not code else code
    oauth_obj = GoogleOAuth("drive")

    if not oauth_code or reauthorize:
        if reauthorize:
            frappe.db.set_single_value("Google Drive", "backup_folder_id", "")
        return oauth_obj.get_authentication_url(
            {
                "redirect": f"/app/Form/{quote('Google Drive')}",
            },
        )

    r = oauth_obj.authorize(oauth_code)
    frappe.db.set_single_value(
        "Google Drive",
        {"authorization_code": oauth_code, "refresh_token": r.get("refresh_token")},
    )


def get_google_drive_object():
    """Return an object of Google Drive."""
    account = frappe.get_doc("Google Drive")
    oauth_obj = GoogleOAuth("drive")

    google_drive = oauth_obj.get_google_service_object(
        account.get_access_token(),
        account.get_password(fieldname="indexing_refresh_token", raise_exception=False),
    )

    return google_drive, account


def check_for_folder_in_google_drive():
    """Checks if folder exists in Google Drive else create it."""
    def _create_folder_in_google_drive(google_drive, account):
        file_metadata = {
            "name": account.backup_folder_name,
            "mimeType": "application/vnd.google-apps.folder",
        }

        try:
            folder = google_drive.files().create(body=file_metadata, fields="id").execute()
            frappe.db.set_single_value("Google Drive", "backup_folder_id", folder.get("id"))
            frappe.db.commit()
        except HttpError as e:
            frappe.throw(
                _("Google Drive - Could not create folder in Google Drive - Error Code {0}").format(e)
            )

    google_drive, account = get_google_drive_object()

    if account.backup_folder_id:
        return

    backup_folder_exists = False

    try:
        google_drive_folders = (
            google_drive.files().list(q="mimeType='application/vnd.google-apps.folder'").execute()
        )
    except HttpError as e:
        frappe.throw(_("Google Drive - Could not find folder in Google Drive - Error Code {0}").format(e))

    for f in google_drive_folders.get("files"):
        if f.get("name") == account.backup_folder_name:
            frappe.db.set_single_value("Google Drive", "backup_folder_id", f.get("id"))
            frappe.db.commit()
            backup_folder_exists = True
            break

    if not backup_folder_exists:
        _create_folder_in_google_drive(google_drive, account)


@frappe.whitelist()
def take_backup():
    """Enqueue longjob for taking backup to Google Drive"""
    enqueue(
        "frappe.integrations.doctype.google_drive.google_drive.upload_system_backup_to_google_drive",
        queue="long",
        timeout=1500,
    )
    frappe.msgprint(_("Queued for backup. It may take a few minutes to an hour."))


def upload_system_backup_to_google_drive():
    """
    Upload system backup to Google Drive
    """
    google_drive, account = get_google_drive_object()

    check_for_folder_in_google_drive()
    account.load_from_db()

    validate_file_size()

    if frappe.flags.create_new_backup:
        set_progress(1, _("Backing up Data."))
        backup = new_backup()
        file_urls = [backup.backup_path_db, backup.backup_path_conf]

        if account.file_backup:
            file_urls.append(backup.backup_path_files)
            file_urls.append(backup.backup_path_private_files)
    else:
        file_urls = get_latest_backup_file(with_files=account.file_backup)

    for fileurl in file_urls:
        if not fileurl:
            continue

        file_metadata = {"name": os.path.basename(fileurl), "parents": [account.backup_folder_id]}

        try:
            media = MediaFileUpload(
                get_absolute_path(filename=fileurl), mimetype="application/gzip", resumable=True
            )
        except OSError as e:
            frappe.throw(_("Google Drive - Could not locate - {0}").format(e))

        try:
            set_progress(2, _("Uploading backup to Google Drive."))
            google_drive.files().create(body=file_metadata, media_body=media, fields="id").execute()
        except HttpError as e:
            send_email(False, "Google Drive", "Google Drive", "email", error_status=e)

    set_progress(3, _("Uploading successful."))
    frappe.db.set_single_value("Google Drive", "last_backup_on", frappe.utils.now_datetime())
    send_email(True, "Google Drive", "Google Drive", "email")
    return _("Google Drive Backup Successful.")


def daily_backup():
    drive_settings = frappe.db.get_singles_dict("Google Drive", cast=True)
    if drive_settings.enable and drive_settings.frequency == "Daily":
        upload_system_backup_to_google_drive()


def weekly_backup():
    drive_settings = frappe.db.get_singles_dict("Google Drive", cast=True)
    if drive_settings.enable and drive_settings.frequency == "Weekly":
        upload_system_backup_to_google_drive()


def get_absolute_path(filename):
    file_path = os.path.join(get_backups_path()[2:], os.path.basename(filename))
    return f"{get_bench_path()}/sites/{file_path}"


def set_progress(progress, message):
    frappe.publish_realtime(
        "upload_to_google_drive",
        dict(progress=progress, total=3, message=message),
        user=frappe.session.user,
    )


@frappe.whitelist(methods=["POST"])
def upload_file(file_url, folder_id=None):
    """Uploads a file to Google Drive."""
    google_drive, account = get_google_drive_object()
    if not folder_id:
        folder_id = account.backup_folder_id

    file_metadata = {
        "name": os.path.basename(file_url),
        "parents": [folder_id]
    }

    try:
        media = MediaFileUpload(
            get_absolute_path(filename=file_url),
            mimetype="application/octet-stream",
            resumable=True
        )
    except OSError as e:
        frappe.throw(_("Could not locate file - {0}").format(e))

    try:
        google_drive.files().create(body=file_metadata, media_body=media, fields="id").execute()
    except HttpError as e:
        frappe.throw(_("Could not upload file to Google Drive - Error Code {0}").format(e))

    return _("File uploaded successfully.")


@frappe.whitelist()
def upload_multiple_files(docname, attachments, folder_id=None):
    """Uploads multiple files to Google Drive."""
    
    google_drive, account = get_google_drive_object()
    folder_id = folder_id or 'YOUR_DEFAULT_GOOGLE_DRIVE_FOLDER_ID'
    
    uploaded_files = []
    
    for attachment in attachments:
        file_url = attachment['file_url']
        file_name = attachment['file_name']
        
        file_metadata = {
            "name": file_name,
            "parents": [folder_id]
        }
        
        try:
            media = MediaFileUpload(
                get_absolute_path(filename=file_url),
                mimetype="application/octet-stream",
                resumable=True
            )
        except OSError as e:
            frappe.throw(_("Could not locate file - {0}").format(e))
        
        try:
            google_drive.files().create(body=file_metadata, media_body=media, fields="id").execute()
            uploaded_files.append(file_name)
        except HttpError as e:
            frappe.throw(_("Could not upload file {0} to Google Drive - Error Code {1}").format(file_name, e))
    
    return _("Files uploaded successfully.")
    
    def sync_google_drive_to_erpnext():
    """Sync files from Google Drive to ERPNext."""
    
    google_drive, account = get_google_drive_object()
    
    try:
        # Get the files in the Google Drive folder
        files = google_drive.files().list(q=f"'{account.backup_folder_id}' in parents").execute()
        
        for file in files.get('files', []):
            file_id = file.get('id')
            file_name = file.get('name')
            file_url = f"https://drive.google.com/uc?id={file_id}"

            # Logic to associate the file with the corresponding ERPNext record
            # For example, attaching it to a Tender document:
            tender_doc = frappe.get_doc("Tender Notification", "<RELEVANT_TENDER_ID>")
            tender_doc.append("documents", {
                "file_url": file_url,
                "file_name": file_name,
            })
            tender_doc.save()

    except HttpError as e:
        frappe.throw(_("Error syncing with Google Drive: {0}").format(e))

