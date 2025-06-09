# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

import frappe
import requests
from frappe import _
from frappe.model.document import Document

class DeepSeekIntegration(Document):
    def before_save(self):
        if self.status == "Pending" and self.command:
            self.process_command()

    def process_command(self):
        try:
            self.validate_settings()
            erp_data = self.fetch_erpnext_data(self.command)
            response = self.call_deepseek_api(self.command, erp_data)
            self.handle_api_response(response)
        except Exception as e:
            self.handle_error(e)

    def validate_settings(self):
        """Auto-create settings if missing"""
        if not frappe.db.exists("DeepSeek Settings", "DeepSeek Settings"):
            self.create_default_settings()
            
        settings = frappe.get_doc("DeepSeek Settings", "DeepSeek Settings")
        
        if not settings.enable_integration:
            frappe.throw("Integration disabled in settings")
        if not settings.get_password("api_key"):
            frappe.throw("API key missing")
        if not settings.api_endpoint:
            frappe.throw("API endpoint missing")

    def create_default_settings(self):
        """Create initial settings record"""
        frappe.get_doc({
            "doctype": "DeepSeek Settings",
            "api_key": "sk-378f5880ad56441fa9aa2eeb210bb8fd",  # Replace with actual key
            "api_endpoint": "https://api.deepseek.com/v1/chat/completions",
            "enable_integration": 1
        }).insert(ignore_permissions=True, ignore_mandatory=True)
        frappe.db.commit()

    # Keep other methods (call_deepseek_api, handle_api_response, fetch_erpnext_data) unchanged

    def handle_error(self, error):
        """Error handling method"""
        self.status = "Failed"
        self.response = f"Error: {str(error)}"
        frappe.log_error(
            title="DeepSeek Integration Error",
            message=f"Document: {self.name}\nError: {str(error)}"
        )
        frappe.db.commit()  # Force save error state