import frappe
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import traceback

# Define the path to your service account JSON file
SERVICE_ACCOUNT_FILE = '/cloudclusters/erpnext/frappe-bench/apps/frappe/frappe/credentials/articulate-run-436205-k1-f6ea89310e57.json'

# Define the scopes required for Google Drive API
SCOPES = ['https://www.googleapis.com/auth/drive.file']

# Load your Google service account credentials
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

# Initialize the Google Drive API client
drive_service = build('drive', 'v3', credentials=credentials)

@frappe.whitelist()
def upload_google_drive_file(doc_name):
    try:
        # Get document info from the "Google Drive Document Editing" Doctype
        doc = frappe.get_doc("google_drive_document_editing", doc_name)

        # Get file details from ERPNext
        file_doc = frappe.get_doc("File", {"file_url": doc.document_path})
        
        # Ensure the file path is correct
        file_path = frappe.get_site_path('private', file_doc.file_name)

        # Define file metadata for Google Drive
        file_metadata = {
            'name': file_doc.file_name,  # Use the file name from ERPNext
            'parents': ['1HZWhazGLu51NITWjPpj_HRyjmiRYFMjg']  # Replace with the folder ID in your Drive
        }

        # Prepare the file to be uploaded to Google Drive
        media = MediaFileUpload(file_path, mimetype=file_doc.content_type)

        # Log the attempt to upload the file
        frappe.logger().info(f'Attempting to upload file: {file_path}')

        # Upload the file to Google Drive
        uploaded_file = drive_service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()

        # Log the uploaded file's ID
        frappe.msgprint(f'File uploaded to Google Drive with ID: {uploaded_file.get("id")}')

    except Exception as e:
        # Log any errors that occur
        frappe.msgprint(f'An error occurred: {str(e)}\n{traceback.format_exc()}')
