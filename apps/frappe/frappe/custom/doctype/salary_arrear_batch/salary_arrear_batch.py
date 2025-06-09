# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SalaryArrearBatch(Document):
    pass

@frappe.whitelist()
def calculate_arrear_for_batch(docname):
    """Calculate arrears for all employees in the batch"""
    batch = frappe.get_doc("Salary Arrear Batch", docname)
    for row in batch.employees_arrear_details:
        if row.effective_date_revised and row.effective_date_old:
            days = frappe.utils.date_diff(row.effective_date_revised, row.effective_date_old)
            arrear_amount = ((row.revised_salary - row.old_salary) / 30) * days
            row.days_between = days
            row.arrear_amount = round(arrear_amount, 2)
    batch.save()
    return {"message": "Arrear calculation completed successfully"}
