# Copyright (c) 2025, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class TenderNotification(Document):
	pass

import frappe
from frappe.model.document import get_doc

@frappe.whitelist()
def amend_submission_deadline(docname, new_deadline):
    doc = get_doc("Tender Notification", docname)

    # Ensure doc is submitted
    if doc.docstatus != 1:
        frappe.throw("Only submitted documents can be amended.")

    # Optional: add permission check
    if "Tender Executive" not in frappe.get_roles():
        frappe.throw("You do not have permission to update the deadline.")

    doc.db_set("submission_deadline", new_deadline)
    return "Submission Deadline updated successfully."
    
class TenderNotification(Document):
    def on_update(self):
        # Update submission_deadline in linked Tech and Fin
        frappe.db.set_value("Tech and Fin", {"related_tender": self.name}, "submission_deadline", self.submission_deadline)

        # Update submission_deadline in linked EMD Management
        frappe.db.set_value("EMD Management", {"related_tender": self.name}, "submission_deadline", self.submission_deadline)

