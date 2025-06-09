import frappe

@frappe.whitelist()
def get_employee_query(doctype, txt, searchfield, start, page_len, filters):
    """
    Custom query logic to fetch employees based on search text.
    """

    # Initialize the base query with conditions for both name and employee_name
    query = """
        SELECT
            name, employee_name
        FROM
            `tabEmployee`
        WHERE
            (name LIKE %(txt)s OR employee_name LIKE %(txt)s)
    """

    # Add dynamic conditions based on filters
    conditions = []
    values = {'txt': f"%{txt}%", 'start': start, 'page_len': page_len}

    if filters:
        for key, value in filters.items():
            conditions.append(f"{key} = %({key})s")
            values[key] = value

    # Join conditions to the query if there are any
    if conditions:
        query += " AND " + " AND ".join(conditions)

    # Add pagination
    query += " LIMIT %(start)s, %(page_len)s"

    # Execute the query
    employees = frappe.db.sql(query, values, as_list=True)

    return employees
