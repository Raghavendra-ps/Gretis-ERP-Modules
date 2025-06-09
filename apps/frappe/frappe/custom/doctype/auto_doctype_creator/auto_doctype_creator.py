import frappe
from frappe.model.document import Document

class AutoDoctypeCreator(Document):
    def validate(self):
        # You can put any validation logic for this Doctype here
        pass

    def on_update(self):
        # Code to handle actions when this Doctype is updated
        pass

import frappe
import re

@frappe.whitelist()
def create_doctype(doctype_name, fields_text):
    try:
        # Ensure fields_text is not empty
        if not fields_text.strip():
            frappe.throw("Fields input cannot be empty.")

        # Check if Doctype already exists
        if frappe.db.exists("DocType", doctype_name):
            frappe.throw(f"Doctype with name '{doctype_name}' already exists.")

        # Initialize the fields list
        fields = []

        # Function to clean and validate field names (removes unwanted characters)
        def clean_fieldname(fieldname):
            # Remove any special characters using regex
            fieldname = re.sub(r'[^a-zA-Z0-9_]', '_', fieldname.strip().lower())
            return fieldname

        # Function to clean the field label (remove unwanted characters)
        def clean_label(label):
            # Clean up unwanted spaces and new lines
            label = label.strip()
            return label

        # List of valid field types (you can expand this if needed)
        valid_fieldtypes = ['Data', 'Int', 'Text', 'Select', 'Link', 'Date', 'Datetime', 'Currency']

        # Parse fields_text input by lines
        for line in fields_text.strip().split('\n'):
            # Ensure there are at least 3 parts: fieldname, fieldtype, label
            parts = [part.strip() for part in line.split(',')]

            if len(parts) < 3:
                frappe.throw(f"Invalid format for line: '{line}'. Expected format: fieldname, fieldtype, label, [optional: reqd]")

            # Clean fieldname, fieldtype, and label
            fieldname = clean_fieldname(parts[0])  # Clean fieldname
            fieldtype = parts[1]  # Field type (e.g., Data, Int)
            label = clean_label(parts[2])  # Clean label (strip unwanted spaces)

            # Validate fieldtype
            if fieldtype not in valid_fieldtypes:
                frappe.throw(f"Invalid fieldtype '{fieldtype}' for field '{fieldname}'. Valid types are: {', '.join(valid_fieldtypes)}")

            # Prepare field dictionary
            field = {
                'fieldname': fieldname,
                'fieldtype': fieldtype,
                'label': label,
            }

            # If 'reqd' is specified, add it as a required field
            if len(parts) > 3 and parts[3].strip().lower() == 'reqd':
                field['reqd'] = 1

            # Append the cleaned field to the list
            fields.append(field)

        # Create the new Doctype
        new_doctype = frappe.get_doc({
            'doctype': 'DocType',
            'name': doctype_name,
            'module': 'Custom',
            'custom': 1,
            'fields': fields,
            'permissions': [{
                'role': 'System Manager', 
                'read': 1, 'write': 1, 'create': 1, 'delete': 1
            }]
        })

        # Insert the new Doctype into the database
        new_doctype.insert(ignore_permissions=True)
        frappe.db.commit()

        return f"Doctype '{doctype_name}' created successfully."

    except Exception as e:
        frappe.throw(f"Error creating Doctype: {str(e)}")
