(()=>{window.FileAttachmentHandler=class{constructor(){this.add_attachment_handler(),this.set_listeners()}add_attachment_handler(){var t=this;$(".add-attachment-helpdesk").click(function(){t.new_attachment()})}new_attachment(){new frappe.ui.FileUploader({folder:"Home/Attachments",on_success:t=>{this.attachments||(this.attachments=[]),this.save_paths||(this.save_paths={}),this.attachments.push(t),$(".helpdesk-attachment").empty().append(this.build_attachment_table())}})}build_attachment_table(){var t=$('<div class="helpdesk-attachment"></div>');t.empty();var n=$(this.get_attachment_table_header_html()).appendTo(t);return!this.attachments||!this.attachments.length?"No attachments uploaded":(this.attachments.forEach(a=>{let e=$("<tr></tr>").appendTo(n.find("tbody"));$(`<td>${a.file_name}</td>`).appendTo(e),$(`<td>
			<a class="btn btn-default btn-xs btn-primary-light text-nowrap copy-link" data-link="![](${a.file_url})" data-name = "${a.file_name}" >
				Copy Link
			</a>
			</td>`).appendTo(e),$(`<td>
			<a class="btn btn-default btn-xs  center delete-button"  data-name = "${a.file_name}" >
			<svg class="icon icon-sm"><use xlink:href="#icon-delete"></use></svg>
			</a>
			</td>`).appendTo(e)}),t)}get_attachment_table_header_html(){return`<table class="table  attachment-table" ">
			<tbody></tbody>
		</table>`}handle_attachment_upload_callback(t){this.attachments}set_listeners(){var t=this;$("body").on("click",".copy-link",function(){frappe.utils.copy_to_clipboard($(this).attr("data-link"))}),$("body").on("click",".delete-button",function(){frappe.confirm(`Are you sure you want to delete the file "${$(this).attr("data-name")}"`,()=>{t.attachments.forEach((n,a,e)=>{n.file_name==$(this).attr("data-name")&&e.splice(a,1)}),$(".helpdesk-attachment").empty().append(t.build_attachment_table())})})}};})();
//# sourceMappingURL=helpdesk.bundle.BRGXQ5Q4.js.map
