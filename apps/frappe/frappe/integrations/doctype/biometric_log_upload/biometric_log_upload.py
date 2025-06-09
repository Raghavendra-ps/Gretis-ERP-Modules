# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

from frappe.model.document import Document

class BiometricLogUpload(Document):
    pass

import frappe
import csv
import io
from frappe.utils import get_datetime
from collections import defaultdict

@frappe.whitelist()
def process_biomax_log(doc_name):
    doc = frappe.get_doc("Biometric Log Upload", doc_name)
    if not doc.log_file or not doc.employee_mapping_file:
        frappe.throw("Please attach both the log file and employee mapping file.")

    # Load mapping file (e.g., Employee.csv)
    employee_file_doc = frappe.get_doc("File", {"file_url": doc.employee_mapping_file})
    employee_file_path = frappe.get_site_path("public", employee_file_doc.file_url.lstrip("/"))

    enr_to_employee = {}

    with open(employee_file_path, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            enr_no = row.get("EnrNo") or row.get("Attendance Device ID (Biometric/RF tag ID)")
            emp_id = row.get("Employee ID") or row.get("ID") or row.get("Employee")
            emp_name = row.get("Employee Name") or row.get("Full Name") or row.get("Name")
            if enr_no and emp_id:
                enr_to_employee[enr_no.strip()] = (emp_id.strip(), emp_name.strip())

    # Load biometric log file
    log_file_doc = frappe.get_doc("File", {"file_url": doc.log_file})
    log_file_path = frappe.get_site_path("public", log_file_doc.file_url.lstrip("/"))

    with open(log_file_path, "r") as f:
        content = f.read()

    reader = csv.DictReader(io.StringIO(content))
    logs_by_emp_date = defaultdict(list)

    for row in reader:
        try:
            if "Date" not in row or "Time" not in row:
                frappe.log_error(title="Biometric Row Skip", message=f"Missing Date/Time: {row}")
                continue

            dt = get_datetime(f"{row['Date']} {row['Time']}", "%d/%m/%Y %H:%M")
            logs_by_emp_date[(row['EnrNo'], dt.date())].append((dt, row.get("Device")))
        except Exception as e:
            frappe.log_error(title="Biometric Row Error", message=f"{row}\nError: {e}")
            continue

    created, skipped, late_count, od_skipped = 0, 0, 0, 0

    for (enr_no, date), entries in logs_by_emp_date.items():
        if enr_no not in enr_to_employee:
            skipped += 1
            continue

        employee, emp_name = enr_to_employee[enr_no]

        # Check if on Official Duty
        od_request = frappe.db.exists("Attendance Request", {
            "employee": employee,
            "from_date": date,
            "to_date": date,
            "attendance_type": "Official Duty",
            "workflow_state": "Approved"
        })
        if od_request:
            od_skipped += 1
            continue

        entries.sort()
        in_marked, out_marked = False, False

        for dt, device in entries:
            time = dt.time()

            # IN logic
            if not in_marked:
                if time <= get_datetime("09:40", "%H:%M").time():
                    status = "On Time"
                elif time <= get_datetime("12:00", "%H:%M").time():
                    status = "Late"
                    late_count += 1
                else:
                    continue

                if not frappe.db.exists("Employee Checkin", {"employee": employee, "time": dt}):
                    frappe.get_doc({
                        "doctype": "Employee Checkin",
                        "employee": employee,
                        "employee_name": emp_name,
                        "log_type": "IN",
                        "time": dt,
                        "device_id": device,
                        "status": status
                    }).insert()
                    created += 1
                    in_marked = True

            # OUT logic
            elif not out_marked and time > get_datetime("17:30", "%H:%M").time():
                if not frappe.db.exists("Employee Checkin", {"employee": employee, "time": dt}):
                    frappe.get_doc({
                        "doctype": "Employee Checkin",
                        "employee": employee,
                        "employee_name": emp_name,
                        "log_type": "OUT",
                        "time": dt,
                        "device_id": device
                    }).insert()
                    created += 1
                    out_marked = True

    doc.upload_status = (
        f"Check-ins created: {created}, Skipped (unmapped): {skipped}, "
        f"Late arrivals: {late_count}, OD skipped: {od_skipped}"
    )
    doc.save()

    # Trigger attendance processing if enabled
    frappe.enqueue("frappe.hr.doctype.employee_checkin.employee_checkin.mark_attendance_from_checkin", queue='long', timeout=600)
