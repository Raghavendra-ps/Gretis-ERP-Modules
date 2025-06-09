# Copyright (c) 2024, Frappe Technologies and contributors
# For license information, please see license.txt

from frappe.model.document import Document
import frappe
from frappe.utils import format_date, getdate, nowdate
from datetime import datetime, timedelta
from calendar import monthrange, month_name

class LegalCalendar(Document):
    pass

@frappe.whitelist()
def get_calendar_view():
    try:
        hearings = frappe.db.sql("""
            SELECT 
                h.name as case_id,
                h.case_title,
                h.court_name,
                d.court_hearing_date,
                d.next_hearing_date
            FROM 
                `tabHearing Schedule and Court Proceedings` h,
                `tabCourt Hearing Dates` d
            WHERE 
                d.parent = h.name
                AND h.case_title IS NOT NULL
                AND d.court_hearing_date IS NOT NULL
                AND d.next_hearing_date IS NOT NULL
            ORDER BY d.court_hearing_date
        """, as_dict=1)

        if not hearings:
            return "<div class='text-muted'>No hearing schedules found</div>"

        today = getdate(nowdate())
        calendar_data = {}

        color_thresholds = [
            (0, 7, "#FFCDD2"),
            (8, 30, "#FFE0B2"),
            (31, 90, "#E1F5FE"),
            (91, 180, "#E8F5E9"),
            (181, 365, "#F3E5F5"),
            (366, None, "#ECEFF1")
        ]

        for month_offset in range(12):
            current_date = today + timedelta(days=30 * month_offset)
            year = current_date.year
            month = current_date.month
            month_key = f"{year}-{month:02d}"

            _, num_days = monthrange(year, month)
            month_days = {day: [] for day in range(1, num_days + 1)}

            for hearing in hearings:
                for label, date_field in [("Hearing", "court_hearing_date"), ("Next", "next_hearing_date")]:
                    raw_date = hearing.get(date_field)
                    if not raw_date:
                        continue

                    try:
                        hearing_date = getdate(raw_date)
                    except Exception:
                        continue

                    if hearing_date.year == year and hearing_date.month == month:
                        day = hearing_date.day
                        days_diff = (hearing_date - today).days

                        bg_color = "#FFFFFF"
                        for min_days, max_days, color in color_thresholds:
                            if (max_days is None and days_diff >= min_days) or \
                                    (min_days <= days_diff <= max_days):
                                bg_color = color
                                break

                        try:
                            display_title = (
                                frappe.get_value("Case Documentation", hearing.case_title, "case_title")
                                or frappe.get_value("Case Documentation", hearing.case_title, "title")
                                or frappe.get_value("Case Documentation", hearing.case_title, "case_name")
                                or hearing.case_title
                            )
                        except Exception:
                            display_title = hearing.case_title

                        next_text = ""
                        if label == "Hearing" and hearing.get("next_hearing_date"):
                            try:
                                next_date = getdate(hearing.get("next_hearing_date"))
                                next_text = f"<br><small style='color:#666;'>Next: {format_date(next_date)}</small>"
                            except Exception as err:
                                frappe.log_error(title="Calendar View: Next Hearing Date Error", message=str(err))

                        month_days[day].append({
                            "case": f"{display_title} ({label})",
                            "court": hearing.court_name,
                            "url": f"/app/hearing-schedule-and-court-proceedings/{hearing.case_id}",
                            "bg_color": bg_color,
                            "days_until": days_diff,
                            "next_text": next_text
                        })

            calendar_data[month_key] = {
                "month_name": month_name[month],
                "year": year,
                "days": month_days,
                "start_weekday": datetime(year, month, 1).weekday()
            }

        html = ["""
        <div class="legal-calendar-view" style="font-family: Arial;">
            <h4 style="color: #4285F4; margin-bottom: 15px;">
                <i class="fa fa-calendar"></i> 12-Month Hearing Calendar
            </h4>
            <div style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; align-items: center;"><div style="width: 15px; height: 15px; background: #FFCDD2; margin-right: 5px;"></div><span style="font-size: 12px;">0-7 days</span></div>
                <div style="display: flex; align-items: center;"><div style="width: 15px; height: 15px; background: #FFE0B2; margin-right: 5px;"></div><span style="font-size: 12px;">8-30 days</span></div>
                <div style="display: flex; align-items: center;"><div style="width: 15px; height: 15px; background: #E1F5FE; margin-right: 5px;"></div><span style="font-size: 12px;">31-90 days</span></div>
                <div style="display: flex; align-items: center;"><div style="width: 15px; height: 15px; background: #E8F5E9; margin-right: 5px;"></div><span style="font-size: 12px;">91-180 days</span></div>
                <div style="display: flex; align-items: center;"><div style="width: 15px; height: 15px; background: #F3E5F5; margin-right: 5px;"></div><span style="font-size: 12px;">181-365 days</span></div>
                <div style="display: flex; align-items: center;"><div style="width: 15px; height: 15px; background: #ECEFF1; margin-right: 5px;"></div><span style="font-size: 12px;">Over 1 year</span></div>
            </div>
            <div class="calendar-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        """]

        for month_key in sorted(calendar_data.keys()):
            month = calendar_data[month_key]
            html.append(f"""
            <div class="month-card" style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 15px;">
                <h5 style="text-align: center; margin: 0 0 10px 0; color: #555;">
                    {month['month_name']} {month['year']}
                </h5>
                <table class="month-calendar" style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                        <tr>
                            <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
                        </tr>
                    </thead>
                    <tbody>
            """)

            day_counter = 1
            html.append("<tr>")

            for _ in range(month['start_weekday']):
                html.append("<td style='border: 1px solid #eee; height: 60px;'></td>")
                day_counter += 1

            for day in range(1, len(month['days']) + 1):
                if (day_counter - 1) % 7 == 0:
                    html.append("</tr><tr>")

                hearings_today = month['days'][day]
                cell_content = []
                cell_bg = "#FFFFFF"

                if hearings_today:
                    cell_content.append(f"<div style='font-weight: bold;'>{day}</div>")
                    cell_bg = hearings_today[0].get('bg_color', '#FFFFFF')
                    for hearing in hearings_today:
                        cell_content.append(f"""
                        <div style="margin: 2px 0; padding: 2px; border-radius: 3px; font-size: 11px;">
                            <a href="{hearing['url']}" style="color: #333; text-decoration: none;" 
                               title="{hearing['case']} ({hearing['court']}) - {hearing['days_until']} days">
                                {hearing['case'][:12]}{'...' if len(hearing['case']) > 12 else ''}
                            </a>
                            {hearing['next_text']}
                        </div>
                        """)
                else:
                    cell_content.append(f"<div>{day}</div>")

                today_style = ""
                if day == today.day and month['month_name'] == today.strftime('%B') and month['year'] == today.year:
                    today_style = "box-shadow: 0 0 0 2px #4285F4;"

                html.append(f"""
                <td style="border: 1px solid #eee; height: 60px; vertical-align: top; padding: 4px; background-color: {cell_bg} !important; {today_style}">
                    {''.join(cell_content)}
                </td>
                """)
                day_counter += 1

            while (day_counter - 1) % 7 != 0:
                html.append("<td style='border: 1px solid #eee; height: 60px;'></td>")
                day_counter += 1

            html.append("</tr></tbody></table></div>")

        html.append("""
            </div>
        </div>
        <style>
            .legal-calendar-view .month-calendar td:hover {
                background: #f5f5f5 !important;
            }
            .legal-calendar-view a:hover {
                text-decoration: underline !important;
            }
        </style>
        """)

        return "".join(html)

    except Exception as e:
        frappe.log_error("Failed to load calendar view", str(e))
        return """
        <div class="text-danger" style="padding: 20px;">
            <i class="fa fa-exclamation-triangle"></i> 
            Error loading calendar view. Please try again later.
        </div>
        """

