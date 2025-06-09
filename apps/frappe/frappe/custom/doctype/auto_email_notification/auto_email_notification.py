import frappe
from frappe.model.document import Document

class AutoEmailNotification(Document):
    pass

@frappe.whitelist()
def send_auto_email_notifications(doc_name=None):
    try:
        # Fetch the Auto Email Notification record by name (doc_name)
        notification = frappe.get_doc('Auto Email Notification', doc_name)

        # Ensure the notification is enabled and has a document type and email template selected
        if not notification.enabled:
            frappe.logger().error(f"Notification {notification.name} is not enabled.")
            return {"message": "Notification is disabled."}
        
        if not notification.document_type or not notification.email_template:
            frappe.logger().error(f"Required fields (document_type or email_template) are missing in notification {notification.name}.")
            return {"message": "Required fields (document_type or email_template) are missing."}

        # Fetch the document type records (based on selected document type)
        docs = frappe.get_all(notification.document_type, fields=["name"])

        # If no docs found, log and skip this notification
        if not docs:
            frappe.logger().error(f"No documents found for {notification.document_type}.")
            return {"message": "No documents found."}

        # Loop through each document to send the email to the selected recipients
        emails_sent = 0
        for doc in docs:
            doc_obj = frappe.get_doc(notification.document_type, doc.name)
            
            # Log the document fields to ensure context is correct
            frappe.logger().error(f"Document fields for {doc.name}: {doc_obj.as_dict()}")

            # Fetch recipients tied to this notification
            recipients = frappe.get_all('Email Recipients', filters={'parent': notification.name}, fields=['recipient_email', 'recipient_name'])

            # Log recipients for debugging
            frappe.logger().error(f"Recipients found for document {doc.name}: {recipients}")

            # If no recipients, log and skip this notification
            if not recipients:
                frappe.logger().error(f"No recipients found for notification: {notification.name}")
                continue

            # Fetch the email template
            email_template = frappe.get_doc('Email Template', notification.email_template)

            # Ensure the email template contains a response field
            if not email_template.response:
                frappe.logger().error(f"Email template {email_template.name} does not have a response field.")
                continue

            # Prepare the email message using the template and the document fields
            for recipient in recipients:
                try:
                    # Ensure that the recipient email is valid
                    if not recipient.recipient_email:
                        frappe.logger().error(f"Invalid email address for recipient {recipient.recipient_name} in notification {notification.name}.")
                        continue

                    # Render the email body by passing the document fields as a dictionary to replace placeholders
                    context = doc_obj.as_dict()  # Convert the document to a dictionary
                    message = frappe.render_template(email_template.response, context)

                    # Log the rendered message
                    frappe.logger().error(f"Rendered email message for {recipient.recipient_name}: {message}")

                    # Send the email using the selected template
                    sent = frappe.sendmail(
                        recipients=[recipient.recipient_email],
                        subject=email_template.subject,
                        message=message  # Use the rendered template message
                    )

                    # Log whether the email was sent successfully or not
                    if sent:
                        frappe.logger().error(f"Email successfully sent to {recipient.recipient_name} ({recipient.recipient_email})")
                        emails_sent += 1
                    else:
                        frappe.logger().error(f"Failed to send email to {recipient.recipient_name} ({recipient.recipient_email})")

                except Exception as e:
                    # Log any exception that happens during email sending
                    frappe.logger().error(f"Error sending email to {recipient.recipient_email}: {str(e)}")

            # Update the last sent timestamp after emails are sent
            notification.last_sent_timestamp = frappe.utils.now_datetime()
            notification.save()

        # If no emails were sent, log an error
        if emails_sent == 0:
            frappe.logger().error(f"No emails were sent for notification {notification.name}.")
            return {"message": "No emails were sent."}

        return {"message": "Emails have been sent successfully."}
    
    except Exception as e:
        # Catch any unexpected errors and log them
        frappe.logger().error(f"Error in send_auto_email_notifications: {str(e)}")
        return {"message": f"Error in sending emails: {str(e)}"}
