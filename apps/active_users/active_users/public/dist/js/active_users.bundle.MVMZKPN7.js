(()=>{frappe.provide("frappe._active_users");frappe.provide("frappe.dom");var l=class{constructor(){if(frappe.desk==null){frappe.throw(__("Active Users plugin can not be used outside Desk."));return}this.is_online=frappe.is_online?frappe.is_online():!1,this.on_online=null,this.on_offline=null;var i=this;$(window).on("online",function(){i.is_online=!0,i.on_online&&i.on_online.call(i),i.on_online=null}),$(window).on("offline",function(){i.is_online=!1,i.on_offline&&i.on_offline.call(i),i.on_offline=null}),this.settings={},this.data=[],this.setup()}destroy(){this.clear_sync(),this.$loading&&this.$loading.hide(),this.$reload&&this.$reload.off("click").hide(),this.$app&&this.$app.remove(),this.data=this._on_online=this._on_offline=this._syncing=null,this.$app=this.$body=this.$loading=this.$footer=this.$reload=null}error(i,s){this.destroy(),frappe.throw(__(i,s))}request(i,s,n){var t=this;return new Promise(function(a,r){let o={method:"active_users.utils.api."+i,async:!0,freeze:!1,callback:function(e){if(e&&$.isPlainObject(e)&&(e=e.message||e),!$.isPlainObject(e)){t.error("Active Users plugin received invalid "+n+"."),r();return}if(e.error){t.error(e.message),r();return}let c=s&&s.call(t,e);a(c||e)}};try{frappe.call(o)}catch(e){(console.error||console.log)("[Active Users]",e),this.error("An error has occurred while sending a request."),r()}})}setup(){if(!this.is_online){this.on_online=this.setup;return}var i=this;this.sync_settings().then(function(){!i.settings.enabled||Promise.resolve().then(function(){i.setup_display()}).then(function(){i.sync_reload()})})}sync_settings(){return this.request("get_settings",function(i){i.enabled=cint(i.enabled),i.refresh_interval=cint(i.refresh_interval)*6e4,i.allow_manual_refresh=cint(i.allow_manual_refresh),this.settings=i},"settings")}setup_display(){let i=__("Active Users");this.$app=$(`
            <li class="nav-item dropdown dropdown-notifications dropdown-mobile active-users-navbar-item" title="${i}">
                <a class="nav-link active-users-navbar-icon text-muted"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" data-persist="true"
                    href="#" onclick="return false;">
                    <span class="fa fa-user fa-lg fa-fw"></span>
                </a>
                <div class="dropdown-menu active-users-list" role="menu">
                    <div class="fluid-container">
                        <div class="row">
                            <div class="col active-users-list-header">${i}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col active-users-list-body">
                            <div class="active-users-list-loading">
                                <div class="active-users-list-loading-box"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col active-users-list-footer">
                            <div class="row">
                                <div class="col active-users-footer-text"></div>
                                <div class="col-auto active-users-footer-icon">
                                    <a href="#" class="active-users-footer-reload">
                                        <span class="fa fa-refresh fa-md fa-fw"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `),$("header.navbar > .container > .navbar-collapse > ul.navbar-nav").prepend(this.$app.get(0)),this.$body=this.$app.find(".active-users-list-body").first(),this.$loading=this.$body.find(".active-users-list-loading").first().hide(),this.$footer=this.$app.find(".active-users-footer-text").first(),this.$reload=this.$app.find(".active-users-footer-reload").first(),this.setup_manual_sync()}setup_manual_sync(){if(!this.settings.allow_manual_refresh){this.$reload.off("click").hide();return}var i=this;this.$reload.show().click(function(s){s.preventDefault(),i._syncing||i.sync_reload()})}sync_reload(){if(!!this.is_online){this.clear_sync();var i=this;Promise.resolve().then(function(){i.sync_data()}).then(function(){i.setup_sync()})}}clear_sync(){this.sync_timer&&(window.clearInterval(this.sync_timer),this.sync_timer=null)}sync_data(){this._syncing=!0,this.data.length&&(this.$footer.html(""),this.$body.empty()),this.$loading.show(),this.request("get_users",function(i){this.data=i.users&&Array.isArray(i.users)?i.users:[],this.$loading.hide(),this.update_list(),this._syncing=null},"users list")}setup_sync(){var i=this;this.sync_timer=window.setInterval(function(){i.sync_data()},this.settings.refresh_interval)}update_settings(){if(!this.is_online){this.on_online=this.update_settings;return}var i=this;this.sync_settings().then(function(){if(!i.settings.enabled){i.destroy();return}Promise.resolve().then(function(){i.setup_manual_sync()}).then(function(){i.sync_reload()})})}update_list(){var i=this;this.data.forEach(function(s){let n=frappe.get_avatar(null,s.full_name,s.user_image),t=s.full_name,a=$(`
                <div class="row active-users-list-item">
                    <div class="col-auto active-users-item-avatar">${n}</div>
                    <div class="col active-users-item-name">${t}</div>
                </div>
            `);i.$body.append(a.get(0))}),this.$footer.html(__("Total")+": "+this.data.length)}};frappe._active_users.init=function(){frappe._active_users._init&&frappe._active_users._init.destory(),frappe.desk!=null&&(frappe._active_users._init=new l)};$(document).ready(function(){frappe._active_users.init()});})();
//# sourceMappingURL=active_users.bundle.MVMZKPN7.js.map
