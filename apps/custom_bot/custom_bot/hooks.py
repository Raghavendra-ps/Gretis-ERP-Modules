from . import __version__ as app_version

app_name = "custom_bot"
app_title = "Custom Bot"
app_publisher = "Gretis India"
app_description = "AI Bot"
app_email = "info@gretisindia.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/custom_bot/css/custom_bot.css"
# app_include_js = "/assets/custom_bot/js/custom_bot.js"

# include js, css files in header of web template
# web_include_css = "/assets/custom_bot/css/custom_bot.css"
# web_include_js = "/assets/custom_bot/js/custom_bot.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "custom_bot/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "custom_bot.utils.jinja_methods",
#	"filters": "custom_bot.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "custom_bot.install.before_install"
# after_install = "custom_bot.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "custom_bot.uninstall.before_uninstall"
# after_uninstall = "custom_bot.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "custom_bot.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"custom_bot.tasks.all"
#	],
#	"daily": [
#		"custom_bot.tasks.daily"
#	],
#	"hourly": [
#		"custom_bot.tasks.hourly"
#	],
#	"weekly": [
#		"custom_bot.tasks.weekly"
#	],
#	"monthly": [
#		"custom_bot.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "custom_bot.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "custom_bot.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "custom_bot.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["custom_bot.utils.before_request"]
# after_request = ["custom_bot.utils.after_request"]

# Job Events
# ----------
# before_job = ["custom_bot.utils.before_job"]
# after_job = ["custom_bot.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"custom_bot.auth.validate"
# ]

# custom_bot/hooks.py
whitelisted_methods = {
    "custom_bot.custom_bot.doctype.bot_configuration.bot_configuration.get_chatgpt_response": "custom_bot.custom_bot.doctype.bot_configuration.bot_configuration.get_chatgpt_response"
}

doc_events = {
    "Bot Configuration": {
        "on_update": "custom_bot.custom_bot.doctype.bot_configuration.bot_configuration.create_doctype"
    }
}

api = [
    {"method": "custom_bot.custom_bot.doctype.bot_configuration.bot_configuration.get_chatgpt_response"},
    {"method": "custom_bot.custom_bot.doctype.bot_configuration.bot_configuration.create_script"}
]

def on_pre_request():
    from frappe import local
    response = local.response

    response.headers["Access-Control-Allow-Origin"] = "https://erp.gretis.com"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    
# hooks.py

api_whitelist = [
    "custom_bot.custom_bot.doctype.bot_configuration.bot_configuration.get_chatgpt_response"
]

# hooks.py

doc_events = {
    "*": {
        "whitelist_methods": [
            "custom_bot.custom_bot.doctype.bot_configuration.bot_configuration.get_chatgpt_response"
        ]
    }
}


