# Copyright (c) 2024, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class HearingScheduleandCourtProceedings(Document):
	pass

import frappe
from frappe.utils import format_date, get_url, nowdate

def after_save(doc, method):
    html = f"""
    <div style="font-family: 'Arial'; padding: 15px;">
        <h4 style="color: #4285F4; border-bottom: 1px solid #eee; padding-bottom: 8px;">
            <i class="fa fa-calendar"></i> Case Hearing Timeline
        </h4>
    """

    upcoming_date = None

    for hearing in doc.court_hearing_dates:
        case_url = get_url(f"/app/hearing-schedule-and-court-proceedings/{doc.name}")

        # Capture the closest next_hearing_date
        if hearing.next_hearing_date and hearing.next_hearing_date > nowdate():
            if not upcoming_date or hearing.next_hearing_date < upcoming_date:
                upcoming_date = hearing.next_hearing_date

        html += f"""
        <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
            <a href="{case_url}" 
               style="text-decoration: none; color: #202124; display: block;">
                <div style="font-weight: 600;">
                    <i class="fa fa-gavel"></i> {format_date(hearing.court_hearing_date)}
                </div>
                {f'<div style="color: #5f6368; margin-left: 20px;">Next: {format_date(hearing.next_hearing_date)}</div>' 
                 if hearing.next_hearing_date else ""}
                <div style="font-size: 12px; color: #5f6368; margin-top: 5px;">
                    Case: {doc.case_title} | Court: {doc.court_name}
                </div>
            </a>
        </div>
        """

    html += "</div>"

    # Upsert Legal Calendar with hearing timeline + next hearing date
    calendar_doc = frappe.db.get_value("Legal Calendar", {"case_reference": doc.name}, "name")
    if calendar_doc:
        frappe.db.set_value("Legal Calendar", calendar_doc, {
            "hearing_timeline_html": html,
            "next_hearing_date": upcoming_date
        })
    else:
        frappe.get_doc({
            "doctype": "Legal Calendar",
            "case_reference": doc.name,
            "hearing_timeline_html": html,
            "next_hearing_date": upcoming_date
        }).insert()

