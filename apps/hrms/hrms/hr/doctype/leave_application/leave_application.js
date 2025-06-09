frappe.ui.form.on("Leave Application", {
    setup: function(frm) {
        // Ensure frm is initialized and has required properties
        if (frm && frm.doc) {
            // Set query for employee field using standard employee query
            frm.set_query("employee", function() {
                return {
                    query: "hrms.hr.doctype.employee.employee.get_employee_query"
                };
            });

            frm.set_query("leave_approver", function() {
                return {
                    query: "hrms.hr.doctype.department_approver.department_approver.get_approvers",
                    filters: {
                        employee: frm.doc.employee,
                        doctype: frm.doc.doctype
                    }
                };
            });
        } else {
            console.error("Form or document not initialized correctly.");
        }
    },

    onload: function(frm) {
        // Ignore cancellation of doctype on cancel all.
        frm.ignore_doctypes_on_cancel_all = ["Leave Ledger Entry"];

        if (!frm.doc.posting_date) {
            frm.set_value("posting_date", frappe.datetime.get_today());
        }

        if (frm.doc.docstatus == 0) {
            return frappe.call({
                method: "hrms.hr.doctype.leave_application.leave_application.get_mandatory_approval",
                args: {
                    doctype: frm.doc.doctype
                },
                callback: function(r) {
                    if (!r.exc && r.message) {
                        frm.toggle_reqd("leave_approver", true);
                    }
                }
            });
        }
    },

    validate: function(frm) {
        if (frm.doc.from_date == frm.doc.to_date && frm.doc.half_day == 1) {
            frm.doc.half_day_date = frm.doc.from_date;
        } else if (frm.doc.half_day == 0) {
            frm.doc.half_day_date = "";
        }
        frm.toggle_reqd("half_day_date", frm.doc.half_day == 1);
    },

    make_dashboard: function(frm) {
        var leave_details;
        let lwps;
        if (frm.doc.employee) {
            frappe.call({
                method: "hrms.hr.doctype.leave_application.leave_application.get_leave_details",
                async: false,
                args: {
                    employee: frm.doc.employee,
                    date: frm.doc.from_date || frm.doc.posting_date
                },
                callback: function(r) {
                    if (!r.exc) {
                        if (r.message['leave_allocation']) {
                            leave_details = r.message['leave_allocation'];
                        }
                        if (r.message['leave_approver']) {
                            frm.set_value('leave_approver', r.message['leave_approver']);
                        }
                        lwps = r.message["lwps"];
                    } else {
                        console.error("Error fetching leave details:", r.exc);
                    }
                }
            });

            $("div").remove(".form-dashboard-section.custom");
            frm.dashboard.add_section(
                frappe.render_template('leave_application_dashboard', {
                    data: leave_details
                }),
                __("Allocated Leaves")
            );
            frm.dashboard.show();
            let allowed_leave_types = Object.keys(leave_details);

            // lwps should be allowed, lwps don't have any allocation
            allowed_leave_types = allowed_leave_types.concat(lwps);

            frm.set_query('leave_type', function() {
                return {
                    filters: [
                        ['leave_type_name', 'in', allowed_leave_types]
                    ]
                };
            });
        }
    },

    refresh: function(frm) {
        if (frm.is_new()) {
            frm.trigger("calculate_total_days");
        }
        cur_frm.set_intro("");
        if (frm.doc.__islocal && !in_list(frappe.user_roles, "Employee")) {
            frm.set_intro(__("Fill the form and save it"));
        }

        if (!frm.doc.employee && frappe.defaults.get_user_permissions()) {
            const perm = frappe.defaults.get_user_permissions();
            if (perm && perm['Employee']) {
                frm.set_value('employee', perm['Employee'].map(perm_doc => perm_doc.doc)[0]);
            }
        }
    },

    employee: function(frm) {
        frm.trigger("make_dashboard");
        frm.trigger("get_leave_balance");
        frm.trigger("set_leave_approver");
    },

    leave_approver: function(frm) {
        if (frm.doc.leave_approver) {
            frm.set_value("leave_approver_name", frappe.user.full_name(frm.doc.leave_approver));
        }
    },

    leave_type: function(frm) {
        frm.trigger("get_leave_balance");
    },

    half_day: function(frm) {
        if (frm.doc.half_day) {
            if (frm.doc.from_date == frm.doc.to_date) {
                frm.set_value("half_day_date", frm.doc.from_date);
            } else {
                frm.trigger("half_day_datepicker");
            }
        } else {
            frm.set_value("half_day_date", "");
        }
        frm.trigger("calculate_total_days");
    },

    from_date: function(frm) {
        frm.trigger("make_dashboard");
        frm.trigger("half_day_datepicker");
        frm.trigger("calculate_total_days");
    },

    to_date: function(frm) {
        frm.trigger("make_dashboard");
        frm.trigger("half_day_datepicker");
        frm.trigger("calculate_total_days");
    },

    half_day_date: function(frm) {
        frm.trigger("calculate_total_days");
    },

    half_day_datepicker: function(frm) {
        frm.set_value('half_day_date', '');
        var half_day_datepicker = frm.fields_dict.half_day_date.datepicker;
        half_day_datepicker.update({
            minDate: frappe.datetime.str_to_obj(frm.doc.from_date),
            maxDate: frappe.datetime.str_to_obj(frm.doc.to_date)
        });
    },

    get_leave_balance: function(frm) {
        if (frm.doc.docstatus === 0 && frm.doc.employee && frm.doc.leave_type && frm.doc.from_date && frm.doc.to_date) {
            return frappe.call({
                method: "hrms.hr.doctype.leave_application.leave_application.get_leave_balance_on",
                args: {
                    employee: frm.doc.employee,
                    date: frm.doc.from_date,
                    to_date: frm.doc.to_date,
                    leave_type: frm.doc.leave_type,
                    consider_all_leaves_in_the_allocation_period: 1
                },
                callback: function(r) {
                    if (!r.exc) {
                        frm.set_value('leave_balance', r.message);
                    } else {
                        frm.set_value('leave_balance', "0");
                        console.error("Error fetching leave balance:", r.exc);
                    }
                }
            });
        }
    },

    calculate_total_days: function(frm) {
        if (frm.doc.from_date && frm.doc.to_date && frm.doc.employee && frm.doc.leave_type) {
            var from_date = Date.parse(frm.doc.from_date);
            var to_date = Date.parse(frm.doc.to_date);

            if (to_date < from_date) {
                frappe.msgprint(__("To Date cannot be less than From Date"));
                frm.set_value('to_date', '');
                return;
            }

            return frappe.call({
                method: 'hrms.hr.doctype.leave_application.leave_application.get_number_of_leave_days',
                args: {
                    "employee": frm.doc.employee,
                    "leave_type": frm.doc.leave_type,
                    "from_date": frm.doc.from_date,
                    "to_date": frm.doc.to_date,
                    "half_day": frm.doc.half_day,
                    "half_day_date": frm.doc.half_day_date,
                },
                callback: function(r) {
                    if (r && r.message) {
                        frm.set_value('total_leave_days', r.message);
                        frm.trigger("get_leave_balance");
                    } else {
                        console.error("Error calculating total leave days:", r.exc);
                    }
                }
            });
        }
    },

    set_leave_approver: function(frm) {
        if (frm.doc.employee) {
            return frappe.call({
                method: 'hrms.hr.doctype.leave_application.leave_application.get_leave_approver',
                args: {
                    "employee": frm.doc.employee,
                },
                callback: function(r) {
                    if (r && r.message) {
                        frm.set_value('leave_approver', r.message);
                    } else {
                        console.error("Error fetching leave approver:", r.exc);
                    }
                }
            });
        }
    }
});

frappe.tour["Leave Application"] = [
    {
        fieldname: "employee",
        title: "Employee",
        description: __("Select the Employee.")
    },
    {
        fieldname: "leave_type",
        title: "Leave Type",
        description: __("Select type of leave the employee wants to apply for, like Sick Leave, Privilege Leave, Casual Leave, etc.")
    },
    {
        fieldname: "from_date",
        title: "From Date",
        description: __("Select the start date for your Leave Application.")
    },
    {
        fieldname: "to_date",
        title: "To Date",
        description: __("Select the end date for your Leave Application.")
    },
    {
        fieldname: "half_day",
        title: "Half Day",
        description: __("To apply for a Half Day check 'Half Day' and select the Half Day Date")
    },
    {
        fieldname: "half_day_date",
        title: "Half Day Date",
        description: __("Select the Half Day Date if the Half Day checkbox is checked.")
    },
    {
        fieldname: "leave_approver",
        title: "Leave Approver",
        description: __("Select your Leave Approver i.e. the person who approves or rejects your leaves.")
    }
];
