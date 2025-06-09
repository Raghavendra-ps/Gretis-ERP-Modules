# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class NounProjectIcon(Document):
	pass

import frappe
import requests

@frappe.whitelist()
def fetch_and_store_icon(icon_name):
    # Noun Project API details
    NOUN_PROJECT_API_URL = "https://api.thenounproject.com/icons/{icon_name}"
    API_KEY = "f9d821d2e9b94b0bbd628f17870293a2"  # Replace with your actual API key

    headers = {
        'Authorization': 'Bearer ' + API_KEY
    }
    
    # Make the API request
    response = requests.get(NOUN_PROJECT_API_URL.format(icon_name=icon_name), headers=headers)

    if response.status_code == 200:
        data = response.json()
        
        # Extract the icon URL and other details
        icon_url = data['icon']['url']
        icon_svg = data['icon']['svg_url']  # If you want to store SVG directly
        
        # Check if the icon already exists in the Doctype
        existing_icon = frappe.get_all('Noun Project Icon', filters={'icon_name': icon_name}, limit=1)
        
        if existing_icon:
            # Update the existing icon record
            icon_doc = frappe.get_doc('Noun Project Icon', existing_icon[0].name)
            icon_doc.icon_url = icon_url
            icon_doc.icon_svg = icon_svg
            icon_doc.status = 'Available'
            icon_doc.save()
        else:
            # Create a new icon record
            icon_doc = frappe.get_doc({
                'doctype': 'Noun Project Icon',
                'icon_name': icon_name,
                'icon_url': icon_url,
                'icon_svg': icon_svg,
                'status': 'Available'
            })
            icon_doc.insert()

        return "Icon fetched and stored successfully."
    else:
        return f"Error fetching icon: {response.status_code}"
