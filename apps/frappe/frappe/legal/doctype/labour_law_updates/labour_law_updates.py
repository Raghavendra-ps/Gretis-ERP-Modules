# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class LabourLawUpdates(Document):
	pass

import requests
from bs4 import BeautifulSoup
import frappe

# Function to scrape labour law updates
def scrape_labour_laws():
    url = "https://labourlawreporter.com/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    # Fetch website content
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        frappe.log_error(f"Failed to fetch data from {url}", "Labour Law Scraper")
        return

    # Parse HTML
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Find law update sections (Adjust selector based on actual website structure)
    updates = soup.find_all("div", class_="law-update-card")  # Change class name based on site

    for update in updates:
        law_title = update.find("h2").text.strip()
        effective_date = update.find("span", class_="date").text.strip()
        description = update.find("p").text.strip()
        source_url = update.find("a")["href"]

        # Check if this law update already exists
        existing = frappe.get_all("Labour Law Updates", filters={"source_url": source_url})
        if existing:
            continue  # Skip if already stored

        # Create new entry in ERPNext
        new_law = frappe.get_doc({
            "doctype": "Labour Law Updates",
            "law_title": law_title,
            "effective_date": effective_date,
            "description": description,
            "source_url": source_url,
            "status": "New"
        })
        new_law.insert()
        frappe.db.commit()

        print(f"Added: {law_title}")

# Call function
scrape_labour_laws()

def notify_hr():
    new_laws = frappe.get_all("Labour Law Updates", filters={"status": "New"}, fields=["law_title", "source_url"])
    if not new_laws:
        return

    message = "<h3>New Labour Law Updates</h3><ul>"
    for law in new_laws:
        message += f"<li><a href='{law['source_url']}'>{law['law_title']}</a></li>"
    message += "</ul>"

    frappe.sendmail(
        recipients=["dir@gretisindia.com"],  # Change this to the HR email
        subject="New Labour Law Updates",
        message=message
    )

# Call notification function after scraping
scrape_labour_laws()
notify_hr()

