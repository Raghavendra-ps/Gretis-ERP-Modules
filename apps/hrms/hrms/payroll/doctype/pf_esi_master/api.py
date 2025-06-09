import frappe

@frappe.whitelist()
def get_employees_with_pf_esic(company=None, posting_date=None):
    if not (company and posting_date):
        frappe.throw("Please provide both Company and Posting Date")

    employees = frappe.get_all('Employee',
        filters={'company': company, 'status': 'Active'},
        fields=['name', 'employee_name']
    )

    data = []

    for emp in employees:
        salary = frappe.db.sql("""
            SELECT gross_pay
            FROM `tabSalary Slip`
            WHERE employee = %s
              AND posting_date <= %s
              AND docstatus IN (0, 1)
            ORDER BY posting_date DESC
            LIMIT 1
        """, (emp.name, posting_date), as_dict=True)

        if salary:
            gross = salary[0].gross_pay or 0
            pf_amount = 1800 if gross > 15000 else round(gross * 0.12, 2)
            esi_amount = round(gross * 0.0075, 2) if gross <= 21000 else 0
        else:
            pf_amount = 0
            esi_amount = 0

        data.append({
            'employee': emp.name,
            'employee_name': emp.employee_name,
            'pf_amount': pf_amount,
            'esi_amount': esi_amount
        })

    return data
