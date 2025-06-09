# Copyright (c) 2024, Your Name
# For license information, please see license.txt

# Import necessary libraries
import PyPDF2
import frappe
import os
import logging
import mimetypes
import json
from frappe.model.document import Document
from google.oauth2 import service_account
from googleapiclient.discovery import build
from google.auth.transport.requests import Request  # Import Request for refreshing token
import requests  # Ensure requests is imported

class GoogleDriveDocumentEditing(Document):
    def before_save(self):
        pass

    def on_trash(self):
        pass

    def after_insert(self):
        pass

# Path to the Google service account JSON file (update the path if needed)
SERVICE_ACCOUNT_FILE = '/cloudclusters/erpnext/frappe-bench/apps/frappe/frappe/credentials/articulate-run-436205-k1-f6ea89310e57.json'

# Define the scopes required for Google Drive API
SCOPES = ['https://www.googleapis.com/auth/drive.file']

def init_google_drive_api():
    """Initialize Google Drive API client."""
    try:
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES
        )
        # Refresh the credentials to ensure the token is valid
        credentials.refresh(Request())
        return credentials
    except Exception as e:
        logging.error(f"Google Drive API initialization failed: {str(e)}")
        frappe.throw("Failed to initialize Google Drive API credentials.")

def upload_file_to_google_drive(credentials, file_path: str, file_name: str, file_type: str) -> str:
    """
    Uploads a file to Google Drive.

    Args:
        credentials: Google Drive API credentials.
        file_path (str): Path to the file.
        file_name (str): Name of the file.
        file_type (str): MIME type of the file.

    Returns:
        str: Google Drive link to the uploaded file.
    """
    try:
        # Create metadata for the file
        metadata = {
            'name': file_name,
            'mimeType': file_type,
            'parents': ['1HZWhazGLu51NITWjPpj_HRyjmiRYFMjg']  # Replace with your folder ID
        }

        # Open the file in binary mode for proper upload handling
        with open(file_path, 'rb') as file:
            file_content = file.read()

        # Create the multipart body (simplified for direct file upload)
        url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
        headers = {
            "Authorization": f"Bearer {credentials.token}",
            "Content-Type": "application/json; charset=UTF-8"
        }

        # Prepare multipart request
        files = {
            'metadata': (None, json.dumps(metadata), 'application/json'),
            'file': (file_name, file_content, file_type)
        }

        # Make the API request to upload the file
        response = requests.post(url, headers=headers, files=files)

        if response.status_code == 200:
            uploaded_file = response.json()
            # Return the Google Drive link
            return f'https://drive.google.com/file/d/{uploaded_file.get("id")}/view'
        else:
            logging.error(f'Google Drive Upload Error: {response.status_code} - {response.text}')
            frappe.throw(f'An error occurred during the upload: {response.text}')

    except Exception as e:
        logging.error(f'Google Drive Upload Error: {str(e)}')
        frappe.throw(f'An error occurred during the upload: {str(e)}')

@frappe.whitelist()
def upload_google_drive_file(doc_name: str) -> None:
    """
    Uploads a file to Google Drive.

    Args:
        doc_name (str): Name of the Google Drive Document Editing document.
    """
    try:
        # Log the doc_name for debugging
        logging.error(f"Attempting to fetch document with name: {doc_name}")

        # Initialize Google Drive API credentials
        credentials = init_google_drive_api()

        # Fetch the document based on the name
        try:
            doc = frappe.get_doc("Google Drive Document Editing", doc_name)
        except frappe.exceptions.DoesNotExistError:
            frappe.msgprint(f"Document '{doc_name}' not found.")
            return  # Stop further execution

        # Ensure document_path exists
        if not doc.document_path:
            frappe.msgprint('Document path is not specified.')
            return

        # Fetch the File document associated with the document_path
        file_doc = frappe.get_doc("File", {"file_url": doc.document_path})
        file_path = os.path.join(
            frappe.get_site_path('private' if file_doc.is_private else 'public', 'files'),
            file_doc.file_name
        )

        # Ensure the file exists on the server
        if not os.path.exists(file_path):
            frappe.throw(f'File "{file_doc.file_name}" not found on the server at path {file_path}.')

        # Detect the MIME type or set it as a default value
        content_type = file_doc.file_type if hasattr(file_doc, 'file_type') else \
            mimetypes.guess_type(file_doc.file_name)[0] or 'application/octet-stream'

        # Upload the file to Google Drive and get the link
        drive_link = upload_file_to_google_drive(credentials, file_path, file_doc.file_name, content_type)

        if drive_link:
            # Save the Google Drive link to the document
            doc.google_drive_link = drive_link
            doc.save()
            frappe.msgprint('File uploaded to Google Drive successfully.')

    except Exception as e:
        logging.error(f'Google Drive Upload Error: {str(e)}')
        frappe.throw(f'An error occurred: {str(e)}')
