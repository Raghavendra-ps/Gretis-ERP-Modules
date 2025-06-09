import frappe
from frappe import _
import os
import xlsxwriter
from datetime import datetime
from frappe.core.doctype.file.file import create_new_file
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

@frappe.whitelist()
def scrape_and_save_punjab_tenders(keyword):
    output_dir = frappe.utils.get_bench_path()
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"punjab_tenders_{timestamp}.xlsx"
    file_path = os.path.join(output_dir, "sites", "public", "files", filename)

    workbook = xlsxwriter.Workbook(file_path)
    worksheet = workbook.add_worksheet()
    bold = workbook.add_format({'bold': True})
    worksheet.write('A1', 'Tender Title', bold)
    worksheet.write('B1', 'Closing Date', bold)
    worksheet.write('C1', 'Organization Chain', bold)
    worksheet.write('D1', 'Tender ID', bold)
    worksheet.write('E1', 'Tender Ref No', bold)
    worksheet.write('F1', 'URL', bold)

    row = 1

    base_url = "https://eproc.punjab.gov.in/nicgep/app?component=$TablePages.linkPage&page=FrontEndAdvancedSearchResult&service=direct&session=T&sp=AFrontEndAdvancedSearchResult,table,"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        current_page = 1
        while True:
            page_url = base_url + str(current_page)
            page.goto(page_url, timeout=60000)
            page.wait_for_timeout(2000)

            soup = BeautifulSoup(page.content(), 'html.parser')
            table = soup.find("table", {"id": "table"})

            if not table:
                break

            rows = table.find_all("tr")[1:]  # Skip header

            if not rows:
                break

            for r in rows:
                cols = r.find_all("td")
                if len(cols) < 6:
                    continue

                tender_title = cols[0].text.strip()
                closing_date = cols[1].text.strip()
                organization_chain = cols[2].text.strip()
                tender_id = cols[3].text.strip()
                tender_ref_no = cols[4].text.strip()
                tender_url = "https://eproc.punjab.gov.in" + cols[0].find("a")["href"]

                full_text = f"{tender_title} {organization_chain} {tender_ref_no}"
                if keyword.lower() in full_text.lower():
                    worksheet.write(row, 0, tender_title)
                    worksheet.write(row, 1, closing_date)
                    worksheet.write(row, 2, organization_chain)
                    worksheet.write(row, 3, tender_id)
                    worksheet.write(row, 4, tender_ref_no)
                    worksheet.write_url(row, 5, tender_url, string="View Tender")
                    row += 1

            current_page += 1

        workbook.close()
        browser.close()

    with open(file_path, "rb") as f:
        filedata = f.read()

    frappe_file = create_new_file({
        "doctype": "File",
        "file_name": filename,
        "is_private": 0,
        "content": filedata,
    })

    return {
        "file_url": frappe_file.file_url,
        "file_name": frappe_file.file_name
    }
