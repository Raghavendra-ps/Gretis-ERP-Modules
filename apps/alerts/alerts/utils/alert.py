# Alerts © 2024
# Author:  Ameen Ahmed
# Company: Level Up Marketing & Software Development Services
# Licence: Please refer to LICENSE file


import frappe
from frappe.utils import cint, nowdate


# [Internal]
_alert_dt_ = "Alert"


# [Hooks]
def update_alerts():
    from pypika.terms import Criterion
    
    today = nowdate()
    doc = frappe.qb.DocType(_alert_dt_)
    data = (
        frappe.qb.from_(doc)
        .select(doc.name)
        .where(doc.docstatus == 1)
        .where(Criterion.any([
            Criterion.all([
                doc.until_date.lt(today),
                doc.status == "Active"
            ]),
            Criterion.all([
                doc.from_date.lte(today),
                doc.until_date.gte(today),
                doc.status == "Pending"
            ])
        ]))
    ).run(as_dict=True)
    if data and isinstance(data, list):
        (
            frappe.qb.update(doc)
            .set(doc.status, "Finished")
            .where(doc.until_date.lt(today))
            .where(doc.status == "Active")
            .where(doc.docstatus == 1)
        ).run()
        
        (
            frappe.qb.update(doc)
            .set(doc.status, "Active")
            .where(doc.from_date.lte(today))
            .where(doc.until_date.gte(today))
            .where(doc.status == "Pending")
            .where(doc.docstatus == 1)
        ).run()
        
        from .cache import clear_doc_cache
        
        for v in data:
            clear_doc_cache(_alert_dt_, v["name"])


# [Alert Type]
def type_alerts_exists(alert_type):
    from .common import is_doc_exists
    
    return is_doc_exists(_alert_dt_, {"alert_type": alert_type})


# [Access]
def enqueue_alerts(user: str):
    from .background import is_job_running, enqueue_job
    
    job_name = f"show-user-alerts-for-{user}"
    if not is_job_running(job_name):
        enqueue_job(
            "alerts.utils.alert.get_user_alerts",
            job_name,
            user=user
        )


# [Alerts Js]
@frappe.whitelist()
def user_alerts(init=None):
    from .settings import is_enabled
    
    data = {"is_enabled": 1 if is_enabled() else 0}
    if data["is_enabled"]:
        data["alerts"] = get_user_alerts(frappe.session.user)
        if init:
            from .type import get_types
            
            data["types"] = get_types()
    else:
        data["alerts"] = []
    
    return data


# [Alerts Alert]
def send_alert(data):
    from .realtime import emit_show_alert
    from .type import add_type_data
    
    add_type_data(data.alert_type, data)
    emit_show_alert(data)


# [Alerts Js]
@frappe.whitelist(methods=["POST"])
def mark_seens(names):
    if names and isinstance(names, str):
        from .common import parse_json
        
        names = parse_json(names)
    
    if not names or not isinstance(names, list):
        return {
            "error": 1,
            "message": "Invalid arguments"
        }
    
    user = frappe.session.user
    for v in names:
        if v and isinstance(v, str):
            mark_as_seen(v, user)
    
    return {"success": 1}


# [Internal]
def get_user_alerts(user: str):
    from .cache import get_cache, set_cache
    
    key = f"{user}-alerts"
    data = get_cache(_alert_dt_, key, True)
    if isinstance(data, list):
        return data
    
    tmp = []
    expiry = seconds_left_for_day()
    today = nowdate()
    alerts = get_daily_alerts(today)
    if not alerts:
        set_cache(_alert_dt_, key, tmp, expiry)
        return tmp
    
    parents = []
    get_alerts_for_user(user, alerts, parents)
    get_alerts_for_roles(user, alerts, parents)
    if not parents:
        set_cache(_alert_dt_, key, tmp, expiry)
        return tmp
    
    from .type import type_join_query
    
    doc = frappe.qb.DocType(_alert_dt_)
    qry = (
        frappe.qb.from_(doc)
        .select(
            doc.name,
            doc.title,
            doc.alert_type,
            doc.message,
            doc.is_repeatable,
            doc.number_of_repeats
        )
        .where(doc.name.isin(parents))
    )
    qry = type_join_query(qry, doc.alert_type)
    data = qry.run(as_dict=True)
    if not data or not isinstance(data, list):
        set_cache(_alert_dt_, key, tmp, expiry)
        return tmp
    
    data = filter_seen_alerts(data, user, parents, today)
    if not data:
        data = tmp
    
    set_cache(_alert_dt_, key, data, expiry)
    return data


