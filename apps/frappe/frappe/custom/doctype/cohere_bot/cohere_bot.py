# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class CohereBot(Document):
	pass

import requests
import frappe
from frappe.utils import now

@frappe.whitelist()
def generate_response(docname):
    """
    Calls the Cohere API and updates the response in the Cohere Bot Doctype.
    """
    api_key = "Xxw2MiLtFgBMFYzornGo4XrePSG8IQ6v5Q9dmoJp"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    
    # Fetch the Cohere Bot document
    doc = frappe.get_doc("Cohere Bot", docname)
    
    data = {
        "model": "command-xlarge-nightly",
        "prompt": doc.prompt,
        "max_tokens": 500,
        "temperature": 0.7,
    }
    
    try:
        # Call Cohere API
        response = requests.post("https://api.cohere.ai/v1/generate", headers=headers, json=data)
        response_data = response.json()

        if response.status_code == 200:
            generated_text = response_data.get("generations", [{}])[0].get("text", "")
            doc.response = generated_text
            doc.status = "Success"
        else:
            doc.response = response_data.get("message", "Unknown error")
            doc.status = "Failure"

        doc.timestamp = now()
        doc.save(ignore_permissions=True)
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Cohere API Error")
        frappe.throw(f"Error calling Cohere API: {str(e)}")
