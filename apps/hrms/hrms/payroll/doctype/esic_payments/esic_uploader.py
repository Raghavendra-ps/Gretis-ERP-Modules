import frappe
import os
import time
import psutil
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@frappe.whitelist()
def upload_esic_challan():
    driver = None

    try:
        # Kill any existing Chrome instances to avoid conflicts
        kill_existing_chrome_sessions()

        # Get ESIC credentials from ERPNext
        esic_settings = frappe.get_single("ESIC Settings")
        username = esic_settings.username
        password = esic_settings.get_password("password")

        if not username or not password:
            frappe.throw("ESIC Username or Password is missing!")

        # Set up WebDriver options
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--headless=new")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1280,800")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--incognito")

        # Initialize WebDriver
        driver = webdriver.Chrome(options=chrome_options)

        # Open ESIC Login Page
        driver.get("https://portal.esic.gov.in/EmployerPortal/ESICInsurancePortal/Portal_Loginnew.aspx")

        # Wait for the username field to load
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.ID, "txtUserID")))

        # Log in
        driver.find_element(By.ID, "txtUserID").send_keys(username)
        driver.find_element(By.ID, "txtPassword").send_keys(password)

        # **Pause for manual CAPTCHA entry**
        print("🔹 Please enter the CAPTCHA manually in the browser.")
        while "MonthlyContributionHome" not in driver.current_url:
            print("Waiting for manual CAPTCHA entry...")
            time.sleep(3)

        driver.find_element(By.ID, "btnLogin").click()

        # Ensure successful login
        WebDriverWait(driver, 20).until(EC.url_contains("MonthlyContributionHome"))

        # Navigate to the upload page
        driver.get("https://portal.esic.gov.in/EmployerPortal/ESICInsurancePortal/ChallanUpload.aspx")

        # Locate file upload input and upload the file
        file_input = driver.find_element(By.ID, "fileUpload")
        file_path = "/path/to/your/challan.xls"  # Update this to the correct file path
        file_input.send_keys(file_path)

        # Click upload button
        driver.find_element(By.ID, "btnUpload").click()

        # Wait for success message
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, "successMessage")))

        frappe.msgprint("✅ ESIC Challan uploaded successfully!")

    except Exception as e:
        frappe.log_error(f"ESIC Challan Upload Failed: {str(e)}", "ESIC Upload Error")
        frappe.throw(f"❌ Error: {str(e)}")

    finally:
        if driver:
            driver.quit()

def kill_existing_chrome_sessions():
    """Kill any existing Chrome & WebDriver processes to avoid conflicts."""
    for process in psutil.process_iter(['pid', 'name']):
        if any(name in process.info['name'].lower() for name in ["chrome", "chromedriver"]):
            try:
                os.kill(process.info['pid'], 9)
            except Exception as e:
                frappe.logger().error(f"⚠️ Failed to kill process {process.info['pid']}: {e}")
