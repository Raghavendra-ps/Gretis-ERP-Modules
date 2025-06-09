import frappe
from frappe.model.document import Document
import json

class AutoDoctypeGenerator(Document):
    def validate(self):
        """
        Validate that mandatory fields are filled.
        """
        if not self.action_type:
            frappe.throw("Action Type is required.")
        if not self.target_name:
            frappe.throw("Target Name is required.")

    @frappe.whitelist()
    def generate(self):
        """
        Main method to generate Doctype, Workflow, or Email Notification based on Action Type.
        """
        action_methods = {
            "Doctype": self.generate_doctype,
            "Workflow": self.generate_workflow,
            "Email Notification": self.generate_email_template
        }

        generate_method = action_methods.get(self.action_type)
        if generate_method:
            generate_method()
            return f"{self.action_type} created successfully."
        else:
            frappe.throw(f"Invalid Action Type: {self.action_type}")

    @frappe.whitelist()
    def generate_doctype(self):
        """
        Generate a custom Doctype from configuration data.
        """
        config = self.get_configuration_data()
        doctype_name = config.get("name")
        fields = config.get("fields")

        if not doctype_name or not fields:
            frappe.throw("Doctype name or fields are missing in input data.")

        doc = frappe.get_doc({
            "doctype": "DocType",
            "name": doctype_name,
            "module": self.target_name,
            "custom": 1,
            "fields": fields,
            "permissions": [{"role": "System Manager", "read": 1, "write": 1, "create": 1}]
        })
        doc.insert(ignore_permissions=True)
        frappe.db.commit()

    @frappe.whitelist()
    def generate_workflow(self):
        """
        Generate a Workflow based on configuration data.
        """
        config = self.get_configuration_data()
        workflow_name = config.get("workflow_name")
        document_type = config.get("document_type")
        states = config.get("states")
        transitions = config.get("transitions")

        if not workflow_name or not document_type or not states or not transitions:
            frappe.throw("Workflow configuration data is incomplete.")

        workflow = frappe.get_doc({
            "doctype": "Workflow",
            "workflow_name": workflow_name,
            "document_type": document_type,
            "is_active": 1,
            "states": states,
            "transitions": transitions
        })
        workflow.insert(ignore_permissions=True)
        frappe.db.commit()

    @frappe.whitelist()
    def generate_email_template(self):
        """
        Generate an Email Notification from configuration data.
        """
        config = self.get_configuration_data()
        notification_name = config.get("notification_name")
        subject = config.get("subject")
        recipients = config.get("recipients")
        document_type = config.get("document_type")
        condition = config.get("condition", "")

        if not notification_name or not subject or not recipients or not document_type:
            frappe.throw("Email Notification configuration data is incomplete.")

        notification = frappe.get_doc({
            "doctype": "Notification",
            "subject": subject,
            "document_type": document_type,
            "event": "Save",
            "channel": "Email",
            "recipients": recipients,
            "condition": condition,
            "message": config.get("message", "Default message")
        })
        notification.insert(ignore_permissions=True)
        frappe.db.commit()