# [Internal]
def get_daily_alerts(date: str):
    return frappe.get_all(
        _alert_dt_,
        fields=["name"],
        filters=[
            [_alert_dt_, "from_date", "<=", date],
            [_alert_dt_, "until_date", ">=", date],
            [_alert_dt_, "status", "=", "Active"],
            [_alert_dt_, "docstatus", "=", 1]
        ],
        pluck="name",
        ignore_permissions=True,
        strict=False
    )


# [Internal]
def get_alerts_for_user(user: str, alerts: list, parents: list):
    dt = f"{_alert_dt_} For User"
    doc = frappe.qb.DocType(dt)
    data = (
        frappe.qb.from_(doc)
        .select(doc.parent)
        .where(doc.parenttype == _alert_dt_)
        .where(doc.parentfield == "for_users")
        .where(doc.parent.isin(alerts))
        .where(doc.user == user)
    ).run(as_dict=True)
    if data and isinstance(data, list):
        data = list(set([
            v["parent"] for v in data
            if v["parent"] not in parents
        ]))
        parents.extend(data)


# [Internal]
def get_alerts_for_roles(user: str, alerts: list, parents: list):
    dt = f"{_alert_dt_} For Role"
    doc = frappe.qb.DocType(dt)
    data = (
        frappe.qb.from_(doc)
        .select(doc.parent)
        .where(doc.parenttype == _alert_dt_)
        .where(doc.parentfield == "for_roles")
        .where(doc.parent.isin(alerts))
        .where(doc.role.isin(frappe.get_roles(user)))
    ).run(as_dict=True)
    if data and isinstance(data, list):
        data = list(set([
            v["parent"] for v in data
            if v["parent"] not in parents
        ]))
        parents.extend(data)


# [Internal]
def get_alerts_seen_by(user: str, alerts: list):
    dt = f"{_alert_dt_} Seen By"
    doc = frappe.qb.DocType(dt)
    data = (
        frappe.qb.from_(doc)
        .select(doc.parent, doc.date)
        .where(doc.parenttype == _alert_dt_)
        .where(doc.parentfield == "seen_by")
        .where(doc.parent.isin(alerts))
        .where(doc.user == user)
    ).run(as_dict=True)
    if not isinstance(data, list):
        return None
    
    return data


# [Internal]
def filter_seen_alerts(data: list, user: str, alerts: list, today: str):
    seen_by = get_alerts_seen_by(user, alerts)
    if not seen_by:
        return data
    
    data = {v["name"]:v for v in data}
    totals = {}
    for v in seen_by:
        if v["date"] == today:
            data.pop(v["parent"], None)
        else:
            if v["parent"] not in totals:
                totals[v["parent"]] = 0
            totals[v["parent"]] += 1
            d = data.get(v["parent"], None)
            if (
                d and (
                    not cint(d["is_repeatable"]) or
                    cint(d["number_of_repeats"]) <= totals[v["parent"]]
                )
            ):
                data.pop(v["parent"], None)
    
    return list(data.values())


# [Internal]
def mark_as_seen(name: str, user: str):
    from .cache import get_cached_doc
    
    doc = get_cached_doc(_alert_dt_, name)
    if (
        not doc or cint(doc.docstatus) != 1 or
        doc.status != "Active"
    ):
        from frappe import _
        
        from .common import log_error
        
        log_error(_(
            "The seen alert lert \"{0}\" "
            + "doesn't exist, is draft, "
            + "is cancelled or isn't active."
        ).format(name))
        return 0
    
    today = nowdate()
    if is_valid_user(doc, user, today):
        from frappe.utils import nowtime
        
        from .realtime import emit_alert_seen
        
        doc.append("seen_by", {
            "user": user,
            "date": today,
            "time": nowtime()
        })
        seen = list(set([v.user for v in doc.seen_by]))
        doc.reached = len(seen)
        doc.save(ignore_permissions=True)
        emit_alert_seen({
            "alert": doc.name,
            "delay": 1
        })
    
    return 1


# [Internal]
def is_valid_user(doc, user, today):
    valid = 0
    if doc.for_users:
        for v in doc.for_users:
            if v.user == user:
                valid = 1
                break
    
    if not valid and doc.for_roles:
        from frappe.utils import has_common
        
        roles = [v.role for v in doc.for_roles]
        if has_common(roles, frappe.get_roles(user)):
            valid = 1
    
    if not valid:
        return False
    
    seen = 0
    if doc.seen_by:
        for v in doc.seen_by:
            if v.user == user:
                if v.date == today:
                    return False
                
                seen += 1
    
    if not cint(doc.is_repeatable):
        return seen < 1
    
    return cint(doc.number_of_repeats) > seen


# [Internal]
def seconds_left_for_day():
    from frappe.utils import now_datetime
    
    dt = now_datetime()
    sec = (24 - dt.hour - 1) * 60 * 60
    sec = sec + ((60 - dt.minute - 1) * 60)
    sec = sec + (60 - dt.second)
    return sec