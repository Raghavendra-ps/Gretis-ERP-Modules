# Copyright (c) 2025, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class TenderOpeningandEvaluationDetails(Document):
	pass

import frappe

@frappe.whitelist()
def create_duplicate_tenders(current_docname):
    # Fetch the current document
    current_doc = frappe.get_doc("Tender Opening and Evaluation Details", current_docname)

    # Ensure the Related Tender field is populated
    if not current_doc.related_tender:
        frappe.throw("Related Tender field cannot be empty.")

    # Create a duplicate of the current document with "(Retender)" appended to Related Tender
    new_doc = frappe.copy_doc(current_doc)
    # Append "(Retender)" to the related_tender field
    new_doc.related_tender = f"{current_doc.related_tender}(Retender)"  # Update the Related Tender field
    new_doc.retender = 1  # Ensure the new document also has the Retender checkbox checked
    new_doc.insert()

    # Define the linked Doctypes and their respective fieldnames
    linked_doctypes = [
        {"doctype": "Tender Notification", "fieldname": "tenderer"},
        {"doctype": "Pre-bid Meeting", "fieldname": "related_tender"},
        {"doctype": "EMD Management", "fieldname": "related_tender"},
        {"doctype": "Tech and Fin", "fieldname": "related_tender"},
        {"doctype": "ATC", "fieldname": "related_tender"}
    ]

    for link in linked_doctypes:
        linked_docs = frappe.get_all(
            link["doctype"],
            filters={link["fieldname"]: current_doc.related_tender},
            fields=["*"]
        )
        for doc in linked_docs:
            # Copy the document
            new_linked_doc = frappe.copy_doc(frappe.get_doc(link["doctype"], doc.name))

            # Append "(Retender)" to the related_tender field
            new_linked_doc.related_tender = f"{doc.related_tender}(Retender)"  # Modify the related_tender field

            # For Tender Notification and ATC, append "(Retender)" in the specific fields
            if link["doctype"] == "Tender Notification":
                new_linked_doc.tenderer = f"{doc.tenderer}(Retender)"
            elif link["doctype"] == "ATC":
                new_linked_doc.related_tender = f"{doc.related_tender}(Retender)"
            else:
                new_linked_doc.set(link["fieldname"], f"{doc[link['fieldname']]}(Retender)")  # Append "(Retender)" to other fields

            # Insert the new linked document
            new_linked_doc.insert()

    frappe.msgprint("Duplicate tenders and related documents have been created.")
