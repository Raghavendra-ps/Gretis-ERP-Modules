# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

from frappe.model.document import Document
import frappe
from frappe.utils import getdate

class ArrearCalculation(Document):
    pass

import frappe
from frappe.exceptions import ValidationError

@frappe.whitelist()
def calculate_arrears(docname, month_range_start, month_range_end):
    if not docname or not month_range_start or not month_range_end:
        frappe.throw("Document Name, Month Range Start, and Month Range End are required fields.")

    try:
        # Fetch the Arrear Calculation document
        arrear_doc = frappe.get_doc("Arrear Calculation", docname)

        # Clear existing rows in the Employee Arrear Calculation table
        arrear_doc.employee_arrear_calculation = []

        # Example logic: Fetch employees and calculate arrears based on the date range
        employees = frappe.get_all("Employee", fields=["name", "employee_name", "designation"])
        
        for employee in employees:
            # Placeholder logic for arrears (replace with actual calculation logic)
            total_earnings = 20000  # Example: Replace with calculated earnings
            total_deductions = 5000  # Example: Replace with calculated deductions
            net_arrears = total_earnings - total_deductions

            # Add a new row to the Employee Arrear Calculation table
            arrear_doc.append("employee_arrear_calculation", {
                "employee_name": employee.name,  # Link to the actual Employee record
                "old_salary": total_earnings,  # Example values, replace with actual calculations
                "revised_salary": total_earnings,  # Example values
                "salary_difference": net_arrears,
                "old_esi_contribution": 1000,  # Example values
                "revised_esi_contribution": 1000,  # Example values
                "esi_difference": 0,  # Example values
                "old_pf_contribution": 1500,  # Example values
                "revised_pf_contribution": 1500,  # Example values
                "pf_difference": 0,  # Example values
                "old_allowances": 2000,  # Example values
                "revised_allowances": 2000,  # Example values
                "allowances_difference": 0,  # Example values
                "total_arrears": net_arrears
            })

        # Save the updated Arrear Calculation document
        arrear_doc.save()

        # Return a success message
        return f"Arrears calculated successfully for {len(employees)} employees!"

    except Exception as e:
        frappe.throw(f"An error occurred while calculating arrears: {str(e)}")
