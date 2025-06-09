import frappe
from frappe.model.document import Document
import requests
import urllib.parse
import json

class TenderCompetitors(Document):
    pass

@frappe.whitelist()
def get_active_competitor_alerts(competitor_name):
    return frappe.get_all(
        "Tender Competitor Alert Log",
        filters={
            "tender_competitors": competitor_name,
            "status": "Active"
        },
        fields=["alert_type", "description", "alert_level"]
    )

@frappe.whitelist()
def fetch_google_alerts(competitor_name, address=None):
    api_key = "AIzaSyCRpx0GB2GJExltAlG3sYsTiBiBWLHqyks"
    cx = "66240fccd78164dbc"

    keywords = ["fraud", "legal", "blacklist", "PF", "ESI", "default", "court", "scam"]

    # Build primary search query
    query_parts = [competitor_name]
    if address:
        partial_address = " ".join(address.split()[:3])  # use only first 3 words
        query_parts.append(partial_address)

    query = f"{' '.join(query_parts)} {' OR '.join(keywords)}"
    encoded_query = urllib.parse.quote(query)
    url = f"https://www.googleapis.com/customsearch/v1?q={encoded_query}&key={api_key}&cx={cx}"

    frappe.logger().info(f"[Google Alerts] Search Query: {query}")
    frappe.logger().info(f"[Google Alerts] Full URL: {url}")

    try:
        res = requests.get(url)
        if res.status_code != 200:
            frappe.log_error(f"Google API Error: {res.text}", "Google Search Failure")
            return []

        results = res.json().get("items", [])

        # Fallback if nothing found
        if not results:
            fallback_query = urllib.parse.quote(competitor_name)
            fallback_url = f"https://www.googleapis.com/customsearch/v1?q={fallback_query}&key={api_key}&cx={cx}"
            fallback_res = requests.get(fallback_url)
            results = fallback_res.json().get("items", [])
            frappe.logger().info(f"[Google Alerts] Fallback Query Results: {json.dumps(results, indent=2)}")

        filtered_alerts = []
        for i, item in enumerate(results):
            title = item.get("title", "")
            snippet = item.get("snippet", "")
            content = f"{title} {snippet}".lower()

            # Debug log
            frappe.logger().info(f"[Result {i+1}] Title: {title} | Snippet: {snippet}")

            if any(keyword.lower() in content for keyword in keywords):
                filtered_alerts.append({
                    "title": title,
                    "snippet": snippet,
                    "link": item.get("link")
                })

        if not filtered_alerts:
            frappe.logger().info(f"[Google Alerts] No relevant alerts found for: {competitor_name}")

        return filtered_alerts

    except Exception as e:
        frappe.log_error(f"Exception while fetching Google alerts: {e}", "Google Alerts Error")
        return []

@frappe.whitelist()
def update_alert_html(docname):
    doc = frappe.get_doc("Tender Competitors", docname)

    # Internal alerts
    internal_alerts = get_active_competitor_alerts(docname)
    internal_html = "<h4>🔒 Internal Alerts</h4>"
    if internal_alerts:
        internal_html += "<ul style='padding-left:16px;'>"
        for alert in internal_alerts:
            # Set emoji/color per alert level
            icon = "⚠️" if alert.alert_level == "High" else "🔅" if alert.alert_level == "Medium" else "ℹ️"
            color = "red" if alert.alert_level == "High" else "orange" if alert.alert_level == "Medium" else "blue"
            internal_html += (
                f"<li><span style='color:{color}; font-weight:bold;'>{icon} {alert.alert_type}</span> - "
                f"<span style='color:{color};'>{alert.alert_level}</span><br>"
                f"<small>{alert.description}</small></li><br>"
            )
        internal_html += "</ul>"
    else:
        internal_html += "<p>✅ No internal alerts.</p>"

    # External alerts
    external_alerts = fetch_google_alerts(doc.competitor_name, doc.address)
    keywords = ["fraud", "legal", "blacklist", "PF", "ESI", "default", "court", "scam"]

    external_html = "<h4>🌐 External Alerts</h4>"
    if external_alerts:
        external_html += "<ul style='padding-left:16px;'>"
        for item in external_alerts[:5]:
            title = item.get("title")
            link = item.get("link")
            snippet = item.get("snippet")

            # Keyword highlighting
            for kw in keywords:
                snippet = snippet.replace(
                    kw, f"<span style='background:yellow; font-weight:bold;'>{kw}</span>"
                ).replace(
                    kw.lower(), f"<span style='background:yellow; font-weight:bold;'>{kw.lower()}</span>"
                )

            external_html += (
                f"<li><b><a href='{link}' target='_blank'>{title}</a></b><br>"
                f"<small>{snippet}</small></li><br>"
            )
        external_html += "</ul>"
    else:
        external_html += "<p>✅ No external alerts found.</p>"

    # Final render
    doc.alert_html = internal_html + "<hr>" + external_html
    doc.save(ignore_permissions=True)
    return "Alerts updated"
