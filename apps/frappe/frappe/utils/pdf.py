# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: MIT. See LICENSE
import io
import os
import re
import subprocess
from distutils.version import LooseVersion

import pdfkit
from bs4 import BeautifulSoup
from PyPDF2 import PdfReader, PdfWriter

import frappe
from frappe import _
from frappe.utils import scrub_urls
from frappe.utils.jinja_globals import bundled_asset, is_rtl

PDF_CONTENT_ERRORS = [
    "ContentNotFoundError",
    "ContentOperationNotPermittedError",
    "UnknownContentError",
    "RemoteHostClosedError",
]

def get_pdf(html, options=None, output: PdfWriter | None = None):
    if not html or not isinstance(html, str) or html.strip() == "":
        frappe.throw(_("Invalid HTML content provided for PDF generation."))

    html = scrub_urls(html)
    html, options = prepare_options(html, options)

    options.update({"enable-local-file-access": "", "disable-javascript": ""})

    if LooseVersion(get_wkhtmltopdf_version()) > LooseVersion("0.12.3"):
        options.update({"disable-smart-shrinking": ""})

    filedata = None  # Ensure filedata is always defined

    try:
        filedata = pdfkit.from_string(html, options=options or {}, verbose=True)

        if not filedata:
            frappe.log_error("PDF generation failed: Empty file data returned.", "PDF Generation Error")
            frappe.throw(_("Failed to generate PDF. Ensure that the HTML content is valid and that wkhtmltopdf is working."))

        reader = PdfReader(io.BytesIO(filedata))

    except Exception as e:
        frappe.log_error(f"PDF generation failed: {str(e)}", "PDF Generation Error")

        if any(error in str(e) for error in PDF_CONTENT_ERRORS):
            frappe.msgprint(_("Some images could not be loaded, but the PDF was generated."), alert=True)

            if filedata:
                reader = PdfReader(io.BytesIO(filedata))
            else:
                frappe.throw(_("PDF generation failed. Please check your HTML template and wkhtmltopdf setup."))
        else:
            raise

    finally:
        cleanup(options)

    if output:
        output.append_pages_from_reader(reader)
        return output

    writer = PdfWriter()
    writer.append_pages_from_reader(reader)

    if "password" in options:
        writer.encrypt(options["password"])

    return get_file_data_from_writer(writer)

def get_file_data_from_writer(writer_obj):
    stream = io.BytesIO()
    writer_obj.write(stream)
    stream.seek(0)
    return stream.read()

def prepare_options(html, options):
    if not options:
        options = {}

    options.update(
        {
            "print-media-type": None,
            "background": None,
            "images": None,
            "quiet": None,
            "encoding": "UTF-8",
        }
    )

    if not options.get("margin-right"):
        options["margin-right"] = "15mm"

    if not options.get("margin-left"):
        options["margin-left"] = "15mm"

    html, html_options = read_options_from_html(html)
    options.update(html_options or {})

    options.update(get_cookie_options())

    pdf_page_size = (
        options.get("page-size") or frappe.db.get_single_value("Print Settings", "pdf_page_size") or "A4"
    )

    if pdf_page_size == "Custom":
        options["page-height"] = options.get("page-height") or frappe.db.get_single_value(
            "Print Settings", "pdf_page_height"
        )
        options["page-width"] = options.get("page-width") or frappe.db.get_single_value(
            "Print Settings", "pdf_page_width"
        )
    else:
        options["page-size"] = pdf_page_size

    return html, options

def get_cookie_options():
    options = {}
    if frappe.session and frappe.session.sid and hasattr(frappe.local, "request"):
        cookiejar = f"/tmp/{frappe.generate_hash()}.jar"

        domain = frappe.utils.get_host_name().split(":", 1)[0]
        try:
            with open(cookiejar, "w") as f:
                f.write(f"sid={frappe.session.sid}; Domain={domain};\n")

            options["cookie-jar"] = cookiejar
        except Exception as e:
            frappe.log_error(f"Failed to create cookie-jar: {str(e)}", "PDF Generation Error")

    return options

def read_options_from_html(html):
    options = {}
    soup = BeautifulSoup(html, "html5lib")

    options.update(prepare_header_footer(soup))
    toggle_visible_pdf(soup)

    for attr in (
        "margin-top",
        "margin-bottom",
        "margin-left",
        "margin-right",
        "page-size",
        "header-spacing",
        "orientation",
        "page-width",
        "page-height",
    ):
        try:
            pattern = re.compile(r"(\.print-format)([\S|\s][^}]*?)(" + str(attr) + r":)(.+)(mm;)")
            match = pattern.findall(html)
            if match:
                options[attr] = str(match[-1][3]).strip()
        except Exception as e:
            frappe.log_error(f"Error parsing print format options: {str(e)}", "PDF Generation Error")

    return str(soup), options

def prepare_header_footer(soup):
    options = {}

    head = soup.find("head").contents
    styles = soup.find_all("style")

    print_css = bundled_asset("print.bundle.css").lstrip("/")
    css = frappe.read_file(os.path.join(frappe.local.sites_path, print_css))

    for html_id in ("header-html", "footer-html"):
        content = soup.find(id=html_id)
        if content:
            for tag in soup.find_all(id=html_id):
                tag.extract()

            toggle_visible_pdf(content)
            html = frappe.render_template(
                "templates/print_formats/pdf_header_footer.html",
                {
                    "head": head,
                    "content": content,
                    "styles": styles,
                    "html_id": html_id,
                    "css": css,
                    "lang": frappe.local.lang,
                    "layout_direction": "rtl" if is_rtl() else "ltr",
                },
            )

            fname = os.path.join("/tmp", f"frappe-pdf-{frappe.generate_hash()}.html")
            try:
                with open(fname, "wb") as f:
                    f.write(html.encode("utf-8"))
                options[html_id] = fname
            except Exception as e:
                frappe.log_error(f"Failed to write temporary header/footer HTML: {str(e)}", "PDF Generation Error")

        else:
            if html_id == "header-html":
                options["margin-top"] = "15mm"
            elif html_id == "footer-html":
                options["margin-bottom"] = "15mm"

    return options

def cleanup(options):
    for key in ("header-html", "footer-html", "cookie-jar"):
        try:
            if options.get(key) and os.path.exists(options[key]):
                os.remove(options[key])
        except Exception as e:
            frappe.log_error(f"Failed to delete temporary file {options[key]}: {str(e)}", "PDF Cleanup Error")

def toggle_visible_pdf(soup):
    for tag in soup.find_all(attrs={"class": "visible-pdf"}):
        tag.attrs["class"].remove("visible-pdf")

    for tag in soup.find_all(attrs={"class": "hidden-pdf"}):
        tag.extract()

def get_wkhtmltopdf_version():
    wkhtmltopdf_version = frappe.cache().hget("wkhtmltopdf_version", None)

    if not wkhtmltopdf_version:
        try:
            res = subprocess.check_output(["wkhtmltopdf", "--version"], stderr=subprocess.STDOUT)
            wkhtmltopdf_version = res.decode("utf-8").split(" ")[1]
            frappe.cache().hset("wkhtmltopdf_version", None, wkhtmltopdf_version)
        except FileNotFoundError:
            frappe.throw(_("wkhtmltopdf is not installed or not found in the system path. Please install it."))
        except Exception as e:
            frappe.log_error(f"wkhtmltopdf version check failed: {str(e)}", "PDF Generation Error")
            wkhtmltopdf_version = "0"

    return wkhtmltopdf_version
