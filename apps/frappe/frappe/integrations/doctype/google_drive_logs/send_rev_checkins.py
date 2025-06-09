import frappe
from frappe.utils import nowdate

def send_rev_checkins():
    """
    Fetches Employee Checkins with log type "REV" for today and sends an email report to HR.
    """

    # Define today's start and end time to filter check-ins
    today_start = nowdate() + " 00:00:00"
    today_end = nowdate() + " 23:59:59"

    # Fetch Employee Checkins with log_type "REV" for today
    checkins = frappe.get_all(
        "Employee Checkin",
        filters={
            "log_type": "REV",
            "time": ["between", [today_start, today_end]]
        },
        fields=["employee", "time", "log_type"]
    )

    # Log retrieved check-ins for debugging
    frappe.logger().info(f"Found {len(checkins)} check-ins with log type REV: {checkins}")

    # If no check-ins found, log and exit
    if not checkins:
        frappe.logger().info("No REV check-ins found for today. Skipping email.")
        return

    # Create email content with an HTML table
    message = """<h3>Employee Check-ins with log type 'REV'</h3>
                 <table border='1' cellspacing='0' cellpadding='5'>
                 <tr><th>Employee</th><th>Time</th><th>Log Type</th></tr>"""
    for checkin in checkins:
        message += f"<tr><td>{checkin.employee}</td><td>{checkin.time}</td><td>{checkin.log_type}</td></tr>"
    message += "</table>"

    # Attempt to send email and log success/failure
    try:
        frappe.sendmail(
            recipients=["hr@gretisindia.com"],
            subject="Daily Employee Check-ins (REV) Report",
            message=message
        )
        frappe.logger().info("REV Check-in email sent successfully!")
    except Exception as e:
        frappe.logger().error(f"Error sending email: {str(e)}")

# Run the function
send_rev_checkins()
