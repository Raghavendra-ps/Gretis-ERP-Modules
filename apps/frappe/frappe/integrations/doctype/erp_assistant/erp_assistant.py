import frappe
from frappe.model.document import Document
from frappe.utils import today

class ERPAssistant(Document):
    pass

@frappe.whitelist()
def process_command(command):
    """Processes user commands and executes ERPNext actions dynamically while learning from responses."""
    
    frappe.logger().info(f"User command received: {command}")  # Debugging
    command = command.lower().strip()
    response = "I'm still learning. Please refine your query."

    # Fetch all Doctypes dynamically
    doctypes = frappe.get_all("DocType", pluck="name")

    # Fetch Employee Info
    if command.startswith("who is "):
        emp_name = command.replace("who is", "").strip()
        employee = frappe.get_all("Employee", filters={"employee_name": ["like", f"%{emp_name}%"]}, fields=["name", "employee_name", "designation", "department"])
        if employee:
            emp = employee[0]
            response = f"{emp['employee_name']} is a {emp['designation']} in {emp['department']}."
        else:
            response = "Employee not found."

    # Fetch Attendance
    elif command.startswith("check attendance of"):
        emp_id = command.replace("check attendance of", "").strip()
        attendance = frappe.get_all("Attendance", filters={"employee": ["in", [emp_id, f"EMP-{emp_id}"]]}, fields=["status", "attendance_date"])
        if attendance:
            response = f"Attendance for {emp_id}:\n" + "\n".join([f"{a['attendance_date']}: {a['status']}" for a in attendance])
        else:
            response = "No attendance records found."

    # Apply Leave
    elif command.startswith("apply leave for"):
        emp_id = command.replace("apply leave for", "").strip()
        existing_leave = frappe.get_all("Leave Application", filters={"employee": emp_id, "from_date": today()}, fields=["name"])

        if not existing_leave:
            leave = frappe.get_doc({
                "doctype": "Leave Application",
                "employee": emp_id,
                "leave_type": "Earned Leave",
                "from_date": today(),
                "to_date": today(),
                "status": "Open"
            })
            leave.insert()
            response = f"Leave applied for {emp_id}."
        else:
            response = f"Leave already applied for {emp_id} today."

    # Generate Salary Slip
    elif command.startswith("generate salary slip for"):
        emp_id = command.replace("generate salary slip for", "").strip()
        salary_slip = frappe.get_doc({
            "doctype": "Salary Slip",
            "employee": emp_id,
            "payroll_period": "2025-03",
            "status": "Draft"
        })
        salary_slip.insert()
        response = f"Salary Slip generated for {emp_id}."

    # List All Doctypes
    elif command.startswith("list all doctypes"):
        response = "Available Doctypes:\n" + ", ".join(doctypes)

    # Save Interaction for Learning
    doc = frappe.get_doc({
        "doctype": "ERP Assistant",
        "command": command,
        "response": response
    })
    doc.insert()
    frappe.db.commit()
    
    frappe.logger().info(f"Response sent: {response}")  # Debugging
    
    return response
