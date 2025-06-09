# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class LabourLawUpdates(Document):
	pass

import frappe
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def scrape_labour_laws():
    base_url = "https://labourlawreporter.com/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    print("Fetching data from:", base_url)
    response = requests.get(base_url, headers=headers)
    
    if response.status_code != 200:
        frappe.log_error(f"Failed to fetch data from {base_url}", "Labour Law Scraper")
        print(f"Failed to fetch data, Status Code: {response.status_code}")
        return

    print("Successfully fetched data!")
    soup = BeautifulSoup(response.text, "html.parser")
    
    links = soup.find_all("a")
    print(f"Found {len(links)} links on the main page.")

    for link in links:
        href = link.get("href")
        if href:
            full_url = urljoin(base_url, href)

            # ❌ Ignore login, subscription, and product pages
            if any(skip in full_url.lower() for skip in ["login", "subscribe", "product", "cart", "about", "contact"]):
                print(f"Skipping non-update link: {full_url}")
                continue

            # ✅ Process only relevant pages (Modify these keywords as needed)
            if not any(keyword in full_url.lower() for keyword in ["minimum-wages", "labour-law", "compliance", "regulations", "act"]):
                print(f"Skipping non-labour law update: {full_url}")
                continue

            print(f"Processing link: {full_url}")
            process_update_page(full_url)

def process_update_page(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers, verify=False)  # Ignore SSL verification
    except requests.exceptions.SSLError:
        print(f"⚠️ Skipping SSL error page: {url}")
        return
    except requests.exceptions.RequestException as e:
        print(f"⚠️ Skipping due to request error: {url}, Error: {e}")
        return

    if response.status_code != 200:
        frappe.log_error(f"Failed to fetch data from {url}", "Labour Law Scraper")
        print(f"Failed to fetch data from {url}, Status Code: {response.status_code}")
        return

    soup = BeautifulSoup(response.text, "html.parser")

    # ✅ Try multiple selectors for the law title
    law_title = None
    for selector in ["h1", "h2", ".title", ".post-title"]:
        title_element = soup.select_one(selector)
        if title_element:
            law_title = title_element.text.strip()
            break

    if not law_title:
        print(f"❌ Skipping page {url} (No valid title found)")
        return

    # ✅ Try multiple selectors for the date
    effective_date = None
    effective_date_element = soup.select_one(".date, .post-date, time")
    if effective_date_element:
        date_text = effective_date_element.text.strip()
        try:
            effective_date = frappe.utils.getdate(date_text)  # Convert to correct date format
        except:
            print(f"⚠️ Invalid date format found: {date_text}, skipping date field")
            effective_date = None  # Set to None if invalid

    # ✅ Try multiple selectors for description
    description_element = soup.select_one("p, .summary, .content")
    description = description_element.text.strip() if description_element else "No description available."

    source_url = url

    print(f"Processing: {law_title}")

    existing = frappe.get_all("Labour Law Updates", filters={"source_url": source_url})
    if existing:
        print(f"Skipping already existing law: {law_title}")
        return

    new_law = frappe.get_doc({
        "doctype": "Labour Law Updates",
        "law_title": law_title,
        "effective_date": effective_date,  # Handles missing or incorrect dates
        "description": description,
        "source_url": source_url,
        "status": "New"
    })
    new_law.insert()
    frappe.db.commit()

    print(f"✅ Added: {law_title}")
