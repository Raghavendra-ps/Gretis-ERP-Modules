import os
import frappe
from googleapiclient.http import MediaFileUpload
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from frappe.utils import get_files_path
from frappe.model.document import Document

class TechandFin(Document):
    pass

import frappe
import os
import zipfile
from PyPDF2 import PdfMerger

@frappe.whitelist()
def merge_pdfs_to_zip(docname):
    """
    Merges all attached PDFs in 'Tender Doc Master' into a single PDF and then zips it.
    """
    try:
        doc = frappe.get_doc("Tech and Fin", docname)
        if not doc:
            frappe.throw(f"Document {docname} not found.")

        # Define filenames
        merged_pdf_filename = f"merged_{docname}.pdf"
        merged_pdf_path = frappe.utils.get_files_path(merged_pdf_filename)
        zip_filename = f"merged_pdfs_{docname}.zip"
        zip_path = frappe.utils.get_files_path(zip_filename)

        # Merge PDFs
        merger = PdfMerger()
        for row in doc.tender_doc_master:
            if row.attach_doc:
                file_path = frappe.utils.get_files_path(row.attach_doc.lstrip("/files/"))
                if os.path.exists(file_path):
                    merger.append(file_path)

        # Save merged PDF
        merger.write(merged_pdf_path)
        merger.close()

        # Create ZIP file
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            zipf.write(merged_pdf_path, os.path.basename(merged_pdf_path))

        # Save ZIP file as a FileDoc in Frappe
        zip_file = frappe.get_doc({
            "doctype": "File",
            "file_name": zip_filename,
            "is_private": 0,  # Set to 1 for private files
            "content": open(zip_path, "rb").read()
        })
        zip_file.insert()

        return zip_file.file_url  # Return the file URL for downloading

    except Exception as e:
        frappe.throw(f"An error occurred: {str(e)}")
