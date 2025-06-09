import frappe
import pandas as pd
import os
from frappe.model.document import Document

class ESICPayments(Document):
    pass

@frappe.whitelist()
def get_challan_preview(docname):
    """Automatically fetches and previews the first 10 rows of the uploaded Excel file."""
    doc = frappe.get_doc("ESIC Payments", docname)

    if not doc.challan_file:
        return "<p style='color:red;'>No file uploaded.</p>"

    file_path = doc.challan_file  

    # Handle ERPNext file paths
    if file_path.startswith("/files/"):
        file_path = "public" + file_path  
    elif file_path.startswith("/private/files/"):
        file_path = "private" + file_path  

    file_full_path = frappe.get_site_path(file_path)

    if not os.path.exists(file_full_path):
        return "<p style='color:red;'>File not found.</p>"

    file_extension = os.path.splitext(file_full_path)[-1].lower()
    try:
        if file_extension == ".csv":
            df = pd.read_csv(file_full_path, dtype=str)
        elif file_extension in [".xls", ".xlsx"]:
            df = pd.read_excel(file_full_path, sheet_name=0, dtype=str)  # Read only Sheet 1
        else:
            return "<p style='color:red;'>Invalid file format. Please upload CSV or Excel.</p>"
    except Exception as e:
        return f"<p style='color:red;'>Error reading file: {str(e)}</p>"

    # Rename columns to standard format
    df.columns = [col.strip().replace("\n", " ").replace("\r", " ") for col in df.columns]
    column_mapping = {
        "IP Number (10 Digits)": "IP Number",
        "IP Name ( Only alphabets and space )": "IP Name",
        "No of Days for which wages paid/payable during the month": "No. of Days Wages Paid",
        "Total Monthly Wages": "Total Monthly Wages",
        "Reason Code for Zero workings days(numeric only; provide 0 for all other reasons- Click on the link for reference)": "Reason Code",
        "Last Working Day ( Format DD/MM/YYYY  or DD-MM-YYYY)": "Last Working Day"
    }
    df.rename(columns=column_mapping, inplace=True)

    # Remove Unnamed columns
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]

    # Replace NaN values with empty strings and show first 10 rows
    preview_html = df.head(10).fillna("").to_html(index=False)

    return preview_html
