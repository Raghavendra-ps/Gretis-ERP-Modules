import frappe
from datetime import datetime, timedelta

@frappe.whitelist()
def mark_attendance_for_month():
    today = frappe.utils.nowdate()
    year, month = today.split("-")[:2]
    start_date = f"{year}-{month}-01"
    days_in_month = frappe.utils.get_last_day(start_date).day

    for day in range(1, days_in_month + 1):
        date = f"{year}-{month}-{str(day).zfill(2)}"
        frappe.enqueue(
            "hrms.api.attendance.mark_attendance_for_date_gipl_general",
            queue="long",
            timeout=600,
            date=date
        )

    return f"Queued attendance processing for {days_in_month} days ({start_date} to {year}-{month}-{days_in_month})"


@frappe.whitelist()
def mark_attendance_for_date_gipl_general(date):
    shift_type = "GIPL General"

    # Fetch all shift assignments for this date and shift
    shift_assignments = frappe.get_all(
        "Shift Assignment",
        filters={
            "date": date,
            "shift_type": shift_type,
            "docstatus": 1
        },
        fields=["employee", "name"]
    )

    if not shift_assignments:
        frappe.logger().info(f"No shift assignments for {shift_type} on {date}")
        return

    for sa in shift_assignments:
        try:
            frappe.get_doc({
                "doctype": "Attendance",
                "employee": sa.employee,
                "attendance_date": date,
                "status": "Present",
                "shift": shift_type,
                "shift_assignment": sa.name
            }).insert(ignore_permissions=True)
        except frappe.DuplicateEntryError:
            continue
        except Exception as e:
            frappe.log_error(f"Attendance error on {date} for {sa.employee}: {e}")
