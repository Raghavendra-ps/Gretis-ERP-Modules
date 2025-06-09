(()=>{window.erpnext||(window.erpnext={});frappe.send_message=function(e,t){return frappe.call({type:"POST",method:"erpnext.templates.utils.send_message",btn:t,args:e,callback:e.callback})};erpnext.subscribe_to_newsletter=function(e,t){return frappe.call({type:"POST",method:"frappe.email.doctype.newsletter.newsletter.subscribe",btn:t,args:{email:e.email},callback:e.callback})};erpnext.send_message=frappe.send_message;frappe.provide("erpnext.e_commerce.wishlist");var l=erpnext.e_commerce.wishlist;frappe.provide("erpnext.e_commerce.shopping_cart");var d=erpnext.e_commerce.shopping_cart;$.extend(l,{set_wishlist_count:function(e=!1){var t=frappe.get_cookie("wish_count");frappe.session.user==="Guest"&&(t=0),t&&$(".wishlist").toggleClass("hidden",!1);var s=$(".wishlist-icon"),i=s.find("#wish-count");parseInt(t)===0||t===void 0?s.css("display","none"):s.css("display","inline"),t?(i.html(t),e&&(s.addClass("cart-animate"),setTimeout(()=>{s.removeClass("cart-animate")},500))):i.remove()},bind_move_to_cart_action:function(){$(".page_content").on("click",".btn-add-to-cart",e=>{let t=$(e.currentTarget),s=t.data("item-code");d.shopping_cart_update({item_code:s,qty:1,cart_dropdown:!0});let i=function(){t.closest(".wishlist-card").addClass("wish-removed")},r={item_code:s};this.add_remove_from_wishlist("remove",r,i,null,!0)})},bind_remove_action:function(){let e=this;$(".page_content").on("click",".remove-wish",t=>{let s=$(t.currentTarget),i=s.data("item-code"),r=function(){s.closest(".wishlist-card").addClass("wish-removed"),frappe.get_cookie("wish_count")==0&&($(".page_content").empty(),e.render_empty_state())},a={item_code:i};this.add_remove_from_wishlist("remove",a,r)})},bind_wishlist_action(){$(".page_content").on("click",".like-action, .like-action-list",e=>{let t=$(e.currentTarget);this.wishlist_action(t)})},wishlist_action(e){let t=e.find(".wish-icon"),s=this;if(frappe.session.user==="Guest"){localStorage&&localStorage.setItem("last_visited",window.location.pathname),this.redirect_guest();return}let i=function(){erpnext.e_commerce.wishlist.set_wishlist_count(!0)};if(t.hasClass("wished")){e.removeClass("like-animate"),e.addClass("like-action-wished"),this.toggle_button_class(t,"wished","not-wished");let r={item_code:e.data("item-code")},a=function(){s.toggle_button_class(t,"not-wished","wished")};this.add_remove_from_wishlist("remove",r,i,a)}else{e.addClass("like-animate"),e.addClass("like-action-wished"),this.toggle_button_class(t,"not-wished","wished");let r={item_code:e.data("item-code")},a=function(){s.toggle_button_class(t,"wished","not-wished")};this.add_remove_from_wishlist("add",r,i,a)}},toggle_button_class(e,t,s){e.removeClass(t),e.addClass(s)},add_remove_from_wishlist(e,t,s,i,r=!1){if(frappe.session.user==="Guest")localStorage&&localStorage.setItem("last_visited",window.location.pathname),this.redirect_guest();else{let a="erpnext.e_commerce.doctype.wishlist.wishlist.add_to_wishlist";e==="remove"&&(a="erpnext.e_commerce.doctype.wishlist.wishlist.remove_from_wishlist"),frappe.call({async:r,type:"POST",method:a,args:t,callback:function(n){n.exc?(i&&typeof i=="function"&&i(),frappe.msgprint({message:__("Sorry, something went wrong. Please refresh."),indicator:"red",title:__("Note")})):s&&typeof s=="function"&&s()}})}},redirect_guest(){frappe.call("erpnext.e_commerce.api.get_guest_redirect_on_action").then(e=>{window.location.href=e.message||"/login"})},render_empty_state(){$(".page_content").append(`
			<div class="cart-empty frappe-card">
				<div class="cart-empty-state">
					<img src="/assets/erpnext/images/ui-states/cart-empty-state.png" alt="Empty Cart">
				</div>
				<div class="cart-empty-message mt-4">${__("Wishlist is empty !")}</p>
			</div>
		`)}});frappe.ready(function(){window.location.pathname!=="/wishlist"?($(".wishlist").toggleClass("hidden",!0),l.set_wishlist_count()):(l.bind_move_to_cart_action(),l.bind_remove_action())});frappe.provide("erpnext.e_commerce.shopping_cart");var o=erpnext.e_commerce.shopping_cart,_=function(e){var t=[],s=document.createElement("a");s.href=e;for(var i=s.search.substring(1),r=i.split("&"),a=0;a<r.length;a++){var n=r[a].split("=");t[n[0]]=decodeURIComponent(n[1])}return t};frappe.ready(function(){var e=frappe.session&&frappe.session.user_fullname;e&&$('.navbar li[data-label="User"] a').html('<i class="fa fa-fixed-width fa fa-user"></i> '+e);var t=_(window.location.href),s=t.cc,i=t.sp,r=new Date;r.setTime(r.getTime()+.02*24*60*60*1e3);var a="expires="+r.toUTCString();s&&(document.cookie="referral_coupon_code="+s+";"+a+";path=/"),i&&(document.cookie="referral_sales_partner="+i+";"+a+";path=/"),s=frappe.get_cookie("referral_coupon_code"),i=frappe.get_cookie("referral_sales_partner"),s&&$(".tot_quotation_discount").val()==null&&$(".txtcoupon").val(s),i&&$(".txtreferral_sales_partner").val(i),o.show_shoppingcart_dropdown(),o.set_cart_count(),o.show_cart_navbar()});$.extend(o,{show_shoppingcart_dropdown:function(){$(".shopping-cart").on("shown.bs.dropdown",function(){if(!$(".shopping-cart-menu .cart-container").length)return frappe.call({method:"erpnext.e_commerce.shopping_cart.cart.get_shopping_cart_menu",callback:function(e){e.message&&$(".shopping-cart-menu").html(e.message)}})})},update_cart:function(e){if(frappe.session.user==="Guest")localStorage&&localStorage.setItem("last_visited",window.location.pathname),frappe.call("erpnext.e_commerce.api.get_guest_redirect_on_action").then(t=>{window.location.href=t.message||"/login"});else return o.freeze(),frappe.call({type:"POST",method:"erpnext.e_commerce.shopping_cart.cart.update_cart",args:{item_code:e.item_code,qty:e.qty,additional_notes:e.additional_notes!==void 0?e.additional_notes:void 0,with_items:e.with_items||0},btn:e.btn,callback:function(t){o.unfreeze(),o.set_cart_count(!0),e.callback&&e.callback(t)}})},set_cart_count:function(e=!1){$(".intermediate-empty-cart").remove();var t=frappe.get_cookie("cart_count");frappe.session.user==="Guest"&&(t=0),t&&$(".shopping-cart").toggleClass("hidden",!1);var s=$(".cart-icon"),i=s.find("#cart-count");if(parseInt(t)===0||t===void 0){s.css("display","none"),$(".cart-tax-items").hide(),$(".btn-place-order").hide(),$(".cart-payment-addresses").hide();let r=`
				<div class="text-center w-100 intermediate-empty-cart mt-4 mb-4 text-muted">
					${__("Cart is Empty")}
				</div>
			`;$(".cart-table").after(r)}else s.css("display","inline"),$("#cart-count").text(t);t?(i.html(t),e&&(s.addClass("cart-animate"),setTimeout(()=>{s.removeClass("cart-animate")},500))):i.remove()},shopping_cart_update:function({item_code:e,qty:t,cart_dropdown:s,additional_notes:i}){o.update_cart({item_code:e,qty:t,additional_notes:i,with_items:1,btn:this,callback:function(r){r.exc||($(".cart-items").html(r.message.items),$(".cart-tax-items").html(r.message.total),$(".payment-summary").html(r.message.taxes_and_totals),o.set_cart_count(),s!=!0&&$(".cart-icon").hide())}})},show_cart_navbar:function(){frappe.call({method:"erpnext.e_commerce.doctype.e_commerce_settings.e_commerce_settings.is_cart_enabled",callback:function(e){$(".shopping-cart").toggleClass("hidden",!e.message)}})},toggle_button_class(e,t,s){e.removeClass(t),e.addClass(s)},bind_add_to_cart_action(){$(".page_content").on("click",".btn-add-to-cart-list",e=>{let t=$(e.currentTarget);if(t.prop("disabled",!0),frappe.session.user==="Guest"){localStorage&&localStorage.setItem("last_visited",window.location.pathname),frappe.call("erpnext.e_commerce.api.get_guest_redirect_on_action").then(i=>{window.location.href=i.message||"/login"});return}t.addClass("hidden"),t.closest(".cart-action-container").addClass("d-flex"),t.parent().find(".go-to-cart").removeClass("hidden"),t.parent().find(".go-to-cart-grid").removeClass("hidden"),t.parent().find(".cart-indicator").removeClass("hidden");let s=t.data("item-code");erpnext.e_commerce.shopping_cart.update_cart({item_code:s,qty:1})})},freeze(){if(window.location.pathname==="/cart")if($("#freeze").length)$("#freeze").addClass("show");else{let e=$('<div id="freeze" class="modal-backdrop fade"></div>').appendTo("body");setTimeout(function(){e.addClass("show")},1)}},unfreeze(){if($("#freeze").length){let e=$("#freeze").removeClass("show");setTimeout(function(){e.remove()},1)}}});$(()=>{class e{constructor(){this.bind_button_actions(),this.start=0,this.page_length=10}bind_button_actions(){this.write_review(),this.view_more()}write_review(){$(".page_content").on("click",".btn-write-review",s=>{let i=$(s.currentTarget),r=new frappe.ui.Dialog({title:__("Write a Review"),fields:[{fieldname:"title",fieldtype:"Data",label:"Headline",reqd:1},{fieldname:"rating",fieldtype:"Rating",label:"Overall Rating",reqd:1},{fieldtype:"Section Break"},{fieldname:"comment",fieldtype:"Small Text",label:"Your Review"}],primary_action:function(){let a=r.get_values();frappe.call({method:"erpnext.e_commerce.doctype.item_review.item_review.add_item_review",args:{web_item:i.attr("data-web-item"),title:a.title,rating:a.rating,comment:a.comment},freeze:!0,freeze_message:__("Submitting Review ..."),callback:n=>{n.exc||(frappe.msgprint({message:__("Thank you for submitting your review"),title:__("Review Submitted"),indicator:"green"}),r.hide(),location.reload())}})},primary_action_label:__("Submit")});r.show()})}view_more(){$(".page_content").on("click",".btn-view-more",s=>{let i=$(s.currentTarget);i.prop("disabled",!0),this.start+=this.page_length;let r=this;frappe.call({method:"erpnext.e_commerce.doctype.item_review.item_review.get_item_reviews",args:{web_item:i.attr("data-web-item"),start:r.start,end:r.page_length},callback:a=>{if(a.message){let n=a.message;r.get_user_review_html(n.reviews),i.prop("disabled",!1),n.total_reviews<=r.start+r.page_length&&i.hide()}}})})}get_user_review_html(s){let i=this,r=$(".user-reviews");s.forEach(a=>{r.append(`
					<div class="mb-3 review">
						<div class="d-flex">
							<p class="mr-4 user-review-title">
								<span>${__(a.review_title)}</span>
							</p>
							<div class="rating">
								${i.get_review_stars(a.rating)}
							</div>
						</div>

						<div class="product-description mb-4">
							<p>
								${__(a.comment)}
							</p>
						</div>
						<div class="review-signature mb-2">
							<span class="reviewer">${__(a.customer)}</span>
							<span class="indicator grey" style="--text-on-gray: var(--gray-300);"></span>
							<span class="reviewer">${__(a.published_on)}</span>
						</div>
					</div>
				`)})}get_review_stars(s){let i="";for(let r=1;r<6;r++)i+=`
					<svg class="icon icon-sm ${r<=s?"star-click":""}">
						<use href="#icon-star"></use>
					</svg>
				`;return i}}new e});erpnext.ProductList=class{constructor(e){Object.assign(this,e),this.preference!=="List View"&&this.products_section.addClass("hidden"),this.products_section.empty(),this.make()}make(){let e=this,t="<br><br>";this.items.forEach(i=>{let r=i.web_item_name||i.item_name||i.item_code||"";r=r.length>200?r.substr(0,200)+"...":r,t+="<div class='row list-row w-100 mb-4'>",t+=e.get_image_html(i,r,e.settings),t+=e.get_row_body_html(i,r,e.settings),t+="</div>"}),this.products_section.append(t)}get_image_html(e,t,s){let i=e.website_image,r=!e.has_variants&&s.enable_wishlist,a="";return i?a+=`
				<div class="col-2 border text-center rounded list-image">
					<a class="product-link product-list-link" href="/${e.route||"#"}">
						<img itemprop="image" class="website-image h-100 w-100" alt="${t}"
							src="${i}">
					</a>
					${r?this.get_wishlist_icon(e):""}
				</div>
			`:a+=`
				<div class="col-2 border text-center rounded list-image">
					<a class="product-link product-list-link" href="/${e.route||"#"}"
						style="text-decoration: none">
						<div class="card-img-top no-image-list">
							${frappe.get_abbr(t)}
						</div>
					</a>
					${r?this.get_wishlist_icon(e):""}
				</div>
			`,a}get_row_body_html(e,t,s){let i="<div class='col-10 text-left'>";return i+=this.get_title_html(e,t,s),i+=this.get_item_details(e,s),i+="</div>",i}get_title_html(e,t,s){let i='<div style="display: flex; margin-left: -15px;">';return i+=`
			<div class="col-8" style="margin-right: -15px;">
				<a href="/${e.route||"#"}">
					<div class="product-title">
					${t}
					</div>
				</a>
			</div>
		`,s.enabled&&(i+=`<div class="col-4 cart-action-container ${e.in_cart?"d-flex":""}">`,i+=this.get_primary_button(e,s),i+="</div>"),i+="</div>",i}get_item_details(e,t){let s=`
			<p class="product-code">
				${e.item_group} | Item Code : ${e.item_code}
			</p>
			<div class="mt-2" style="color: var(--gray-600) !important; font-size: 13px;">
				${e.short_description||""}
			</div>
			<div class="product-price">
				${e.formatted_price||""}
		`;return e.formatted_mrp&&(s+=`
				<small class="striked-price">
					<s>${e.formatted_mrp?e.formatted_mrp.replace(/ +/g,""):""}</s>
				</small>
				<small class="ml-1 product-info-green">
					${e.discount} OFF
				</small>
			`),s+=this.get_stock_availability(e,t),s+="</div>",s}get_stock_availability(e,t){if(t.show_stock_availability&&!e.has_variants){if(e.on_backorder)return`
					<br>
					<span class="out-of-stock mt-2" style="color: var(--primary-color)">
						${__("Available on backorder")}
					</span>
				`;if(!e.in_stock)return`
					<br>
					<span class="out-of-stock mt-2">${__("Out of stock")}</span>
				`}return""}get_wishlist_icon(e){let t=e.wished?"wished":"not-wished";return`
			<div class="like-action-list ${e.wished?"like-action-wished":""}"
				data-item-code="${e.item_code}">
				<svg class="icon sm">
					<use class="${t} wish-icon" href="#icon-heart"></use>
				</svg>
			</div>
		`}get_primary_button(e,t){return e.has_variants?`
				<a href="/${e.route||"#"}">
					<div class="btn btn-sm btn-explore-variants btn mb-0 mt-0">
						${__("Explore")}
					</div>
				</a>
			`:t.enabled&&(t.allow_items_not_in_stock||e.in_stock)?`
				<div id="${e.name}" class="btn
					btn-sm btn-primary btn-add-to-cart-list mb-0
					${e.in_cart?"hidden":""}"
					data-item-code="${e.item_code}"
					style="margin-top: 0px !important; max-height: 30px; float: right;
						padding: 0.25rem 1rem; min-width: 135px;">
					<span class="mr-2">
						<svg class="icon icon-md">
							<use href="#icon-assets"></use>
						</svg>
					</span>
					${t.enable_checkout?__("Add to Cart"):__("Add to Quote")}
				</div>

				<div class="cart-indicator list-indicator ${e.in_cart?"":"hidden"}">
					1
				</div>

				<a href="/cart">
					<div id="${e.name}" class="btn
						btn-sm btn-primary btn-add-to-cart-list
						ml-4 go-to-cart mb-0 mt-0
						${e.in_cart?"":"hidden"}"
						data-item-code="${e.item_code}"
						style="padding: 0.25rem 1rem; min-width: 135px;">
						${t.enable_checkout?__("Go to Cart"):__("Go to Quote")}
					</div>
				</a>
			`:""}};erpnext.ProductView=class{constructor(e){Object.assign(this,e),this.preference=this.view_type,this.make()}make(e=!1){this.products_section.empty(),this.prepare_toolbar(),this.get_item_filter_data(e)}prepare_toolbar(){this.products_section.append(`
			<div class="toolbar d-flex">
			</div>
		`),this.prepare_search(),this.prepare_view_toggler(),new erpnext.ProductSearch}prepare_view_toggler(){(!$("#list").length||!$("#image-view").length)&&(this.render_view_toggler(),this.bind_view_toggler_actions(),this.set_view_state())}get_item_filter_data(e=!1){let t=this;this.from_filters=e;let s=this.get_query_filters();this.disable_view_toggler(!0),frappe.call({method:"erpnext.e_commerce.api.get_product_filter_data",args:{query_args:s},callback:function(i){!i||i.exc||!i.message||i.message.exc?t.render_no_products_section(!0):(t.item_group&&i.message.sub_categories.length&&t.render_item_sub_categories(i.message.sub_categories),i.message.items.length?(t.re_render_discount_filters(i.message.filters.discount_filters),t.render_list_view(i.message.items,i.message.settings),t.render_grid_view(i.message.items,i.message.settings),t.products=i.message.items,t.product_count=i.message.items_count):t.render_no_products_section(),e||(t.bind_filters(),t.restore_filters_state()),t.add_paging_section(i.message.settings)),t.disable_view_toggler(!1)}})}disable_view_toggler(e=!1){$("#list").prop("disabled",e),$("#image-view").prop("disabled",e)}render_grid_view(e,t){let s=this;this.prepare_product_area_wrapper("grid"),new erpnext.ProductGrid({items:e,products_section:$("#products-grid-area"),settings:t,preference:s.preference})}render_list_view(e,t){let s=this;this.prepare_product_area_wrapper("list"),new erpnext.ProductList({items:e,products_section:$("#products-list-area"),settings:t,preference:s.preference})}prepare_product_area_wrapper(e){let t=e=="list"?"ml-2":"",s=e=="list"?"mt-6":"mt-minus-1";return this.products_section.append(`
			<br>
			<div id="products-${e}-area" class="row products-list ${s} ${t}"></div>
		`)}get_query_filters(){let e=frappe.utils.get_query_params(),{field_filters:t,attribute_filters:s}=e;return t=t?JSON.parse(t):{},s=s?JSON.parse(s):{},{field_filters:t,attribute_filters:s,item_group:this.item_group,start:e.start||null,from_filters:this.from_filters||!1}}add_paging_section(e){if($(".product-paging-area").remove(),this.products){let t=`
				<div class="row product-paging-area mt-5">
					<div class="col-3">
					</div>
					<div class="col-9 text-right">
			`,s=frappe.utils.get_query_params(),i=s.start?cint(JSON.parse(s.start)):0,r=e.products_per_page||0,a=i>0?"":"disabled",n=this.product_count>r?"":"disabled";t+=`
				<button class="btn btn-default btn-prev" data-start="${i-r}"
					style="float: left" ${a}>
					${__("Prev")}
				</button>`,t+=`
				<button class="btn btn-default btn-next" data-start="${i+r}"
					${n}>
					${__("Next")}
				</button>
			`,t+="</div></div>",$(".page_content").append(t),this.bind_paging_action()}}prepare_search(){$(".toolbar").append(`
			<div class="input-group col-8 p-0">
				<div class="dropdown w-100" id="dropdownMenuSearch">
					<input type="search" name="query" id="search-box" class="form-control font-md"
						placeholder="Search for Products"
						aria-label="Product" aria-describedby="button-addon2">
					<div class="search-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor" stroke-width="2" stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-search">
							<circle cx="11" cy="11" r="8"></circle>
							<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
						</svg>
					</div>
					<!-- Results dropdown rendered in product_search.js -->
				</div>
			</div>
		`)}render_view_toggler(){$(".toolbar").append('<div class="toggle-container col-4 p-0"></div>'),["btn-list-view","btn-grid-view"].forEach(e=>{let t=e==="btn-list-view"?"list":"image-view";$(".toggle-container").append(`
				<div class="form-group mb-0" id="toggle-view">
					<button id="${t}" class="btn ${e} mr-2">
						<span>
							<svg class="icon icon-md">
								<use href="#icon-${t}"></use>
							</svg>
						</span>
					</button>
				</div>
			`)})}bind_view_toggler_actions(){$("#list").click(function(){let e=$(this);e.removeClass("btn-primary"),e.addClass("btn-primary"),$(".btn-grid-view").removeClass("btn-primary"),$("#products-grid-area").addClass("hidden"),$("#products-list-area").removeClass("hidden"),localStorage.setItem("product_view","List View")}),$("#image-view").click(function(){let e=$(this);e.removeClass("btn-primary"),e.addClass("btn-primary"),$(".btn-list-view").removeClass("btn-primary"),$("#products-list-area").addClass("hidden"),$("#products-grid-area").removeClass("hidden"),localStorage.setItem("product_view","Grid View")})}set_view_state(){this.preference==="List View"?($("#list").addClass("btn-primary"),$("#image-view").removeClass("btn-primary")):($("#image-view").addClass("btn-primary"),$("#list").removeClass("btn-primary"))}bind_paging_action(){let e=this;$(".btn-prev, .btn-next").click(t=>{let s=$(t.target);e.from_filters=!1,s.prop("disabled",!0);let i=s.data("start"),r=frappe.utils.get_query_params();r.start=i;let a=window.location.pathname+"?"+frappe.utils.get_url_from_dict(r);window.location.href=a})}re_render_discount_filters(e){this.get_discount_filter_html(e),this.from_filters&&this.bind_discount_filter_action(),this.restore_discount_filter()}get_discount_filter_html(e){if($("#discount-filters").remove(),e){$("#product-filters").append(`
				<div id="discount-filters" class="mb-4 filter-block pb-5">
					<div class="filter-label mb-3">${__("Discounts")}</div>
				</div>
			`);let t='<div class="filter-options">';e.forEach(s=>{t+=`
					<div class="checkbox">
						<label data-value="${s[0]}">
							<input type="radio"
								class="product-filter discount-filter"
								name="discount" id="${s[0]}"
								data-filter-name="discount"
								data-filter-value="${s[0]}"
								style="width: 14px !important"
							>
								<span class="label-area" for="${s[0]}">
									${s[1]}
								</span>
						</label>
					</div>
				`}),t+="</div>",$("#discount-filters").append(t)}}restore_discount_filter(){let t=frappe.utils.get_query_params().field_filters;if(!!t&&(t=JSON.parse(t),t&&t.discount)){let i=t.discount.map(r=>`input[data-filter-name="discount"][data-filter-value="${r}"]`).join(",");$(i).prop("checked",!0),this.field_filters=t}}bind_discount_filter_action(){let e=this;$(".discount-filter").on("change",t=>{let s=$(t.target),i=s.is(":checked"),{filterValue:r}=s.data();delete this.field_filters.discount,i&&(this.field_filters.discount=[],this.field_filters.discount.push(r)),this.field_filters.discount.length===0&&delete this.field_filters.discount,e.change_route_with_filters()})}bind_filters(){let e=this;this.field_filters={},this.attribute_filters={},$(".product-filter").on("change",t=>{e.from_filters=!0;let s=$(t.target),i=s.is(":checked");if(s.is(".attribute-filter")){let{attributeName:r,attributeValue:a}=s.data();i?(this.attribute_filters[r]=this.attribute_filters[r]||[],this.attribute_filters[r].push(a)):(this.attribute_filters[r]=this.attribute_filters[r]||[],this.attribute_filters[r]=this.attribute_filters[r].filter(n=>n!==a)),this.attribute_filters[r].length===0&&delete this.attribute_filters[r]}else if(s.is(".field-filter")||s.is(".discount-filter")){let{filterName:r,filterValue:a}=s.data();s.is(".discount-filter")&&delete this.field_filters.discount,i?(this.field_filters[r]=this.field_filters[r]||[],in_list(this.field_filters[r],a)||this.field_filters[r].push(a)):(this.field_filters[r]=this.field_filters[r]||[],this.field_filters[r]=this.field_filters[r].filter(n=>n!==a)),this.field_filters[r].length===0&&delete this.field_filters[r]}e.change_route_with_filters()}),$(".filter-lookup-input").on("keydown",frappe.utils.debounce(t=>{let s=$(t.target),i=(s.val()||"").toLowerCase(),r=s.next(".filter-options");r.find(".filter-lookup-wrapper").show(),r.find(".filter-lookup-wrapper").each((a,n)=>{let c=$(n);c.data("value").toLowerCase().includes(i)||c.hide()})},300))}change_route_with_filters(){let e=frappe.utils.get_query_params(),t=this.if_key_exists(e.start)||0;this.from_filters&&(t=0);let s=this.get_query_string({start:t,field_filters:JSON.stringify(this.if_key_exists(this.field_filters)),attribute_filters:JSON.stringify(this.if_key_exists(this.attribute_filters))});window.history.pushState("filters","",`${location.pathname}?`+s),$(".page_content input").prop("disabled",!0),this.make(!0),$(".page_content input").prop("disabled",!1)}restore_filters_state(){let e=frappe.utils.get_query_params(),{field_filters:t,attribute_filters:s}=e;if(t){t=JSON.parse(t);for(let i in t){let a=t[i].map(n=>`input[data-filter-name="${i}"][data-filter-value="${n}"]`).join(",");$(a).prop("checked",!0)}this.field_filters=t}if(s){s=JSON.parse(s);for(let i in s){let a=s[i].map(n=>`input[data-attribute-name="${i}"][data-attribute-value="${n}"]`).join(",");$(a).prop("checked",!0)}this.attribute_filters=s}}render_no_products_section(e=!1){let t=`
			<div class="mt-4 w-100 alert alert-error font-md">
				Something went wrong. Please refresh or contact us.
			</div>
		`,s=`
			<div class="cart-empty frappe-card mt-4">
				<div class="cart-empty-state">
					<img src="/assets/erpnext/images/ui-states/cart-empty-state.png" alt="Empty Cart">
				</div>
				<div class="cart-empty-message mt-4">${__("No products found")}</p>
			</div>
		`;this.products_section.append(e?t:s)}render_item_sub_categories(e){if(e&&e.length){let t=`
				<div class="sub-category-container scroll-categories">
			`;e.forEach(s=>{t+=`
					<a href="/${s.route||"#"}" style="text-decoration: none;">
						<div class="category-pill">
							${s.name}
						</div>
					</a>
				`}),t+="</div>",$("#product-listing").prepend(t)}}get_query_string(e){let t=new URLSearchParams;for(let s in e){let i=e[s];i&&t.append(s,i)}return t.toString()}if_key_exists(e){let t=!1;for(let s in e)if(Object.prototype.hasOwnProperty.call(e,s)&&e[s]){t=!0;break}return t?e:void 0}};erpnext.ProductGrid=class{constructor(e){Object.assign(this,e),this.preference!=="Grid View"&&this.products_section.addClass("hidden"),this.products_section.empty(),this.make()}make(){let e=this,t="";this.items.forEach(i=>{let r=i.web_item_name||i.item_name||i.item_code||"";r=r.length>90?r.substr(0,90)+"...":r,t+='<div class="col-sm-4 item-card"><div class="card text-left">',t+=e.get_image_html(i,r),t+=e.get_card_body_html(i,r,e.settings),t+="</div></div>"}),this.products_section.append(t)}get_image_html(e,t){let s=e.website_image;return s?`
				<div class="card-img-container">
					<a href="/${e.route||"#"}" style="text-decoration: none;">
						<img class="card-img" src="${s}" alt="${t}">
					</a>
				</div>
			`:`
				<div class="card-img-container">
					<a href="/${e.route||"#"}" style="text-decoration: none;">
						<div class="card-img-top no-image">
							${frappe.get_abbr(t)}
						</div>
					</a>
				</div>
			`}get_card_body_html(e,t,s){let i=`
			<div class="card-body text-left card-body-flex" style="width:100%">
				<div style="margin-top: 1rem; display: flex;">
		`;return i+=this.get_title(e,t),e.has_variants||(s.enable_wishlist&&(i+=this.get_wishlist_icon(e)),s.enabled&&(i+=this.get_cart_indicator(e))),i+="</div>",i+=`<div class="product-category">${e.item_group||""}</div>`,e.formatted_price&&(i+=this.get_price_html(e)),i+=this.get_stock_availability(e,s),i+=this.get_primary_button(e,s),i+="</div>",i}get_title(e,t){return`
			<a href="/${e.route||"#"}">
				<div class="product-title">
					${t||""}
				</div>
			</a>
		`}get_wishlist_icon(e){let t=e.wished?"wished":"not-wished";return`
			<div class="like-action ${e.wished?"like-action-wished":""}"
				data-item-code="${e.item_code}">
				<svg class="icon sm">
					<use class="${t} wish-icon" href="#icon-heart"></use>
				</svg>
			</div>
		`}get_cart_indicator(e){return`
			<div class="cart-indicator ${e.in_cart?"":"hidden"}" data-item-code="${e.item_code}">
				1
			</div>
		`}get_price_html(e){let t=`
			<div class="product-price">
				${e.formatted_price||""}
		`;return e.formatted_mrp&&(t+=`
				<small class="striked-price">
					<s>${e.formatted_mrp?e.formatted_mrp.replace(/ +/g,""):""}</s>
				</small>
				<small class="ml-1 product-info-green">
					${e.discount} OFF
				</small>
			`),t+="</div>",t}get_stock_availability(e,t){if(t.show_stock_availability&&!e.has_variants){if(e.on_backorder)return`
					<span class="out-of-stock mb-2 mt-1" style="color: var(--primary-color)">
						${__("Available on backorder")}
					</span>
				`;if(!e.in_stock)return`
					<span class="out-of-stock mb-2 mt-1">
						${__("Out of stock")}
					</span>
				`}return""}get_primary_button(e,t){return e.has_variants?`
				<a href="/${e.route||"#"}">
					<div class="btn btn-sm btn-explore-variants w-100 mt-4">
						${__("Explore")}
					</div>
				</a>
			`:t.enabled&&(t.allow_items_not_in_stock||e.in_stock)?`
				<div id="${e.name}" class="btn
					btn-sm btn-primary btn-add-to-cart-list
					w-100 mt-2 ${e.in_cart?"hidden":""}"
					data-item-code="${e.item_code}">
					<span class="mr-2">
						<svg class="icon icon-md">
							<use href="#icon-assets"></use>
						</svg>
					</span>
					${t.enable_checkout?__("Add to Cart"):__("Add to Quote")}
				</div>

				<a href="/cart">
					<div id="${e.name}" class="btn
						btn-sm btn-primary btn-add-to-cart-list
						w-100 mt-4 go-to-cart-grid
						${e.in_cart?"":"hidden"}"
						data-item-code="${e.item_code}">
						${t.enable_checkout?__("Go to Cart"):__("Go to Quote")}
					</div>
				</a>
			`:""}};erpnext.ProductSearch=class{constructor(e){$.extend(this,e),this.MAX_RECENT_SEARCHES=4,this.search_box_id=this.search_box_id||"#search-box",this.searchBox=$(this.search_box_id),this.setupSearchDropDown(),this.bindSearchAction()}setupSearchDropDown(){this.search_area=$("#dropdownMenuSearch"),this.setupSearchResultContainer(),this.populateRecentSearches()}bindSearchAction(){let e=this;this.searchBox.on("focus",()=>{this.search_dropdown.removeClass("hidden")}),$("body").on("click",t=>{let s=$(t.target).closest(this.search_box_id).length,i=$(t.target).closest("#search-results-container").length,r=this.search_dropdown.hasClass("hidden");!s&&!i&&!r&&this.search_dropdown.addClass("hidden")}),this.searchBox.on("input",t=>{let s=t.target.value;s.length==0&&(e.populateResults(null),e.populateCategoriesList(null)),!(s.length<3||!s.length)&&(frappe.call({method:"erpnext.templates.pages.product_search.search",args:{query:s},callback:i=>{let r=null,a=null;r=i.message?i.message.product_results:null,e.populateResults(r),e.category_container&&(a=i.message?i.message.category_results:null,e.populateCategoriesList(a)),(!$.isEmptyObject(r)||!$.isEmptyObject(a))&&e.setRecentSearches(s)}}),this.search_dropdown.removeClass("hidden"))})}setupSearchResultContainer(){this.search_dropdown=this.search_area.append(`
			<div class="overflow-hidden shadow dropdown-menu w-100 hidden"
				id="search-results-container"
				aria-labelledby="dropdownMenuSearch"
				style="display: flex; flex-direction: column;">
			</div>
		`).find("#search-results-container"),this.setupCategoryContainer(),this.setupProductsContainer(),this.setupRecentsContainer()}setupProductsContainer(){this.products_container=this.search_dropdown.append(`
			<div id="product-results mt-2">
				<div id="product-scroll" style="overflow: scroll; max-height: 300px">
				</div>
			</div>
		`).find("#product-scroll")}setupCategoryContainer(){this.category_container=this.search_dropdown.append(`
			<div class="category-container mt-2 mb-1">
				<div class="category-chips">
				</div>
			</div>
		`).find(".category-chips")}setupRecentsContainer(){let e=this.search_dropdown.append(`
			<div class="mb-2 mt-2 recent-searches">
				<div>
					<b>${__("Recent")}</b>
				</div>
			</div>
		`).find(".recent-searches");this.recents_container=e.append(`
			<div id="recents" style="padding: .25rem 0 1rem 0;">
			</div>
		`).find("#recents")}getRecentSearches(){return JSON.parse(localStorage.getItem("recent_searches")||"[]")}attachEventListenersToChips(){let e=this,t=$(".recent-search");window.chips=t;for(let s of t)s.addEventListener("click",()=>{e.searchBox[0].value=s.innerText.trim(),e.searchBox.trigger("input"),e.searchBox.focus()})}setRecentSearches(e){let t=this.getRecentSearches();t.length>=this.MAX_RECENT_SEARCHES&&t.splice(0,1),!(t.indexOf(e)>=0)&&(t.push(e),localStorage.setItem("recent_searches",JSON.stringify(t)),this.populateRecentSearches())}populateRecentSearches(){let e=this.getRecentSearches();if(!e.length){this.recents_container.html('<span class=""text-muted">No searches yet.</span>');return}let t="";e.forEach(s=>{t+=`
				<div class="recent-search mr-1" style="font-size: 13px">
					<span class="mr-2">
						<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="var(--gray-500)"" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M8.00027 5.20947V8.00017L10 10" stroke="var(--gray-500)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
					${s}
				</div>
			`}),this.recents_container.html(t),this.attachEventListenersToChips()}populateResults(e){if(!e||e.length===0){let s="";this.products_container.html(s);return}let t="";e.forEach(s=>{t+=`
				<div class="dropdown-item" style="display: flex;">
					<img class="item-thumb col-2" src=${s.thumbnail||"/assets/erpnext/images/ui-states/cart-empty-state.png"} />
					<div class="col-9" style="white-space: normal;">
						<a href="/${s.route}">${s.web_item_name}</a><br>
						<span class="brand-line">${s.brand?"by "+s.brand:""}</span>
					</div>
				</div>
			`}),this.products_container.html(t)}populateCategoriesList(e){if(!e||e.length===0){let s=`
				<div class="category-container mt-2">
					<div class="category-chips">
					</div>
				</div>
			`;this.category_container.html(s);return}let t=`
			<div class="mb-2">
				<b>${__("Categories")}</b>
			</div>
		`;e.forEach(s=>{t+=`
				<a href="/${s.route}" class="btn btn-sm category-chip mr-2 mb-2"
					style="font-size: 13px" role="button">
				${s.name}
				</button>
			`}),this.category_container.html(t)}};})();
//# sourceMappingURL=erpnext-web.bundle.J5D7LDQM.js.map
