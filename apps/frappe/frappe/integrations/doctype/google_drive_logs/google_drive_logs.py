import frappe
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
import io
import datetime
import re
import os

# Google Drive constants
FOLDER_ID = "1aG17zFfM-lN45y1IkFT6EjiaO_lcqKiQ"
LOG_FILE_PATH = "/cloudclusters/erpnext/frappe-bench/logs/log.txt"
SERVICE_ACCOUNT_FILE = "/cloudclusters/erpnext/frappe-bench/env/config.json"
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']


def get_google_drive_service():
    """Creates and returns a Google Drive API service object."""
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print("❌ Missing Google API credentials!")
        exit(1)

    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return build('drive', 'v3', credentials=creds)


def fetch_google_drive_log(debug=False):
    """Fetches the latest biometric log file from Google Drive."""
    try:
        service = get_google_drive_service()
        results = service.files().list(
            q=f"'{FOLDER_ID}' in parents and mimeType='text/plain'",
            pageSize=1,
            orderBy="modifiedTime desc",  # Fetch latest file
            fields="files(id, name, createdTime)"
        ).execute()

        files = results.get("files", [])
        if not files:
            print("⚠️ No log files found in Google Drive.")
            return None

        file_id = files[0]["id"]
        request = service.files().get_media(fileId=file_id)
        file_data = io.BytesIO()
        downloader = MediaIoBaseDownload(file_data, request)

        done = False
        while not done:
            _, done = downloader.next_chunk()

        with open(LOG_FILE_PATH, "wb") as f:
            f.write(file_data.getvalue())

        if debug:
            print(f"✅ Log file downloaded successfully! Path: {LOG_FILE_PATH}")
        return LOG_FILE_PATH

    except Exception as e:
        print(f"❌ Error fetching Google Drive log: {str(e)}")
        frappe.log_error(f"Error fetching Google Drive log: {str(e)}")
        return None


def get_exceptional_days():
    """Fetch exceptional days from the 'Exceptional Days' Doctype in ERPNext."""
    exceptional_dates = frappe.get_all("Exceptional Days", fields=["exception_date"])
    return {d["exception_date"].strftime("%Y-%m-%d") for d in exceptional_dates if d.get("exception_date")}


def process_biometric_log(file_path, debug=False):
    """Parses log.txt and inserts Employee Check-in records into ERPNext with IN/OUT/LATE/SH/FH classification."""
    try:
        with open(file_path, "r") as file:
            log_lines = file.readlines()

        checkin_count = 0
        exceptional_days = get_exceptional_days()

        log_pattern = re.compile(r"^\s*\d+\s+(\d+)\s+\w+\s+\(\s*(\d)\s*\)\s+(\d{4}/\d{2}/\d{2})\s+(\d{2}:\d{2}:\d{2})")

        new_checkins = []
        for line in log_lines:
            if line.strip() and not line.startswith("No."):  # Ignore headers
                try:
                    match = log_pattern.match(line)
                    if not match:
                        continue

                    attendance_device_id, _, date_part, time_part = match.groups()
                    timestamp = f"{date_part} {time_part}"
                    checkin_time = datetime.datetime.strptime(timestamp, "%Y/%m/%d %H:%M:%S")

                    checkin_date = checkin_time.strftime("%Y-%m-%d")
                    checkin_hour = checkin_time.hour
                    checkin_minute = checkin_time.minute
                    log_type = None

                    is_exceptional_day = checkin_date in exceptional_days

                    # ✅ Classify Entry Type Based on Time
                    if checkin_hour > 17 or (checkin_hour == 17 and checkin_minute >= 30):
                        log_type = "OUT"
                    elif checkin_hour < 9 or (checkin_hour == 9 and checkin_minute < 40):
                        log_type = "IN"
                    elif (checkin_hour == 9 and checkin_minute >= 41) or (9 < checkin_hour < 13) or (checkin_hour == 13 and checkin_minute < 30):
                        log_type = "LATE"
                    elif (checkin_hour == 13 and checkin_minute >= 30) or (checkin_hour == 14 and checkin_minute == 0):
                        log_type = "SH"
                    elif (checkin_hour == 14 and 1 <= checkin_minute <= 31):
                        log_type = "FH"

                    # ✅ Override "LATE" for Exceptional Days
                    if is_exceptional_day and log_type == "LATE":
                        log_type = "IN"

                    employee = frappe.db.get_value(
                        "Employee",
                        {"attendance_device_id": attendance_device_id},
                        ["name", "employee_name"]
                    )

                    if not employee:
                        print(f"⚠️ No matching Employee for Device ID: {attendance_device_id}")
                        continue

                    employee_id, employee_full_name = employee

                    # ✅ Prevent duplicate check-ins
                    if frappe.db.exists("Employee Checkin", {"employee": employee_id, "time": checkin_time}):
                        print(f"⚠️ Duplicate check-in ignored for {employee_full_name} at {checkin_time}")
                        continue

                    if debug:
                        print(f"🔍 Employee: {employee_full_name} ({employee_id}), Check-in Time: {checkin_time}, Type: {log_type}")

                    # Store check-ins in a list first
                    new_checkins.append({
                        "doctype": "Employee Checkin",
                        "employee": employee_id,
                        "employee_name": employee_full_name,
                        "time": checkin_time,
                        "log_type": log_type
                    })

                except Exception as e:
                    print(f"⚠️ Error processing line: {line} | {str(e)}")
                    frappe.log_error(f"Error processing line: {line} | {str(e)}")

        # ✅ Bulk insert all check-ins at once
        for checkin in new_checkins:
            doc = frappe.get_doc(checkin)
            doc.insert()

        frappe.db.commit()
        print(f"✅ {len(new_checkins)} Employee Check-ins added successfully!")

    except Exception as e:
        print(f"❌ Error processing log file: {str(e)}")
        frappe.log_error(f"Error processing log file: {str(e)}")


if __name__ == "__main__":
    log_file = fetch_google_drive_log(debug=True)
    if log_file:
        process_biometric_log(log_file, debug=True)
