import requests
import json
from frappe.model.document import Document

def get_libesign_token():
    settings = frappe.get_doc("LibreSign Settings")
    url = f"{settings.api_url}/oauth/token"
    payload = {
        'client_id': settings.client_id,
        'client_secret': settings.client_secret,
        'grant_type': 'client_credentials'
    }
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    response_data = response.json()
    if response.status_code == 200:
        return response_data['access_token']
    else:
        raise Exception(f"Error fetching token: {response_data}")

def request_sign_code(uuid):
    token = get_libesign_token()
    settings = frappe.get_doc("LibreSign Settings")
    url = f"{settings.api_url}/sign/uuid/{uuid}/token"
    headers = {
        'Authorization': f"Bearer {token}",
        'Content-Type': 'application/json'
    }
    response = requests.post(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error requesting sign code: {response.json()}")
