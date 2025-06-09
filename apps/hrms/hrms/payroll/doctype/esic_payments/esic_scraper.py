import frappe
import scrapy
from scrapy.http import FormRequest

class ESICSpider(scrapy.Spider):
    name = "esic_spider"
    start_urls = ["https://portal.esic.gov.in/EmployerPortal/ESICInsurancePortal/Portal_Loginnew.aspx"]

    def parse(self, response):
        # Get ESIC credentials from ERPNext settings
        esic_settings = frappe.get_single("ESIC Settings")
        username = esic_settings.username
        password = esic_settings.get_password("password")

        if not username or not password:
            frappe.throw("ESIC Username or Password is missing!")

        # CAPTCHA Handling (Scrapy cannot solve CAPTCHA)
        if "captcha" in response.text.lower():
            frappe.throw("❌ CAPTCHA detected. Please log in manually and extract session cookies.")

        # Submit login form
        return FormRequest.from_response(
            response,
            formdata={"txtUserID": username, "txtPassword": password},
            callback=self.after_login
        )

    def after_login(self, response):
        # Verify successful login
        if "MonthlyContributionHome" not in response.url:
            frappe.throw("❌ Login failed! Please check your credentials.")

        # Extract ESIC Payment Data
        esic_data = response.xpath("//table[@id='dataTable']//tr").extract()
        
        # Store scraped data in ERPNext
        for row in esic_data:
            frappe.get_doc({
                "doctype": "ESIC Payments",
                "data": row
            }).insert(ignore_permissions=True)

        frappe.msgprint("✅ ESIC data scraped successfully!")

@frappe.whitelist()
def start_scrapy():
    """ Function to trigger the Scrapy spider from ERPNext. """
    from scrapy.crawler import CrawlerProcess
    process = CrawlerProcess()
    process.crawl(ESICSpider)
    process.start()
