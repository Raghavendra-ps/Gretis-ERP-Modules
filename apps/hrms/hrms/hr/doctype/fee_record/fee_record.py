# Import necessary modules
import frappe
from frappe.model.document import Document
from frappe.utils import getdate, nowdate, get_last_day
from frappe.core.doctype.communication.email import make

class FeeRecord(Document):
    pass

import csv

def export_fee_records_to_csv(start_date, end_date):
    # Query to fetch fee records within the date range
    fee_records = frappe.get_all('Fee Record', filters={
        'date_of_submission': ['between', [start_date, end_date]]
    }, fields=['candidate_name', 'department', 'reference', 'date_of_submission', 'received_by', 'handed_over_to', 'email', 'employee_joining_fee', 'acknowledged_by'])
    
    # Prepare CSV content
    csv_content = []
    csv_content.append(['Candidate Name', 'Department', 'Reference', 'Date of Submission', 'Received By', 'Handed Over To', 'Email', 'Employee Joining Fee', 'Acknowledged By'])
    
    for record in fee_records:
        csv_content.append([
            record['candidate_name'], record['department'], record['reference'], record['date_of_submission'],
            record['received_by'], record['handed_over_to'], record['email'], record['employee_joining_fee'],
            record['acknowledged_by']
        ])
    
    # Save the CSV content to ERPNext File Doctype
    file_doc = frappe.get_doc({
        "doctype": "File",
        "file_name": "Fee_Records_{}_to_{}.csv".format(start_date, end_date),
        "attached_to_doctype": None,
        "attached_to_name": None,
        "is_private": 1,
        "content": "\n".join([",".join(map(str, row)) for row in csv_content])
    })
    file_doc.save(ignore_permissions=True)

    return file_doc.file_url

def send_fee_records_email():
    # Determine the current date
    today = getdate(nowdate())
    
    # Define start and end dates based on the current date
    if today.day <= 15:
        # 1st to 15th
        start_date = today.replace(day=1)
        end_date = today.replace(day=15)
    else:
        # 16th to end of the month
        start_date = today.replace(day=16)
        end_date = get_last_day(today)  # Gets the last day of the current month
    
    # Export the fee records to CSV and get the file URL
    file_url = export_fee_records_to_csv(start_date, end_date)
    
    # Prepare the email content
    email_subject = "Fee Records Notification for {} to {}".format(start_date, end_date)
    email_body = """
    Dear CEO,

    Please find the attached Fee Records CSV for the period {} to {}.

    Regards,
    Your Team
    """.format(start_date, end_date)

    # Send email with CSV attachment
    frappe.sendmail(
        recipients='dir@gretisindia.com',
        subject=email_subject,
        message=email_body,
        attachments=[{
            'file_url': file_url
        }]
    )

# Call the function to send the email with CSV attachment
send_fee_records_email()
