# Copyright (c) 2024, Gretis India Private Limited and contributors
# For license information, please see license.txt

# Import necessary modules
import openai
import frappe
from frappe.model.document import Document

# Define the Document class for BotConfiguration
class BotConfiguration(Document):
    pass

# Set your OpenAI API key
openai.api_key = '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'

@frappe.whitelist()
def get_chatgpt_response(prompt):
    response = openai.Completion.create(
        model="GPT-4o",
        prompt=prompt,
        max_tokens=150
    )
    return response['choices'][0]['text'].strip()

@frappe.whitelist()
def create_doctype(name, fields):
    doc = frappe.new_doc("DocType")
    doc.name = name
    doc.module = "Custom Bot"
    doc.custom = 1
    doc.autoname = "field:fieldname"
    for field in fields:
        doc.append("fields", field)
    doc.insert()
    frappe.db.commit()
    return "DocType created successfully!"

@frappe.whitelist()
def create_script(doctype, script_type, script):
    doc = frappe.get_doc({
        "doctype": "Custom Script",
        "dt": doctype,
        "script_type": script_type,
        "script": script
    })
    doc.insert()
    frappe.db.commit()
    return "Script created successfully!"

@frappe.whitelist(allow_guest=True)
def options():
    from frappe import local
    response = local.response
    response.headers["Access-Control-Allow-Origin"] = "https://erp.gretis.com"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.status_code = 204  # No Content
    return response
