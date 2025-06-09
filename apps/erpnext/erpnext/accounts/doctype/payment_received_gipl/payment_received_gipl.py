import frappe
import openpyxl
import os
from datetime import datetime

@frappe.whitelist()
def import_payments_from_excel(file_path='/private/files/Amounts Rec-17.07.24.xlsx'):
    # Resolve the full file path
    site_path = frappe.utils.get_site_path('private', 'files', 'Amounts Rec-17.07.24.xlsx')
    
    # Check if file exists
    if not os.path.exists(site_path):
        frappe.throw(f"File not found: {site_path}")
    
    # Load the workbook and select the active worksheet
    workbook = openpyxl.load_workbook(site_path)
    sheet = workbook.active
    
    # Iterate over the rows in the worksheet
    for row in sheet.iter_rows(min_row=2, values_only=True):  # Skip the header row
        # Ensure there are exactly 4 values, fill with None if fewer
        row = (list(row) + [None] * 4)[:4]
        
        date, particulars, amount, bill_no = row
        
        # Validate date format
        if isinstance(date, str):
            try:
                # Attempt to parse the date string
                date = datetime.strptime(date, '%Y-%m-%d').date()
            except ValueError:
                # If invalid, log a warning and skip this row
                frappe.log_error(f"Invalid date value: {date} in row {row}", "Invalid Date Error")
                continue  # Skip this row and move to the next one
        
        # Create a new Payment Received GIPL record
        frappe.get_doc({
            'doctype': 'Payment Received GIPL',  # Use the correct Doctype name here
            'date': date,
            'particulars_bank_dept_name': particulars,
            'amount_in_rs': amount,
            'bill_no': bill_no
        }).insert()
    
    frappe.db.commit()

# Example call to the function
import_payments_from_excel()
