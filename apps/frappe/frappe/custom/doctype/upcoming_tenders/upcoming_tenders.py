# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class UpcomingTenders(Document):
	pass

import frappe
from frappe.model.document import Document

class UpcomingTenders(Document):
    def on_update(self):
        if self.approval_status == "Approved":
            self.move_to_tender_notification()

    def move_to_tender_notification(self):
        # Check if a notification already exists to prevent duplicates
        if not frappe.db.exists("Tender Notification", {"tenderer": self.tender_name}):
            notification = frappe.get_doc({
                "doctype": "Tender Notification",
                "tenderer": self.tender_name,
                "tender_description": self.description,
                "submission_deadline": self.deadline,
                "annual_cost": self.tender_amount,
                "emd_amount": self.emd_amount,
                "bg_amount": self.bg_amount,
                "assigning_manager": self.approval_by,
                "tender_publish_date": self.approved_date,
                "number_of_manpower": self.number_of_manpower
            })
            notification.insert()
            frappe.db.commit()
