# Copyright (c) 2025, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

from frappe.model.document import Document
import frappe
import os

class PFPayments(Document):
    pass


@frappe.whitelist()
def get_ecr_text_preview(docname, file_url=None):
    """Reads ECR text file and returns exact line-by-line preview in HTML <pre> format."""
    doc = frappe.get_doc("PF Payments", docname)

    file_path = file_url or doc.ecr_attach

    if not file_path:
        return "<p style='color:red;'>No ECR file uploaded.</p>"

    # Normalize path
    if file_path.startswith("/files/"):
        file_path = "public" + file_path
    elif file_path.startswith("/private/files/"):
        file_path = "private" + file_path

    file_full_path = frappe.get_site_path(file_path)

    if not os.path.exists(file_full_path):
        return "<p style='color:red;'>File not found.</p>"

    try:
        with open(file_full_path, "r", encoding="utf-8") as f:
            content = f.read()

        html_preview = f"<pre>{content.strip()}</pre>"

        # Do not save to avoid document conflict
        return html_preview

    except Exception as e:
        return f"<p style='color:red;'>Error reading file: {str(e)}</p>"


@frappe.whitelist()
def download_ecr_text(docname):
    """Generates and downloads the current ECR text as a plain .txt file."""
    doc = frappe.get_doc("PF Payments", docname)

    file_path = doc.ecr_attach

    if not file_path:
        frappe.throw("No ECR file uploaded.")

    if file_path.startswith("/files/"):
        file_path = "public" + file_path
    elif file_path.startswith("/private/files/"):
        file_path = "private" + file_path

    file_full_path = frappe.get_site_path(file_path)

    if not os.path.exists(file_full_path):
        frappe.throw("ECR file not found.")

    try:
        with open(file_full_path, "r", encoding="utf-8") as f:
            content = f.read()

        raw_text = content.strip()
        file_name = f"ECR_Preview_{docname}.txt"

        file_doc = frappe.get_doc({
            "doctype": "File",
            "file_name": file_name,
            "content": raw_text,
            "is_private": 1,
            "attached_to_doctype": "PF Payments",
            "attached_to_name": docname
        })
        file_doc.save(ignore_permissions=True)

        return file_doc.file_url

    except Exception as e:
        frappe.throw(f"Failed to download file: {str(e)}")
