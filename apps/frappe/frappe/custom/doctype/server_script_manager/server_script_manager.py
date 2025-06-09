# Copyright (c) 2025, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class ServerScriptManager(Document):
	pass

import frappe
import requests
import json

@frappe.whitelist(allow_guest=True)  # Allows public access if needed
def get_microsoft_graph_data():
    """
    Fetches data from Microsoft Graph API using hardcoded credentials.
    Returns:
        dict: Data fetched from Microsoft Graph API or an error message.
    """
    try:
        # Hardcoded credentials (access tokens and other data)
        access_token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkxWYXNyUDY5Rk1BWHFrUmhkZ1BHbHhfamxxNi1lRHI0VndGOGhzODgxanMiLCJhbGciOiJSUzI1NiIsIng1dCI6IllUY2VPNUlKeXlxUjZqekRTNWlBYnBlNDJKdyIsImtpZCI6IllUY2VPNUlKeXlxUjZqekRTNWlBYnBlNDJKdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9lNDY3ZmNmMy1iNzc4LTQ4MzgtYWE3Ny0yMWE0YjQ2NWJhZjAvIiwiaWF0IjoxNzM3MTk0NDg0LCJuYmYiOjE3MzcxOTQ0ODQsImV4cCI6MTczNzE5ODM4NCwiYWlvIjoiazJSZ1lEaXJWeGhSSjJNODg5NjNSMDkxbU85UEJnQT0iLCJhcHBfZGlzcGxheW5hbWUiOiJFUlBOZXh0IFdvcmQgYW5kIEV4Y2VsIEludGVncmF0aW9uIiwiYXBwaWQiOiJiNjAyNzQzMy1mOTRkLTQ4NjctYmI5My01ZWVkMWU0M2YyNjIiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9lNDY3ZmNmMy1iNzc4LTQ4MzgtYWE3Ny0yMWE0YjQ2NWJhZjAvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiJjMmIyNGQ2NC1hZTYzLTRhMDctYmZiZi0zMmViY2Q2NTU1YmUiLCJyaCI6IjEuQVZZQThfeG41SGkzT0VpcWR5R2t0R1c2OEFNQUFBQUFBQUFBd0FBQUFBQUFBQUNmQUFCV0FBLiIsInN1YiI6ImMyYjI0ZDY0LWFlNjMtNGEwNy1iZmJmLTMyZWJjZDY1NTViZSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6ImU0NjdmY2YzLWI3NzgtNDgzOC1hYTc3LTIxYTRiNDY1YmFmMCIsInV0aSI6ImFuTWI1NXNJMTBTRVRkX2VXZUFIQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjA5OTdhMWQwLTBkMWQtNGFjYi1iNDA4LWQ1Y2E3MzEyMWU5MCJdLCJ4bXNfaWRyZWwiOiI3IDIyIiwieG1zX3RjZHQiOjE2ODkzMzExMTJ9.Yg2nurvPzF-8g9ZbutFlnRgbdiQwunRueDJaOkVMcVgmDEk03b20QAYfh95HTVzG0kQJyd9pFfEg8OnH-m0-2i6UKeQKe0qLva0e6ktRD8CRvhtbZy7JLmwUc9v1_cejhQMQjygOHttD39hrQHNgQ2fdU7B1w0L1tgaGPNNMSHD2m5lO5q7QfHC-Sj0gK0DInjmYSb8ohc7I8cItt2EsjdfMW8kGjNaGM0AInrDAa23CgPYdms3x3BHL_i-13BSdJt3-vmdMR10IlWJaFYX238tBDWtqVNLRyGuKji9_Jvf4FHr9flK_DihByuLJM2qMVfCkY0HWr9Wf9IkOk_GwKA"  # Insert your access token
        client_id = "b6027433-f94d-4867-bb93-5eed1e43f262"        # Insert your client ID
        client_secret = "dIH8Q~bfHAElJA5qwROtTZhDrRqMIwH3pQzPQa7J" # Insert your client secret
        tenant_id = "e467fcf3-b778-4838-aa77-21a4b465baf0"        # Insert your tenant ID
        
        if not access_token:
            return {"error": "Access token is missing. Please provide a valid access token."}

        # Microsoft Graph API URL (e.g., to fetch user profile)
        url = "https://graph.microsoft.com/v1.0/me"  # Replace with the appropriate API endpoint

        # Set the Authorization header with the access token
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        # Make the API request
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            # Parse the response and return the data
            data = response.json()  # This will contain user profile data
            return data  # You can customize this to return specific parts of the data
        else:
            return {"error": f"Error {response.status_code}: {response.text}"}

    except Exception as e:
        # Log the error for debugging purposes
        frappe.log_error(frappe.get_traceback(), "Error in Microsoft Graph API Integration")
        return {"error": f"An unexpected error occurred: {str(e)}"}

