import frappe
from frappe.model.document import Document
from frappe.utils import flt, date_diff, getdate
import json

class EmployeeArrears(Document):
    pass

@frappe.whitelist()
def calculate_exact_month_days(start_date, end_date):
    """
    Calculate exact total days and month difference between two dates.
    """
    try:
        start_date = getdate(start_date)
        end_date = getdate(end_date)

        # Ensure both dates are valid
        if not start_date or not end_date:
            frappe.throw("Please select valid dates.")

        # Calculate total days, including the last day
        total_days = (end_date - start_date).days + 1

        # Calculate the number of months
        month_difference = total_days // 30  # Approximation for month calculation

        return {"total_days": total_days, "month_difference": month_difference}
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Error in calculate_exact_month_days")
        frappe.throw(f"Error calculating days and months: {str(e)}")

@frappe.whitelist()
def fetch_employees_by_category(doc, selected_category):
    """
    Fetch employees when a category is selected in the Wage List.
    """
    try:
        if isinstance(doc, str):
            doc = json.loads(doc)
        doc = frappe._dict(doc)

        company = doc.get("company")
        arrear_period_from = doc.get("arrear_period_from")
        arrear_period_to = doc.get("arrear_period_to")
        month_difference = flt(date_diff(arrear_period_to, arrear_period_from)) / 30

        if not company or not selected_category:
            frappe.throw("Please select a company and category.")

        # Fetch Active Employees
        employees = frappe.get_all(
            "Employee",
            filters={"status": "Active", "company": company, "category": selected_category},
            fields=["name", "employee_name", "category"]
        )

        employee_data = []
        for employee in employees:
            salary_slips = frappe.get_all(
                "Salary Slip",
                filters={
                    "employee": employee.name,
                    "start_date": ["<=", arrear_period_to],
                    "end_date": [">=", arrear_period_from],
                    "docstatus": ["in", [0, 1]]
                },
                fields=["gross_pay", "total_working_days"]
            )

            total_gross_pay = sum(flt(slip.gross_pay) for slip in salary_slips)
            total_working_days = sum(flt(slip.total_working_days) for slip in salary_slips)

            gross_pay = total_gross_pay * month_difference

            revised_salary = 0
            for wage in doc.get("wage_info", []):  # Updated from arrear_list to wage_info
                if wage.get("category") == selected_category:
                    # Using manually entered Wage Amount
                    revised_salary = flt(wage.get("wage_amount", total_gross_pay)) * month_difference
                    break

            diff_in_salary = flt(gross_pay) - flt(revised_salary)
            actual_gross = (diff_in_salary / month_difference) if month_difference > 0 else 0

            esi = actual_gross * 0.0075 if actual_gross <= 21000 else 0
            pf = 1800 if actual_gross > 15000 else actual_gross * 0.12
            total_diff = actual_gross - esi - pf

            employee_data.append({
                "employee": employee.name,
                "employee_name": employee.employee_name,
                "category": employee.category,
                "gross_pay": gross_pay,
                "revised_salary": revised_salary,
                "diff_in_salary": diff_in_salary,
                "actual_gross": actual_gross,
                "esi": esi,
                "pf": pf,
                "total_diff": total_diff,
                "total_working_days": total_working_days
            })

        return employee_data

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Employee Arrears - Fetch Employees by Category Error")
        frappe.throw(f"Error fetching employees by category: {str(e)}")
