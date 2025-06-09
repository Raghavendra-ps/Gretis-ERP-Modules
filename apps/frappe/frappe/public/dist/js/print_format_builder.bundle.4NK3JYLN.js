(()=>{var wi=Object.create;var tn=Object.defineProperty,Si=Object.defineProperties,Ei=Object.getOwnPropertyDescriptor,Ti=Object.getOwnPropertyDescriptors,$i=Object.getOwnPropertyNames,In=Object.getOwnPropertySymbols,Oi=Object.getPrototypeOf,Rn=Object.prototype.hasOwnProperty,Ii=Object.prototype.propertyIsEnumerable;var Dn=(t,a,r)=>a in t?tn(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,Pn=(t,a)=>{for(var r in a||(a={}))Rn.call(a,r)&&Dn(t,r,a[r]);if(In)for(var r of In(a))Ii.call(a,r)&&Dn(t,r,a[r]);return t},Ln=(t,a)=>Si(t,Ti(a));var Mn=(t,a)=>()=>(a||t((a={exports:{}}).exports,a),a.exports);var Di=(t,a,r,e)=>{if(a&&typeof a=="object"||typeof a=="function")for(let c of $i(a))!Rn.call(t,c)&&c!==r&&tn(t,c,{get:()=>a[c],enumerable:!(e=Ei(a,c))||e.enumerable});return t};var _e=(t,a,r)=>(r=t!=null?wi(Oi(t)):{},Di(a||!t||!t.__esModule?tn(r,"default",{value:t,enumerable:!0}):r,t));var rn=Mn((en,nn)=>{(function(t,a){typeof en=="object"&&typeof nn!="undefined"?nn.exports=a():typeof define=="function"&&define.amd?define(a):(t=t||self,t.Sortable=a())})(en,function(){"use strict";function t(s){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?t=function(n){return typeof n}:t=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},t(s)}function a(s,n,i){return n in s?Object.defineProperty(s,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):s[n]=i,s}function r(){return r=Object.assign||function(s){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(s[o]=i[o])}return s},r.apply(this,arguments)}function e(s){for(var n=1;n<arguments.length;n++){var i=arguments[n]!=null?arguments[n]:{},o=Object.keys(i);typeof Object.getOwnPropertySymbols=="function"&&(o=o.concat(Object.getOwnPropertySymbols(i).filter(function(f){return Object.getOwnPropertyDescriptor(i,f).enumerable}))),o.forEach(function(f){a(s,f,i[f])})}return s}function c(s,n){if(s==null)return{};var i={},o=Object.keys(s),f,m;for(m=0;m<o.length;m++)f=o[m],!(n.indexOf(f)>=0)&&(i[f]=s[f]);return i}function u(s,n){if(s==null)return{};var i=c(s,n),o,f;if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(s);for(f=0;f<m.length;f++)o=m[f],!(n.indexOf(o)>=0)&&(!Object.prototype.propertyIsEnumerable.call(s,o)||(i[o]=s[o]))}return i}function l(s){return _(s)||p(s)||h()}function _(s){if(Array.isArray(s)){for(var n=0,i=new Array(s.length);n<s.length;n++)i[n]=s[n];return i}}function p(s){if(Symbol.iterator in Object(s)||Object.prototype.toString.call(s)==="[object Arguments]")return Array.from(s)}function h(){throw new TypeError("Invalid attempt to spread non-iterable instance")}var d="1.10.2";function b(s){if(typeof window!="undefined"&&window.navigator)return!!navigator.userAgent.match(s)}var g=b(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),w=b(/Edge/i),O=b(/firefox/i),R=b(/safari/i)&&!b(/chrome/i)&&!b(/android/i),X=b(/iP(ad|od|hone)/i),J=b(/chrome/i)&&b(/android/i),et={capture:!1,passive:!1};function B(s,n,i){s.addEventListener(n,i,!g&&et)}function M(s,n,i){s.removeEventListener(n,i,!g&&et)}function it(s,n){if(!!n){if(n[0]===">"&&(n=n.substring(1)),s)try{if(s.matches)return s.matches(n);if(s.msMatchesSelector)return s.msMatchesSelector(n);if(s.webkitMatchesSelector)return s.webkitMatchesSelector(n)}catch(i){return!1}return!1}}function N(s){return s.host&&s!==document&&s.host.nodeType?s.host:s.parentNode}function G(s,n,i,o){if(s){i=i||document;do{if(n!=null&&(n[0]===">"?s.parentNode===i&&it(s,n):it(s,n))||o&&s===i)return s;if(s===i)break}while(s=N(s))}return null}var z=/\s+/g;function F(s,n,i){if(s&&n)if(s.classList)s.classList[i?"add":"remove"](n);else{var o=(" "+s.className+" ").replace(z," ").replace(" "+n+" "," ");s.className=(o+(i?" "+n:"")).replace(z," ")}}function I(s,n,i){var o=s&&s.style;if(o){if(i===void 0)return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(s,""):s.currentStyle&&(i=s.currentStyle),n===void 0?i:i[n];!(n in o)&&n.indexOf("webkit")===-1&&(n="-webkit-"+n),o[n]=i+(typeof i=="string"?"":"px")}}function ct(s,n){var i="";if(typeof s=="string")i=s;else do{var o=I(s,"transform");o&&o!=="none"&&(i=o+" "+i)}while(!n&&(s=s.parentNode));var f=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return f&&new f(i)}function yt(s,n,i){if(s){var o=s.getElementsByTagName(n),f=0,m=o.length;if(i)for(;f<m;f++)i(o[f],f);return o}return[]}function tt(){var s=document.scrollingElement;return s||document.documentElement}function k(s,n,i,o,f){if(!(!s.getBoundingClientRect&&s!==window)){var m,v,y,S,E,L,D;if(s!==window&&s!==tt()?(m=s.getBoundingClientRect(),v=m.top,y=m.left,S=m.bottom,E=m.right,L=m.height,D=m.width):(v=0,y=0,S=window.innerHeight,E=window.innerWidth,L=window.innerHeight,D=window.innerWidth),(n||i)&&s!==window&&(f=f||s.parentNode,!g))do if(f&&f.getBoundingClientRect&&(I(f,"transform")!=="none"||i&&I(f,"position")!=="static")){var H=f.getBoundingClientRect();v-=H.top+parseInt(I(f,"border-top-width")),y-=H.left+parseInt(I(f,"border-left-width")),S=v+m.height,E=y+m.width;break}while(f=f.parentNode);if(o&&s!==window){var Z=ct(f||s),Y=Z&&Z.a,q=Z&&Z.d;Z&&(v/=q,y/=Y,D/=Y,L/=q,S=v+L,E=y+D)}return{top:v,left:y,bottom:S,right:E,width:D,height:L}}}function ut(s,n,i){for(var o=st(s,!0),f=k(s)[n];o;){var m=k(o)[i],v=void 0;if(i==="top"||i==="left"?v=f>=m:v=f<=m,!v)return o;if(o===tt())break;o=st(o,!1)}return!1}function bt(s,n,i){for(var o=0,f=0,m=s.children;f<m.length;){if(m[f].style.display!=="none"&&m[f]!==j.ghost&&m[f]!==j.dragged&&G(m[f],i.draggable,s,!1)){if(o===n)return m[f];o++}f++}return null}function ht(s,n){for(var i=s.lastElementChild;i&&(i===j.ghost||I(i,"display")==="none"||n&&!it(i,n));)i=i.previousElementSibling;return i||null}function V(s,n){var i=0;if(!s||!s.parentNode)return-1;for(;s=s.previousElementSibling;)s.nodeName.toUpperCase()!=="TEMPLATE"&&s!==j.clone&&(!n||it(s,n))&&i++;return i}function St(s){var n=0,i=0,o=tt();if(s)do{var f=ct(s),m=f.a,v=f.d;n+=s.scrollLeft*m,i+=s.scrollTop*v}while(s!==o&&(s=s.parentNode));return[n,i]}function gt(s,n){for(var i in s)if(!!s.hasOwnProperty(i)){for(var o in n)if(n.hasOwnProperty(o)&&n[o]===s[i][o])return Number(i)}return-1}function st(s,n){if(!s||!s.getBoundingClientRect)return tt();var i=s,o=!1;do if(i.clientWidth<i.scrollWidth||i.clientHeight<i.scrollHeight){var f=I(i);if(i.clientWidth<i.scrollWidth&&(f.overflowX=="auto"||f.overflowX=="scroll")||i.clientHeight<i.scrollHeight&&(f.overflowY=="auto"||f.overflowY=="scroll")){if(!i.getBoundingClientRect||i===document.body)return tt();if(o||n)return i;o=!0}}while(i=i.parentNode);return tt()}function Nt(s,n){if(s&&n)for(var i in n)n.hasOwnProperty(i)&&(s[i]=n[i]);return s}function Lt(s,n){return Math.round(s.top)===Math.round(n.top)&&Math.round(s.left)===Math.round(n.left)&&Math.round(s.height)===Math.round(n.height)&&Math.round(s.width)===Math.round(n.width)}var jt;function Ut(s,n){return function(){if(!jt){var i=arguments,o=this;i.length===1?s.call(o,i[0]):s.apply(o,i),jt=setTimeout(function(){jt=void 0},n)}}}function Ne(){clearTimeout(jt),jt=void 0}function je(s,n,i){s.scrollLeft+=n,s.scrollTop+=i}function x(s){var n=window.Polymer,i=window.jQuery||window.Zepto;return n&&n.dom?n.dom(s).cloneNode(!0):i?i(s).clone(!0)[0]:s.cloneNode(!0)}function A(s,n){I(s,"position","absolute"),I(s,"top",n.top),I(s,"left",n.left),I(s,"width",n.width),I(s,"height",n.height)}function C(s){I(s,"position",""),I(s,"top",""),I(s,"left",""),I(s,"width",""),I(s,"height","")}var P="Sortable"+new Date().getTime();function K(){var s=[],n;return{captureAnimationState:function(){if(s=[],!!this.options.animation){var o=[].slice.call(this.el.children);o.forEach(function(f){if(!(I(f,"display")==="none"||f===j.ghost)){s.push({target:f,rect:k(f)});var m=e({},s[s.length-1].rect);if(f.thisAnimationDuration){var v=ct(f,!0);v&&(m.top-=v.f,m.left-=v.e)}f.fromRect=m}})}},addAnimationState:function(o){s.push(o)},removeAnimationState:function(o){s.splice(gt(s,{target:o}),1)},animateAll:function(o){var f=this;if(!this.options.animation){clearTimeout(n),typeof o=="function"&&o();return}var m=!1,v=0;s.forEach(function(y){var S=0,E=y.target,L=E.fromRect,D=k(E),H=E.prevFromRect,Z=E.prevToRect,Y=y.rect,q=ct(E,!0);q&&(D.top-=q.f,D.left-=q.e),E.toRect=D,E.thisAnimationDuration&&Lt(H,D)&&!Lt(L,D)&&(Y.top-D.top)/(Y.left-D.left)===(L.top-D.top)/(L.left-D.left)&&(S=nt(Y,H,Z,f.options)),Lt(D,L)||(E.prevFromRect=L,E.prevToRect=D,S||(S=f.options.animation),f.animate(E,Y,D,S)),S&&(m=!0,v=Math.max(v,S),clearTimeout(E.animationResetTimer),E.animationResetTimer=setTimeout(function(){E.animationTime=0,E.prevFromRect=null,E.fromRect=null,E.prevToRect=null,E.thisAnimationDuration=null},S),E.thisAnimationDuration=S)}),clearTimeout(n),m?n=setTimeout(function(){typeof o=="function"&&o()},v):typeof o=="function"&&o(),s=[]},animate:function(o,f,m,v){if(v){I(o,"transition",""),I(o,"transform","");var y=ct(this.el),S=y&&y.a,E=y&&y.d,L=(f.left-m.left)/(S||1),D=(f.top-m.top)/(E||1);o.animatingX=!!L,o.animatingY=!!D,I(o,"transform","translate3d("+L+"px,"+D+"px,0)"),Q(o),I(o,"transition","transform "+v+"ms"+(this.options.easing?" "+this.options.easing:"")),I(o,"transform","translate3d(0,0,0)"),typeof o.animated=="number"&&clearTimeout(o.animated),o.animated=setTimeout(function(){I(o,"transition",""),I(o,"transform",""),o.animated=!1,o.animatingX=!1,o.animatingY=!1},v)}}}}function Q(s){return s.offsetWidth}function nt(s,n,i,o){return Math.sqrt(Math.pow(n.top-s.top,2)+Math.pow(n.left-s.left,2))/Math.sqrt(Math.pow(n.top-i.top,2)+Math.pow(n.left-i.left,2))*o.animation}var rt=[],xt={initializeByDefault:!0},Ht={mount:function(n){for(var i in xt)xt.hasOwnProperty(i)&&!(i in n)&&(n[i]=xt[i]);rt.push(n)},pluginEvent:function(n,i,o){var f=this;this.eventCanceled=!1,o.cancel=function(){f.eventCanceled=!0};var m=n+"Global";rt.forEach(function(v){!i[v.pluginName]||(i[v.pluginName][m]&&i[v.pluginName][m](e({sortable:i},o)),i.options[v.pluginName]&&i[v.pluginName][n]&&i[v.pluginName][n](e({sortable:i},o)))})},initializePlugins:function(n,i,o,f){rt.forEach(function(y){var S=y.pluginName;if(!(!n.options[S]&&!y.initializeByDefault)){var E=new y(n,i,n.options);E.sortable=n,E.options=n.options,n[S]=E,r(o,E.defaults)}});for(var m in n.options)if(!!n.options.hasOwnProperty(m)){var v=this.modifyOption(n,m,n.options[m]);typeof v!="undefined"&&(n.options[m]=v)}},getEventProperties:function(n,i){var o={};return rt.forEach(function(f){typeof f.eventProperties=="function"&&r(o,f.eventProperties.call(i[f.pluginName],n))}),o},modifyOption:function(n,i,o){var f;return rt.forEach(function(m){!n[m.pluginName]||m.optionListeners&&typeof m.optionListeners[i]=="function"&&(f=m.optionListeners[i].call(n[m.pluginName],o))}),f}};function Vt(s){var n=s.sortable,i=s.rootEl,o=s.name,f=s.targetEl,m=s.cloneEl,v=s.toEl,y=s.fromEl,S=s.oldIndex,E=s.newIndex,L=s.oldDraggableIndex,D=s.newDraggableIndex,H=s.originalEvent,Z=s.putSortable,Y=s.extraEventProperties;if(n=n||i&&i[P],!!n){var q,pt=n.options,Bt="on"+o.charAt(0).toUpperCase()+o.substr(1);window.CustomEvent&&!g&&!w?q=new CustomEvent(o,{bubbles:!0,cancelable:!0}):(q=document.createEvent("Event"),q.initEvent(o,!0,!0)),q.to=v||i,q.from=y||i,q.item=f||i,q.clone=m,q.oldIndex=S,q.newIndex=E,q.oldDraggableIndex=L,q.newDraggableIndex=D,q.originalEvent=H,q.pullMode=Z?Z.lastPutMode:void 0;var _t=e({},Y,Ht.getEventProperties(o,n));for(var Ot in _t)q[Ot]=_t[Ot];i&&i.dispatchEvent(q),pt[Bt]&&pt[Bt].call(n,q)}}var wt=function(n,i){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},f=o.evt,m=u(o,["evt"]);Ht.pluginEvent.bind(j)(n,i,e({dragEl:T,parentEl:ft,ghostEl:W,rootEl:lt,nextEl:Yt,lastDownEl:ye,cloneEl:dt,cloneHidden:zt,dragStarted:le,putSortable:vt,activeSortable:j.active,originalEvent:f,oldIndex:te,oldDraggableIndex:se,newIndex:Et,newDraggableIndex:Wt,hideGhostForTarget:wn,unhideGhostForTarget:Sn,cloneNowHidden:function(){zt=!0},cloneNowShown:function(){zt=!1},dispatchSortableEvent:function(y){Ct({sortable:i,name:y,originalEvent:f})}},m))};function Ct(s){Vt(e({putSortable:vt,cloneEl:dt,targetEl:T,rootEl:lt,oldIndex:te,oldDraggableIndex:se,newIndex:Et,newDraggableIndex:Wt},s))}var T,ft,W,lt,Yt,ye,dt,zt,te,Et,se,Wt,Ce,vt,ee=!1,xe=!1,we=[],Kt,Mt,He,ke,_n,bn,le,ne,de,ce=!1,Se=!1,Ee,At,Ue=[],ze=!1,Te=[],$e=typeof document!="undefined",Oe=X,An=w||g?"cssFloat":"float",ai=$e&&!J&&!X&&"draggable"in document.createElement("div"),yn=function(){if(!!$e){if(g)return!1;var s=document.createElement("x");return s.style.cssText="pointer-events:auto",s.style.pointerEvents==="auto"}}(),Cn=function(n,i){var o=I(n),f=parseInt(o.width)-parseInt(o.paddingLeft)-parseInt(o.paddingRight)-parseInt(o.borderLeftWidth)-parseInt(o.borderRightWidth),m=bt(n,0,i),v=bt(n,1,i),y=m&&I(m),S=v&&I(v),E=y&&parseInt(y.marginLeft)+parseInt(y.marginRight)+k(m).width,L=S&&parseInt(S.marginLeft)+parseInt(S.marginRight)+k(v).width;if(o.display==="flex")return o.flexDirection==="column"||o.flexDirection==="column-reverse"?"vertical":"horizontal";if(o.display==="grid")return o.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(m&&y.float&&y.float!=="none"){var D=y.float==="left"?"left":"right";return v&&(S.clear==="both"||S.clear===D)?"vertical":"horizontal"}return m&&(y.display==="block"||y.display==="flex"||y.display==="table"||y.display==="grid"||E>=f&&o[An]==="none"||v&&o[An]==="none"&&E+L>f)?"vertical":"horizontal"},si=function(n,i,o){var f=o?n.left:n.top,m=o?n.right:n.bottom,v=o?n.width:n.height,y=o?i.left:i.top,S=o?i.right:i.bottom,E=o?i.width:i.height;return f===y||m===S||f+v/2===y+E/2},li=function(n,i){var o;return we.some(function(f){if(!ht(f)){var m=k(f),v=f[P].options.emptyInsertThreshold,y=n>=m.left-v&&n<=m.right+v,S=i>=m.top-v&&i<=m.bottom+v;if(v&&y&&S)return o=f}}),o},xn=function(n){function i(m,v){return function(y,S,E,L){var D=y.options.group.name&&S.options.group.name&&y.options.group.name===S.options.group.name;if(m==null&&(v||D))return!0;if(m==null||m===!1)return!1;if(v&&m==="clone")return m;if(typeof m=="function")return i(m(y,S,E,L),v)(y,S,E,L);var H=(v?y:S).options.group.name;return m===!0||typeof m=="string"&&m===H||m.join&&m.indexOf(H)>-1}}var o={},f=n.group;(!f||t(f)!="object")&&(f={name:f}),o.name=f.name,o.checkPull=i(f.pull,!0),o.checkPut=i(f.put),o.revertClone=f.revertClone,n.group=o},wn=function(){!yn&&W&&I(W,"display","none")},Sn=function(){!yn&&W&&I(W,"display","")};$e&&document.addEventListener("click",function(s){if(xe)return s.preventDefault(),s.stopPropagation&&s.stopPropagation(),s.stopImmediatePropagation&&s.stopImmediatePropagation(),xe=!1,!1},!0);var Jt=function(n){if(T){n=n.touches?n.touches[0]:n;var i=li(n.clientX,n.clientY);if(i){var o={};for(var f in n)n.hasOwnProperty(f)&&(o[f]=n[f]);o.target=o.rootEl=i,o.preventDefault=void 0,o.stopPropagation=void 0,i[P]._onDragOver(o)}}},di=function(n){T&&T.parentNode[P]._isOutsideThisEl(n.target)};function j(s,n){if(!(s&&s.nodeType&&s.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(s));this.el=s,this.options=n=r({},n),s[P]=this;var i={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(s.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Cn(s,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(v,y){v.setData("Text",y.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:j.supportPointer!==!1&&"PointerEvent"in window,emptyInsertThreshold:5};Ht.initializePlugins(this,s,i);for(var o in i)!(o in n)&&(n[o]=i[o]);xn(n);for(var f in this)f.charAt(0)==="_"&&typeof this[f]=="function"&&(this[f]=this[f].bind(this));this.nativeDraggable=n.forceFallback?!1:ai,this.nativeDraggable&&(this.options.touchStartThreshold=1),n.supportPointer?B(s,"pointerdown",this._onTapStart):(B(s,"mousedown",this._onTapStart),B(s,"touchstart",this._onTapStart)),this.nativeDraggable&&(B(s,"dragover",this),B(s,"dragenter",this)),we.push(this.el),n.store&&n.store.get&&this.sort(n.store.get(this)||[]),r(this,K())}j.prototype={constructor:j,_isOutsideThisEl:function(n){!this.el.contains(n)&&n!==this.el&&(ne=null)},_getDirection:function(n,i){return typeof this.options.direction=="function"?this.options.direction.call(this,n,i,T):this.options.direction},_onTapStart:function(n){if(!!n.cancelable){var i=this,o=this.el,f=this.options,m=f.preventOnFilter,v=n.type,y=n.touches&&n.touches[0]||n.pointerType&&n.pointerType==="touch"&&n,S=(y||n).target,E=n.target.shadowRoot&&(n.path&&n.path[0]||n.composedPath&&n.composedPath()[0])||S,L=f.filter;if(gi(o),!T&&!(/mousedown|pointerdown/.test(v)&&n.button!==0||f.disabled)&&!E.isContentEditable&&(S=G(S,f.draggable,o,!1),!(S&&S.animated)&&ye!==S)){if(te=V(S),se=V(S,f.draggable),typeof L=="function"){if(L.call(this,n,S,this)){Ct({sortable:i,rootEl:E,name:"filter",targetEl:S,toEl:o,fromEl:o}),wt("filter",i,{evt:n}),m&&n.cancelable&&n.preventDefault();return}}else if(L&&(L=L.split(",").some(function(D){if(D=G(E,D.trim(),o,!1),D)return Ct({sortable:i,rootEl:D,name:"filter",targetEl:S,fromEl:o,toEl:o}),wt("filter",i,{evt:n}),!0}),L)){m&&n.cancelable&&n.preventDefault();return}f.handle&&!G(E,f.handle,o,!1)||this._prepareDragStart(n,y,S)}}},_prepareDragStart:function(n,i,o){var f=this,m=f.el,v=f.options,y=m.ownerDocument,S;if(o&&!T&&o.parentNode===m){var E=k(o);if(lt=m,T=o,ft=T.parentNode,Yt=T.nextSibling,ye=o,Ce=v.group,j.dragged=T,Kt={target:T,clientX:(i||n).clientX,clientY:(i||n).clientY},_n=Kt.clientX-E.left,bn=Kt.clientY-E.top,this._lastX=(i||n).clientX,this._lastY=(i||n).clientY,T.style["will-change"]="all",S=function(){if(wt("delayEnded",f,{evt:n}),j.eventCanceled){f._onDrop();return}f._disableDelayedDragEvents(),!O&&f.nativeDraggable&&(T.draggable=!0),f._triggerDragStart(n,i),Ct({sortable:f,name:"choose",originalEvent:n}),F(T,v.chosenClass,!0)},v.ignore.split(",").forEach(function(L){yt(T,L.trim(),Xe)}),B(y,"dragover",Jt),B(y,"mousemove",Jt),B(y,"touchmove",Jt),B(y,"mouseup",f._onDrop),B(y,"touchend",f._onDrop),B(y,"touchcancel",f._onDrop),O&&this.nativeDraggable&&(this.options.touchStartThreshold=4,T.draggable=!0),wt("delayStart",this,{evt:n}),v.delay&&(!v.delayOnTouchOnly||i)&&(!this.nativeDraggable||!(w||g))){if(j.eventCanceled){this._onDrop();return}B(y,"mouseup",f._disableDelayedDrag),B(y,"touchend",f._disableDelayedDrag),B(y,"touchcancel",f._disableDelayedDrag),B(y,"mousemove",f._delayedDragTouchMoveHandler),B(y,"touchmove",f._delayedDragTouchMoveHandler),v.supportPointer&&B(y,"pointermove",f._delayedDragTouchMoveHandler),f._dragStartTimer=setTimeout(S,v.delay)}else S()}},_delayedDragTouchMoveHandler:function(n){var i=n.touches?n.touches[0]:n;Math.max(Math.abs(i.clientX-this._lastX),Math.abs(i.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){T&&Xe(T),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var n=this.el.ownerDocument;M(n,"mouseup",this._disableDelayedDrag),M(n,"touchend",this._disableDelayedDrag),M(n,"touchcancel",this._disableDelayedDrag),M(n,"mousemove",this._delayedDragTouchMoveHandler),M(n,"touchmove",this._delayedDragTouchMoveHandler),M(n,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(n,i){i=i||n.pointerType=="touch"&&n,!this.nativeDraggable||i?this.options.supportPointer?B(document,"pointermove",this._onTouchMove):i?B(document,"touchmove",this._onTouchMove):B(document,"mousemove",this._onTouchMove):(B(T,"dragend",this),B(lt,"dragstart",this._onDragStart));try{document.selection?Ie(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch(o){}},_dragStarted:function(n,i){if(ee=!1,lt&&T){wt("dragStarted",this,{evt:i}),this.nativeDraggable&&B(document,"dragover",di);var o=this.options;!n&&F(T,o.dragClass,!1),F(T,o.ghostClass,!0),j.active=this,n&&this._appendGhost(),Ct({sortable:this,name:"start",originalEvent:i})}else this._nulling()},_emulateDragOver:function(){if(Mt){this._lastX=Mt.clientX,this._lastY=Mt.clientY,wn();for(var n=document.elementFromPoint(Mt.clientX,Mt.clientY),i=n;n&&n.shadowRoot&&(n=n.shadowRoot.elementFromPoint(Mt.clientX,Mt.clientY),n!==i);)i=n;if(T.parentNode[P]._isOutsideThisEl(n),i)do{if(i[P]){var o=void 0;if(o=i[P]._onDragOver({clientX:Mt.clientX,clientY:Mt.clientY,target:n,rootEl:i}),o&&!this.options.dragoverBubble)break}n=i}while(i=i.parentNode);Sn()}},_onTouchMove:function(n){if(Kt){var i=this.options,o=i.fallbackTolerance,f=i.fallbackOffset,m=n.touches?n.touches[0]:n,v=W&&ct(W,!0),y=W&&v&&v.a,S=W&&v&&v.d,E=Oe&&At&&St(At),L=(m.clientX-Kt.clientX+f.x)/(y||1)+(E?E[0]-Ue[0]:0)/(y||1),D=(m.clientY-Kt.clientY+f.y)/(S||1)+(E?E[1]-Ue[1]:0)/(S||1);if(!j.active&&!ee){if(o&&Math.max(Math.abs(m.clientX-this._lastX),Math.abs(m.clientY-this._lastY))<o)return;this._onDragStart(n,!0)}if(W){v?(v.e+=L-(He||0),v.f+=D-(ke||0)):v={a:1,b:0,c:0,d:1,e:L,f:D};var H="matrix(".concat(v.a,",").concat(v.b,",").concat(v.c,",").concat(v.d,",").concat(v.e,",").concat(v.f,")");I(W,"webkitTransform",H),I(W,"mozTransform",H),I(W,"msTransform",H),I(W,"transform",H),He=L,ke=D,Mt=m}n.cancelable&&n.preventDefault()}},_appendGhost:function(){if(!W){var n=this.options.fallbackOnBody?document.body:lt,i=k(T,!0,Oe,!0,n),o=this.options;if(Oe){for(At=n;I(At,"position")==="static"&&I(At,"transform")==="none"&&At!==document;)At=At.parentNode;At!==document.body&&At!==document.documentElement?(At===document&&(At=tt()),i.top+=At.scrollTop,i.left+=At.scrollLeft):At=tt(),Ue=St(At)}W=T.cloneNode(!0),F(W,o.ghostClass,!1),F(W,o.fallbackClass,!0),F(W,o.dragClass,!0),I(W,"transition",""),I(W,"transform",""),I(W,"box-sizing","border-box"),I(W,"margin",0),I(W,"top",i.top),I(W,"left",i.left),I(W,"width",i.width),I(W,"height",i.height),I(W,"opacity","0.8"),I(W,"position",Oe?"absolute":"fixed"),I(W,"zIndex","100000"),I(W,"pointerEvents","none"),j.ghost=W,n.appendChild(W),I(W,"transform-origin",_n/parseInt(W.style.width)*100+"% "+bn/parseInt(W.style.height)*100+"%")}},_onDragStart:function(n,i){var o=this,f=n.dataTransfer,m=o.options;if(wt("dragStart",this,{evt:n}),j.eventCanceled){this._onDrop();return}wt("setupClone",this),j.eventCanceled||(dt=x(T),dt.draggable=!1,dt.style["will-change"]="",this._hideClone(),F(dt,this.options.chosenClass,!1),j.clone=dt),o.cloneId=Ie(function(){wt("clone",o),!j.eventCanceled&&(o.options.removeCloneOnHide||lt.insertBefore(dt,T),o._hideClone(),Ct({sortable:o,name:"clone"}))}),!i&&F(T,m.dragClass,!0),i?(xe=!0,o._loopId=setInterval(o._emulateDragOver,50)):(M(document,"mouseup",o._onDrop),M(document,"touchend",o._onDrop),M(document,"touchcancel",o._onDrop),f&&(f.effectAllowed="move",m.setData&&m.setData.call(o,f,T)),B(document,"drop",o),I(T,"transform","translateZ(0)")),ee=!0,o._dragStartId=Ie(o._dragStarted.bind(o,i,n)),B(document,"selectstart",o),le=!0,R&&I(document.body,"user-select","none")},_onDragOver:function(n){var i=this.el,o=n.target,f,m,v,y=this.options,S=y.group,E=j.active,L=Ce===S,D=y.sort,H=vt||E,Z,Y=this,q=!1;if(ze)return;function pt(ve,Ci){wt(ve,Y,e({evt:n,isOwner:L,axis:Z?"vertical":"horizontal",revert:v,dragRect:f,targetRect:m,canSort:D,fromSortable:H,target:o,completed:_t,onMove:function(On,xi){return We(lt,i,T,f,On,k(On),n,xi)},changed:Ot},Ci))}function Bt(){pt("dragOverAnimationCapture"),Y.captureAnimationState(),Y!==H&&H.captureAnimationState()}function _t(ve){return pt("dragOverCompleted",{insertion:ve}),ve&&(L?E._hideClone():E._showClone(Y),Y!==H&&(F(T,vt?vt.options.ghostClass:E.options.ghostClass,!1),F(T,y.ghostClass,!0)),vt!==Y&&Y!==j.active?vt=Y:Y===j.active&&vt&&(vt=null),H===Y&&(Y._ignoreWhileAnimating=o),Y.animateAll(function(){pt("dragOverAnimationComplete"),Y._ignoreWhileAnimating=null}),Y!==H&&(H.animateAll(),H._ignoreWhileAnimating=null)),(o===T&&!T.animated||o===i&&!o.animated)&&(ne=null),!y.dragoverBubble&&!n.rootEl&&o!==document&&(T.parentNode[P]._isOutsideThisEl(n.target),!ve&&Jt(n)),!y.dragoverBubble&&n.stopPropagation&&n.stopPropagation(),q=!0}function Ot(){Et=V(T),Wt=V(T,y.draggable),Ct({sortable:Y,name:"change",toEl:i,newIndex:Et,newDraggableIndex:Wt,originalEvent:n})}if(n.preventDefault!==void 0&&n.cancelable&&n.preventDefault(),o=G(o,y.draggable,i,!0),pt("dragOver"),j.eventCanceled)return q;if(T.contains(n.target)||o.animated&&o.animatingX&&o.animatingY||Y._ignoreWhileAnimating===o)return _t(!1);if(xe=!1,E&&!y.disabled&&(L?D||(v=!lt.contains(T)):vt===this||(this.lastPutMode=Ce.checkPull(this,E,T,n))&&S.checkPut(this,E,T,n))){if(Z=this._getDirection(n,o)==="vertical",f=k(T),pt("dragOverValid"),j.eventCanceled)return q;if(v)return ft=lt,Bt(),this._hideClone(),pt("revert"),j.eventCanceled||(Yt?lt.insertBefore(T,Yt):lt.appendChild(T)),_t(!0);var ot=ht(i,y.draggable);if(!ot||fi(n,Z,this)&&!ot.animated){if(ot===T)return _t(!1);if(ot&&i===n.target&&(o=ot),o&&(m=k(o)),We(lt,i,T,f,o,m,n,!!o)!==!1)return Bt(),i.appendChild(T),ft=i,Ot(),_t(!0)}else if(o.parentNode===i){m=k(o);var It=0,Qt,ge=T.parentNode!==i,re=!si(T.animated&&T.toRect||f,o.animated&&o.toRect||m,Z),Dt=Z?"top":"left",Xt=ut(o,"top","top")||ut(T,"top","top"),Me=Xt?Xt.scrollTop:void 0;ne!==o&&(Qt=m[Dt],ce=!1,Se=!re&&y.invertSwap||ge),It=mi(n,o,m,Z,re?1:y.swapThreshold,y.invertedSwapThreshold==null?y.swapThreshold:y.invertedSwapThreshold,Se,ne===o);var kt;if(It!==0){var oe=V(T);do oe-=It,kt=ft.children[oe];while(kt&&(I(kt,"display")==="none"||kt===W))}if(It===0||kt===o)return _t(!1);ne=o,de=It;var Zt=o.nextElementSibling,Gt=!1;Gt=It===1;var qt=We(lt,i,T,f,o,m,n,Gt);if(qt!==!1)return(qt===1||qt===-1)&&(Gt=qt===1),ze=!0,setTimeout(ui,30),Bt(),Gt&&!Zt?i.appendChild(T):o.parentNode.insertBefore(T,Gt?Zt:o),Xt&&je(Xt,0,Me-Xt.scrollTop),ft=T.parentNode,Qt!==void 0&&!Se&&(Ee=Math.abs(Qt-k(o)[Dt])),Ot(),_t(!0)}if(i.contains(T))return _t(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){M(document,"mousemove",this._onTouchMove),M(document,"touchmove",this._onTouchMove),M(document,"pointermove",this._onTouchMove),M(document,"dragover",Jt),M(document,"mousemove",Jt),M(document,"touchmove",Jt)},_offUpEvents:function(){var n=this.el.ownerDocument;M(n,"mouseup",this._onDrop),M(n,"touchend",this._onDrop),M(n,"pointerup",this._onDrop),M(n,"touchcancel",this._onDrop),M(document,"selectstart",this)},_onDrop:function(n){var i=this.el,o=this.options;if(Et=V(T),Wt=V(T,o.draggable),wt("drop",this,{evt:n}),ft=T&&T.parentNode,Et=V(T),Wt=V(T,o.draggable),j.eventCanceled){this._nulling();return}ee=!1,Se=!1,ce=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),Ge(this.cloneId),Ge(this._dragStartId),this.nativeDraggable&&(M(document,"drop",this),M(i,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),R&&I(document.body,"user-select",""),I(T,"transform",""),n&&(le&&(n.cancelable&&n.preventDefault(),!o.dropBubble&&n.stopPropagation()),W&&W.parentNode&&W.parentNode.removeChild(W),(lt===ft||vt&&vt.lastPutMode!=="clone")&&dt&&dt.parentNode&&dt.parentNode.removeChild(dt),T&&(this.nativeDraggable&&M(T,"dragend",this),Xe(T),T.style["will-change"]="",le&&!ee&&F(T,vt?vt.options.ghostClass:this.options.ghostClass,!1),F(T,this.options.chosenClass,!1),Ct({sortable:this,name:"unchoose",toEl:ft,newIndex:null,newDraggableIndex:null,originalEvent:n}),lt!==ft?(Et>=0&&(Ct({rootEl:ft,name:"add",toEl:ft,fromEl:lt,originalEvent:n}),Ct({sortable:this,name:"remove",toEl:ft,originalEvent:n}),Ct({rootEl:ft,name:"sort",toEl:ft,fromEl:lt,originalEvent:n}),Ct({sortable:this,name:"sort",toEl:ft,originalEvent:n})),vt&&vt.save()):Et!==te&&Et>=0&&(Ct({sortable:this,name:"update",toEl:ft,originalEvent:n}),Ct({sortable:this,name:"sort",toEl:ft,originalEvent:n})),j.active&&((Et==null||Et===-1)&&(Et=te,Wt=se),Ct({sortable:this,name:"end",toEl:ft,originalEvent:n}),this.save()))),this._nulling()},_nulling:function(){wt("nulling",this),lt=T=ft=W=Yt=dt=ye=zt=Kt=Mt=le=Et=Wt=te=se=ne=de=vt=Ce=j.dragged=j.ghost=j.clone=j.active=null,Te.forEach(function(n){n.checked=!0}),Te.length=He=ke=0},handleEvent:function(n){switch(n.type){case"drop":case"dragend":this._onDrop(n);break;case"dragenter":case"dragover":T&&(this._onDragOver(n),ci(n));break;case"selectstart":n.preventDefault();break}},toArray:function(){for(var n=[],i,o=this.el.children,f=0,m=o.length,v=this.options;f<m;f++)i=o[f],G(i,v.draggable,this.el,!1)&&n.push(i.getAttribute(v.dataIdAttr)||hi(i));return n},sort:function(n){var i={},o=this.el;this.toArray().forEach(function(f,m){var v=o.children[m];G(v,this.options.draggable,o,!1)&&(i[f]=v)},this),n.forEach(function(f){i[f]&&(o.removeChild(i[f]),o.appendChild(i[f]))})},save:function(){var n=this.options.store;n&&n.set&&n.set(this)},closest:function(n,i){return G(n,i||this.options.draggable,this.el,!1)},option:function(n,i){var o=this.options;if(i===void 0)return o[n];var f=Ht.modifyOption(this,n,i);typeof f!="undefined"?o[n]=f:o[n]=i,n==="group"&&xn(o)},destroy:function(){wt("destroy",this);var n=this.el;n[P]=null,M(n,"mousedown",this._onTapStart),M(n,"touchstart",this._onTapStart),M(n,"pointerdown",this._onTapStart),this.nativeDraggable&&(M(n,"dragover",this),M(n,"dragenter",this)),Array.prototype.forEach.call(n.querySelectorAll("[draggable]"),function(i){i.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),we.splice(we.indexOf(this.el),1),this.el=n=null},_hideClone:function(){if(!zt){if(wt("hideClone",this),j.eventCanceled)return;I(dt,"display","none"),this.options.removeCloneOnHide&&dt.parentNode&&dt.parentNode.removeChild(dt),zt=!0}},_showClone:function(n){if(n.lastPutMode!=="clone"){this._hideClone();return}if(zt){if(wt("showClone",this),j.eventCanceled)return;lt.contains(T)&&!this.options.group.revertClone?lt.insertBefore(dt,T):Yt?lt.insertBefore(dt,Yt):lt.appendChild(dt),this.options.group.revertClone&&this.animate(T,dt),I(dt,"display",""),zt=!1}}};function ci(s){s.dataTransfer&&(s.dataTransfer.dropEffect="move"),s.cancelable&&s.preventDefault()}function We(s,n,i,o,f,m,v,y){var S,E=s[P],L=E.options.onMove,D;return window.CustomEvent&&!g&&!w?S=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(S=document.createEvent("Event"),S.initEvent("move",!0,!0)),S.to=n,S.from=s,S.dragged=i,S.draggedRect=o,S.related=f||n,S.relatedRect=m||k(n),S.willInsertAfter=y,S.originalEvent=v,s.dispatchEvent(S),L&&(D=L.call(E,S,v)),D}function Xe(s){s.draggable=!1}function ui(){ze=!1}function fi(s,n,i){var o=k(ht(i.el,i.options.draggable)),f=10;return n?s.clientX>o.right+f||s.clientX<=o.right&&s.clientY>o.bottom&&s.clientX>=o.left:s.clientX>o.right&&s.clientY>o.top||s.clientX<=o.right&&s.clientY>o.bottom+f}function mi(s,n,i,o,f,m,v,y){var S=o?s.clientY:s.clientX,E=o?i.height:i.width,L=o?i.top:i.left,D=o?i.bottom:i.right,H=!1;if(!v){if(y&&Ee<E*f){if(!ce&&(de===1?S>L+E*m/2:S<D-E*m/2)&&(ce=!0),ce)H=!0;else if(de===1?S<L+Ee:S>D-Ee)return-de}else if(S>L+E*(1-f)/2&&S<D-E*(1-f)/2)return pi(n)}return H=H||v,H&&(S<L+E*m/2||S>D-E*m/2)?S>L+E/2?1:-1:0}function pi(s){return V(T)<V(s)?1:-1}function hi(s){for(var n=s.tagName+s.className+s.src+s.href+s.textContent,i=n.length,o=0;i--;)o+=n.charCodeAt(i);return o.toString(36)}function gi(s){Te.length=0;for(var n=s.getElementsByTagName("input"),i=n.length;i--;){var o=n[i];o.checked&&Te.push(o)}}function Ie(s){return setTimeout(s,0)}function Ge(s){return clearTimeout(s)}$e&&B(document,"touchmove",function(s){(j.active||ee)&&s.cancelable&&s.preventDefault()}),j.utils={on:B,off:M,css:I,find:yt,is:function(n,i){return!!G(n,i,n,!1)},extend:Nt,throttle:Ut,closest:G,toggleClass:F,clone:x,index:V,nextTick:Ie,cancelNextTick:Ge,detectDirection:Cn,getChild:bt},j.get=function(s){return s[P]},j.mount=function(){for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];n[0].constructor===Array&&(n=n[0]),n.forEach(function(o){if(!o.prototype||!o.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));o.utils&&(j.utils=e({},j.utils,o.utils)),Ht.mount(o)})},j.create=function(s,n){return new j(s,n)},j.version=d;var mt=[],ue,Ve,Ye=!1,Ke,Je,De,fe;function vi(){function s(){this.defaults={scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var n in this)n.charAt(0)==="_"&&typeof this[n]=="function"&&(this[n]=this[n].bind(this))}return s.prototype={dragStarted:function(i){var o=i.originalEvent;this.sortable.nativeDraggable?B(document,"dragover",this._handleAutoScroll):this.options.supportPointer?B(document,"pointermove",this._handleFallbackAutoScroll):o.touches?B(document,"touchmove",this._handleFallbackAutoScroll):B(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(i){var o=i.originalEvent;!this.options.dragOverBubble&&!o.rootEl&&this._handleAutoScroll(o)},drop:function(){this.sortable.nativeDraggable?M(document,"dragover",this._handleAutoScroll):(M(document,"pointermove",this._handleFallbackAutoScroll),M(document,"touchmove",this._handleFallbackAutoScroll),M(document,"mousemove",this._handleFallbackAutoScroll)),En(),Re(),Ne()},nulling:function(){De=Ve=ue=Ye=fe=Ke=Je=null,mt.length=0},_handleFallbackAutoScroll:function(i){this._handleAutoScroll(i,!0)},_handleAutoScroll:function(i,o){var f=this,m=(i.touches?i.touches[0]:i).clientX,v=(i.touches?i.touches[0]:i).clientY,y=document.elementFromPoint(m,v);if(De=i,o||w||g||R){Qe(i,this.options,y,o);var S=st(y,!0);Ye&&(!fe||m!==Ke||v!==Je)&&(fe&&En(),fe=setInterval(function(){var E=st(document.elementFromPoint(m,v),!0);E!==S&&(S=E,Re()),Qe(i,f.options,E,o)},10),Ke=m,Je=v)}else{if(!this.options.bubbleScroll||st(y,!0)===tt()){Re();return}Qe(i,this.options,st(y,!1),!1)}}},r(s,{pluginName:"scroll",initializeByDefault:!0})}function Re(){mt.forEach(function(s){clearInterval(s.pid)}),mt=[]}function En(){clearInterval(fe)}var Qe=Ut(function(s,n,i,o){if(!!n.scroll){var f=(s.touches?s.touches[0]:s).clientX,m=(s.touches?s.touches[0]:s).clientY,v=n.scrollSensitivity,y=n.scrollSpeed,S=tt(),E=!1,L;Ve!==i&&(Ve=i,Re(),ue=n.scroll,L=n.scrollFn,ue===!0&&(ue=st(i,!0)));var D=0,H=ue;do{var Z=H,Y=k(Z),q=Y.top,pt=Y.bottom,Bt=Y.left,_t=Y.right,Ot=Y.width,ot=Y.height,It=void 0,Qt=void 0,ge=Z.scrollWidth,re=Z.scrollHeight,Dt=I(Z),Xt=Z.scrollLeft,Me=Z.scrollTop;Z===S?(It=Ot<ge&&(Dt.overflowX==="auto"||Dt.overflowX==="scroll"||Dt.overflowX==="visible"),Qt=ot<re&&(Dt.overflowY==="auto"||Dt.overflowY==="scroll"||Dt.overflowY==="visible")):(It=Ot<ge&&(Dt.overflowX==="auto"||Dt.overflowX==="scroll"),Qt=ot<re&&(Dt.overflowY==="auto"||Dt.overflowY==="scroll"));var kt=It&&(Math.abs(_t-f)<=v&&Xt+Ot<ge)-(Math.abs(Bt-f)<=v&&!!Xt),oe=Qt&&(Math.abs(pt-m)<=v&&Me+ot<re)-(Math.abs(q-m)<=v&&!!Me);if(!mt[D])for(var Zt=0;Zt<=D;Zt++)mt[Zt]||(mt[Zt]={});(mt[D].vx!=kt||mt[D].vy!=oe||mt[D].el!==Z)&&(mt[D].el=Z,mt[D].vx=kt,mt[D].vy=oe,clearInterval(mt[D].pid),(kt!=0||oe!=0)&&(E=!0,mt[D].pid=setInterval(function(){o&&this.layer===0&&j.active._onTouchMove(De);var Gt=mt[this.layer].vy?mt[this.layer].vy*y:0,qt=mt[this.layer].vx?mt[this.layer].vx*y:0;typeof L=="function"&&L.call(j.dragged.parentNode[P],qt,Gt,s,De,mt[this.layer].el)!=="continue"||je(mt[this.layer].el,qt,Gt)}.bind({layer:D}),24))),D++}while(n.bubbleScroll&&H!==S&&(H=st(H,!1)));Ye=E}},30),Tn=function(n){var i=n.originalEvent,o=n.putSortable,f=n.dragEl,m=n.activeSortable,v=n.dispatchSortableEvent,y=n.hideGhostForTarget,S=n.unhideGhostForTarget;if(!!i){var E=o||m;y();var L=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:i,D=document.elementFromPoint(L.clientX,L.clientY);S(),E&&!E.el.contains(D)&&(v("spill"),this.onSpill({dragEl:f,putSortable:o}))}};function Ze(){}Ze.prototype={startIndex:null,dragStart:function(n){var i=n.oldDraggableIndex;this.startIndex=i},onSpill:function(n){var i=n.dragEl,o=n.putSortable;this.sortable.captureAnimationState(),o&&o.captureAnimationState();var f=bt(this.sortable.el,this.startIndex,this.options);f?this.sortable.el.insertBefore(i,f):this.sortable.el.appendChild(i),this.sortable.animateAll(),o&&o.animateAll()},drop:Tn},r(Ze,{pluginName:"revertOnSpill"});function qe(){}qe.prototype={onSpill:function(n){var i=n.dragEl,o=n.putSortable,f=o||this.sortable;f.captureAnimationState(),i.parentNode&&i.parentNode.removeChild(i),f.animateAll()},drop:Tn},r(qe,{pluginName:"removeOnSpill"});var Rt;function _i(){function s(){this.defaults={swapClass:"sortable-swap-highlight"}}return s.prototype={dragStart:function(i){var o=i.dragEl;Rt=o},dragOverValid:function(i){var o=i.completed,f=i.target,m=i.onMove,v=i.activeSortable,y=i.changed,S=i.cancel;if(!!v.options.swap){var E=this.sortable.el,L=this.options;if(f&&f!==E){var D=Rt;m(f)!==!1?(F(f,L.swapClass,!0),Rt=f):Rt=null,D&&D!==Rt&&F(D,L.swapClass,!1)}y(),o(!0),S()}},drop:function(i){var o=i.activeSortable,f=i.putSortable,m=i.dragEl,v=f||this.sortable,y=this.options;Rt&&F(Rt,y.swapClass,!1),Rt&&(y.swap||f&&f.options.swap)&&m!==Rt&&(v.captureAnimationState(),v!==o&&o.captureAnimationState(),bi(m,Rt),v.animateAll(),v!==o&&o.animateAll())},nulling:function(){Rt=null}},r(s,{pluginName:"swap",eventProperties:function(){return{swapItem:Rt}}})}function bi(s,n){var i=s.parentNode,o=n.parentNode,f,m;!i||!o||i.isEqualNode(n)||o.isEqualNode(s)||(f=V(s),m=V(n),i.isEqualNode(o)&&f<m&&m++,i.insertBefore(n,i.children[f]),o.insertBefore(s,o.children[m]))}var U=[],Tt=[],me,Ft,pe=!1,$t=!1,ie=!1,at,he,Pe;function Ai(){function s(n){for(var i in this)i.charAt(0)==="_"&&typeof this[i]=="function"&&(this[i]=this[i].bind(this));n.options.supportPointer?B(document,"pointerup",this._deselectMultiDrag):(B(document,"mouseup",this._deselectMultiDrag),B(document,"touchend",this._deselectMultiDrag)),B(document,"keydown",this._checkKeyDown),B(document,"keyup",this._checkKeyUp),this.defaults={selectedClass:"sortable-selected",multiDragKey:null,setData:function(f,m){var v="";U.length&&Ft===n?U.forEach(function(y,S){v+=(S?", ":"")+y.textContent}):v=m.textContent,f.setData("Text",v)}}}return s.prototype={multiDragKeyDown:!1,isMultiDrag:!1,delayStartGlobal:function(i){var o=i.dragEl;at=o},delayEnded:function(){this.isMultiDrag=~U.indexOf(at)},setupClone:function(i){var o=i.sortable,f=i.cancel;if(!!this.isMultiDrag){for(var m=0;m<U.length;m++)Tt.push(x(U[m])),Tt[m].sortableIndex=U[m].sortableIndex,Tt[m].draggable=!1,Tt[m].style["will-change"]="",F(Tt[m],this.options.selectedClass,!1),U[m]===at&&F(Tt[m],this.options.chosenClass,!1);o._hideClone(),f()}},clone:function(i){var o=i.sortable,f=i.rootEl,m=i.dispatchSortableEvent,v=i.cancel;!this.isMultiDrag||this.options.removeCloneOnHide||U.length&&Ft===o&&($n(!0,f),m("clone"),v())},showClone:function(i){var o=i.cloneNowShown,f=i.rootEl,m=i.cancel;!this.isMultiDrag||($n(!1,f),Tt.forEach(function(v){I(v,"display","")}),o(),Pe=!1,m())},hideClone:function(i){var o=this,f=i.sortable,m=i.cloneNowHidden,v=i.cancel;!this.isMultiDrag||(Tt.forEach(function(y){I(y,"display","none"),o.options.removeCloneOnHide&&y.parentNode&&y.parentNode.removeChild(y)}),m(),Pe=!0,v())},dragStartGlobal:function(i){var o=i.sortable;!this.isMultiDrag&&Ft&&Ft.multiDrag._deselectMultiDrag(),U.forEach(function(f){f.sortableIndex=V(f)}),U=U.sort(function(f,m){return f.sortableIndex-m.sortableIndex}),ie=!0},dragStarted:function(i){var o=this,f=i.sortable;if(!!this.isMultiDrag){if(this.options.sort&&(f.captureAnimationState(),this.options.animation)){U.forEach(function(v){v!==at&&I(v,"position","absolute")});var m=k(at,!1,!0,!0);U.forEach(function(v){v!==at&&A(v,m)}),$t=!0,pe=!0}f.animateAll(function(){$t=!1,pe=!1,o.options.animation&&U.forEach(function(v){C(v)}),o.options.sort&&Le()})}},dragOver:function(i){var o=i.target,f=i.completed,m=i.cancel;$t&&~U.indexOf(o)&&(f(!1),m())},revert:function(i){var o=i.fromSortable,f=i.rootEl,m=i.sortable,v=i.dragRect;U.length>1&&(U.forEach(function(y){m.addAnimationState({target:y,rect:$t?k(y):v}),C(y),y.fromRect=v,o.removeAnimationState(y)}),$t=!1,yi(!this.options.removeCloneOnHide,f))},dragOverCompleted:function(i){var o=i.sortable,f=i.isOwner,m=i.insertion,v=i.activeSortable,y=i.parentEl,S=i.putSortable,E=this.options;if(m){if(f&&v._hideClone(),pe=!1,E.animation&&U.length>1&&($t||!f&&!v.options.sort&&!S)){var L=k(at,!1,!0,!0);U.forEach(function(H){H!==at&&(A(H,L),y.appendChild(H))}),$t=!0}if(!f)if($t||Le(),U.length>1){var D=Pe;v._showClone(o),v.options.animation&&!Pe&&D&&Tt.forEach(function(H){v.addAnimationState({target:H,rect:he}),H.fromRect=he,H.thisAnimationDuration=null})}else v._showClone(o)}},dragOverAnimationCapture:function(i){var o=i.dragRect,f=i.isOwner,m=i.activeSortable;if(U.forEach(function(y){y.thisAnimationDuration=null}),m.options.animation&&!f&&m.multiDrag.isMultiDrag){he=r({},o);var v=ct(at,!0);he.top-=v.f,he.left-=v.e}},dragOverAnimationComplete:function(){$t&&($t=!1,Le())},drop:function(i){var o=i.originalEvent,f=i.rootEl,m=i.parentEl,v=i.sortable,y=i.dispatchSortableEvent,S=i.oldIndex,E=i.putSortable,L=E||this.sortable;if(!!o){var D=this.options,H=m.children;if(!ie)if(D.multiDragKey&&!this.multiDragKeyDown&&this._deselectMultiDrag(),F(at,D.selectedClass,!~U.indexOf(at)),~U.indexOf(at))U.splice(U.indexOf(at),1),me=null,Vt({sortable:v,rootEl:f,name:"deselect",targetEl:at,originalEvt:o});else{if(U.push(at),Vt({sortable:v,rootEl:f,name:"select",targetEl:at,originalEvt:o}),o.shiftKey&&me&&v.el.contains(me)){var Z=V(me),Y=V(at);if(~Z&&~Y&&Z!==Y){var q,pt;for(Y>Z?(pt=Z,q=Y):(pt=Y,q=Z+1);pt<q;pt++)~U.indexOf(H[pt])||(F(H[pt],D.selectedClass,!0),U.push(H[pt]),Vt({sortable:v,rootEl:f,name:"select",targetEl:H[pt],originalEvt:o}))}}else me=at;Ft=L}if(ie&&this.isMultiDrag){if((m[P].options.sort||m!==f)&&U.length>1){var Bt=k(at),_t=V(at,":not(."+this.options.selectedClass+")");if(!pe&&D.animation&&(at.thisAnimationDuration=null),L.captureAnimationState(),!pe&&(D.animation&&(at.fromRect=Bt,U.forEach(function(ot){if(ot.thisAnimationDuration=null,ot!==at){var It=$t?k(ot):Bt;ot.fromRect=It,L.addAnimationState({target:ot,rect:It})}})),Le(),U.forEach(function(ot){H[_t]?m.insertBefore(ot,H[_t]):m.appendChild(ot),_t++}),S===V(at))){var Ot=!1;U.forEach(function(ot){if(ot.sortableIndex!==V(ot)){Ot=!0;return}}),Ot&&y("update")}U.forEach(function(ot){C(ot)}),L.animateAll()}Ft=L}(f===m||E&&E.lastPutMode!=="clone")&&Tt.forEach(function(ot){ot.parentNode&&ot.parentNode.removeChild(ot)})}},nullingGlobal:function(){this.isMultiDrag=ie=!1,Tt.length=0},destroyGlobal:function(){this._deselectMultiDrag(),M(document,"pointerup",this._deselectMultiDrag),M(document,"mouseup",this._deselectMultiDrag),M(document,"touchend",this._deselectMultiDrag),M(document,"keydown",this._checkKeyDown),M(document,"keyup",this._checkKeyUp)},_deselectMultiDrag:function(i){if(!(typeof ie!="undefined"&&ie)&&Ft===this.sortable&&!(i&&G(i.target,this.options.draggable,this.sortable.el,!1))&&!(i&&i.button!==0))for(;U.length;){var o=U[0];F(o,this.options.selectedClass,!1),U.shift(),Vt({sortable:this.sortable,rootEl:this.sortable.el,name:"deselect",targetEl:o,originalEvt:i})}},_checkKeyDown:function(i){i.key===this.options.multiDragKey&&(this.multiDragKeyDown=!0)},_checkKeyUp:function(i){i.key===this.options.multiDragKey&&(this.multiDragKeyDown=!1)}},r(s,{pluginName:"multiDrag",utils:{select:function(i){var o=i.parentNode[P];!o||!o.options.multiDrag||~U.indexOf(i)||(Ft&&Ft!==o&&(Ft.multiDrag._deselectMultiDrag(),Ft=o),F(i,o.options.selectedClass,!0),U.push(i))},deselect:function(i){var o=i.parentNode[P],f=U.indexOf(i);!o||!o.options.multiDrag||!~f||(F(i,o.options.selectedClass,!1),U.splice(f,1))}},eventProperties:function(){var i=this,o=[],f=[];return U.forEach(function(m){o.push({multiDragElement:m,index:m.sortableIndex});var v;$t&&m!==at?v=-1:$t?v=V(m,":not(."+i.options.selectedClass+")"):v=V(m),f.push({multiDragElement:m,index:v})}),{items:l(U),clones:[].concat(Tt),oldIndicies:o,newIndicies:f}},optionListeners:{multiDragKey:function(i){return i=i.toLowerCase(),i==="ctrl"?i="Control":i.length>1&&(i=i.charAt(0).toUpperCase()+i.substr(1)),i}}})}function yi(s,n){U.forEach(function(i,o){var f=n.children[i.sortableIndex+(s?Number(o):0)];f?n.insertBefore(i,f):n.appendChild(i)})}function $n(s,n){Tt.forEach(function(i,o){var f=n.children[i.sortableIndex+(s?Number(o):0)];f?n.insertBefore(i,f):n.appendChild(i)})}function Le(){U.forEach(function(s){s!==at&&s.parentNode&&s.parentNode.removeChild(s)})}return j.mount(new vi),j.mount(qe,Ze),j.mount(new _i),j.mount(new Ai),j})});var ae=Mn((be,on)=>{(function(a,r){typeof be=="object"&&typeof on=="object"?on.exports=r(rn()):typeof define=="function"&&define.amd?define(["sortablejs"],r):typeof be=="object"?be.vuedraggable=r(rn()):a.vuedraggable=r(a.Sortable)})(typeof self!="undefined"?self:be,function(t){return function(a){var r={};function e(c){if(r[c])return r[c].exports;var u=r[c]={i:c,l:!1,exports:{}};return a[c].call(u.exports,u,u.exports,e),u.l=!0,u.exports}return e.m=a,e.c=r,e.d=function(c,u,l){e.o(c,u)||Object.defineProperty(c,u,{enumerable:!0,get:l})},e.r=function(c){typeof Symbol!="undefined"&&Symbol.toStringTag&&Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(c,"__esModule",{value:!0})},e.t=function(c,u){if(u&1&&(c=e(c)),u&8||u&4&&typeof c=="object"&&c&&c.__esModule)return c;var l=Object.create(null);if(e.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:c}),u&2&&typeof c!="string")for(var _ in c)e.d(l,_,function(p){return c[p]}.bind(null,_));return l},e.n=function(c){var u=c&&c.__esModule?function(){return c.default}:function(){return c};return e.d(u,"a",u),u},e.o=function(c,u){return Object.prototype.hasOwnProperty.call(c,u)},e.p="",e(e.s="fb15")}({"01f9":function(a,r,e){"use strict";var c=e("2d00"),u=e("5ca1"),l=e("2aba"),_=e("32e9"),p=e("84f2"),h=e("41a0"),d=e("7f20"),b=e("38fd"),g=e("2b4c")("iterator"),w=!([].keys&&"next"in[].keys()),O="@@iterator",R="keys",X="values",J=function(){return this};a.exports=function(et,B,M,it,N,G,z){h(M,B,it);var F=function(st){if(!w&&st in tt)return tt[st];switch(st){case R:return function(){return new M(this,st)};case X:return function(){return new M(this,st)}}return function(){return new M(this,st)}},I=B+" Iterator",ct=N==X,yt=!1,tt=et.prototype,k=tt[g]||tt[O]||N&&tt[N],ut=k||F(N),bt=N?ct?F("entries"):ut:void 0,ht=B=="Array"&&tt.entries||k,V,St,gt;if(ht&&(gt=b(ht.call(new et)),gt!==Object.prototype&&gt.next&&(d(gt,I,!0),!c&&typeof gt[g]!="function"&&_(gt,g,J))),ct&&k&&k.name!==X&&(yt=!0,ut=function(){return k.call(this)}),(!c||z)&&(w||yt||!tt[g])&&_(tt,g,ut),p[B]=ut,p[I]=J,N)if(V={values:ct?ut:F(X),keys:G?ut:F(R),entries:bt},z)for(St in V)St in tt||l(tt,St,V[St]);else u(u.P+u.F*(w||yt),B,V);return V}},"02f4":function(a,r,e){var c=e("4588"),u=e("be13");a.exports=function(l){return function(_,p){var h=String(u(_)),d=c(p),b=h.length,g,w;return d<0||d>=b?l?"":void 0:(g=h.charCodeAt(d),g<55296||g>56319||d+1===b||(w=h.charCodeAt(d+1))<56320||w>57343?l?h.charAt(d):g:l?h.slice(d,d+2):(g-55296<<10)+(w-56320)+65536)}}},"0390":function(a,r,e){"use strict";var c=e("02f4")(!0);a.exports=function(u,l,_){return l+(_?c(u,l).length:1)}},"0bfb":function(a,r,e){"use strict";var c=e("cb7c");a.exports=function(){var u=c(this),l="";return u.global&&(l+="g"),u.ignoreCase&&(l+="i"),u.multiline&&(l+="m"),u.unicode&&(l+="u"),u.sticky&&(l+="y"),l}},"0d58":function(a,r,e){var c=e("ce10"),u=e("e11e");a.exports=Object.keys||function(_){return c(_,u)}},"1495":function(a,r,e){var c=e("86cc"),u=e("cb7c"),l=e("0d58");a.exports=e("9e1e")?Object.defineProperties:function(p,h){u(p);for(var d=l(h),b=d.length,g=0,w;b>g;)c.f(p,w=d[g++],h[w]);return p}},"214f":function(a,r,e){"use strict";e("b0c5");var c=e("2aba"),u=e("32e9"),l=e("79e5"),_=e("be13"),p=e("2b4c"),h=e("520a"),d=p("species"),b=!l(function(){var w=/./;return w.exec=function(){var O=[];return O.groups={a:"7"},O},"".replace(w,"$<a>")!=="7"}),g=function(){var w=/(?:)/,O=w.exec;w.exec=function(){return O.apply(this,arguments)};var R="ab".split(w);return R.length===2&&R[0]==="a"&&R[1]==="b"}();a.exports=function(w,O,R){var X=p(w),J=!l(function(){var G={};return G[X]=function(){return 7},""[w](G)!=7}),et=J?!l(function(){var G=!1,z=/a/;return z.exec=function(){return G=!0,null},w==="split"&&(z.constructor={},z.constructor[d]=function(){return z}),z[X](""),!G}):void 0;if(!J||!et||w==="replace"&&!b||w==="split"&&!g){var B=/./[X],M=R(_,X,""[w],function(z,F,I,ct,yt){return F.exec===h?J&&!yt?{done:!0,value:B.call(F,I,ct)}:{done:!0,value:z.call(I,F,ct)}:{done:!1}}),it=M[0],N=M[1];c(String.prototype,w,it),u(RegExp.prototype,X,O==2?function(G,z){return N.call(G,this,z)}:function(G){return N.call(G,this)})}}},"230e":function(a,r,e){var c=e("d3f4"),u=e("7726").document,l=c(u)&&c(u.createElement);a.exports=function(_){return l?u.createElement(_):{}}},"23c6":function(a,r,e){var c=e("2d95"),u=e("2b4c")("toStringTag"),l=c(function(){return arguments}())=="Arguments",_=function(p,h){try{return p[h]}catch(d){}};a.exports=function(p){var h,d,b;return p===void 0?"Undefined":p===null?"Null":typeof(d=_(h=Object(p),u))=="string"?d:l?c(h):(b=c(h))=="Object"&&typeof h.callee=="function"?"Arguments":b}},"2621":function(a,r){r.f=Object.getOwnPropertySymbols},"2aba":function(a,r,e){var c=e("7726"),u=e("32e9"),l=e("69a8"),_=e("ca5a")("src"),p=e("fa5b"),h="toString",d=(""+p).split(h);e("8378").inspectSource=function(b){return p.call(b)},(a.exports=function(b,g,w,O){var R=typeof w=="function";R&&(l(w,"name")||u(w,"name",g)),b[g]!==w&&(R&&(l(w,_)||u(w,_,b[g]?""+b[g]:d.join(String(g)))),b===c?b[g]=w:O?b[g]?b[g]=w:u(b,g,w):(delete b[g],u(b,g,w)))})(Function.prototype,h,function(){return typeof this=="function"&&this[_]||p.call(this)})},"2aeb":function(a,r,e){var c=e("cb7c"),u=e("1495"),l=e("e11e"),_=e("613b")("IE_PROTO"),p=function(){},h="prototype",d=function(){var b=e("230e")("iframe"),g=l.length,w="<",O=">",R;for(b.style.display="none",e("fab2").appendChild(b),b.src="javascript:",R=b.contentWindow.document,R.open(),R.write(w+"script"+O+"document.F=Object"+w+"/script"+O),R.close(),d=R.F;g--;)delete d[h][l[g]];return d()};a.exports=Object.create||function(g,w){var O;return g!==null?(p[h]=c(g),O=new p,p[h]=null,O[_]=g):O=d(),w===void 0?O:u(O,w)}},"2b4c":function(a,r,e){var c=e("5537")("wks"),u=e("ca5a"),l=e("7726").Symbol,_=typeof l=="function",p=a.exports=function(h){return c[h]||(c[h]=_&&l[h]||(_?l:u)("Symbol."+h))};p.store=c},"2d00":function(a,r){a.exports=!1},"2d95":function(a,r){var e={}.toString;a.exports=function(c){return e.call(c).slice(8,-1)}},"2fdb":function(a,r,e){"use strict";var c=e("5ca1"),u=e("d2c8"),l="includes";c(c.P+c.F*e("5147")(l),"String",{includes:function(p){return!!~u(this,p,l).indexOf(p,arguments.length>1?arguments[1]:void 0)}})},"32e9":function(a,r,e){var c=e("86cc"),u=e("4630");a.exports=e("9e1e")?function(l,_,p){return c.f(l,_,u(1,p))}:function(l,_,p){return l[_]=p,l}},"38fd":function(a,r,e){var c=e("69a8"),u=e("4bf8"),l=e("613b")("IE_PROTO"),_=Object.prototype;a.exports=Object.getPrototypeOf||function(p){return p=u(p),c(p,l)?p[l]:typeof p.constructor=="function"&&p instanceof p.constructor?p.constructor.prototype:p instanceof Object?_:null}},"41a0":function(a,r,e){"use strict";var c=e("2aeb"),u=e("4630"),l=e("7f20"),_={};e("32e9")(_,e("2b4c")("iterator"),function(){return this}),a.exports=function(p,h,d){p.prototype=c(_,{next:u(1,d)}),l(p,h+" Iterator")}},"456d":function(a,r,e){var c=e("4bf8"),u=e("0d58");e("5eda")("keys",function(){return function(_){return u(c(_))}})},"4588":function(a,r){var e=Math.ceil,c=Math.floor;a.exports=function(u){return isNaN(u=+u)?0:(u>0?c:e)(u)}},"4630":function(a,r){a.exports=function(e,c){return{enumerable:!(e&1),configurable:!(e&2),writable:!(e&4),value:c}}},"4bf8":function(a,r,e){var c=e("be13");a.exports=function(u){return Object(c(u))}},"5147":function(a,r,e){var c=e("2b4c")("match");a.exports=function(u){var l=/./;try{"/./"[u](l)}catch(_){try{return l[c]=!1,!"/./"[u](l)}catch(p){}}return!0}},"520a":function(a,r,e){"use strict";var c=e("0bfb"),u=RegExp.prototype.exec,l=String.prototype.replace,_=u,p="lastIndex",h=function(){var g=/a/,w=/b*/g;return u.call(g,"a"),u.call(w,"a"),g[p]!==0||w[p]!==0}(),d=/()??/.exec("")[1]!==void 0,b=h||d;b&&(_=function(w){var O=this,R,X,J,et;return d&&(X=new RegExp("^"+O.source+"$(?!\\s)",c.call(O))),h&&(R=O[p]),J=u.call(O,w),h&&J&&(O[p]=O.global?J.index+J[0].length:R),d&&J&&J.length>1&&l.call(J[0],X,function(){for(et=1;et<arguments.length-2;et++)arguments[et]===void 0&&(J[et]=void 0)}),J}),a.exports=_},"52a7":function(a,r){r.f={}.propertyIsEnumerable},"5537":function(a,r,e){var c=e("8378"),u=e("7726"),l="__core-js_shared__",_=u[l]||(u[l]={});(a.exports=function(p,h){return _[p]||(_[p]=h!==void 0?h:{})})("versions",[]).push({version:c.version,mode:e("2d00")?"pure":"global",copyright:"\xA9 2019 Denis Pushkarev (zloirock.ru)"})},"5ca1":function(a,r,e){var c=e("7726"),u=e("8378"),l=e("32e9"),_=e("2aba"),p=e("9b43"),h="prototype",d=function(b,g,w){var O=b&d.F,R=b&d.G,X=b&d.S,J=b&d.P,et=b&d.B,B=R?c:X?c[g]||(c[g]={}):(c[g]||{})[h],M=R?u:u[g]||(u[g]={}),it=M[h]||(M[h]={}),N,G,z,F;R&&(w=g);for(N in w)G=!O&&B&&B[N]!==void 0,z=(G?B:w)[N],F=et&&G?p(z,c):J&&typeof z=="function"?p(Function.call,z):z,B&&_(B,N,z,b&d.U),M[N]!=z&&l(M,N,F),J&&it[N]!=z&&(it[N]=z)};c.core=u,d.F=1,d.G=2,d.S=4,d.P=8,d.B=16,d.W=32,d.U=64,d.R=128,a.exports=d},"5eda":function(a,r,e){var c=e("5ca1"),u=e("8378"),l=e("79e5");a.exports=function(_,p){var h=(u.Object||{})[_]||Object[_],d={};d[_]=p(h),c(c.S+c.F*l(function(){h(1)}),"Object",d)}},"5f1b":function(a,r,e){"use strict";var c=e("23c6"),u=RegExp.prototype.exec;a.exports=function(l,_){var p=l.exec;if(typeof p=="function"){var h=p.call(l,_);if(typeof h!="object")throw new TypeError("RegExp exec method returned something other than an Object or null");return h}if(c(l)!=="RegExp")throw new TypeError("RegExp#exec called on incompatible receiver");return u.call(l,_)}},"613b":function(a,r,e){var c=e("5537")("keys"),u=e("ca5a");a.exports=function(l){return c[l]||(c[l]=u(l))}},"626a":function(a,r,e){var c=e("2d95");a.exports=Object("z").propertyIsEnumerable(0)?Object:function(u){return c(u)=="String"?u.split(""):Object(u)}},"6762":function(a,r,e){"use strict";var c=e("5ca1"),u=e("c366")(!0);c(c.P,"Array",{includes:function(_){return u(this,_,arguments.length>1?arguments[1]:void 0)}}),e("9c6c")("includes")},"6821":function(a,r,e){var c=e("626a"),u=e("be13");a.exports=function(l){return c(u(l))}},"69a8":function(a,r){var e={}.hasOwnProperty;a.exports=function(c,u){return e.call(c,u)}},"6a99":function(a,r,e){var c=e("d3f4");a.exports=function(u,l){if(!c(u))return u;var _,p;if(l&&typeof(_=u.toString)=="function"&&!c(p=_.call(u))||typeof(_=u.valueOf)=="function"&&!c(p=_.call(u))||!l&&typeof(_=u.toString)=="function"&&!c(p=_.call(u)))return p;throw TypeError("Can't convert object to primitive value")}},"7333":function(a,r,e){"use strict";var c=e("0d58"),u=e("2621"),l=e("52a7"),_=e("4bf8"),p=e("626a"),h=Object.assign;a.exports=!h||e("79e5")(function(){var d={},b={},g=Symbol(),w="abcdefghijklmnopqrst";return d[g]=7,w.split("").forEach(function(O){b[O]=O}),h({},d)[g]!=7||Object.keys(h({},b)).join("")!=w})?function(b,g){for(var w=_(b),O=arguments.length,R=1,X=u.f,J=l.f;O>R;)for(var et=p(arguments[R++]),B=X?c(et).concat(X(et)):c(et),M=B.length,it=0,N;M>it;)J.call(et,N=B[it++])&&(w[N]=et[N]);return w}:h},"7726":function(a,r){var e=a.exports=typeof window!="undefined"&&window.Math==Math?window:typeof self!="undefined"&&self.Math==Math?self:Function("return this")();typeof __g=="number"&&(__g=e)},"77f1":function(a,r,e){var c=e("4588"),u=Math.max,l=Math.min;a.exports=function(_,p){return _=c(_),_<0?u(_+p,0):l(_,p)}},"79e5":function(a,r){a.exports=function(e){try{return!!e()}catch(c){return!0}}},"7f20":function(a,r,e){var c=e("86cc").f,u=e("69a8"),l=e("2b4c")("toStringTag");a.exports=function(_,p,h){_&&!u(_=h?_:_.prototype,l)&&c(_,l,{configurable:!0,value:p})}},"8378":function(a,r){var e=a.exports={version:"2.6.5"};typeof __e=="number"&&(__e=e)},"84f2":function(a,r){a.exports={}},"86cc":function(a,r,e){var c=e("cb7c"),u=e("c69a"),l=e("6a99"),_=Object.defineProperty;r.f=e("9e1e")?Object.defineProperty:function(h,d,b){if(c(h),d=l(d,!0),c(b),u)try{return _(h,d,b)}catch(g){}if("get"in b||"set"in b)throw TypeError("Accessors not supported!");return"value"in b&&(h[d]=b.value),h}},"9b43":function(a,r,e){var c=e("d8e8");a.exports=function(u,l,_){if(c(u),l===void 0)return u;switch(_){case 1:return function(p){return u.call(l,p)};case 2:return function(p,h){return u.call(l,p,h)};case 3:return function(p,h,d){return u.call(l,p,h,d)}}return function(){return u.apply(l,arguments)}}},"9c6c":function(a,r,e){var c=e("2b4c")("unscopables"),u=Array.prototype;u[c]==null&&e("32e9")(u,c,{}),a.exports=function(l){u[c][l]=!0}},"9def":function(a,r,e){var c=e("4588"),u=Math.min;a.exports=function(l){return l>0?u(c(l),9007199254740991):0}},"9e1e":function(a,r,e){a.exports=!e("79e5")(function(){return Object.defineProperty({},"a",{get:function(){return 7}}).a!=7})},a352:function(a,r){a.exports=t},a481:function(a,r,e){"use strict";var c=e("cb7c"),u=e("4bf8"),l=e("9def"),_=e("4588"),p=e("0390"),h=e("5f1b"),d=Math.max,b=Math.min,g=Math.floor,w=/\$([$&`']|\d\d?|<[^>]*>)/g,O=/\$([$&`']|\d\d?)/g,R=function(X){return X===void 0?X:String(X)};e("214f")("replace",2,function(X,J,et,B){return[function(N,G){var z=X(this),F=N==null?void 0:N[J];return F!==void 0?F.call(N,z,G):et.call(String(z),N,G)},function(it,N){var G=B(et,it,this,N);if(G.done)return G.value;var z=c(it),F=String(this),I=typeof N=="function";I||(N=String(N));var ct=z.global;if(ct){var yt=z.unicode;z.lastIndex=0}for(var tt=[];;){var k=h(z,F);if(k===null||(tt.push(k),!ct))break;var ut=String(k[0]);ut===""&&(z.lastIndex=p(F,l(z.lastIndex),yt))}for(var bt="",ht=0,V=0;V<tt.length;V++){k=tt[V];for(var St=String(k[0]),gt=d(b(_(k.index),F.length),0),st=[],Nt=1;Nt<k.length;Nt++)st.push(R(k[Nt]));var Lt=k.groups;if(I){var jt=[St].concat(st,gt,F);Lt!==void 0&&jt.push(Lt);var Ut=String(N.apply(void 0,jt))}else Ut=M(St,F,gt,st,Lt,N);gt>=ht&&(bt+=F.slice(ht,gt)+Ut,ht=gt+St.length)}return bt+F.slice(ht)}];function M(it,N,G,z,F,I){var ct=G+it.length,yt=z.length,tt=O;return F!==void 0&&(F=u(F),tt=w),et.call(I,tt,function(k,ut){var bt;switch(ut.charAt(0)){case"$":return"$";case"&":return it;case"`":return N.slice(0,G);case"'":return N.slice(ct);case"<":bt=F[ut.slice(1,-1)];break;default:var ht=+ut;if(ht===0)return k;if(ht>yt){var V=g(ht/10);return V===0?k:V<=yt?z[V-1]===void 0?ut.charAt(1):z[V-1]+ut.charAt(1):k}bt=z[ht-1]}return bt===void 0?"":bt})}})},aae3:function(a,r,e){var c=e("d3f4"),u=e("2d95"),l=e("2b4c")("match");a.exports=function(_){var p;return c(_)&&((p=_[l])!==void 0?!!p:u(_)=="RegExp")}},ac6a:function(a,r,e){for(var c=e("cadf"),u=e("0d58"),l=e("2aba"),_=e("7726"),p=e("32e9"),h=e("84f2"),d=e("2b4c"),b=d("iterator"),g=d("toStringTag"),w=h.Array,O={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},R=u(O),X=0;X<R.length;X++){var J=R[X],et=O[J],B=_[J],M=B&&B.prototype,it;if(M&&(M[b]||p(M,b,w),M[g]||p(M,g,J),h[J]=w,et))for(it in c)M[it]||l(M,it,c[it],!0)}},b0c5:function(a,r,e){"use strict";var c=e("520a");e("5ca1")({target:"RegExp",proto:!0,forced:c!==/./.exec},{exec:c})},be13:function(a,r){a.exports=function(e){if(e==null)throw TypeError("Can't call method on  "+e);return e}},c366:function(a,r,e){var c=e("6821"),u=e("9def"),l=e("77f1");a.exports=function(_){return function(p,h,d){var b=c(p),g=u(b.length),w=l(d,g),O;if(_&&h!=h){for(;g>w;)if(O=b[w++],O!=O)return!0}else for(;g>w;w++)if((_||w in b)&&b[w]===h)return _||w||0;return!_&&-1}}},c649:function(a,r,e){"use strict";(function(c){e.d(r,"c",function(){return w}),e.d(r,"a",function(){return b}),e.d(r,"b",function(){return p}),e.d(r,"d",function(){return g});var u=e("a481"),l=e.n(u);function _(){return typeof window!="undefined"?window.console:c.console}var p=_();function h(O){var R=Object.create(null);return function(J){var et=R[J];return et||(R[J]=O(J))}}var d=/-(\w)/g,b=h(function(O){return O.replace(d,function(R,X){return X?X.toUpperCase():""})});function g(O){O.parentElement!==null&&O.parentElement.removeChild(O)}function w(O,R,X){var J=X===0?O.children[0]:O.children[X-1].nextSibling;O.insertBefore(R,J)}}).call(this,e("c8ba"))},c69a:function(a,r,e){a.exports=!e("9e1e")&&!e("79e5")(function(){return Object.defineProperty(e("230e")("div"),"a",{get:function(){return 7}}).a!=7})},c8ba:function(a,r){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(c){typeof window=="object"&&(e=window)}a.exports=e},ca5a:function(a,r){var e=0,c=Math.random();a.exports=function(u){return"Symbol(".concat(u===void 0?"":u,")_",(++e+c).toString(36))}},cadf:function(a,r,e){"use strict";var c=e("9c6c"),u=e("d53b"),l=e("84f2"),_=e("6821");a.exports=e("01f9")(Array,"Array",function(p,h){this._t=_(p),this._i=0,this._k=h},function(){var p=this._t,h=this._k,d=this._i++;return!p||d>=p.length?(this._t=void 0,u(1)):h=="keys"?u(0,d):h=="values"?u(0,p[d]):u(0,[d,p[d]])},"values"),l.Arguments=l.Array,c("keys"),c("values"),c("entries")},cb7c:function(a,r,e){var c=e("d3f4");a.exports=function(u){if(!c(u))throw TypeError(u+" is not an object!");return u}},ce10:function(a,r,e){var c=e("69a8"),u=e("6821"),l=e("c366")(!1),_=e("613b")("IE_PROTO");a.exports=function(p,h){var d=u(p),b=0,g=[],w;for(w in d)w!=_&&c(d,w)&&g.push(w);for(;h.length>b;)c(d,w=h[b++])&&(~l(g,w)||g.push(w));return g}},d2c8:function(a,r,e){var c=e("aae3"),u=e("be13");a.exports=function(l,_,p){if(c(_))throw TypeError("String#"+p+" doesn't accept regex!");return String(u(l))}},d3f4:function(a,r){a.exports=function(e){return typeof e=="object"?e!==null:typeof e=="function"}},d53b:function(a,r){a.exports=function(e,c){return{value:c,done:!!e}}},d8e8:function(a,r){a.exports=function(e){if(typeof e!="function")throw TypeError(e+" is not a function!");return e}},e11e:function(a,r){a.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},f559:function(a,r,e){"use strict";var c=e("5ca1"),u=e("9def"),l=e("d2c8"),_="startsWith",p=""[_];c(c.P+c.F*e("5147")(_),"String",{startsWith:function(d){var b=l(this,d,_),g=u(Math.min(arguments.length>1?arguments[1]:void 0,b.length)),w=String(d);return p?p.call(b,w,g):b.slice(g,g+w.length)===w}})},f6fd:function(a,r){(function(e){var c="currentScript",u=e.getElementsByTagName("script");c in e||Object.defineProperty(e,c,{get:function(){try{throw new Error}catch(p){var l,_=(/.*at [^\(]*\((.*):.+:.+\)$/ig.exec(p.stack)||[!1])[1];for(l in u)if(u[l].src==_||u[l].readyState=="interactive")return u[l];return null}}})})(document)},f751:function(a,r,e){var c=e("5ca1");c(c.S+c.F,"Object",{assign:e("7333")})},fa5b:function(a,r,e){a.exports=e("5537")("native-function-to-string",Function.toString)},fab2:function(a,r,e){var c=e("7726").document;a.exports=c&&c.documentElement},fb15:function(a,r,e){"use strict";if(e.r(r),typeof window!="undefined"){e("f6fd");var c;(c=window.document.currentScript)&&(c=c.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))&&(e.p=c[1])}var u=null,l=e("f751"),_=e("f559"),p=e("ac6a"),h=e("cadf"),d=e("456d");function b(x){if(Array.isArray(x))return x}function g(x,A){if(!(typeof Symbol=="undefined"||!(Symbol.iterator in Object(x)))){var C=[],P=!0,K=!1,Q=void 0;try{for(var nt=x[Symbol.iterator](),rt;!(P=(rt=nt.next()).done)&&(C.push(rt.value),!(A&&C.length===A));P=!0);}catch(xt){K=!0,Q=xt}finally{try{!P&&nt.return!=null&&nt.return()}finally{if(K)throw Q}}return C}}function w(x,A){(A==null||A>x.length)&&(A=x.length);for(var C=0,P=new Array(A);C<A;C++)P[C]=x[C];return P}function O(x,A){if(!!x){if(typeof x=="string")return w(x,A);var C=Object.prototype.toString.call(x).slice(8,-1);if(C==="Object"&&x.constructor&&(C=x.constructor.name),C==="Map"||C==="Set")return Array.from(x);if(C==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(C))return w(x,A)}}function R(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function X(x,A){return b(x)||g(x,A)||O(x,A)||R()}var J=e("6762"),et=e("2fdb");function B(x){if(Array.isArray(x))return w(x)}function M(x){if(typeof Symbol!="undefined"&&Symbol.iterator in Object(x))return Array.from(x)}function it(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function N(x){return B(x)||M(x)||O(x)||it()}var G=e("a352"),z=e.n(G),F=e("c649");function I(x,A,C){return C===void 0||(x=x||{},x[A]=C),x}function ct(x,A){return x.map(function(C){return C.elm}).indexOf(A)}function yt(x,A,C,P){if(!x)return[];var K=x.map(function(rt){return rt.elm}),Q=A.length-P,nt=N(A).map(function(rt,xt){return xt>=Q?K.length:K.indexOf(rt)});return C?nt.filter(function(rt){return rt!==-1}):nt}function tt(x,A){var C=this;this.$nextTick(function(){return C.$emit(x.toLowerCase(),A)})}function k(x){var A=this;return function(C){A.realList!==null&&A["onDrag"+x](C),tt.call(A,x,C)}}function ut(x){return["transition-group","TransitionGroup"].includes(x)}function bt(x){if(!x||x.length!==1)return!1;var A=X(x,1),C=A[0].componentOptions;return C?ut(C.tag):!1}function ht(x,A,C){return x[C]||(A[C]?A[C]():void 0)}function V(x,A,C){var P=0,K=0,Q=ht(A,C,"header");Q&&(P=Q.length,x=x?[].concat(N(Q),N(x)):N(Q));var nt=ht(A,C,"footer");return nt&&(K=nt.length,x=x?[].concat(N(x),N(nt)):N(nt)),{children:x,headerOffset:P,footerOffset:K}}function St(x,A){var C=null,P=function(Ht,Vt){C=I(C,Ht,Vt)},K=Object.keys(x).filter(function(xt){return xt==="id"||xt.startsWith("data-")}).reduce(function(xt,Ht){return xt[Ht]=x[Ht],xt},{});if(P("attrs",K),!A)return C;var Q=A.on,nt=A.props,rt=A.attrs;return P("on",Q),P("props",nt),Object.assign(C.attrs,rt),C}var gt=["Start","Add","Remove","Update","End"],st=["Choose","Unchoose","Sort","Filter","Clone"],Nt=["Move"].concat(gt,st).map(function(x){return"on"+x}),Lt=null,jt={options:Object,list:{type:Array,required:!1,default:null},value:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:function(A){return A}},element:{type:String,default:"div"},tag:{type:String,default:null},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null}},Ut={name:"draggable",inheritAttrs:!1,props:jt,data:function(){return{transitionMode:!1,noneFunctionalComponentMode:!1}},render:function(A){var C=this.$slots.default;this.transitionMode=bt(C);var P=V(C,this.$slots,this.$scopedSlots),K=P.children,Q=P.headerOffset,nt=P.footerOffset;this.headerOffset=Q,this.footerOffset=nt;var rt=St(this.$attrs,this.componentData);return A(this.getTag(),rt,K)},created:function(){this.list!==null&&this.value!==null&&F.b.error("Value and list props are mutually exclusive! Please set one or another."),this.element!=="div"&&F.b.warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props"),this.options!==void 0&&F.b.warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props")},mounted:function(){var A=this;if(this.noneFunctionalComponentMode=this.getTag().toLowerCase()!==this.$el.nodeName.toLowerCase()&&!this.getIsFunctional(),this.noneFunctionalComponentMode&&this.transitionMode)throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));var C={};gt.forEach(function(Q){C["on"+Q]=k.call(A,Q)}),st.forEach(function(Q){C["on"+Q]=tt.bind(A,Q)});var P=Object.keys(this.$attrs).reduce(function(Q,nt){return Q[Object(F.a)(nt)]=A.$attrs[nt],Q},{}),K=Object.assign({},this.options,P,C,{onMove:function(nt,rt){return A.onDragMove(nt,rt)}});!("draggable"in K)&&(K.draggable=">*"),this._sortable=new z.a(this.rootContainer,K),this.computeIndexes()},beforeDestroy:function(){this._sortable!==void 0&&this._sortable.destroy()},computed:{rootContainer:function(){return this.transitionMode?this.$el.children[0]:this.$el},realList:function(){return this.list?this.list:this.value}},watch:{options:{handler:function(A){this.updateOptions(A)},deep:!0},$attrs:{handler:function(A){this.updateOptions(A)},deep:!0},realList:function(){this.computeIndexes()}},methods:{getIsFunctional:function(){var A=this._vnode.fnOptions;return A&&A.functional},getTag:function(){return this.tag||this.element},updateOptions:function(A){for(var C in A){var P=Object(F.a)(C);Nt.indexOf(P)===-1&&this._sortable.option(P,A[C])}},getChildrenNodes:function(){if(this.noneFunctionalComponentMode)return this.$children[0].$slots.default;var A=this.$slots.default;return this.transitionMode?A[0].child.$slots.default:A},computeIndexes:function(){var A=this;this.$nextTick(function(){A.visibleIndexes=yt(A.getChildrenNodes(),A.rootContainer.children,A.transitionMode,A.footerOffset)})},getUnderlyingVm:function(A){var C=ct(this.getChildrenNodes()||[],A);if(C===-1)return null;var P=this.realList[C];return{index:C,element:P}},getUnderlyingPotencialDraggableComponent:function(A){var C=A.__vue__;return!C||!C.$options||!ut(C.$options._componentTag)?!("realList"in C)&&C.$children.length===1&&"realList"in C.$children[0]?C.$children[0]:C:C.$parent},emitChanges:function(A){var C=this;this.$nextTick(function(){C.$emit("change",A)})},alterList:function(A){if(this.list){A(this.list);return}var C=N(this.value);A(C),this.$emit("input",C)},spliceList:function(){var A=arguments,C=function(K){return K.splice.apply(K,N(A))};this.alterList(C)},updatePosition:function(A,C){var P=function(Q){return Q.splice(C,0,Q.splice(A,1)[0])};this.alterList(P)},getRelatedContextFromMoveEvent:function(A){var C=A.to,P=A.related,K=this.getUnderlyingPotencialDraggableComponent(C);if(!K)return{component:K};var Q=K.realList,nt={list:Q,component:K};if(C!==P&&Q&&K.getUnderlyingVm){var rt=K.getUnderlyingVm(P);if(rt)return Object.assign(rt,nt)}return nt},getVmIndex:function(A){var C=this.visibleIndexes,P=C.length;return A>P-1?P:C[A]},getComponent:function(){return this.$slots.default[0].componentInstance},resetTransitionData:function(A){if(!(!this.noTransitionOnDrag||!this.transitionMode)){var C=this.getChildrenNodes();C[A].data=null;var P=this.getComponent();P.children=[],P.kept=void 0}},onDragStart:function(A){this.context=this.getUnderlyingVm(A.item),A.item._underlying_vm_=this.clone(this.context.element),Lt=A.item},onDragAdd:function(A){var C=A.item._underlying_vm_;if(C!==void 0){Object(F.d)(A.item);var P=this.getVmIndex(A.newIndex);this.spliceList(P,0,C),this.computeIndexes();var K={element:C,newIndex:P};this.emitChanges({added:K})}},onDragRemove:function(A){if(Object(F.c)(this.rootContainer,A.item,A.oldIndex),A.pullMode==="clone"){Object(F.d)(A.clone);return}var C=this.context.index;this.spliceList(C,1);var P={element:this.context.element,oldIndex:C};this.resetTransitionData(C),this.emitChanges({removed:P})},onDragUpdate:function(A){Object(F.d)(A.item),Object(F.c)(A.from,A.item,A.oldIndex);var C=this.context.index,P=this.getVmIndex(A.newIndex);this.updatePosition(C,P);var K={element:this.context.element,oldIndex:C,newIndex:P};this.emitChanges({moved:K})},updateProperty:function(A,C){A.hasOwnProperty(C)&&(A[C]+=this.headerOffset)},computeFutureIndex:function(A,C){if(!A.element)return 0;var P=N(C.to.children).filter(function(rt){return rt.style.display!=="none"}),K=P.indexOf(C.related),Q=A.component.getVmIndex(K),nt=P.indexOf(Lt)!==-1;return nt||!C.willInsertAfter?Q:Q+1},onDragMove:function(A,C){var P=this.move;if(!P||!this.realList)return!0;var K=this.getRelatedContextFromMoveEvent(A),Q=this.context,nt=this.computeFutureIndex(K,A);Object.assign(Q,{futureIndex:nt});var rt=Object.assign({},A,{relatedContext:K,draggedContext:Q});return P(rt,C)},onDragEnd:function(){this.computeIndexes(),Lt=null}}};typeof window!="undefined"&&"Vue"in window&&window.Vue.component("draggable",Ut);var Ne=Ut,je=r.default=Ne}}).default})});var Jn=_e(ae());var Ri={name:"HTMLEditor",props:["value","button-label"],data(){return{editing:!1}},methods:{toggle_edit(){if(this.editing){this.$emit("change",this.get_value()),this.editing=!1;return}this.editing=!0,this.control||(this.control=frappe.ui.form.make_control({parent:this.$refs.editor,df:{fieldname:"editor",fieldtype:"HTML Editor",min_lines:10,max_lines:30,change:()=>{this.$emit("change",this.get_value())}},render_input:!0})),this.control.set_value(this.value)},get_value(){return frappe.dom.remove_script_and_style(this.control.get_value())}}},Fn=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"html-editor"},[r("div",{staticClass:"d-flex justify-content-end"},[r("button",{staticClass:"btn btn-default btn-xs btn-edit",on:{click:t.toggle_edit}},[t._v(`
			`+t._s(t.editing?t.__("Done"):t.buttonLabel)+`
		`)])]),t._v(" "),t.editing?t._e():r("div",{domProps:{innerHTML:t._s(t.value)}}),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.editing,expression:"editing"}],ref:"editor"})])},Pi=[];Fn._withStripped=!0;var Li=function(t){!t||t("data-v-4b25833c_0",{source:`
.html-editor {
	position: relative;
	border: 1px solid var(--dark-border-color);
	border-radius: var(--border-radius);
	padding: 1rem;
	margin-bottom: 1rem;
}
.html-editor:last-child {
	margin-bottom: 0;
}
`,map:{version:3,sources:["frappe/public/js/print_format_builder/HTMLEditor.vue"],names:[],mappings:";AAwDA;CACA,kBAAA;CACA,0CAAA;CACA,mCAAA;CACA,aAAA;CACA,mBAAA;AACA;AAEA;CACA,gBAAA;AACA",file:"HTMLEditor.vue",sourcesContent:[`<template>
	<div class="html-editor">
		<div class="d-flex justify-content-end">
			<button
				class="btn btn-default btn-xs btn-edit"
				@click="toggle_edit"
			>
				{{ !editing ? buttonLabel : __("Done") }}
			</button>
		</div>
		<div v-if="!editing" v-html="value"></div>
		<div v-show="editing" ref="editor"></div>
	</div>
</template>
<script>
export default {
	name: "HTMLEditor",
	props: ["value", "button-label"],
	data() {
		return {
			editing: false
		};
	},
	methods: {
		toggle_edit() {
			if (this.editing) {
				this.$emit("change", this.get_value());
				this.editing = false;
				return;
			}

			this.editing = true;
			if (!this.control) {
				this.control = frappe.ui.form.make_control({
					parent: this.$refs.editor,
					df: {
						fieldname: "editor",
						fieldtype: "HTML Editor",
						min_lines: 10,
						max_lines: 30,
						change: () => {
							this.$emit("change", this.get_value());
						}
					},
					render_input: true
				});
			}
			this.control.set_value(this.value);
		},
		get_value() {
			return frappe.dom.remove_script_and_style(this.control.get_value());
		}
	}
};
<\/script>
<style>
.html-editor {
	position: relative;
	border: 1px solid var(--dark-border-color);
	border-radius: var(--border-radius);
	padding: 1rem;
	margin-bottom: 1rem;
}

.html-editor:last-child {
	margin-bottom: 0;
}
</style>
`]},media:void 0})},Mi=void 0,Fi=void 0,Bi=!1;function Ni(t,a,r,e,c,u,l,_,p,h){let d=(typeof r=="function"?r.options:r)||{};d.__file="frappe/public/js/print_format_builder/HTMLEditor.vue",d.render||(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,c&&(d.functional=!0)),d._scopeId=e;{let b;if(a&&(b=l?function(g){a.call(this,h(g,this.$root.$options.shadowRoot))}:function(g){a.call(this,_(g))}),b!==void 0)if(d.functional){let g=d.render;d.render=function(O,R){return b.call(R),g(O,R)}}else{let g=d.beforeCreate;d.beforeCreate=g?[].concat(g,b):[b]}}return d}function an(){let t=an.styles||(an.styles={}),a=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(e,c){if(document.querySelector('style[data-vue-ssr-id~="'+e+'"]'))return;let u=a?c.media||"default":e,l=t[u]||(t[u]={ids:[],parts:[],element:void 0});if(!l.ids.includes(e)){let _=c.source,p=l.ids.length;if(l.ids.push(e),a&&(l.element=l.element||document.querySelector("style[data-group="+u+"]")),!l.element){let h=document.head||document.getElementsByTagName("head")[0],d=l.element=document.createElement("style");d.type="text/css",c.media&&d.setAttribute("media",c.media),a&&(d.setAttribute("data-group",u),d.setAttribute("data-next-index","0")),h.appendChild(d)}if(a&&(p=parseInt(l.element.getAttribute("data-next-index")),l.element.setAttribute("data-next-index",p+1)),l.element.styleSheet)l.parts.push(_),l.element.styleSheet.cssText=l.parts.filter(Boolean).join(`
`);else{let h=document.createTextNode(_),d=l.element.childNodes;d[p]&&l.element.removeChild(d[p]),d.length?l.element.insertBefore(h,d[p]):l.element.appendChild(h)}}}}var ji=Ni({render:Fn,staticRenderFns:Pi},Li,Ri,Mi,Bi,Fi,!1,an,void 0,void 0),Bn=ji;function Nn(t,a){let r={header:ki(t),sections:[]},e=null,c=null;function u(h){e||l(),c=p(h),e.columns.push(c)}function l(h){e=_(h),c=null,r.sections.push(e)}function _(h){return h||(h={label:""}),{label:h.label||"",columns:[]}}function p(h){return h||(h={label:""}),{label:h.label||"",fields:[]}}for(let h of t.fields){if(h.fieldname)h=JSON.parse(JSON.stringify(h));else continue;if(h.fieldtype==="Section Break")l(h);else if(h.fieldtype==="Column Break")u(h);else if(h.label&&(c||u(),!h.print_hide)){let d={label:h.label,fieldname:h.fieldname,fieldtype:h.fieldtype,options:h.options},b=Hi(a,h.fieldname);b&&(d.label=`${__(h.label)} (${__("Field Template")})`,d.fieldtype="Field Template",d.field_template=b.name,d.fieldname=h.fieldname="_template"),h.fieldtype==="Table"&&(d.table_columns=sn(h)),c.fields.push(d),e.has_fields=!0}}return r.sections=r.sections.filter(h=>h.has_fields),r}function sn(t){let a=[],r=frappe.get_meta(t.options).fields,e=0;for(let c of r)if(!in_list(["Section Break","Column Break"],c.fieldtype)&&!c.print_hide&&t.label&&e<100){let u=typeof c.width=="number"&&c.width<100?c.width:c.width?20:10;a.push({label:c.label,fieldname:c.fieldname,fieldtype:c.fieldtype,options:c.options,width:u}),e+=u}return a}function Hi(t,a){let r=t.__onload.print_templates||{};for(let e of r)if(e.field===a)return e;return null}function ki(t){return`<div class="document-header">
	<h3>${t.name}</h3>
	<p>{{ doc.name }}</p>
</div>`}function Ae(t,a){let r={};for(let e of a)e in t&&(r[e]=t[e]);return r}function ln(t){return new Promise(a=>{let r=new Image;r.onload=function(){a({width:this.width,height:this.height})},r.src=t})}var Fe={};function Be(t){if(Fe[t])return Fe[t];let a={data(){return{print_format_name:t,letterhead_name:null,print_format:null,letterhead:null,doctype:null,meta:null,layout:null,dirty:!1,edit_letterhead:!1}},watch:{layout:{deep:!0,handler(){this.dirty=!0}},print_format:{deep:!0,handler(){this.dirty=!0}}},methods:{fetch(){return new Promise(r=>{frappe.model.clear_doc("Print Format",this.print_format_name),frappe.model.with_doc("Print Format",this.print_format_name,()=>{let e=frappe.get_doc("Print Format",this.print_format_name);frappe.model.with_doctype(e.doc_type,()=>{this.meta=frappe.get_meta(e.doc_type),this.print_format=e,this.layout=this.get_layout(),this.$nextTick(()=>this.dirty=!1),this.edit_letterhead=!1,r()})})})},update({fieldname:r,value:e}){this.$set(this.print_format,r,e)},save_changes(){frappe.dom.freeze(__("Saving...")),this.layout.sections=this.layout.sections.filter(r=>!r.remove).map(r=>(r.columns=r.columns.map(e=>(e.fields=e.fields.filter(c=>!c.remove).map(c=>(c.table_columns&&(c.table_columns=c.table_columns.map(u=>Ae(u,["label","fieldname","fieldtype","options","width","field_template"]))),Ae(c,["label","fieldname","fieldtype","options","table_columns","html","field_template"]))),e)),r)),this.print_format.format_data=JSON.stringify(this.layout),frappe.call("frappe.client.save",{doc:this.print_format}).then(()=>{if(this.letterhead&&this.letterhead._dirty)return frappe.call("frappe.client.save",{doc:this.letterhead}).then(r=>this.letterhead=r.message)}).then(()=>this.fetch()).always(()=>{frappe.dom.unfreeze(),this.$emit("after_save")})},reset_changes(){this.fetch()},get_layout(){return this.print_format?typeof this.print_format.format_data=="string"?JSON.parse(this.print_format.format_data):this.print_format.format_data:null},get_default_layout(){return Nn(this.meta,this.print_format)},change_letterhead(r){return frappe.db.get_doc("Letter Head",r).then(e=>{this.letterhead=e})}}};return Fe[t]=new Vue(a),Fe[t]}var Pt={inject:["$store"],computed:{print_format(){return this.$store.print_format},layout(){return this.$store.layout},letterhead(){return this.$store.letterhead},meta(){return this.$store.meta}}};var Ui={name:"LetterHeadEditor",mixins:[Pt],data(){return{range_input_field:null,aspect_ratio:null}},watch:{letterhead:{deep:!0,immediate:!0,handler(t){if(!!t&&t.image_width&&t.image_height){let a=t.image_width>t.image_height?"width":"height",r=t["image_"+a];t.content=`
						<div style="text-align: ${t.align.toLowerCase()};">
							<img
								src="${t.image}"
								alt="${t.name}"
								${a}="${r}"
								style="${a}: ${r}px;">
						</div>
					`}}}},mounted(){!this.letterhead&&frappe.boot.sysdefaults.letter_head&&this.set_letterhead(frappe.boot.sysdefaults.letter_head),this.$watch(function(){return this.letterhead?this.letterhead[this.range_input_field]:null},function(){if(this.aspect_ratio===null)return;let t=this.range_input_field=="image_width"?"image_height":"image_width";this.letterhead[t]=t=="image_width"?this.aspect_ratio*this.letterhead.image_height:this.letterhead.image_width/this.aspect_ratio})},methods:{toggle_edit_letterhead(){if(this.$store.edit_letterhead){this.$store.edit_letterhead=!1;return}this.$store.edit_letterhead=!0,this.control||(this.control=frappe.ui.form.make_control({parent:this.$refs.editor,df:{fieldname:"letterhead",fieldtype:"Comment",change:()=>{this.letterhead._dirty=!0,this.letterhead.content=this.control.get_value()}},render_input:!0,only_input:!0,no_wrapper:!0})),this.control.set_value(this.letterhead.content)},change_letterhead(){let t=new frappe.ui.Dialog({title:__("Change Letter Head"),fields:[{label:__("Letter Head"),fieldname:"letterhead",fieldtype:"Link",options:"Letter Head"}],primary_action:({letterhead:a})=>{a&&this.set_letterhead(a),t.hide()}});t.show()},upload_image(){new frappe.ui.FileUploader({folder:"Home/Attachments",on_success:t=>{ln(t.file_url).then(({width:a,height:r})=>{this.$set(this.letterhead,"image",t.file_url);let e=a,c=r;this.aspect_ratio=a/r,this.range_input_field=this.aspect_ratio>1?"image_width":"image_height",a>200&&(e=200,c=e/aspect_ratio),r>80&&(c=80,e=aspect_ratio*c),this.$set(this.letterhead,"image_height",c),this.$set(this.letterhead,"image_width",e)})}})},set_letterhead(t){this.$store.change_letterhead(t).then(()=>{ln(this.letterhead.image).then(({width:a,height:r})=>{this.aspect_ratio=a/r,this.range_input_field=this.aspect_ratio>1?"image_width":"image_height"})})},create_letterhead(){let t=new frappe.ui.Dialog({title:__("Create Letter Head"),fields:[{label:__("Letter Head Name"),fieldname:"name",fieldtype:"Data"}],primary_action:({name:a})=>frappe.db.insert({doctype:"Letter Head",letter_head_name:a,source:"Image"}).then(r=>{t.hide(),this.$store.change_letterhead(r.name).then(()=>{this.toggle_edit_letterhead()})})});t.show()}}},jn=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"letterhead"},[r("div",{staticClass:"mb-4 d-flex justify-content-between"},[r("div",{staticClass:"d-flex align-items-center"},[t.letterhead&&t.$store.edit_letterhead?r("div",{staticClass:"btn-group",attrs:{role:"group","aria-label":"Align Letterhead"}},t._l(["Left","Center","Right"],function(e){return r("button",{staticClass:"btn btn-xs",class:t.letterhead.align==e?"btn-secondary":"btn-default",attrs:{type:"button"},on:{click:function(c){t.letterhead.align=e}}},[t._v(`
					`+t._s(e)+`
				`)])}),0):t._e(),t._v(" "),t.letterhead&&t.$store.edit_letterhead?r("input",{staticClass:"ml-4 custom-range",attrs:{type:"range",name:"image-resize",min:"20",max:t.range_input_field==="image_width"?700:500},domProps:{value:t.letterhead[t.range_input_field]},on:{input:function(e){return t.letterhead[t.range_input_field]=parseFloat(e.target.value)}}}):t._e()]),t._v(" "),r("div",[t.letterhead&&t.$store.edit_letterhead?r("button",{staticClass:"ml-2 btn btn-default btn-xs",on:{click:t.upload_image}},[t._v(`
				`+t._s(t.__("Change Image"))+`
			`)]):t._e(),t._v(" "),t.letterhead&&t.$store.edit_letterhead?r("button",{staticClass:"ml-2 btn btn-default btn-xs btn-change-letterhead",on:{click:t.change_letterhead}},[t._v(`
				`+t._s(t.__("Change Letter Head"))+`
			`)]):t._e(),t._v(" "),t.letterhead?r("button",{staticClass:"ml-2 btn btn-default btn-xs btn-edit",on:{click:t.toggle_edit_letterhead}},[t._v(`
				`+t._s(t.$store.edit_letterhead?t.__("Done"):t.__("Edit Letter Head"))+`
			`)]):t._e(),t._v(" "),t.letterhead?t._e():r("button",{staticClass:"ml-2 btn btn-default btn-xs btn-edit",on:{click:t.create_letterhead}},[t._v(`
				`+t._s(t.__("Create Letter Head"))+`
			`)])])]),t._v(" "),t.letterhead&&!t.$store.edit_letterhead?r("div",{domProps:{innerHTML:t._s(t.letterhead.content)}}):t._e(),t._v(" "),t.letterhead&&t.$store.edit_letterhead?r("div",{staticClass:"edit-letterhead",style:{justifyContent:{Left:"flex-start",Center:"center",Right:"flex-end"}[t.letterhead.align]}},[r("div",{staticClass:"edit-image"},[t.letterhead.image?r("div",[r("img",{style:{width:t.range_input_field==="image_width"?t.letterhead.image_width+"px":null,height:t.range_input_field==="image_height"?t.letterhead.image_height+"px":null},attrs:{src:t.letterhead.image}})]):r("button",{staticClass:"btn btn-default",on:{click:t.upload_image}},[t._v(`
				`+t._s(t.__("Upload Image"))+`
			`)])])]):t._e()])},zi=[];jn._withStripped=!0;var Wi=function(t){!t||t("data-v-72723dd8_0",{source:`
.letterhead[data-v-72723dd8] {
	position: relative;
	border: 1px solid var(--dark-border-color);
	border-radius: var(--border-radius);
	padding: 1rem;
	margin-bottom: 1rem;
}
.edit-letterhead[data-v-72723dd8] {
	display: flex;
	align-items: center;
}
.edit-image[data-v-72723dd8] {
	min-width: 40px;
	min-height: 40px;
	border: 1px solid var(--border-color);
}
.edit-image img[data-v-72723dd8] {
	height: 100%;
}
.edit-title[data-v-72723dd8] {
	margin-left: 1rem;
	border: 1px solid transparent;
	border-radius: var(--border-radius);
	font-size: var(--text-md);
	font-weight: 600;
}
`,map:{version:3,sources:["frappe/public/js/print_format_builder/LetterHeadEditor.vue"],names:[],mappings:";AAoTA;CACA,kBAAA;CACA,0CAAA;CACA,mCAAA;CACA,aAAA;CACA,mBAAA;AACA;AACA;CACA,aAAA;CACA,mBAAA;AACA;AACA;CACA,eAAA;CACA,gBAAA;CACA,qCAAA;AACA;AACA;CACA,YAAA;AACA;AACA;CACA,iBAAA;CACA,6BAAA;CACA,mCAAA;CACA,yBAAA;CACA,gBAAA;AACA",file:"LetterHeadEditor.vue",sourcesContent:[`<template>
	<div class="letterhead">
		<div class="mb-4 d-flex justify-content-between">
			<div class="d-flex align-items-center">
				<div
					v-if="letterhead && $store.edit_letterhead"
					class="btn-group"
					role="group"
					aria-label="Align Letterhead"
				>
					<button
						v-for="direction in ['Left', 'Center', 'Right']"
						type="button"
						class="btn btn-xs"
						@click="letterhead.align = direction"
						:class="
							letterhead.align == direction
								? 'btn-secondary'
								: 'btn-default'
						"
					>
						{{ direction }}
					</button>
				</div>
				<input
					class="ml-4 custom-range"
					v-if="letterhead && $store.edit_letterhead"
					type="range"
					name="image-resize"
					min="20"
					:max="range_input_field === 'image_width' ? 700 : 500"
					:value="letterhead[range_input_field]"
					@input="
						e =>
							(letterhead[range_input_field] = parseFloat(
								e.target.value
							))
					"
				/>
			</div>
			<div>
				<button
					class="ml-2 btn btn-default btn-xs"
					v-if="letterhead && $store.edit_letterhead"
					@click="upload_image"
				>
					{{ __("Change Image") }}
				</button>
				<button
					v-if="letterhead && $store.edit_letterhead"
					class="ml-2 btn btn-default btn-xs btn-change-letterhead"
					@click="change_letterhead"
				>
					{{ __("Change Letter Head") }}
				</button>
				<button
					v-if="letterhead"
					class="ml-2 btn btn-default btn-xs btn-edit"
					@click="toggle_edit_letterhead"
				>
					{{
						!$store.edit_letterhead
							? __("Edit Letter Head")
							: __("Done")
					}}
				</button>
				<button
					v-if="!letterhead"
					class="ml-2 btn btn-default btn-xs btn-edit"
					@click="create_letterhead"
				>
					{{ __("Create Letter Head") }}
				</button>
			</div>
		</div>
		<div
			v-if="letterhead && !$store.edit_letterhead"
			v-html="letterhead.content"
		></div>
		<!-- <div v-show="letterhead && $store.edit_letterhead" ref="editor"></div> -->
		<div
			class="edit-letterhead"
			v-if="letterhead && $store.edit_letterhead"
			:style="{
				justifyContent: {
					Left: 'flex-start',
					Center: 'center',
					Right: 'flex-end'
				}[letterhead.align]
			}"
		>
			<div class="edit-image">
				<div v-if="letterhead.image">
					<img
						:src="letterhead.image"
						:style="{
							width:
								range_input_field === 'image_width'
									? letterhead.image_width + 'px'
									: null,
							height:
								range_input_field === 'image_height'
									? letterhead.image_height + 'px'
									: null
						}"
					/>
				</div>
				<button v-else class="btn btn-default" @click="upload_image">
					{{ __("Upload Image") }}
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import { storeMixin } from "./store";
import { get_image_dimensions } from "./utils";
export default {
	name: "LetterHeadEditor",
	mixins: [storeMixin],
	data() {
		return {
			range_input_field: null,
			aspect_ratio: null
		};
	},
	watch: {
		letterhead: {
			deep: true,
			immediate: true,
			handler(letterhead) {
				if (!letterhead) return;
				if (letterhead.image_width && letterhead.image_height) {
					let dimension =
						letterhead.image_width > letterhead.image_height
							? "width"
							: "height";
					let dimension_value = letterhead["image_" + dimension];
					letterhead.content = \`
						<div style="text-align: \${letterhead.align.toLowerCase()};">
							<img
								src="\${letterhead.image}"
								alt="\${letterhead.name}"
								\${dimension}="\${dimension_value}"
								style="\${dimension}: \${dimension_value}px;">
						</div>
					\`;
				}
			}
		}
	},
	mounted() {
		if (!this.letterhead && frappe.boot.sysdefaults.letter_head) {
			this.set_letterhead(frappe.boot.sysdefaults.letter_head);
		}

		this.$watch(
			function() {
				return this.letterhead
					? this.letterhead[this.range_input_field]
					: null;
			},
			function() {
				if (this.aspect_ratio === null) return;

				let update_field =
					this.range_input_field == "image_width"
						? "image_height"
						: "image_width";
				this.letterhead[update_field] =
					update_field == "image_width"
						? this.aspect_ratio * this.letterhead.image_height
						: this.letterhead.image_width / this.aspect_ratio;
			}
		);
	},
	methods: {
		toggle_edit_letterhead() {
			if (this.$store.edit_letterhead) {
				this.$store.edit_letterhead = false;
				return;
			}
			this.$store.edit_letterhead = true;
			if (!this.control) {
				this.control = frappe.ui.form.make_control({
					parent: this.$refs.editor,
					df: {
						fieldname: "letterhead",
						fieldtype: "Comment",
						change: () => {
							this.letterhead._dirty = true;
							this.letterhead.content = this.control.get_value();
						}
					},
					render_input: true,
					only_input: true,
					no_wrapper: true
				});
			}
			this.control.set_value(this.letterhead.content);
		},
		change_letterhead() {
			let d = new frappe.ui.Dialog({
				title: __("Change Letter Head"),
				fields: [
					{
						label: __("Letter Head"),
						fieldname: "letterhead",
						fieldtype: "Link",
						options: "Letter Head"
					}
				],
				primary_action: ({ letterhead }) => {
					if (letterhead) {
						this.set_letterhead(letterhead);
					}
					d.hide();
				}
			});
			d.show();
		},
		upload_image() {
			new frappe.ui.FileUploader({
				folder: "Home/Attachments",
				on_success: file_doc => {
					get_image_dimensions(file_doc.file_url).then(
						({ width, height }) => {
							this.$set(
								this.letterhead,
								"image",
								file_doc.file_url
							);
							let new_width = width;
							let new_height = height;
							this.aspect_ratio = width / height;
							this.range_input_field =
								this.aspect_ratio > 1
									? "image_width"
									: "image_height";

							if (width > 200) {
								new_width = 200;
								new_height = new_width / aspect_ratio;
							}
							if (height > 80) {
								new_height = 80;
								new_width = aspect_ratio * new_height;
							}

							this.$set(
								this.letterhead,
								"image_height",
								new_height
							);
							this.$set(
								this.letterhead,
								"image_width",
								new_width
							);
						}
					);
				}
			});
		},
		set_letterhead(letterhead) {
			this.$store.change_letterhead(letterhead).then(() => {
				get_image_dimensions(this.letterhead.image).then(
					({ width, height }) => {
						this.aspect_ratio = width / height;
						this.range_input_field =
							this.aspect_ratio > 1
								? "image_width"
								: "image_height";
					}
				);
			});
		},
		create_letterhead() {
			let d = new frappe.ui.Dialog({
				title: __("Create Letter Head"),
				fields: [
					{
						label: __("Letter Head Name"),
						fieldname: "name",
						fieldtype: "Data"
					}
				],
				primary_action: ({ name }) => {
					return frappe.db
						.insert({
							doctype: "Letter Head",
							letter_head_name: name,
							source: "Image"
						})
						.then(doc => {
							d.hide();
							this.$store.change_letterhead(doc.name).then(() => {
								this.toggle_edit_letterhead();
							});
						});
				}
			});
			d.show();
		}
	}
};
<\/script>
<style scoped>
.letterhead {
	position: relative;
	border: 1px solid var(--dark-border-color);
	border-radius: var(--border-radius);
	padding: 1rem;
	margin-bottom: 1rem;
}
.edit-letterhead {
	display: flex;
	align-items: center;
}
.edit-image {
	min-width: 40px;
	min-height: 40px;
	border: 1px solid var(--border-color);
}
.edit-image img {
	height: 100%;
}
.edit-title {
	margin-left: 1rem;
	border: 1px solid transparent;
	border-radius: var(--border-radius);
	font-size: var(--text-md);
	font-weight: 600;
}
</style>
`]},media:void 0})},Xi="data-v-72723dd8",Gi=void 0,Vi=!1;function Yi(t,a,r,e,c,u,l,_,p,h){let d=(typeof r=="function"?r.options:r)||{};d.__file="frappe/public/js/print_format_builder/LetterHeadEditor.vue",d.render||(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,c&&(d.functional=!0)),d._scopeId=e;{let b;if(a&&(b=l?function(g){a.call(this,h(g,this.$root.$options.shadowRoot))}:function(g){a.call(this,_(g))}),b!==void 0)if(d.functional){let g=d.render;d.render=function(O,R){return b.call(R),g(O,R)}}else{let g=d.beforeCreate;d.beforeCreate=g?[].concat(g,b):[b]}}return d}function dn(){let t=dn.styles||(dn.styles={}),a=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(e,c){if(document.querySelector('style[data-vue-ssr-id~="'+e+'"]'))return;let u=a?c.media||"default":e,l=t[u]||(t[u]={ids:[],parts:[],element:void 0});if(!l.ids.includes(e)){let _=c.source,p=l.ids.length;if(l.ids.push(e),a&&(l.element=l.element||document.querySelector("style[data-group="+u+"]")),!l.element){let h=document.head||document.getElementsByTagName("head")[0],d=l.element=document.createElement("style");d.type="text/css",c.media&&d.setAttribute("media",c.media),a&&(d.setAttribute("data-group",u),d.setAttribute("data-next-index","0")),h.appendChild(d)}if(a&&(p=parseInt(l.element.getAttribute("data-next-index")),l.element.setAttribute("data-next-index",p+1)),l.element.styleSheet)l.parts.push(_),l.element.styleSheet.cssText=l.parts.filter(Boolean).join(`
`);else{let h=document.createTextNode(_),d=l.element.childNodes;d[p]&&l.element.removeChild(d[p]),d.length?l.element.insertBefore(h,d[p]):l.element.appendChild(h)}}}}var Ki=Yi({render:jn,staticRenderFns:zi},Wi,Ui,Xi,Vi,Gi,!1,dn,void 0,void 0),Hn=Ki;var Vn=_e(ae());var Wn=_e(ae());var kn=_e(ae()),Ji={name:"ConfigureColumns",props:["df"],components:{draggable:kn.default},methods:{remove_column(t){this.$set(this.df,"table_columns",this.df.table_columns.filter(a=>a!==t))}},computed:{help_message(){return __("Drag columns to set order. Column width is set in percentage. The total width should not be more than 100. Columns marked in red will be removed.")},total_width(){return this.df.table_columns.reduce((t,a)=>t+a.width,0)}}},Un=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",[r("p",{staticClass:"mb-3 text-muted"},[t._v(`
		`+t._s(t.help_message)+`
	`)]),t._v(" "),r("div",{staticClass:"row font-weight-bold"},[r("div",{staticClass:"col-8"},[t._v(`
			`+t._s(t.__("Column"))+`
		`)]),t._v(" "),r("div",{staticClass:"col-4"},[t._v(`
			`+t._s(t.__("Width"))+`
			(`+t._s(t.__("Total:"))+" "+t._s(t.total_width)+`)
		`)])]),t._v(" "),r("draggable",{attrs:{list:t.df.table_columns,animation:200,group:t.df.fieldname,handle:".icon-drag"}},t._l(t.df.table_columns,function(e){return r("div",{staticClass:"mt-2 row align-center column-row"},[r("div",{staticClass:"col-8"},[r("div",{staticClass:"column-label d-flex align-center"},[r("div",{staticClass:"px-2 icon-drag ml-n2"},[r("svg",{staticClass:"icon icon-xs"},[r("use",{attrs:{href:"#icon-drag"}})])]),t._v(" "),r("div",{staticClass:"mt-1 ml-1"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.label,expression:"column.label"}],staticClass:"input-column-label",class:{"text-danger":e.invalid_width},attrs:{type:"text"},domProps:{value:e.label},on:{input:function(c){c.target.composing||t.$set(e,"label",c.target.value)}}})])])]),t._v(" "),r("div",{staticClass:"col-4 d-flex align-items-center"},[r("input",{directives:[{name:"model",rawName:"v-model.number",value:e.width,expression:"column.width",modifiers:{number:!0}}],staticClass:"text-right form-control",class:{"text-danger is-invalid":e.invalid_width},attrs:{type:"number",min:"0",max:"100",step:"5"},domProps:{value:e.width},on:{input:function(c){c.target.composing||t.$set(e,"width",t._n(c.target.value))},blur:function(c){return t.$forceUpdate()}}}),t._v(" "),r("button",{staticClass:"ml-2 btn btn-xs btn-icon",on:{click:function(c){return t.remove_column(e)}}},[r("svg",{staticClass:"icon icon-sm"},[r("use",{attrs:{href:"#icon-close"}})])])])])}),0)],1)},Qi=[];Un._withStripped=!0;var Zi=function(t){!t||t("data-v-20a70f2e_0",{source:`
.icon-drag[data-v-20a70f2e] {
	cursor: grab;
}
.input-column-label[data-v-20a70f2e] {
	border: 1px solid transparent;
	border-radius: var(--border-radius);
	font-size: var(--text-md);
}
.input-column-label[data-v-20a70f2e]:focus {
	border-color: var(--border-color);
	outline: none;
	background-color: var(--control-bg);
}
.input-column-label[data-v-20a70f2e]::placeholder {
	font-style: italic;
	font-weight: normal;
}
`,map:{version:3,sources:["frappe/public/js/print_format_builder/ConfigureColumns.vue"],names:[],mappings:";AA6FA;CACA,YAAA;AACA;AACA;CACA,6BAAA;CACA,mCAAA;CACA,yBAAA;AACA;AACA;CACA,iCAAA;CACA,aAAA;CACA,mCAAA;AACA;AACA;CACA,kBAAA;CACA,mBAAA;AACA",file:"ConfigureColumns.vue",sourcesContent:[`<template>
	<div>
		<p class="mb-3 text-muted">
			{{ help_message }}
		</p>
		<div class="row font-weight-bold">
			<div class="col-8">
				{{ __("Column") }}
			</div>
			<div class="col-4">
				{{ __("Width") }}
				({{ __("Total:") }} {{ total_width }})
			</div>
		</div>
		<draggable
			:list="df.table_columns"
			:animation="200"
			:group="df.fieldname"
			handle=".icon-drag"
		>
			<div
				class="mt-2 row align-center column-row"
				v-for="column in df.table_columns"
			>
				<div class="col-8">
					<div class="column-label d-flex align-center">
						<div class="px-2 icon-drag ml-n2">
							<svg class="icon icon-xs">
								<use href="#icon-drag"></use>
							</svg>
						</div>
						<div class="mt-1 ml-1">
							<input
								class="input-column-label"
								:class="{ 'text-danger': column.invalid_width }"
								type="text"
								v-model="column.label"
							/>
						</div>
					</div>
				</div>
				<div class="col-4 d-flex align-items-center">
					<input
						type="number"
						class="text-right form-control"
						:class="{ 'text-danger is-invalid': column.invalid_width }"
						v-model.number="column.width"
						min="0"
						max="100"
						step="5"
					/>
					<button
						class="ml-2 btn btn-xs btn-icon"
						@click="remove_column(column)"
					>
						<svg class="icon icon-sm">
							<use href="#icon-close"></use>
						</svg>
					</button>
				</div>
			</div>
		</draggable>
	</div>
</template>
<script>
import draggable from "vuedraggable";
export default {
	name: "ConfigureColumns",
	props: ["df"],
	components: {
		draggable
	},
	methods: {
		remove_column(column) {
			this.$set(
				this.df,
				"table_columns",
				this.df.table_columns.filter(_column => _column !== column)
			);
		}
	},
	computed: {
		help_message() {
			// prettier-ignore
			return __("Drag columns to set order. Column width is set in percentage. The total width should not be more than 100. Columns marked in red will be removed.");
		},
		total_width() {
			return this.df.table_columns.reduce((total, tf) => total + tf.width, 0);
		}
	}
};
<\/script>
<style scoped>
.icon-drag {
	cursor: grab;
}
.input-column-label {
	border: 1px solid transparent;
	border-radius: var(--border-radius);
	font-size: var(--text-md);
}
.input-column-label:focus {
	border-color: var(--border-color);
	outline: none;
	background-color: var(--control-bg);
}
.input-column-label::placeholder {
	font-style: italic;
	font-weight: normal;
}
</style>
`]},media:void 0})},qi="data-v-20a70f2e",tr=void 0,er=!1;function nr(t,a,r,e,c,u,l,_,p,h){let d=(typeof r=="function"?r.options:r)||{};d.__file="frappe/public/js/print_format_builder/ConfigureColumns.vue",d.render||(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,c&&(d.functional=!0)),d._scopeId=e;{let b;if(a&&(b=l?function(g){a.call(this,h(g,this.$root.$options.shadowRoot))}:function(g){a.call(this,_(g))}),b!==void 0)if(d.functional){let g=d.render;d.render=function(O,R){return b.call(R),g(O,R)}}else{let g=d.beforeCreate;d.beforeCreate=g?[].concat(g,b):[b]}}return d}function cn(){let t=cn.styles||(cn.styles={}),a=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(e,c){if(document.querySelector('style[data-vue-ssr-id~="'+e+'"]'))return;let u=a?c.media||"default":e,l=t[u]||(t[u]={ids:[],parts:[],element:void 0});if(!l.ids.includes(e)){let _=c.source,p=l.ids.length;if(l.ids.push(e),a&&(l.element=l.element||document.querySelector("style[data-group="+u+"]")),!l.element){let h=document.head||document.getElementsByTagName("head")[0],d=l.element=document.createElement("style");d.type="text/css",c.media&&d.setAttribute("media",c.media),a&&(d.setAttribute("data-group",u),d.setAttribute("data-next-index","0")),h.appendChild(d)}if(a&&(p=parseInt(l.element.getAttribute("data-next-index")),l.element.setAttribute("data-next-index",p+1)),l.element.styleSheet)l.parts.push(_),l.element.styleSheet.cssText=l.parts.filter(Boolean).join(`
`);else{let h=document.createTextNode(_),d=l.element.childNodes;d[p]&&l.element.removeChild(d[p]),d.length?l.element.insertBefore(h,d[p]):l.element.appendChild(h)}}}}var ir=nr({render:Un,staticRenderFns:Qi},Zi,Ji,qi,er,tr,!1,cn,void 0,void 0),zn=ir;var rr={name:"Field",mixins:[Pt],props:["df"],components:{draggable:Wn.default},data(){return{editing:!1}},watch:{editing(t){t&&this.$nextTick(()=>this.$refs["label-input"].focus())},"df.table_columns":{deep:!0,handler(){this.validate_table_columns()}}},methods:{edit_html(){let t=new frappe.ui.Dialog({title:__("Edit HTML"),fields:[{label:__("HTML"),fieldname:"html",fieldtype:"Code",options:"HTML"}],primary_action:({html:a})=>{a=frappe.dom.remove_script_and_style(a),this.$set(this.df,"html",a),t.hide()}});t.set_value("html",this.df.html),t.show()},configure_columns(){let t=new frappe.ui.Dialog({title:__("Configure columns for {0}",[this.df.label]),fields:[{fieldtype:"HTML",fieldname:"columns_area"},{label:"",fieldtype:"Autocomplete",placeholder:__("Add Column"),fieldname:"add_column",options:this.get_all_columns(),onchange:()=>{let a=t.get_value("add_column");if(a){let r=this.get_column_to_add(a);r&&(this.df.table_columns.push(r),this.$set(this.df,"table_columns",this.df.table_columns),t.set_value("add_column",""))}}}],on_page_show:()=>{new Vue({el:t.get_field("columns_area").$wrapper.get(0),render:a=>a(zn,{props:{df:this.df}})})},on_hide:()=>{this.$set(this.df,"table_columns",this.df.table_columns.filter(a=>!a.invalid_width))}});t.show()},get_all_columns(){let t=frappe.get_meta(this.df.options);return[{label:__("Sr No."),value:"idx"}].concat(t.fields.map(r=>{if(!frappe.model.no_value_type.includes(r.fieldtype))return{label:r.label,value:r.fieldname}}).filter(Boolean))},get_column_to_add(t){let a={idx:{label:__("Sr No."),fieldtype:"Data",fieldname:"idx",width:10}};return t in a?a[t]:Ln(Pn({},frappe.meta.get_docfield(this.df.options,t)),{width:10})},validate_table_columns(){if(this.df.fieldtype!="Table")return;let t=this.df.table_columns,a=0;for(let r of t)r.width||(r.width=10),a+=r.width,a>100?r.invalid_width=!0:r.invalid_width=!1}}},Xn=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"field",attrs:{title:t.df.fieldname},on:{click:function(e){t.editing=!0}}},[r("div",{staticClass:"field-controls"},[r("div",[t.df.fieldtype=="HTML"&&t.df.html?r("div",{staticClass:"custom-html",domProps:{innerHTML:t._s(t.df.html)}}):t._e(),t._v(" "),t.df.fieldtype=="Field Template"?r("div",{staticClass:"custom-html"},[t._v(`
				`+t._s(t.df.label)+`
			`)]):t.editing&&t.df.fieldtype!="HTML"?r("input",{directives:[{name:"model",rawName:"v-model",value:t.df.label,expression:"df.label"}],ref:"label-input",staticClass:"label-input",attrs:{type:"text",placeholder:t.__("Label")},domProps:{value:t.df.label},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.editing=!1},blur:function(e){t.editing=!1},input:function(e){e.target.composing||t.$set(t.df,"label",e.target.value)}}}):t.df.label?r("span",[t._v(t._s(t.df.label))]):r("i",{staticClass:"text-muted"},[t._v(`
				`+t._s(t.__("No Label"))+" ("+t._s(t.df.fieldname)+`)
			`)])]),t._v(" "),r("div",{staticClass:"field-actions"},[t.df.fieldtype=="HTML"?r("button",{staticClass:"btn btn-xs btn-icon",on:{click:t.edit_html}},[r("svg",{staticClass:"icon icon-sm"},[r("use",{attrs:{href:"#icon-edit"}})])]):t._e(),t._v(" "),t.df.fieldtype=="Table"?r("button",{staticClass:"btn btn-xs btn-default",on:{click:t.configure_columns}},[t._v(`
				Configure columns
			`)]):t._e(),t._v(" "),r("button",{staticClass:"btn btn-xs btn-icon",on:{click:function(e){return t.$set(t.df,"remove",!0)}}},[r("svg",{staticClass:"icon icon-sm"},[r("use",{attrs:{href:"#icon-close"}})])])])]),t._v(" "),t.df.fieldtype=="Table"?r("div",{staticClass:"table-controls row no-gutters",style:{opacity:1}},t._l(t.df.table_columns,function(e,c){return r("div",{key:e.fieldname,staticClass:"table-column",style:{width:e.width+"%"}},[r("div",{staticClass:"table-field"},[t._v(`
				`+t._s(e.label)+`
			`)])])}),0):t._e()])},or=[];Xn._withStripped=!0;var ar=function(t){!t||t("data-v-09994045_0",{source:`
.field {
	text-align: left;
	width: 100%;
	background-color: var(--bg-light-gray);
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
}
.field-controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.field:not(:first-child) {
	margin-top: 0.5rem;
}
.custom-html {
	padding-right: var(--padding-xs);
	word-break: break-all;
}
.label-input {
	background-color: transparent;
	border: none;
	padding: 0;
}
.label-input:focus {
	outline: none;
}
.field:focus-within {
	border-style: solid;
	border-color: var(--gray-600);
}
.field-actions {
	flex: none;
}
.field-actions .btn {
	opacity: 0;
}
.field-actions .btn-icon {
	box-shadow: none;
}
.btn-icon {
	padding: 2px;
}
.btn-icon:hover {
	background-color: white;
}
.field:hover .btn {
	opacity: 1;
}
.table-controls {
	display: flex;
	margin-top: 1rem;
}
.table-column {
	position: relative;
}
.table-field {
	text-align: left;
	width: 100%;
	background-color: white;
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
	user-select: none;
	white-space: nowrap;
	overflow: hidden;
}
.column-resize {
	position: absolute;
	right: 0;
	top: 0;
	width: 6px;
	border-radius: 2px;
	height: 80%;
	background-color: var(--gray-600);
	transform: translate(50%, 10%);
	z-index: 999;
	cursor: col-resize;
}
.column-resize-actions {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	display: flex;
	align-items: center;
	padding-right: 0.25rem;
}
.column-resize-actions .btn-icon {
	background: white;
}
.column-resize-actions .btn-icon:hover {
	background: var(--bg-light-gray);
}
.columns-input {
	padding: var(--padding-sm);
}
`,map:{version:3,sources:["frappe/public/js/print_format_builder/Field.vue"],names:[],mappings:";AAgPA;CACA,gBAAA;CACA,WAAA;CACA,sCAAA;CACA,mCAAA;CACA,kCAAA;CACA,uBAAA;CACA,yBAAA;AACA;AAEA;CACA,aAAA;CACA,8BAAA;CACA,mBAAA;AACA;AAEA;CACA,kBAAA;AACA;AAEA;CACA,gCAAA;CACA,qBAAA;AACA;AAEA;CACA,6BAAA;CACA,YAAA;CACA,UAAA;AACA;AAEA;CACA,aAAA;AACA;AAEA;CACA,mBAAA;CACA,6BAAA;AACA;AAEA;CACA,UAAA;AACA;AAEA;CACA,UAAA;AACA;AAEA;CACA,gBAAA;AACA;AAEA;CACA,YAAA;AACA;AAEA;CACA,uBAAA;AACA;AAEA;CACA,UAAA;AACA;AAEA;CACA,aAAA;CACA,gBAAA;AACA;AAEA;CACA,kBAAA;AACA;AAEA;CACA,gBAAA;CACA,WAAA;CACA,uBAAA;CACA,mCAAA;CACA,kCAAA;CACA,uBAAA;CACA,yBAAA;CACA,iBAAA;CACA,mBAAA;CACA,gBAAA;AACA;AAEA;CACA,kBAAA;CACA,QAAA;CACA,MAAA;CACA,UAAA;CACA,kBAAA;CACA,WAAA;CACA,iCAAA;CACA,8BAAA;CACA,YAAA;CACA,kBAAA;AACA;AAEA;CACA,kBAAA;CACA,MAAA;CACA,QAAA;CACA,YAAA;CACA,aAAA;CACA,mBAAA;CACA,sBAAA;AACA;AAEA;CACA,iBAAA;AACA;AACA;CACA,gCAAA;AACA;AAEA;CACA,0BAAA;AACA",file:"Field.vue",sourcesContent:[`<template>
	<div class="field" :title="df.fieldname" @click="editing = true">
		<div class="field-controls">
			<div>
				<div
					class="custom-html"
					v-if="df.fieldtype == 'HTML' && df.html"
					v-html="df.html"
				></div>
				<div
					class="custom-html"
					v-if="df.fieldtype == 'Field Template'"
				>
					{{ df.label }}
				</div>
				<input
					v-else-if="editing && df.fieldtype != 'HTML'"
					ref="label-input"
					class="label-input"
					type="text"
					:placeholder="__('Label')"
					v-model="df.label"
					@keydown.enter="editing = false"
					@blur="editing = false"
				/>
				<span v-else-if="df.label">{{ df.label }}</span>
				<i class="text-muted" v-else>
					{{ __("No Label") }} ({{ df.fieldname }})
				</i>
			</div>
			<div class="field-actions">
				<button
					v-if="df.fieldtype == 'HTML'"
					class="btn btn-xs btn-icon"
					@click="edit_html"
				>
					<svg class="icon icon-sm">
						<use href="#icon-edit"></use>
					</svg>
				</button>
				<button
					v-if="df.fieldtype == 'Table'"
					class="btn btn-xs btn-default"
					@click="configure_columns"
				>
					Configure columns
				</button>
				<button
					class="btn btn-xs btn-icon"
					@click="$set(df, 'remove', true)"
				>
					<svg class="icon icon-sm">
						<use href="#icon-close"></use>
					</svg>
				</button>
			</div>
		</div>
		<div
			v-if="df.fieldtype == 'Table'"
			class="table-controls row no-gutters"
			:style="{ opacity: 1 }"
		>
			<div
				class="table-column"
				:style="{ width: tf.width + '%' }"
				v-for="(tf, i) in df.table_columns"
				:key="tf.fieldname"
			>
				<div class="table-field">
					{{ tf.label }}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import draggable from "vuedraggable";
import ConfigureColumnsVue from "./ConfigureColumns.vue";
import { storeMixin } from "./store";

export default {
	name: "Field",
	mixins: [storeMixin],
	props: ["df"],
	components: {
		draggable
	},
	data() {
		return {
			editing: false
		};
	},
	watch: {
		editing(value) {
			if (value) {
				this.$nextTick(() => this.$refs["label-input"].focus());
			}
		},
		"df.table_columns": {
			deep: true,
			handler() {
				this.validate_table_columns();
			}
		}
	},
	methods: {
		edit_html() {
			let d = new frappe.ui.Dialog({
				title: __("Edit HTML"),
				fields: [
					{
						label: __("HTML"),
						fieldname: "html",
						fieldtype: "Code",
						options: "HTML"
					}
				],
				primary_action: ({ html }) => {
					html = frappe.dom.remove_script_and_style(html);
					this.$set(this.df, "html", html);
					d.hide();
				}
			});
			d.set_value("html", this.df.html);
			d.show();
		},
		configure_columns() {
			let dialog = new frappe.ui.Dialog({
				title: __("Configure columns for {0}", [this.df.label]),
				fields: [
					{
						fieldtype: "HTML",
						fieldname: "columns_area"
					},
					{
						label: "",
						fieldtype: "Autocomplete",
						placeholder: __("Add Column"),
						fieldname: "add_column",
						options: this.get_all_columns(),
						onchange: () => {
							let fieldname = dialog.get_value("add_column");
							if (fieldname) {
								let column = this.get_column_to_add(fieldname);
								if (column) {
									this.df.table_columns.push(column);
									this.$set(
										this.df,
										"table_columns",
										this.df.table_columns
									);
									dialog.set_value("add_column", "");
								}
							}
						}
					}
				],
				on_page_show: () => {
					new Vue({
						el: dialog.get_field("columns_area").$wrapper.get(0),
						render: h =>
							h(ConfigureColumnsVue, {
								props: {
									df: this.df
								}
							})
					});
				},
				on_hide: () => {
					this.$set(
						this.df,
						"table_columns",
						this.df.table_columns.filter(col => !col.invalid_width)
					);
				}
			});
			dialog.show();
		},
		get_all_columns() {
			let meta = frappe.get_meta(this.df.options);
			let more_columns = [
				{
					label: __("Sr No."),
					value: "idx"
				}
			];
			return more_columns.concat(
				meta.fields
					.map(tf => {
						if (frappe.model.no_value_type.includes(tf.fieldtype)) {
							return;
						}
						return {
							label: tf.label,
							value: tf.fieldname
						};
					})
					.filter(Boolean)
			);
		},
		get_column_to_add(fieldname) {
			let standard_columns = {
				idx: {
					label: __("Sr No."),
					fieldtype: "Data",
					fieldname: "idx",
					width: 10
				}
			};

			if (fieldname in standard_columns) {
				return standard_columns[fieldname];
			}

			return {
				...frappe.meta.get_docfield(this.df.options, fieldname),
				width: 10
			};
		},
		validate_table_columns() {
			if (this.df.fieldtype != "Table") return;

			let columns = this.df.table_columns;
			let total_width = 0;
			for (let column of columns) {
				if (!column.width) {
					column.width = 10;
				}
				total_width += column.width;
				if (total_width > 100) {
					column.invalid_width = true;
				} else {
					column.invalid_width = false;
				}
			}
		}
	}
};
<\/script>
<style>
.field {
	text-align: left;
	width: 100%;
	background-color: var(--bg-light-gray);
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
}

.field-controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.field:not(:first-child) {
	margin-top: 0.5rem;
}

.custom-html {
	padding-right: var(--padding-xs);
	word-break: break-all;
}

.label-input {
	background-color: transparent;
	border: none;
	padding: 0;
}

.label-input:focus {
	outline: none;
}

.field:focus-within {
	border-style: solid;
	border-color: var(--gray-600);
}

.field-actions {
	flex: none;
}

.field-actions .btn {
	opacity: 0;
}

.field-actions .btn-icon {
	box-shadow: none;
}

.btn-icon {
	padding: 2px;
}

.btn-icon:hover {
	background-color: white;
}

.field:hover .btn {
	opacity: 1;
}

.table-controls {
	display: flex;
	margin-top: 1rem;
}

.table-column {
	position: relative;
}

.table-field {
	text-align: left;
	width: 100%;
	background-color: white;
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
	user-select: none;
	white-space: nowrap;
	overflow: hidden;
}

.column-resize {
	position: absolute;
	right: 0;
	top: 0;
	width: 6px;
	border-radius: 2px;
	height: 80%;
	background-color: var(--gray-600);
	transform: translate(50%, 10%);
	z-index: 999;
	cursor: col-resize;
}

.column-resize-actions {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	display: flex;
	align-items: center;
	padding-right: 0.25rem;
}

.column-resize-actions .btn-icon {
	background: white;
}
.column-resize-actions .btn-icon:hover {
	background: var(--bg-light-gray);
}

.columns-input {
	padding: var(--padding-sm);
}
</style>
`]},media:void 0})},sr=void 0,lr=void 0,dr=!1;function cr(t,a,r,e,c,u,l,_,p,h){let d=(typeof r=="function"?r.options:r)||{};d.__file="frappe/public/js/print_format_builder/Field.vue",d.render||(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,c&&(d.functional=!0)),d._scopeId=e;{let b;if(a&&(b=l?function(g){a.call(this,h(g,this.$root.$options.shadowRoot))}:function(g){a.call(this,_(g))}),b!==void 0)if(d.functional){let g=d.render;d.render=function(O,R){return b.call(R),g(O,R)}}else{let g=d.beforeCreate;d.beforeCreate=g?[].concat(g,b):[b]}}return d}function un(){let t=un.styles||(un.styles={}),a=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(e,c){if(document.querySelector('style[data-vue-ssr-id~="'+e+'"]'))return;let u=a?c.media||"default":e,l=t[u]||(t[u]={ids:[],parts:[],element:void 0});if(!l.ids.includes(e)){let _=c.source,p=l.ids.length;if(l.ids.push(e),a&&(l.element=l.element||document.querySelector("style[data-group="+u+"]")),!l.element){let h=document.head||document.getElementsByTagName("head")[0],d=l.element=document.createElement("style");d.type="text/css",c.media&&d.setAttribute("media",c.media),a&&(d.setAttribute("data-group",u),d.setAttribute("data-next-index","0")),h.appendChild(d)}if(a&&(p=parseInt(l.element.getAttribute("data-next-index")),l.element.setAttribute("data-next-index",p+1)),l.element.styleSheet)l.parts.push(_),l.element.styleSheet.cssText=l.parts.filter(Boolean).join(`
`);else{let h=document.createTextNode(_),d=l.element.childNodes;d[p]&&l.element.removeChild(d[p]),d.length?l.element.insertBefore(h,d[p]):l.element.appendChild(h)}}}}var ur=cr({render:Xn,staticRenderFns:or},ar,rr,sr,dr,lr,!1,un,void 0,void 0),Gn=ur;var fr={name:"PrintFormatSection",mixins:[Pt],props:["section"],components:{draggable:Vn.default,Field:Gn},methods:{add_column(){this.section.columns.length<4&&this.section.columns.push({label:"",fields:[]})},remove_column(){if(this.section.columns.length<=1)return;let t=this.section.columns.slice(),a=t.slice(-1)[0].fields.slice(),r=t.length-1;t=t.slice(0,r);let e=t[r-1];e.fields=[...e.fields,...a],this.$set(this.section,"columns",t)},add_page_break(){this.$set(this.section,"page_break",!0)},remove_page_break(){this.$set(this.section,"page_break",!1)},get_fields(t){return t.fields.filter(a=>!a.remove)}},computed:{section_options(){return[{label:__("Add section above"),action:()=>this.$emit("add_section_above")},{label:__("Add column"),action:this.add_column,condition:()=>this.section.columns.length<4},{label:__("Remove column"),action:this.remove_column,condition:()=>this.section.columns.length>1},{label:__("Add page break"),action:this.add_page_break,condition:()=>!this.section.page_break},{label:__("Remove page break"),action:this.remove_page_break,condition:()=>this.section.page_break},{label:__("Remove section"),action:()=>this.$set(this.section,"remove",!0)},{label:__("Field Orientation (Left-Right)"),condition:()=>!this.section.field_orientation,action:()=>this.$set(this.section,"field_orientation","left-right")},{label:__("Field Orientation (Top-Down)"),condition:()=>this.section.field_orientation=="left-right",action:()=>this.$set(this.section,"field_orientation","")}].filter(t=>t.condition?t.condition():!0)}}},Yn=function(){var t=this,a=t.$createElement,r=t._self._c||a;return t.section.remove?t._e():r("div",{staticClass:"print-format-section-container"},[r("div",{staticClass:"print-format-section"},[r("div",{staticClass:"section-header"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.section.label,expression:"section.label"}],staticClass:"input-section-label w-50",attrs:{type:"text",placeholder:t.__("Section Title")},domProps:{value:t.section.label},on:{input:function(e){e.target.composing||t.$set(t.section,"label",e.target.value)}}}),t._v(" "),r("div",{staticClass:"d-flex align-items-center"},[t.section.field_orientation=="left-right"?r("div",{staticClass:"mr-2 text-small text-muted d-flex",attrs:{title:t.__("Render labels to the left and values to the right in this section")}},[t._v(`
					Label \u2192 Value
				`)]):t._e(),t._v(" "),r("div",{staticClass:"dropdown"},[r("button",{staticClass:"btn btn-xs btn-section dropdown-button",attrs:{"data-toggle":"dropdown"}},[r("svg",{staticClass:"icon icon-sm"},[r("use",{attrs:{href:"#icon-dot-horizontal"}})])]),t._v(" "),r("div",{staticClass:"dropdown-menu dropdown-menu-right",attrs:{role:"menu"}},t._l(t.section_options,function(e){return r("button",{staticClass:"dropdown-item",on:{click:e.action}},[t._v(`
							`+t._s(e.label)+`
						`)])}),0)])])]),t._v(" "),r("div",{staticClass:"row section-columns"},t._l(t.section.columns,function(e,c){return r("div",{key:c,staticClass:"column col"},[r("draggable",{staticClass:"drag-container",style:{backgroundColor:e.fields.length?null:"var(--gray-50)"},attrs:{group:"fields",animation:150},model:{value:e.fields,callback:function(u){t.$set(e,"fields",u)},expression:"column.fields"}},t._l(t.get_fields(e),function(u){return r("Field",{key:u.fieldname,attrs:{df:u}})}),1)],1)}),0)]),t._v(" "),t.section.page_break?r("div",{staticClass:"my-4 text-center text-muted font-italic"},[t._v(`
		`+t._s(t.__("Page Break"))+`
	`)]):t._e()])},mr=[];Yn._withStripped=!0;var pr=function(t){!t||t("data-v-6f17d522_0",{source:`
.print-format-section-container[data-v-6f17d522]:not(:last-child) {
	margin-bottom: 1rem;
}
.print-format-section[data-v-6f17d522] {
	background-color: white;
	border: 1px solid var(--dark-border-color);
	border-radius: var(--border-radius);
	padding: 1rem;
	cursor: pointer;
}
.section-header[data-v-6f17d522] {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 0.75rem;
}
.input-section-label[data-v-6f17d522] {
	border: 1px solid transparent;
	border-radius: var(--border-radius);
	font-size: var(--text-md);
	font-weight: 600;
}
.input-section-label[data-v-6f17d522]:focus {
	border-color: var(--border-color);
	outline: none;
	background-color: var(--control-bg);
}
.input-section-label[data-v-6f17d522]::placeholder {
	font-style: italic;
	font-weight: normal;
}
.btn-section[data-v-6f17d522] {
	padding: var(--padding-xs);
	box-shadow: none;
}
.btn-section[data-v-6f17d522]:hover {
	background-color: var(--bg-light-gray);
}
.print-format-section[data-v-6f17d522]:not(:first-child) {
	margin-top: 1rem;
}
.section-columns[data-v-6f17d522] {
	margin-left: -8px;
	margin-right: -8px;
}
.column[data-v-6f17d522] {
	padding-left: 8px;
	padding-right: 8px;
}
.drag-container[data-v-6f17d522] {
	height: 100%;
	min-height: 2rem;
	border-radius: var(--border-radius);
}
`,map:{version:3,sources:["frappe/public/js/print_format_builder/PrintFormatSection.vue"],names:[],mappings:";AAmLA;CACA,mBAAA;AACA;AAEA;CACA,uBAAA;CACA,0CAAA;CACA,mCAAA;CACA,aAAA;CACA,eAAA;AACA;AAEA;CACA,aAAA;CACA,8BAAA;CACA,mBAAA;CACA,uBAAA;AACA;AAEA;CACA,6BAAA;CACA,mCAAA;CACA,yBAAA;CACA,gBAAA;AACA;AAEA;CACA,iCAAA;CACA,aAAA;CACA,mCAAA;AACA;AAEA;CACA,kBAAA;CACA,mBAAA;AACA;AAEA;CACA,0BAAA;CACA,gBAAA;AACA;AAEA;CACA,sCAAA;AACA;AAEA;CACA,gBAAA;AACA;AAEA;CACA,iBAAA;CACA,kBAAA;AACA;AAEA;CACA,iBAAA;CACA,kBAAA;AACA;AAEA;CACA,YAAA;CACA,gBAAA;CACA,mCAAA;AACA",file:"PrintFormatSection.vue",sourcesContent:[`<template>
	<div class="print-format-section-container" v-if="!section.remove">
		<div class="print-format-section">
			<div class="section-header">
				<input
					class="input-section-label w-50"
					type="text"
					:placeholder="__('Section Title')"
					v-model="section.label"
				/>
				<div class="d-flex align-items-center">
					<div
						class="mr-2 text-small text-muted d-flex"
						v-if="section.field_orientation == 'left-right'"
						:title="
							// prettier-ignore
							__('Render labels to the left and values to the right in this section')
						"
					>
						Label \u2192 Value
					</div>
					<div class="dropdown">
						<button
							class="btn btn-xs btn-section dropdown-button"
							data-toggle="dropdown"
						>
							<svg class="icon icon-sm">
								<use href="#icon-dot-horizontal"></use>
							</svg>
						</button>
						<div
							class="dropdown-menu dropdown-menu-right"
							role="menu"
						>
							<button
								v-for="option in section_options"
								class="dropdown-item"
								@click="option.action"
							>
								{{ option.label }}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="row section-columns">
				<div
					class="column col"
					v-for="(column, i) in section.columns"
					:key="i"
				>
					<draggable
						class="drag-container"
						:style="{
							backgroundColor: column.fields.length
								? null
								: 'var(--gray-50)'
						}"
						v-model="column.fields"
						group="fields"
						:animation="150"
					>
						<Field
							v-for="df in get_fields(column)"
							:key="df.fieldname"
							:df="df"
						/>
					</draggable>
				</div>
			</div>
		</div>
		<div
			class="my-4 text-center text-muted font-italic"
			v-if="section.page_break"
		>
			{{ __("Page Break") }}
		</div>
	</div>
</template>

<script>
import draggable from "vuedraggable";
import Field from "./Field.vue";
import { storeMixin } from "./store";

export default {
	name: "PrintFormatSection",
	mixins: [storeMixin],
	props: ["section"],
	components: {
		draggable,
		Field
	},
	methods: {
		add_column() {
			if (this.section.columns.length < 4) {
				this.section.columns.push({
					label: "",
					fields: []
				});
			}
		},
		remove_column() {
			if (this.section.columns.length <= 1) return;

			let columns = this.section.columns.slice();
			let last_column_fields = columns.slice(-1)[0].fields.slice();
			let index = columns.length - 1;
			columns = columns.slice(0, index);
			let last_column = columns[index - 1];
			last_column.fields = [...last_column.fields, ...last_column_fields];

			this.$set(this.section, "columns", columns);
		},
		add_page_break() {
			this.$set(this.section, "page_break", true);
		},
		remove_page_break() {
			this.$set(this.section, "page_break", false);
		},
		get_fields(column) {
			return column.fields.filter(df => !df.remove);
		}
	},
	computed: {
		section_options() {
			return [
				{
					label: __("Add section above"),
					action: () => this.$emit("add_section_above")
				},
				{
					label: __("Add column"),
					action: this.add_column,
					condition: () => this.section.columns.length < 4
				},
				{
					label: __("Remove column"),
					action: this.remove_column,
					condition: () => this.section.columns.length > 1
				},
				{
					label: __("Add page break"),
					action: this.add_page_break,
					condition: () => !this.section.page_break
				},
				{
					label: __("Remove page break"),
					action: this.remove_page_break,
					condition: () => this.section.page_break
				},
				{
					label: __("Remove section"),
					action: () => this.$set(this.section, "remove", true)
				},
				{
					label: __("Field Orientation (Left-Right)"),
					condition: () => !this.section.field_orientation,
					action: () =>
						this.$set(
							this.section,
							"field_orientation",
							"left-right"
						)
				},
				{
					label: __("Field Orientation (Top-Down)"),
					condition: () =>
						this.section.field_orientation == "left-right",
					action: () =>
						this.$set(this.section, "field_orientation", "")
				}
			].filter(option => (option.condition ? option.condition() : true));
		}
	}
};
<\/script>

<style scoped>
.print-format-section-container:not(:last-child) {
	margin-bottom: 1rem;
}

.print-format-section {
	background-color: white;
	border: 1px solid var(--dark-border-color);
	border-radius: var(--border-radius);
	padding: 1rem;
	cursor: pointer;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 0.75rem;
}

.input-section-label {
	border: 1px solid transparent;
	border-radius: var(--border-radius);
	font-size: var(--text-md);
	font-weight: 600;
}

.input-section-label:focus {
	border-color: var(--border-color);
	outline: none;
	background-color: var(--control-bg);
}

.input-section-label::placeholder {
	font-style: italic;
	font-weight: normal;
}

.btn-section {
	padding: var(--padding-xs);
	box-shadow: none;
}

.btn-section:hover {
	background-color: var(--bg-light-gray);
}

.print-format-section:not(:first-child) {
	margin-top: 1rem;
}

.section-columns {
	margin-left: -8px;
	margin-right: -8px;
}

.column {
	padding-left: 8px;
	padding-right: 8px;
}

.drag-container {
	height: 100%;
	min-height: 2rem;
	border-radius: var(--border-radius);
}
</style>
`]},media:void 0})},hr="data-v-6f17d522",gr=void 0,vr=!1;function _r(t,a,r,e,c,u,l,_,p,h){let d=(typeof r=="function"?r.options:r)||{};d.__file="frappe/public/js/print_format_builder/PrintFormatSection.vue",d.render||(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,c&&(d.functional=!0)),d._scopeId=e;{let b;if(a&&(b=l?function(g){a.call(this,h(g,this.$root.$options.shadowRoot))}:function(g){a.call(this,_(g))}),b!==void 0)if(d.functional){let g=d.render;d.render=function(O,R){return b.call(R),g(O,R)}}else{let g=d.beforeCreate;d.beforeCreate=g?[].concat(g,b):[b]}}return d}function fn(){let t=fn.styles||(fn.styles={}),a=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(e,c){if(document.querySelector('style[data-vue-ssr-id~="'+e+'"]'))return;let u=a?c.media||"default":e,l=t[u]||(t[u]={ids:[],parts:[],element:void 0});if(!l.ids.includes(e)){let _=c.source,p=l.ids.length;if(l.ids.push(e),a&&(l.element=l.element||document.querySelector("style[data-group="+u+"]")),!l.element){let h=document.head||document.getElementsByTagName("head")[0],d=l.element=document.createElement("style");d.type="text/css",c.media&&d.setAttribute("media",c.media),a&&(d.setAttribute("data-group",u),d.setAttribute("data-next-index","0")),h.appendChild(d)}if(a&&(p=parseInt(l.element.getAttribute("data-next-index")),l.element.setAttribute("data-next-index",p+1)),l.element.styleSheet)l.parts.push(_),l.element.styleSheet.cssText=l.parts.filter(Boolean).join(`
`);else{let h=document.createTextNode(_),d=l.element.childNodes;d[p]&&l.element.removeChild(d[p]),d.length?l.element.insertBefore(h,d[p]):l.element.appendChild(h)}}}}var br=_r({render:Yn,staticRenderFns:mr},pr,fr,hr,vr,gr,!1,fn,void 0,void 0),Kn=br;var Ar={name:"PrintFormat",mixins:[Pt],components:{draggable:Jn.default,PrintFormatSection:Kn,LetterHeadEditor:Hn,HTMLEditor:Bn},computed:{rootStyles(){let{margin_top:t=0,margin_bottom:a=0,margin_left:r=0,margin_right:e=0}=this.print_format;return{padding:`${t}mm ${e}mm ${a}mm ${r}mm`,width:"210mm",minHeight:"297mm"}},page_number_style(){let t={position:"absolute",background:"white",padding:"4px",borderRadius:"var(--border-radius)",border:"1px solid var(--border-color)"};return this.print_format.page_number.includes("Top")&&(t.top=this.print_format.margin_top/2+"mm",t.transform="translateY(-50%)"),this.print_format.page_number.includes("Left")&&(t.left=this.print_format.margin_left+"mm"),this.print_format.page_number.includes("Right")&&(t.right=this.print_format.margin_right+"mm"),this.print_format.page_number.includes("Bottom")&&(t.bottom=this.print_format.margin_bottom/2+"mm",t.transform="translateY(50%)"),this.print_format.page_number.includes("Center")&&(t.left="50%",t.transform+=" translateX(-50%)"),this.print_format.page_number.includes("Hide")&&(t.display="none"),t}},methods:{add_section_above(t){let a=[];for(let r of this.layout.sections)r===t&&a.push({label:"",columns:[{label:"",fields:[]},{label:"",fields:[]}]}),a.push(r);this.$set(this.layout,"sections",a)},update_letterhead_footer(t){this.letterhead.footer=t,this.letterhead._dirty=!0}}},Qn=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"print-format-main",style:t.rootStyles},[r("div",{style:t.page_number_style},[t._v(t._s(t.__("1 of 2")))]),t._v(" "),r("LetterHeadEditor",{attrs:{type:"Header"}}),t._v(" "),r("HTMLEditor",{attrs:{value:t.layout.header,"button-label":t.__("Edit Header")},on:{change:function(e){return t.$set(t.layout,"header",e)}}}),t._v(" "),r("draggable",{staticClass:"mb-4",attrs:{group:"sections",filter:".section-columns, .column, .field",animation:200},model:{value:t.layout.sections,callback:function(e){t.$set(t.layout,"sections",e)},expression:"layout.sections"}},t._l(t.layout.sections,function(e,c){return r("PrintFormatSection",{key:c,attrs:{section:e},on:{add_section_above:function(u){return t.add_section_above(e)}}})}),1),t._v(" "),r("HTMLEditor",{attrs:{value:t.layout.footer,"button-label":t.__("Edit Footer")},on:{change:function(e){return t.$set(t.layout,"footer",e)}}}),t._v(" "),t.letterhead?r("HTMLEditor",{attrs:{value:t.letterhead.footer,"button-label":t.__("Edit Letter Head Footer")},on:{change:t.update_letterhead_footer}}):t._e()],1)},yr=[];Qn._withStripped=!0;var Cr=function(t){!t||t("data-v-0e94793e_0",{source:`
.print-format-main[data-v-0e94793e] {
	position: relative;
	margin-right: auto;
	margin-left: auto;
	background-color: white;
	box-shadow: var(--shadow-lg);
	border-radius: var(--border-radius);
}
`,map:{version:3,sources:["frappe/public/js/print_format_builder/PrintFormat.vue"],names:[],mappings:";AA+HA;CACA,kBAAA;CACA,kBAAA;CACA,iBAAA;CACA,uBAAA;CACA,4BAAA;CACA,mCAAA;AACA",file:"PrintFormat.vue",sourcesContent:[`<template>
	<div class="print-format-main" :style="rootStyles">
		<div :style="page_number_style">{{ __("1 of 2") }}</div>

		<LetterHeadEditor type="Header" />
		<HTMLEditor
			:value="layout.header"
			@change="$set(layout, 'header', $event)"
			:button-label="__('Edit Header')"
		/>
		<draggable
			class="mb-4"
			v-model="layout.sections"
			group="sections"
			filter=".section-columns, .column, .field"
			:animation="200"
		>
			<PrintFormatSection
				v-for="(section, i) in layout.sections"
				:key="i"
				:section="section"
				@add_section_above="add_section_above(section)"
			/>
		</draggable>
		<HTMLEditor
			:value="layout.footer"
			@change="$set(layout, 'footer', $event)"
			:button-label="__('Edit Footer')"
		/>
		<HTMLEditor
			v-if="letterhead"
			:value="letterhead.footer"
			@change="update_letterhead_footer"
			:button-label="__('Edit Letter Head Footer')"
		/>
	</div>
</template>

<script>
import draggable from "vuedraggable";
import HTMLEditor from "./HTMLEditor.vue";
import LetterHeadEditor from "./LetterHeadEditor.vue";
import PrintFormatSection from "./PrintFormatSection.vue";
import { storeMixin } from "./store";

export default {
	name: "PrintFormat",
	mixins: [storeMixin],
	components: {
		draggable,
		PrintFormatSection,
		LetterHeadEditor,
		HTMLEditor
	},
	computed: {
		rootStyles() {
			let {
				margin_top = 0,
				margin_bottom = 0,
				margin_left = 0,
				margin_right = 0
			} = this.print_format;
			return {
				padding: \`\${margin_top}mm \${margin_right}mm \${margin_bottom}mm \${margin_left}mm\`,
				width: "210mm",
				minHeight: "297mm"
			};
		},
		page_number_style() {
			let style = {
				position: "absolute",
				background: "white",
				padding: "4px",
				borderRadius: "var(--border-radius)",
				border: "1px solid var(--border-color)"
			};
			if (this.print_format.page_number.includes("Top")) {
				style.top = this.print_format.margin_top / 2 + "mm";
				style.transform = "translateY(-50%)";
			}
			if (this.print_format.page_number.includes("Left")) {
				style.left = this.print_format.margin_left + "mm";
			}
			if (this.print_format.page_number.includes("Right")) {
				style.right = this.print_format.margin_right + "mm";
			}
			if (this.print_format.page_number.includes("Bottom")) {
				style.bottom = this.print_format.margin_bottom / 2 + "mm";
				style.transform = "translateY(50%)";
			}
			if (this.print_format.page_number.includes("Center")) {
				style.left = "50%";
				style.transform += " translateX(-50%)";
			}
			if (this.print_format.page_number.includes("Hide")) {
				style.display = "none";
			}

			return style;
		}
	},
	methods: {
		add_section_above(section) {
			let sections = [];
			for (let _section of this.layout.sections) {
				if (_section === section) {
					sections.push({
						label: "",
						columns: [
							{ label: "", fields: [] },
							{ label: "", fields: [] }
						]
					});
				}
				sections.push(_section);
			}
			this.$set(this.layout, "sections", sections);
		},
		update_letterhead_footer(val) {
			this.letterhead.footer = val;
			this.letterhead._dirty = true;
		}
	}
};
<\/script>

<style scoped>
.print-format-main {
	position: relative;
	margin-right: auto;
	margin-left: auto;
	background-color: white;
	box-shadow: var(--shadow-lg);
	border-radius: var(--border-radius);
}
</style>
`]},media:void 0})},xr="data-v-0e94793e",wr=void 0,Sr=!1;function Er(t,a,r,e,c,u,l,_,p,h){let d=(typeof r=="function"?r.options:r)||{};d.__file="frappe/public/js/print_format_builder/PrintFormat.vue",d.render||(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,c&&(d.functional=!0)),d._scopeId=e;{let b;if(a&&(b=l?function(g){a.call(this,h(g,this.$root.$options.shadowRoot))}:function(g){a.call(this,_(g))}),b!==void 0)if(d.functional){let g=d.render;d.render=function(O,R){return b.call(R),g(O,R)}}else{let g=d.beforeCreate;d.beforeCreate=g?[].concat(g,b):[b]}}return d}function mn(){let t=mn.styles||(mn.styles={}),a=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(e,c){if(document.querySelector('style[data-vue-ssr-id~="'+e+'"]'))return;let u=a?c.media||"default":e,l=t[u]||(t[u]={ids:[],parts:[],element:void 0});if(!l.ids.includes(e)){let _=c.source,p=l.ids.length;if(l.ids.push(e),a&&(l.element=l.element||document.querySelector("style[data-group="+u+"]")),!l.element){let h=document.head||document.getElementsByTagName("head")[0],d=l.element=document.createElement("style");d.type="text/css",c.media&&d.setAttribute("media",c.media),a&&(d.setAttribute("data-group",u),d.setAttribute("data-next-index","0")),h.appendChild(d)}if(a&&(p=parseInt(l.element.getAttribute("data-next-index")),l.element.setAttribute("data-next-index",p+1)),l.element.styleSheet)l.parts.push(_),l.element.styleSheet.cssText=l.parts.filter(Boolean).join(`
`);else{let h=document.createTextNode(_),d=l.element.childNodes;d[p]&&l.element.removeChild(d[p]),d.length?l.element.insertBefore(h,d[p]):l.element.appendChild(h)}}}}var Tr=Er({render:Qn,staticRenderFns:yr},Cr,Ar,xr,Sr,wr,!1,mn,void 0,void 0),Zn=Tr;var $r={name:"Preview",mixins:[Pt],data(){return{type:"PDF",docname:null,preview_loaded:!1}},mounted(){this.doc_select=frappe.ui.form.make_control({parent:this.$refs["doc-select"],df:{label:__("Select {0}",[__(this.doctype)]),fieldname:"docname",fieldtype:"Link",options:this.doctype,change:()=>{this.docname=this.doc_select.get_value()}},render_input:!0}),this.preview_type=frappe.ui.form.make_control({parent:this.$refs["preview-type"],df:{label:__("Preview type"),fieldname:"docname",fieldtype:"Select",options:["PDF","HTML"],change:()=>{this.type=this.preview_type.get_value()}},render_input:!0}),this.preview_type.set_value(this.type),this.get_default_docname().then(t=>t&&this.doc_select.set_value(t)),this.$store.$on("after_save",()=>{this.refresh()})},methods:{refresh(){this.$refs.iframe.contentWindow.location.reload()},get_default_docname(){return frappe.db.get_list(this.doctype,{limit:1}).then(t=>t.length>0?t[0].name:null)}},computed:{doctype(){return this.print_format.doc_type},url(){if(!this.docname)return null;let t=new URLSearchParams;return t.append("doctype",this.doctype),t.append("name",this.docname),t.append("print_format",this.print_format.name),this.$store.letterhead&&t.append("letterhead",this.$store.letterhead.name),`${this.type=="PDF"?"/api/method/frappe.utils.weasyprint.download_pdf":"/printpreview"}?${t.toString()}`}}},qn=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"h-100"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col"},[r("div",{ref:"doc-select",staticClass:"preview-control"})]),t._v(" "),r("div",{staticClass:"col"},[r("div",{ref:"preview-type",staticClass:"preview-control"})]),t._v(" "),r("div",{staticClass:"col d-flex"},[t.url?r("a",{staticClass:"btn btn-default btn-sm btn-new-tab",attrs:{target:"_blank",href:t.url}},[t._v(`
				`+t._s(t.__("Open in a new tab"))+`
			`)]):t._e(),t._v(" "),t.url?r("button",{staticClass:"ml-3 btn btn-default btn-sm btn-new-tab",on:{click:t.refresh}},[t._v(`
				`+t._s(t.__("Refresh"))+`
			`)]):t._e()])]),t._v(" "),t.url&&!t.preview_loaded?r("div",[t._v("Generating preview...")]):t._e(),t._v(" "),t.url?r("iframe",{directives:[{name:"show",rawName:"v-show",value:t.preview_loaded,expression:"preview_loaded"}],ref:"iframe",staticClass:"preview-iframe",attrs:{src:t.url},on:{load:function(e){t.preview_loaded=!0}}}):t._e()])},Or=[];qn._withStripped=!0;var Ir=function(t){!t||t("data-v-70dca9ee_0",{source:`
.preview-iframe[data-v-70dca9ee] {
	width: 100%;
	height: 96%;
	border: none;
	border-radius: var(--border-radius);
}
.btn-new-tab[data-v-70dca9ee] {
	margin-top: auto;
	margin-bottom: 1.2rem;
}
.preview-control[data-v-70dca9ee] :deep(.form-control) {
	background: var(--control-bg-on-gray);
}
`,map:{version:3,sources:["frappe/public/js/print_format_builder/Preview.vue"],names:[],mappings:";AAsHA;CACA,WAAA;CACA,WAAA;CACA,YAAA;CACA,mCAAA;AACA;AACA;CACA,gBAAA;CACA,qBAAA;AACA;AACA;CACA,qCAAA;AACA",file:"Preview.vue",sourcesContent:[`<template>
	<div class="h-100">
		<div class="row">
			<div class="col">
				<div class="preview-control" ref="doc-select"></div>
			</div>
			<div class="col">
				<div class="preview-control" ref="preview-type"></div>
			</div>
			<div class="col d-flex">
				<a
					v-if="url"
					class="btn btn-default btn-sm btn-new-tab"
					target="_blank"
					:href="url"
				>
					{{ __("Open in a new tab") }}
				</a>
				<button
					v-if="url"
					class="ml-3 btn btn-default btn-sm btn-new-tab"
					@click="refresh"
				>
					{{ __("Refresh") }}
				</button>
			</div>
		</div>
		<div v-if="url && !preview_loaded">Generating preview...</div>
		<iframe
			ref="iframe"
			:src="url"
			v-if="url"
			v-show="preview_loaded"
			class="preview-iframe"
			@load="preview_loaded = true"
		></iframe>
	</div>
</template>
<script>
import { storeMixin } from "./store";
export default {
	name: "Preview",
	mixins: [storeMixin],
	data() {
		return {
			type: "PDF",
			docname: null,
			preview_loaded: false
		};
	},
	mounted() {
		this.doc_select = frappe.ui.form.make_control({
			parent: this.$refs["doc-select"],
			df: {
				label: __("Select {0}", [__(this.doctype)]),
				fieldname: "docname",
				fieldtype: "Link",
				options: this.doctype,
				change: () => {
					this.docname = this.doc_select.get_value();
				}
			},
			render_input: true
		});
		this.preview_type = frappe.ui.form.make_control({
			parent: this.$refs["preview-type"],
			df: {
				label: __("Preview type"),
				fieldname: "docname",
				fieldtype: "Select",
				options: ["PDF", "HTML"],
				change: () => {
					this.type = this.preview_type.get_value();
				}
			},
			render_input: true
		});
		this.preview_type.set_value(this.type);
		this.get_default_docname().then(
			docname => docname && this.doc_select.set_value(docname)
		);
		this.$store.$on("after_save", () => {
			this.refresh();
		});
	},
	methods: {
		refresh() {
			this.$refs.iframe.contentWindow.location.reload();
		},
		get_default_docname() {
			return frappe.db.get_list(this.doctype, { limit: 1 }).then(doc => {
				return doc.length > 0 ? doc[0].name : null;
			});
		}
	},
	computed: {
		doctype() {
			return this.print_format.doc_type;
		},
		url() {
			if (!this.docname) return null;
			let params = new URLSearchParams();
			params.append("doctype", this.doctype);
			params.append("name", this.docname);
			params.append("print_format", this.print_format.name);
			if (this.$store.letterhead) {
				params.append("letterhead", this.$store.letterhead.name);
			}
			let url =
				this.type == "PDF"
					? \`/api/method/frappe.utils.weasyprint.download_pdf\`
					: "/printpreview";
			return \`\${url}?\${params.toString()}\`;
		}
	}
};
<\/script>
<style scoped>
.preview-iframe {
	width: 100%;
	height: 96%;
	border: none;
	border-radius: var(--border-radius);
}
.btn-new-tab {
	margin-top: auto;
	margin-bottom: 1.2rem;
}
.preview-control :deep(.form-control) {
	background: var(--control-bg-on-gray);
}
</style>
`]},media:void 0})},Dr="data-v-70dca9ee",Rr=void 0,Pr=!1;function Lr(t,a,r,e,c,u,l,_,p,h){let d=(typeof r=="function"?r.options:r)||{};d.__file="frappe/public/js/print_format_builder/Preview.vue",d.render||(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,c&&(d.functional=!0)),d._scopeId=e;{let b;if(a&&(b=l?function(g){a.call(this,h(g,this.$root.$options.shadowRoot))}:function(g){a.call(this,_(g))}),b!==void 0)if(d.functional){let g=d.render;d.render=function(O,R){return b.call(R),g(O,R)}}else{let g=d.beforeCreate;d.beforeCreate=g?[].concat(g,b):[b]}}return d}function pn(){let t=pn.styles||(pn.styles={}),a=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(e,c){if(document.querySelector('style[data-vue-ssr-id~="'+e+'"]'))return;let u=a?c.media||"default":e,l=t[u]||(t[u]={ids:[],parts:[],element:void 0});if(!l.ids.includes(e)){let _=c.source,p=l.ids.length;if(l.ids.push(e),a&&(l.element=l.element||document.querySelector("style[data-group="+u+"]")),!l.element){let h=document.head||document.getElementsByTagName("head")[0],d=l.element=document.createElement("style");d.type="text/css",c.media&&d.setAttribute("media",c.media),a&&(d.setAttribute("data-group",u),d.setAttribute("data-next-index","0")),h.appendChild(d)}if(a&&(p=parseInt(l.element.getAttribute("data-next-index")),l.element.setAttribute("data-next-index",p+1)),l.element.styleSheet)l.parts.push(_),l.element.styleSheet.cssText=l.parts.filter(Boolean).join(`
`);else{let h=document.createTextNode(_),d=l.element.childNodes;d[p]&&l.element.removeChild(d[p]),d.length?l.element.insertBefore(h,d[p]):l.element.appendChild(h)}}}}var Mr=Lr({render:qn,staticRenderFns:Or},Ir,$r,Dr,Pr,Rr,!1,pn,void 0,void 0),ti=Mr;var ei=_e(ae());var Fr={name:"PrintFormatControls",mixins:[Pt],data(){return{search_text:"",google_fonts:[]}},components:{draggable:ei.default},mounted(){let t="frappe.printing.page.print_format_builder_beta.print_format_builder_beta.get_google_fonts";frappe.call(t).then(a=>{this.google_fonts=a.message||[],this.google_fonts.includes(this.print_format.font)||this.google_fonts.push(this.print_format.font)})},methods:{update_margin(t,a){a=parseFloat(a),a<0&&(a=0),this.$store.print_format[t]=a},clone_field(t){let a=Ae(t,["label","fieldname","fieldtype","options","table_columns","html","field_template"]);return a.custom&&(a.fieldname+="_"+frappe.utils.get_random(8)),a}},computed:{margins(){return[{label:__("Top"),fieldname:"margin_top"},{label:__("Bottom"),fieldname:"margin_bottom"},{label:__("Left",null,"alignment"),fieldname:"margin_left"},{label:__("Right",null,"alignment"),fieldname:"margin_right"}]},fields(){let t=this.meta.fields.filter(a=>["Section Break","Column Break"].includes(a.fieldtype)?!1:this.search_text?!!(a.fieldname.includes(this.search_text)||a.label&&a.label.includes(this.search_text)):!0).map(a=>{let r={label:a.label,fieldname:a.fieldname,fieldtype:a.fieldtype,options:a.options};return a.fieldtype=="Table"&&(r.table_columns=sn(a)),r});return[{label:__("Custom HTML"),fieldname:"custom_html",fieldtype:"HTML",html:"",custom:1},{label:__("ID (name)"),fieldname:"name",fieldtype:"Data"},{label:__("Spacer"),fieldname:"spacer",fieldtype:"Spacer",custom:1},{label:__("Divider"),fieldname:"divider",fieldtype:"Divider",custom:1},...this.print_templates,...t]},print_templates(){let t=this.print_format.__onload.print_templates||{},a=[];for(let r of t){let e;r.field?e=frappe.meta.get_docfield(this.meta.name,r.field):e={label:r.name,fieldname:frappe.scrub(r.name)},a.push({label:`${__(e.label)} (${__("Field Template")})`,fieldname:e.fieldname+"_template",fieldtype:"Field Template",field_template:r.name})}return a},page_number_positions(){return[{label:__("Hide"),value:"Hide"},{label:__("Top Left"),value:"Top Left"},{label:__("Top Center"),value:"Top Center"},{label:__("Top Right"),value:"Top Right"},{label:__("Bottom Left"),value:"Bottom Left"},{label:__("Bottom Center"),value:"Bottom Center"},{label:__("Bottom Right"),value:"Bottom Right"}]}}},ni=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"layout-side-section"},[r("div",{staticClass:"form-sidebar"},[r("div",{staticClass:"sidebar-menu"},[r("div",{staticClass:"sidebar-label"},[t._v(t._s(t.__("Page Margins")))]),t._v(" "),r("div",{staticClass:"margin-controls"},t._l(t.margins,function(e){return r("div",{key:e.fieldname,staticClass:"form-group"},[r("div",{staticClass:"clearfix"},[r("label",{staticClass:"control-label"},[t._v(`
							`+t._s(e.label)+`
						`)])]),t._v(" "),r("div",{staticClass:"control-input-wrapper"},[r("div",{staticClass:"control-input"},[r("input",{staticClass:"form-control form-control-sm",attrs:{type:"number",min:"0"},domProps:{value:t.print_format[e.fieldname]},on:{change:function(c){return t.update_margin(e.fieldname,c.target.value)}}})])])])}),0)]),t._v(" "),r("div",{staticClass:"sidebar-menu"},[r("div",{staticClass:"sidebar-label"},[t._v(t._s(t.__("Google Font")))]),t._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"control-input-wrapper"},[r("div",{staticClass:"control-input"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.print_format.font,expression:"print_format.font"}],staticClass:"form-control form-control-sm",on:{change:function(e){var c=Array.prototype.filter.call(e.target.options,function(u){return u.selected}).map(function(u){var l="_value"in u?u._value:u.value;return l});t.$set(t.print_format,"font",e.target.multiple?c:c[0])}}},t._l(t.google_fonts,function(e){return r("option",{domProps:{value:e}},[t._v(`
								`+t._s(e)+`
							`)])}),0)])])])]),t._v(" "),r("div",{staticClass:"sidebar-menu"},[r("div",{staticClass:"sidebar-label"},[t._v(t._s(t.__("Font Size")))]),t._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"control-input-wrapper"},[r("div",{staticClass:"control-input"},[r("input",{staticClass:"form-control form-control-sm",attrs:{type:"number",placeholder:"12, 13, 14"},domProps:{value:t.print_format.font_size},on:{change:function(e){return t.print_format.font_size=parseFloat(e.target.value)}}})])])])]),t._v(" "),r("div",{staticClass:"sidebar-menu"},[r("div",{staticClass:"sidebar-label"},[t._v(t._s(t.__("Page Number")))]),t._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"control-input-wrapper"},[r("div",{staticClass:"control-input"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.print_format.page_number,expression:"print_format.page_number"}],staticClass:"form-control form-control-sm",on:{change:function(e){var c=Array.prototype.filter.call(e.target.options,function(u){return u.selected}).map(function(u){var l="_value"in u?u._value:u.value;return l});t.$set(t.print_format,"page_number",e.target.multiple?c:c[0])}}},t._l(t.page_number_positions,function(e){return r("option",{domProps:{value:e.value}},[t._v(`
								`+t._s(e.label)+`
							`)])}),0)])])])]),t._v(" "),r("div",{staticClass:"sidebar-menu"},[r("div",{staticClass:"sidebar-label"},[t._v(t._s(t.__("Fields")))]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.search_text,expression:"search_text"}],staticClass:"mb-2 form-control form-control-sm",attrs:{type:"text",placeholder:t.__("Search fields")},domProps:{value:t.search_text},on:{input:function(e){e.target.composing||(t.search_text=e.target.value)}}}),t._v(" "),r("draggable",{staticClass:"fields-container",attrs:{list:t.fields,group:{name:"fields",pull:"clone",put:!1},sort:!1,clone:t.clone_field}},t._l(t.fields,function(e){return r("div",{key:e.fieldname,staticClass:"field",attrs:{title:e.fieldname}},[t._v(`
					`+t._s(e.label)+`
				`)])}),0)],1)])])},Br=[];ni._withStripped=!0;var Nr=function(t){!t||t("data-v-ebae9a98_0",{source:`
.margin-controls[data-v-ebae9a98] {
	display: flex;
}
.form-control[data-v-ebae9a98] {
	background: var(--control-bg-on-gray);
}
.margin-controls > .form-group + .form-group[data-v-ebae9a98] {
	margin-left: 0.5rem;
}
.margin-controls > .form-group[data-v-ebae9a98] {
	margin-bottom: 0;
}
.fields-container[data-v-ebae9a98] {
	max-height: calc(100vh - 34rem);
	overflow-y: auto;
}
.field[data-v-ebae9a98] {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: var(--bg-light-gray);
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
	cursor: pointer;
}
.field[data-v-ebae9a98]:not(:first-child) {
	margin-top: 0.5rem;
}
.sidebar-menu[data-v-ebae9a98]:last-child {
	margin-bottom: 0;
}
.control-font[data-v-ebae9a98] :deep(.frappe-control[data-fieldname="font"] label) {
	display: none;
}
`,map:{version:3,sources:["frappe/public/js/print_format_builder/PrintFormatControls.vue"],names:[],mappings:";AAkSA;CACA,aAAA;AACA;AAEA;CACA,qCAAA;AACA;AAEA;CACA,mBAAA;AACA;AAEA;CACA,gBAAA;AACA;AAEA;CACA,+BAAA;CACA,gBAAA;AACA;AAEA;CACA,aAAA;CACA,8BAAA;CACA,mBAAA;CACA,WAAA;CACA,sCAAA;CACA,mCAAA;CACA,kCAAA;CACA,uBAAA;CACA,yBAAA;CACA,eAAA;AACA;AAEA;CACA,kBAAA;AACA;AAEA;CACA,gBAAA;AACA;AAEA;CACA,aAAA;AACA",file:"PrintFormatControls.vue",sourcesContent:[`<template>
	<div class="layout-side-section">
		<div class="form-sidebar">
			<div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Page Margins") }}</div>
				<div class="margin-controls">
					<div
						class="form-group"
						v-for="df in margins"
						:key="df.fieldname"
					>
						<div class="clearfix">
							<label class="control-label">
								{{ df.label }}
							</label>
						</div>
						<div class="control-input-wrapper">
							<div class="control-input">
								<input
									type="number"
									class="form-control form-control-sm"
									:value="print_format[df.fieldname]"
									min="0"
									@change="
										e =>
											update_margin(
												df.fieldname,
												e.target.value
											)
									"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Google Font") }}</div>
				<div class="form-group">
					<div class="control-input-wrapper">
						<div class="control-input">
							<select
								class="form-control form-control-sm"
								v-model="print_format.font"
							>
								<option
									v-for="font in google_fonts"
									:value="font"
								>
									{{ font }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Font Size") }}</div>
				<div class="form-group">
					<div class="control-input-wrapper">
						<div class="control-input">
							<input
								type="number"
								class="form-control form-control-sm"
								placeholder="12, 13, 14"
								:value="print_format.font_size"
								@change="
									e =>
										(print_format.font_size = parseFloat(
											e.target.value
										))
								"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Page Number") }}</div>
				<div class="form-group">
					<div class="control-input-wrapper">
						<div class="control-input">
							<select
								class="form-control form-control-sm"
								v-model="print_format.page_number"
							>
								<option
									v-for="position in page_number_positions"
									:value="position.value"
								>
									{{ position.label }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Fields") }}</div>
				<input
					class="mb-2 form-control form-control-sm"
					type="text"
					:placeholder="__('Search fields')"
					v-model="search_text"
				/>
				<draggable
					class="fields-container"
					:list="fields"
					:group="{ name: 'fields', pull: 'clone', put: false }"
					:sort="false"
					:clone="clone_field"
				>
					<div
						class="field"
						v-for="df in fields"
						:key="df.fieldname"
						:title="df.fieldname"
					>
						{{ df.label }}
					</div>
				</draggable>
			</div>
		</div>
	</div>
</template>

<script>
import draggable from "vuedraggable";
import { get_table_columns, pluck } from "./utils";
import { storeMixin } from "./store";

export default {
	name: "PrintFormatControls",
	mixins: [storeMixin],
	data() {
		return {
			search_text: "",
			google_fonts: []
		};
	},
	components: {
		draggable
	},
	mounted() {
		let method =
			"frappe.printing.page.print_format_builder_beta.print_format_builder_beta.get_google_fonts";
		frappe.call(method).then(r => {
			this.google_fonts = r.message || [];
			if (!this.google_fonts.includes(this.print_format.font)) {
				this.google_fonts.push(this.print_format.font);
			}
		});
	},
	methods: {
		update_margin(fieldname, value) {
			value = parseFloat(value);
			if (value < 0) {
				value = 0;
			}
			this.$store.print_format[fieldname] = value;
		},
		clone_field(df) {
			let cloned = pluck(df, [
				"label",
				"fieldname",
				"fieldtype",
				"options",
				"table_columns",
				"html",
				"field_template"
			]);
			if (cloned.custom) {
				// generate unique fieldnames for custom blocks
				cloned.fieldname += "_" + frappe.utils.get_random(8);
			}
			return cloned;
		}
	},
	computed: {
		margins() {
			return [
				{ label: __("Top"), fieldname: "margin_top" },
				{ label: __("Bottom"), fieldname: "margin_bottom" },
				{ label: __("Left", null, 'alignment'), fieldname: "margin_left" },
				{ label: __("Right", null, 'alignment'), fieldname: "margin_right" }
			];
		},
		fields() {
			let fields = this.meta.fields
				.filter(df => {
					if (
						["Section Break", "Column Break"].includes(df.fieldtype)
					) {
						return false;
					}
					if (this.search_text) {
						if (df.fieldname.includes(this.search_text)) {
							return true;
						}
						if (df.label && df.label.includes(this.search_text)) {
							return true;
						}
						return false;
					} else {
						return true;
					}
				})
				.map(df => {
					let out = {
						label: df.label,
						fieldname: df.fieldname,
						fieldtype: df.fieldtype,
						options: df.options
					};
					if (df.fieldtype == "Table") {
						out.table_columns = get_table_columns(df);
					}
					return out;
				});

			return [
				{
					label: __("Custom HTML"),
					fieldname: "custom_html",
					fieldtype: "HTML",
					html: "",
					custom: 1
				},
				{
					label: __("ID (name)"),
					fieldname: "name",
					fieldtype: "Data"
				},
				{
					label: __("Spacer"),
					fieldname: "spacer",
					fieldtype: "Spacer",
					custom: 1
				},
				{
					label: __("Divider"),
					fieldname: "divider",
					fieldtype: "Divider",
					custom: 1
				},
				...this.print_templates,
				...fields
			];
		},
		print_templates() {
			let templates = this.print_format.__onload.print_templates || {};
			let out = [];
			for (let template of templates) {
				let df;
				if (template.field) {
					df = frappe.meta.get_docfield(
						this.meta.name,
						template.field
					);
				} else {
					df = {
						label: template.name,
						fieldname: frappe.scrub(template.name)
					};
				}
				out.push({
					label: \`\${__(df.label)} (\${__("Field Template")})\`,
					fieldname: df.fieldname + "_template",
					fieldtype: "Field Template",
					field_template: template.name
				});
			}
			return out;
		},
		page_number_positions() {
			return [
				{ label: __("Hide"), value: "Hide" },
				{ label: __("Top Left"), value: "Top Left" },
				{ label: __("Top Center"), value: "Top Center" },
				{ label: __("Top Right"), value: "Top Right" },
				{ label: __("Bottom Left"), value: "Bottom Left" },
				{ label: __("Bottom Center"), value: "Bottom Center" },
				{ label: __("Bottom Right"), value: "Bottom Right" }
			];
		}
	}
};
<\/script>

<style scoped>
.margin-controls {
	display: flex;
}

.form-control {
	background: var(--control-bg-on-gray);
}

.margin-controls > .form-group + .form-group {
	margin-left: 0.5rem;
}

.margin-controls > .form-group {
	margin-bottom: 0;
}

.fields-container {
	max-height: calc(100vh - 34rem);
	overflow-y: auto;
}

.field {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: var(--bg-light-gray);
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
	cursor: pointer;
}

.field:not(:first-child) {
	margin-top: 0.5rem;
}

.sidebar-menu:last-child {
	margin-bottom: 0;
}

.control-font :deep(.frappe-control[data-fieldname="font"] label) {
	display: none;
}
</style>
`]},media:void 0})},jr="data-v-ebae9a98",Hr=void 0,kr=!1;function Ur(t,a,r,e,c,u,l,_,p,h){let d=(typeof r=="function"?r.options:r)||{};d.__file="frappe/public/js/print_format_builder/PrintFormatControls.vue",d.render||(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,c&&(d.functional=!0)),d._scopeId=e;{let b;if(a&&(b=l?function(g){a.call(this,h(g,this.$root.$options.shadowRoot))}:function(g){a.call(this,_(g))}),b!==void 0)if(d.functional){let g=d.render;d.render=function(O,R){return b.call(R),g(O,R)}}else{let g=d.beforeCreate;d.beforeCreate=g?[].concat(g,b):[b]}}return d}function hn(){let t=hn.styles||(hn.styles={}),a=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(e,c){if(document.querySelector('style[data-vue-ssr-id~="'+e+'"]'))return;let u=a?c.media||"default":e,l=t[u]||(t[u]={ids:[],parts:[],element:void 0});if(!l.ids.includes(e)){let _=c.source,p=l.ids.length;if(l.ids.push(e),a&&(l.element=l.element||document.querySelector("style[data-group="+u+"]")),!l.element){let h=document.head||document.getElementsByTagName("head")[0],d=l.element=document.createElement("style");d.type="text/css",c.media&&d.setAttribute("media",c.media),a&&(d.setAttribute("data-group",u),d.setAttribute("data-next-index","0")),h.appendChild(d)}if(a&&(p=parseInt(l.element.getAttribute("data-next-index")),l.element.setAttribute("data-next-index",p+1)),l.element.styleSheet)l.parts.push(_),l.element.styleSheet.cssText=l.parts.filter(Boolean).join(`
`);else{let h=document.createTextNode(_),d=l.element.childNodes;d[p]&&l.element.removeChild(d[p]),d.length?l.element.insertBefore(h,d[p]):l.element.appendChild(h)}}}}var zr=Ur({render:ni,staticRenderFns:Br},Nr,Fr,jr,kr,Hr,!1,hn,void 0,void 0),ii=zr;var Wr={name:"PrintFormatBuilder",props:["print_format_name"],components:{PrintFormat:Zn,PrintFormatControls:ii,Preview:ti},data(){return{show_preview:!1}},provide(){return{$store:this.$store}},mounted(){this.$store.fetch().then(()=>{this.$store.layout||(this.$store.layout=this.$store.get_default_layout(),this.$store.save_changes())})},methods:{toggle_preview(){this.show_preview=!this.show_preview}},computed:{$store(){return Be(this.print_format_name)},shouldRender(){return Boolean(this.$store.print_format&&this.$store.meta&&this.$store.layout)}}},ri=function(){var t=this,a=t.$createElement,r=t._self._c||a;return t.shouldRender?r("div",{staticClass:"layout-main-section row"},[r("div",{staticClass:"col-3"},[r("PrintFormatControls")],1),t._v(" "),r("div",{staticClass:"print-format-container col-9"},[r("keep-alive",[t.show_preview?r("Preview"):r("PrintFormat")],1)],1)]):t._e()},Xr=[];ri._withStripped=!0;var Gr=function(t){!t||t("data-v-17fb0e8b_0",{source:`
.print-format-container[data-v-17fb0e8b] {
	height: calc(100vh - 140px);
	overflow-y: auto;
	padding-top: 0.5rem;
	padding-bottom: 4rem;
}
`,map:{version:3,sources:["frappe/public/js/print_format_builder/PrintFormatBuilder.vue"],names:[],mappings:";AAmEA;CACA,2BAAA;CACA,gBAAA;CACA,mBAAA;CACA,oBAAA;AACA",file:"PrintFormatBuilder.vue",sourcesContent:[`<template>
	<div class="layout-main-section row" v-if="shouldRender">
		<div class="col-3">
			<PrintFormatControls />
		</div>
		<div class="print-format-container col-9">
			<keep-alive>
				<Preview v-if="show_preview" />
				<PrintFormat v-else />
			</keep-alive>
		</div>
	</div>
</template>

<script>
import PrintFormat from "./PrintFormat.vue";
import Preview from "./Preview.vue";
import PrintFormatControls from "./PrintFormatControls.vue";
import { getStore } from "./store";

export default {
	name: "PrintFormatBuilder",
	props: ["print_format_name"],
	components: {
		PrintFormat,
		PrintFormatControls,
		Preview
	},
	data() {
		return {
			show_preview: false
		};
	},
	provide() {
		return {
			$store: this.$store
		};
	},
	mounted() {
		this.$store.fetch().then(() => {
			if (!this.$store.layout) {
				this.$store.layout = this.$store.get_default_layout();
				this.$store.save_changes();
			}
		});
	},
	methods: {
		toggle_preview() {
			this.show_preview = !this.show_preview;
		}
	},
	computed: {
		$store() {
			return getStore(this.print_format_name);
		},
		shouldRender() {
			return Boolean(
				this.$store.print_format &&
					this.$store.meta &&
					this.$store.layout
			);
		}
	}
};
<\/script>

<style scoped>
.print-format-container {
	height: calc(100vh - 140px);
	overflow-y: auto;
	padding-top: 0.5rem;
	padding-bottom: 4rem;
}
</style>
`]},media:void 0})},Vr="data-v-17fb0e8b",Yr=void 0,Kr=!1;function Jr(t,a,r,e,c,u,l,_,p,h){let d=(typeof r=="function"?r.options:r)||{};d.__file="frappe/public/js/print_format_builder/PrintFormatBuilder.vue",d.render||(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,c&&(d.functional=!0)),d._scopeId=e;{let b;if(a&&(b=l?function(g){a.call(this,h(g,this.$root.$options.shadowRoot))}:function(g){a.call(this,_(g))}),b!==void 0)if(d.functional){let g=d.render;d.render=function(O,R){return b.call(R),g(O,R)}}else{let g=d.beforeCreate;d.beforeCreate=g?[].concat(g,b):[b]}}return d}function gn(){let t=gn.styles||(gn.styles={}),a=typeof navigator!="undefined"&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(e,c){if(document.querySelector('style[data-vue-ssr-id~="'+e+'"]'))return;let u=a?c.media||"default":e,l=t[u]||(t[u]={ids:[],parts:[],element:void 0});if(!l.ids.includes(e)){let _=c.source,p=l.ids.length;if(l.ids.push(e),a&&(l.element=l.element||document.querySelector("style[data-group="+u+"]")),!l.element){let h=document.head||document.getElementsByTagName("head")[0],d=l.element=document.createElement("style");d.type="text/css",c.media&&d.setAttribute("media",c.media),a&&(d.setAttribute("data-group",u),d.setAttribute("data-next-index","0")),h.appendChild(d)}if(a&&(p=parseInt(l.element.getAttribute("data-next-index")),l.element.setAttribute("data-next-index",p+1)),l.element.styleSheet)l.parts.push(_),l.element.styleSheet.cssText=l.parts.filter(Boolean).join(`
`);else{let h=document.createTextNode(_),d=l.element.childNodes;d[p]&&l.element.removeChild(d[p]),d.length?l.element.insertBefore(h,d[p]):l.element.appendChild(h)}}}}var Qr=Jr({render:ri,staticRenderFns:Xr},Gr,Wr,Vr,Kr,Yr,!1,gn,void 0,void 0),oi=Qr;var vn=class{constructor({wrapper:a,page:r,print_format:e}){this.$wrapper=$(a),this.page=r,this.print_format=e,this.page.clear_actions(),this.page.clear_icons(),this.page.clear_custom_actions(),this.page.set_title(__("Editing {0}",[this.print_format])),this.page.set_primary_action(__("Save"),()=>{this.$component.$store.save_changes()});let c=this.page.add_button(__("Show Preview"),()=>{this.$component.toggle_preview()}),u=this.page.add_button(__("Reset Changes"),()=>this.$component.$store.reset_changes());this.page.add_menu_item(__("Edit Print Format"),()=>{frappe.set_route("Form","Print Format",this.print_format)}),this.page.add_menu_item(__("Change Print Format"),()=>{frappe.set_route("print-format-builder-beta")});let l=new Vue({el:this.$wrapper.get(0),render:p=>p(oi,{props:{print_format_name:e}})});this.$component=l.$children[0],Be(e).$watch("dirty",p=>{p?(this.page.set_indicator("Not Saved","orange"),c.hide(),u.show()):(this.page.clear_indicator(),c.show(),u.hide())}),this.$component.$watch("show_preview",p=>{c.text(p?__("Hide Preview"):__("Show Preview"))})}};frappe.provide("frappe.ui");frappe.ui.PrintFormatBuilder=vn;var Ro=vn;})();
/**!
 * Sortable 1.10.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
//# sourceMappingURL=print_format_builder.bundle.4NK3JYLN.js.map
