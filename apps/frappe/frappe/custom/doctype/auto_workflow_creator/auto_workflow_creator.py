import frappe
from frappe.model.document import Document

class AutoWorkflowCreator(Document):
    def validate(self):
        # Disable validation for states completely if needed
        pass

    def create_workflow(self):
        # This is where the workflow creation logic happens
        workflow_doc = frappe.new_doc("Workflow")
        workflow_doc.workflow_type = "Custom Workflow"
        
        # Define workflow states
        workflow_doc.workflow_states = [
            {
                "state": "Open",
                "docstatus": 0,
                "allow_delete": 1
            },
            {
                "state": "In Progress",
                "docstatus": 1,
                "allow_delete": 1
            }
        ]
        
        try:
            # Save the workflow document
            workflow_doc.save()
            frappe.msgprint("Workflow created successfully.")
        except Exception as e:
            # Log the error for debugging purposes
            frappe.log_error(message=str(e), title="Workflow Creation Error")
            frappe.msgprint(f"Error creating workflow: {str(e)}")
            raise
