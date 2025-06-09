frappe.listview_settings['Punjab Tenders'] = {
    onload: function(listview) {
        listview.page.add_inner_button('Fetch Latest Tenders', () => {
            frappe.call({
                method: 'frappe.custom.doctype.punjab_tenders.punjab_tenders.fetch_all_punjab_tenders',
                callback: function(r) {
                    if (r.message) {
                        frappe.msgprint(r.message.message || r.message);
                        if (r.message.file_url) {
                            window.open(r.message.file_url);
                        }
                    }
                }
            });
        });
    }
};
