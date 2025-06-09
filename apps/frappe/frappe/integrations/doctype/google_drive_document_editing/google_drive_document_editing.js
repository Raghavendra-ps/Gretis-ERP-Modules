frappe.ui.form.on('Google Drive Document Editing', {
    refresh: function(frm) {
        // Check if there is a Google Drive link available
        if (frm.doc.google_drive_link) {
            frm.add_custom_button(__('Open in Google Drive'), function() {
                window.open(frm.doc.google_drive_link, '_blank');
            });
        }

        // Add a custom button to upload the file to Google Drive
        frm.add_custom_button(__('Upload to Google Drive'), function() {
            frappe.call({
                method: 'frappe.integrations.doctype.google_drive_document_editing.google_drive_document_editing.upload_google_drive_file',  // Correct method path
                args: {
                    doc_name: frm.doc.name  // Use frm.doc.name to avoid any issues with missing doc_name
                },
                callback: function(r) {
                    if (r.message) {
                        frm.set_value('google_drive_link', r.message);  // Assuming r.message is the Google Drive link
                        frm.refresh_field('google_drive_link');
                        frappe.msgprint(__('File uploaded to Google Drive successfully.'));
                    } else {
                        frappe.msgprint(__('Failed to upload the file.'));
                    }
                },
                error: function(r) {
                    console.error(r); // Log detailed error response for debugging
                    frappe.msgprint(__('An error occurred while uploading the file.'));
                }
            });
        });
    }
});
