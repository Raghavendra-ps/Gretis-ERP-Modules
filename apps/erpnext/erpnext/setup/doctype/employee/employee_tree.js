frappe.treeview_settings['Employee'] = {
  get_tree_nodes: "erpnext.setup.doctype.employee.employee.get_children",
  filters: [],
  breadcrumb: "Hr",
  disable_add_node: true,
  get_tree_root: false,
  toolbar: [
    { toggle_btn: true },
    {
      label: __("Edit"),
      condition: function(node) {
        return !node.is_root;
      },
      click: function(node) {
        frappe.set_route("Form", "Employee", node.data.value);
      }
    }
  ],
  menu_items: [
    {
      label: __("New Employee"),
      action: function() {
        frappe.new_doc("Employee", true);
      },
      condition: 'frappe.boot.user.can_create.indexOf("Employee") !== -1'
    }
  ],
};

frappe.db.get_list('Company', {
  fields: ['name', 'company_name'],
  filters: {
    is_group: 0
  }
}).then(r => {
  const companyOptions = r.map(c => ({ value: c.name, label: c.company_name }));
  frappe.treeview_settings['Employee'].filters.push({
    fieldname: "company",
    fieldtype: "Select",
    options: companyOptions,
    label: __("Company"),
  });
});