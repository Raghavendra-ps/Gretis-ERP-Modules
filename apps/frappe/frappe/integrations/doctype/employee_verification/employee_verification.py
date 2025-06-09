# Copyright (c) 2024, Frappe Technologies and contributors
# For license information, please see license.txt

from frappe.model.document import Document
import frappe

class EmployeeVerification(Document):
    pass

@frappe.whitelist()
def send_verification_email(employee_verification):
    """Send employment verification request email to the previous employer"""
    
    # Fetch Employee Verification document
    doc = frappe.get_doc("Employee Verification", employee_verification)
    
    # Validate required fields
    if not doc.previous_company_name or not doc.previous_employer_email:
        frappe.throw("Previous company name and employer email are required!")

    # Construct the subject
    subject = f"Employment Verification Request for {doc.employee_full_name}"
    
    # Construct the web form link (to be filled by employer)
    webform_link = f"https://erp.gretis.com/employment-verification-form?verification_id={doc.name}"
    
    # Construct the email body with the webform link
    email_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <style>
          body {{ font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }}
          .email-container {{ width: 600px; margin: 20px auto; background-color: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; }}
          .email-header {{ text-align: center; font-size: 24px; font-weight: bold; color: #0044cc; margin-bottom: 20px; }}
          .section-heading {{ font-size: 18px; font-weight: bold; color: #0044cc; margin-top: 20px; border-bottom: 2px solid #0044cc; padding-bottom: 5px; }}
          .email-body {{ font-size: 14px; line-height: 1.6; margin-top: 10px; }}
          .email-body p {{ margin: 10px 0; }}
          .footer {{ font-size: 12px; text-align: center; color: #aaa; margin-top: 20px; }}
          .table {{ width: 100%; margin-top: 10px; border-collapse: collapse; }}
          .table th, .table td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
          .table th {{ background-color: #f2f2f2; font-weight: bold; }}
          .table td {{ background-color: #fafafa; }}
       </style>
    </head>
    <body>
       <div class="email-container">
          <div class="email-header">Employment Verification Request for {doc.employee_full_name}</div>
          <div class="email-body">
             <p>Dear {doc.previous_reporting_manager_name},</p>
             <p>We are verifying the employment details of <strong>{doc.employee_full_name}</strong>, who listed 
                <strong>{doc.previous_company_name}</strong> as their previous employer. Kindly review the following details:</p>
             
             <div class="section-heading">Employee Details</div>
             <table class="table">
                <tr><th>Employee Full Name</th><td>{doc.employee_full_name}</td></tr>
                <tr><th>Previous Company Name</th><td>{doc.previous_company_name}</td></tr>
                <tr><th>Previous Reporting Manager</th><td>{doc.previous_reporting_manager_name}</td></tr>
                <tr><th>Last Designation</th><td>{doc.last_designation}</td></tr>
                <tr><th>Employment Period</th><td>{doc.employment_period_from} to {doc.employment_period_to}</td></tr>
                <tr><th>Eligible for Rehire?</th><td>✅ Yes / ❌ No (If No, specify reason)</td></tr>
                <tr><th>Details as per Company Records</th><td>(To be filled by HR)</td></tr>
             </table>

             <p><strong>To complete the verification, please fill out the form:</strong></p>
             <a href="{webform_link}" style="display: inline-block; padding: 10px 20px; background-color: #0044cc; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                 Click here to verify details
             </a>
             
             <div class="footer">
                <p>Thank you for your time and cooperation.</p>
                <p>If you have any questions, please feel free to contact us.</p>
             </div>
          </div>
       </div>
    </body>
    </html>
    """

    # Prepare attachments list
    attachments = []

    # Attach Experience Letter
    if doc.experience_letter_relieving_letter:
        file_doc = frappe.get_doc("File", {"file_url": doc.experience_letter_relieving_letter})
        if file_doc:
            file_content = frappe.get_file(doc.experience_letter_relieving_letter)
            attachments.append({"fname": file_doc.file_name, "fcontent": file_content})
    
    # Attach Resume
    if doc.attach_resume:
        file_doc_resume = frappe.get_doc("File", {"file_url": doc.attach_resume})
        if file_doc_resume:
            file_content_resume = frappe.get_file(doc.attach_resume)
            attachments.append({"fname": file_doc_resume.file_name, "fcontent": file_content_resume})

    # Send the email
    frappe.sendmail(
        recipients=[doc.previous_employer_email],
        subject=subject,
        message=email_content,
        attachments=attachments,
        is_notification=True
    )

    # Notify user in ERPNext
    frappe.msgprint(f"Verification email sent to {doc.previous_employer_email}")
