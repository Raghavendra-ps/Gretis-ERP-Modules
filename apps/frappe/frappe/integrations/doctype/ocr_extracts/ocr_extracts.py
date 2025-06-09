# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class OCRExtracts(Document):
	pass

import frappe
import pytesseract
from PIL import Image
import io
import base64
from frappe.utils.file_manager import save_file
from docx import Document

@frappe.whitelist()
def extract_text_from_image(file_url, docname):
    try:
        file_doc = frappe.get_doc("File", {"file_url": file_url})
        file_content = base64.b64decode(file_doc.get_content())

        image = Image.open(io.BytesIO(file_content))
        extracted_text = pytesseract.image_to_string(image, lang="eng+pan")  # English and Punjabi OCR

        # Save extracted text to OCR Extracts doctype
        frappe.db.set_value("OCR Extracts", docname, "extracted_text", extracted_text)
        frappe.db.commit()

        return {"success": True, "text": extracted_text}
    
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "OCR Extraction Failed")
        return {"success": False, "error": str(e)}

@frappe.whitelist()
def download_word(docname):
    try:
        doc = frappe.get_doc("OCR Extracts", docname)
        extracted_text = doc.extracted_text or ""

        document = Document()
        document.add_paragraph(extracted_text)

        buffer = io.BytesIO()
        document.save(buffer)

        file_content = buffer.getvalue()

        if isinstance(file_content, str):
            file_content = file_content.encode("utf-8")  # Ensure bytes format

        file_url = save_file(f"{docname}.docx", file_content, "OCR Extracts", docname, is_private=0)

        return {"success": True, "file_url": file_url}
    
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Download Word Failed")
        return {"success": False, "error": str(e)}
