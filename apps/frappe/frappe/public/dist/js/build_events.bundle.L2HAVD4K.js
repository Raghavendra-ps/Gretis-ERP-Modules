(()=>{var B={name:"BuildError",data(){return{data:null}},methods:{show(t){this.data=t},hide(){this.data=null},open_in_editor(t){frappe.socketio.socket.emit("open_in_editor",t)},error_component(t,r){let o=this.data.error.errors[r].location,i=`${o.file}:${o.line}:${o.column}`;return{template:`<div>${t.replace(" > "+i,` &gt; <a class="file-link" @click="open">${i}</a>`)}</div>`,methods:{open(){frappe.socketio.socket.emit("open_in_editor",o)}}}}}},v=function(){var t=this,r=t.$createElement,o=t._self._c||r;return o("div",{directives:[{name:"show",rawName:"v-show",value:t.data,expression:"data"}],staticClass:"build-error-overlay",on:{click:function(i){if(i.target!==i.currentTarget)return null;t.data=null}}},[t.data?o("div",{staticClass:"window"},[t._l(t.data.formatted,function(i,s){return o("div",{key:s},[o("pre",{staticClass:"frame"},[o(t.error_component(i,s),{tag:"component"})],1)])}),t._v(" "),o("pre",{staticClass:"stack"},[t._v(t._s(t.data.stack))])],2):t._e()])},S=[];v._withStripped=!0;var k=function(t){!t||t("data-v-0b3de6b7_0",{source:`
.build-error-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	margin: 0;
	background: rgba(0, 0, 0, 0.66);
	--monospace: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
		monospace;
	--dim: var(--gray-400);
}
.window {
	font-family: var(--monospace);
	line-height: 1.5;
	width: 800px;
	color: #d8d8d8;
	margin: 30px auto;
	padding: 25px 40px;
	position: relative;
	background: #181818;
	border-radius: 6px 6px 8px 8px;
	box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
	overflow: hidden;
	border-top: 8px solid var(--red);
}
pre {
	font-family: var(--monospace);
	font-size: 13px;
	margin-top: 0;
	margin-bottom: 1em;
	overflow-x: auto;
	scrollbar-width: none;
}
code {
	font-size: 13px;
	font-family: var(--monospace);
	color: var(--yellow);
}
.message {
	line-height: 1.3;
	font-weight: 600;
	white-space: pre-wrap;
}
.frame {
	color: var(--yellow);
}
.stack {
	font-size: 13px;
	color: var(--dim);
}
.file-link {
	text-decoration: underline !important;
	cursor: pointer;
}
`,map:{version:3,sources:["frappe/public/js/frappe/build_events/BuildError.vue"],names:[],mappings:";AAoDA;CACA,eAAA;CACA,MAAA;CACA,OAAA;CACA,WAAA;CACA,YAAA;CACA,aAAA;CACA,SAAA;CACA,+BAAA;CACA;WACA;CACA,sBAAA;AACA;AACA;CACA,6BAAA;CACA,gBAAA;CACA,YAAA;CACA,cAAA;CACA,iBAAA;CACA,kBAAA;CACA,kBAAA;CACA,mBAAA;CACA,8BAAA;CACA,2EAAA;CACA,gBAAA;CACA,gCAAA;AACA;AAEA;CACA,6BAAA;CACA,eAAA;CACA,aAAA;CACA,kBAAA;CACA,gBAAA;CACA,qBAAA;AACA;AACA;CACA,eAAA;CACA,6BAAA;CACA,oBAAA;AACA;AAEA;CACA,gBAAA;CACA,gBAAA;CACA,qBAAA;AACA;AACA;CACA,oBAAA;AACA;AACA;CACA,eAAA;CACA,iBAAA;AACA;AACA;CACA,qCAAA;CACA,eAAA;AACA",file:"BuildError.vue",sourcesContent:[`<template>
	<div class="build-error-overlay" @click.self="data = null" v-show="data">
		<div class="window" v-if="data">
			<div v-for="(error, i) in data.formatted" :key="i">
				<!-- prettier-ignore -->
				<pre class="frame"><component :is="error_component(error, i)" /></pre>
			</div>
			<pre class="stack">{{ data.stack }}</pre>
		</div>
	</div>
</template>
<script>
export default {
	name: "BuildError",
	data() {
		return {
			data: null
		};
	},
	methods: {
		show(data) {
			this.data = data;
		},
		hide() {
			this.data = null;
		},
		open_in_editor(location) {
			frappe.socketio.socket.emit("open_in_editor", location);
		},
		error_component(error, i) {
			let location = this.data.error.errors[i].location;
			let location_string = \`\${location.file}:\${location.line}:\${
				location.column
			}\`;
			let template = error.replace(
				" > " + location_string,
				\` &gt; <a class="file-link" @click="open">\${location_string}</a>\`
			);

			return {
				template: \`<div>\${template}</div>\`,
				methods: {
					open() {
						frappe.socketio.socket.emit("open_in_editor", location);
					}
				}
			};
		}
	}
};
<\/script>
<style>
.build-error-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	margin: 0;
	background: rgba(0, 0, 0, 0.66);
	--monospace: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
		monospace;
	--dim: var(--gray-400);
}
.window {
	font-family: var(--monospace);
	line-height: 1.5;
	width: 800px;
	color: #d8d8d8;
	margin: 30px auto;
	padding: 25px 40px;
	position: relative;
	background: #181818;
	border-radius: 6px 6px 8px 8px;
	box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
	overflow: hidden;
	border-top: 8px solid var(--red);
}

pre {
	font-family: var(--monospace);
	font-size: 13px;
	margin-top: 0;
	margin-bottom: 1em;
	overflow-x: auto;
	scrollbar-width: none;
}
code {
	font-size: 13px;
	font-family: var(--monospace);
	color: var(--yellow);
}

.message {
	line-height: 1.3;
	font-weight: 600;
	white-space: pre-wrap;
}
.frame {
	color: var(--yellow);
}
.stack {
	font-size: 13px;
	color: var(--dim);
}
.file-link {
	text-decoration: underline !important;
	cursor: pointer;
}
</style>
`]},media:void 0})},R=void 0,E=void 0,T=!1;function j(t,r,o,i,s,l,n,u,d,c){let e=(typeof o=="function"?o.options:o)||{};e.__file="frappe/public/js/frappe/build_events/BuildError.vue",e.render||(e.render=t.render,e.staticRenderFns=t.staticRenderFns,e._compiled=!0,s&&(e.functional=!0)),e._scopeId=i;{let A;if(r&&(A=n?function(a){r.call(this,c(a,this.$root.$options.shadowRoot))}:function(a){r.call(this,u(a))}),A!==void 0)if(e.functional){let a=e.render;e.render=function(m,p){return A.call(p),a(m,p)}}else{let a=e.beforeCreate;e.beforeCreate=a?[].concat(a,A):[A]}}return e}function h(){let t=h.styles||(h.styles={}),r=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(i,s){if(document.querySelector('style[data-vue-ssr-id~="'+i+'"]'))return;let l=r?s.media||"default":i,n=t[l]||(t[l]={ids:[],parts:[],element:void 0});if(!n.ids.includes(i)){let u=s.source,d=n.ids.length;if(n.ids.push(i),r&&(n.element=n.element||document.querySelector("style[data-group="+l+"]")),!n.element){let c=document.head||document.getElementsByTagName("head")[0],e=n.element=document.createElement("style");e.type="text/css",s.media&&e.setAttribute("media",s.media),r&&(e.setAttribute("data-group",l),e.setAttribute("data-next-index","0")),c.appendChild(e)}if(r&&(d=parseInt(n.element.getAttribute("data-next-index")),n.element.setAttribute("data-next-index",d+1)),n.element.styleSheet)n.parts.push(u),n.element.styleSheet.cssText=n.parts.filter(Boolean).join(`
`);else{let c=document.createTextNode(u),e=n.element.childNodes;e[d]&&n.element.removeChild(e[d]),e.length?n.element.insertBefore(c,e[d]):n.element.appendChild(c)}}}}var I=j({render:v,staticRenderFns:S},k,B,R,T,E,!1,h,void 0,void 0),g=I;var N={name:"BuildSuccess",data(){return{is_shown:!1,live_reload:!1}},methods:{show(t){t.live_reload&&(this.live_reload=!0,this.reload()),this.is_shown=!0,this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.hide()},1e4)},hide(){this.is_shown=!1},reload(){window.location.reload()}}},x=function(){var t=this,r=t.$createElement,o=t._self._c||r;return t.is_shown?o("div",{staticClass:"flex justify-between build-success-message align-center"},[t._v(`
	Compiled successfully
	`),t.live_reload?t._e():o("a",{staticClass:"ml-4 text-white underline",attrs:{href:"/"},on:{click:function(i){return i.preventDefault(),t.reload.apply(null,arguments)}}},[t._v(`
		Refresh
	`)])]):t._e()},z=[];x._withStripped=!0;var F=function(t){!t||t("data-v-702ce366_0",{source:`
.build-success-message {
	position: fixed;
	z-index: 9999;
	bottom: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.6);
	border-radius: var(--border-radius);
	padding: 0.5rem 1rem;
	color: white;
	font-weight: 500;
	margin: 1rem;
}
`,map:{version:3,sources:["frappe/public/js/frappe/build_events/BuildSuccess.vue"],names:[],mappings:";AAgDA;CACA,eAAA;CACA,aAAA;CACA,SAAA;CACA,QAAA;CACA,8BAAA;CACA,mCAAA;CACA,oBAAA;CACA,YAAA;CACA,gBAAA;CACA,YAAA;AACA",file:"BuildSuccess.vue",sourcesContent:[`<template>
	<div
		v-if="is_shown"
		class="flex justify-between build-success-message align-center"
	>
		Compiled successfully
		<a
			v-if="!live_reload"
			class="ml-4 text-white underline" href="/" @click.prevent="reload"
		>
			Refresh
		</a>
	</div>
</template>
<script>
export default {
	name: "BuildSuccess",
	data() {
		return {
			is_shown: false,
			live_reload: false,
		};
	},
	methods: {
		show(data) {
			if (data.live_reload) {
				this.live_reload = true;
				this.reload();
			}

			this.is_shown = true;
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.timeout = setTimeout(() => {
				this.hide();
			}, 10000);
		},
		hide() {
			this.is_shown = false;
		},
		reload() {
			window.location.reload();
		}
	}
};
<\/script>
<style>
.build-success-message {
	position: fixed;
	z-index: 9999;
	bottom: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.6);
	border-radius: var(--border-radius);
	padding: 0.5rem 1rem;
	color: white;
	font-weight: 500;
	margin: 1rem;
}
</style>
`]},media:void 0})},U=void 0,M=void 0,O=!1;function L(t,r,o,i,s,l,n,u,d,c){let e=(typeof o=="function"?o.options:o)||{};e.__file="frappe/public/js/frappe/build_events/BuildSuccess.vue",e.render||(e.render=t.render,e.staticRenderFns=t.staticRenderFns,e._compiled=!0,s&&(e.functional=!0)),e._scopeId=i;{let A;if(r&&(A=n?function(a){r.call(this,c(a,this.$root.$options.shadowRoot))}:function(a){r.call(this,u(a))}),A!==void 0)if(e.functional){let a=e.render;e.render=function(m,p){return A.call(p),a(m,p)}}else{let a=e.beforeCreate;e.beforeCreate=a?[].concat(a,A):[A]}}return e}function C(){let t=C.styles||(C.styles={}),r=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(i,s){if(document.querySelector('style[data-vue-ssr-id~="'+i+'"]'))return;let l=r?s.media||"default":i,n=t[l]||(t[l]={ids:[],parts:[],element:void 0});if(!n.ids.includes(i)){let u=s.source,d=n.ids.length;if(n.ids.push(i),r&&(n.element=n.element||document.querySelector("style[data-group="+l+"]")),!n.element){let c=document.head||document.getElementsByTagName("head")[0],e=n.element=document.createElement("style");e.type="text/css",s.media&&e.setAttribute("media",s.media),r&&(e.setAttribute("data-group",l),e.setAttribute("data-next-index","0")),c.appendChild(e)}if(r&&(d=parseInt(n.element.getAttribute("data-next-index")),n.element.setAttribute("data-next-index",d+1)),n.element.styleSheet)n.parts.push(u),n.element.styleSheet.cssText=n.parts.filter(Boolean).join(`
`);else{let c=document.createTextNode(u),e=n.element.childNodes;e[d]&&n.element.removeChild(e[d]),e.length?n.element.insertBefore(c,e[d]):n.element.appendChild(c)}}}}var q=L({render:x,staticRenderFns:z},F,N,U,O,M,!1,C,void 0,void 0),b=q;var w=$("#build-events-overlay"),f=null,_=null;frappe.realtime.on("build_event",t=>{if(t.success){let r=t.changed_files;if(Array.isArray(r)){for(let o of r)if(o.includes(".bundle.")){let i=o.split(".bundle.");if(i.length===2){let s=i[0].split("/").slice(-1)[0];frappe.assets.executed_=frappe.assets.executed_.filter(l=>!l.includes(`${s}.bundle`))}}}frappe.call("frappe.sessions.get_boot_assets_json").then(o=>{o.message&&(frappe.boot.assets_json=o.message,frappe.hot_update&&frappe.hot_update.forEach(i=>{i()}))}),V(t)}else t.error&&W(t)});function V(t){if(_&&_.hide(),!f){let r=$('<div class="build-success-container">').appendTo(w).get(0);f=new Vue({el:r,render:i=>i(b)}).$children[0]}f.show(t)}function W(t){if(f&&f.hide(),!_){let r=$('<div class="build-error-container">').appendTo(w).get(0);_=new Vue({el:r,render:i=>i(g)}).$children[0]}_.show(t)}})();
//# sourceMappingURL=build_events.bundle.L2HAVD4K.js.map
