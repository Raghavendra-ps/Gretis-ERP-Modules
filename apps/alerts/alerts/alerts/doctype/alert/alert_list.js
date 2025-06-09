/*
*  Alerts © 2024
*  Author:  Ameen Ahmed
*  Company: Level Up Marketing & Software Development Services
*  Licence: Please refer to LICENSE file
*/


frappe.provide('frappe.listview_settings');


frappe.listview_settings['Alert'] = {
    hide_name_column: true,
    onload: function(list) {
        frappe.alerts.on('ready change', function() { this.setup_list(list); });
        
        try {
            list.orig_get_args = list.get_args;
            list.get_args = function() {
                var args = this.orig_get_args(),
                dt = this.doctype;
                if (dt === 'Alert') {
                    if (!args.fields) args.fields = [];
                    var fs = ['reached', 'status'];
                    for (var i = 0, l = fs.length, f; i < l; i++) {
                        f = frappe.model.get_full_column_name(fs[i], dt);
                        if (args.fields.indexOf(f) < 0) args.fields.push(f);
                    }
                }
                return args;
            };
            list.setup_columns();
            list.refresh(true);
        } catch(e) {
            frappe.alerts._error('Alert List: Onload error', e.message, e.stack);
        }
    },
    get_indicator: function(doc) {
        var status = cstr(doc.status),
        docstatus = cint(doc.docstatus);
        return [
            __(status),
            {
                'draft': 'gray',
                'pending': 'orange',
                'active': 'green',
                'finished': 'blue',
                'cancelled': 'red',
            }[status.toLowerCase()],
            'status,=,\'' + status + '\'|docstatus,=,' + docstatus
        ];
    },
    formatters: {
        is_repeatable: function(v) {
            return __(cint(v) ? 'Yes' : 'No');
        },
        reached: function(v, df, doc) {
            return cint(doc.reached);
        },
    },
};