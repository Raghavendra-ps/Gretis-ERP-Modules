# api.py

import frappe

@frappe.whitelist(allow_guest=False)
def send_verification_email(employee_verification):
    # Fetch Employee Verification document
    doc = frappe.get_doc("Employee Verification", employee_verification)

    # Generate PDF
    pdf = frappe.get_print(
        "Employee Verification",
        doc.name,
        print_format="Employee Verification Form"
    )

    # Construct the email content
    email_content = f"""
    <p>Dear {doc.previous_reporting_manager_name},</p>
    <p>Please find attached the Employment Verification Form for {doc.employee_full_name}.</p>
    <p>Thank you for your cooperation.</p>
    """

    # Send the email with PDF attachment
    frappe.sendmail(
        recipients=[doc.previous_employer_email],
        subject=f"Employment Verification Request for {doc.employee_full_name}",
        message=email_content,
        attachments=[{
            "fname": "Employee_Verification_Form.pdf",
            "fcontent": pdf
        }],
        is_notification=True
    )
