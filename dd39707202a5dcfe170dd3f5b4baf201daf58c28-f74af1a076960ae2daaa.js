(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"2vRJ":function(e,t,n){(function(e){n("KOtZ"),t.__esModule=!0,t.warn=t.requestAnimationFrame=t.reducePropsToState=t.mapStateOnServer=t.handleClientStateChange=t.convertReactPropstoHtmlAttributes=void 0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=l(n("ERkP")),i=l(n("ch84")),c=n("kqzl");function l(e){return e&&e.__esModule?e:{default:e}}var s,u=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},d=function(e){var t=E(e,c.TAG_NAMES.TITLE),n=E(e,c.HELMET_PROPS.TITLE_TEMPLATE);if(n&&t)return n.replace(/%s/g,(function(){return t}));var r=E(e,c.HELMET_PROPS.DEFAULT_TITLE);return t||r||void 0},f=function(e){return E(e,c.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},p=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return o({},e,t)}),{})},m=function(e,t){return t.filter((function(e){return void 0!==e[c.TAG_NAMES.BASE]})).map((function(e){return e[c.TAG_NAMES.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var a=r[o].toLowerCase();if(-1!==e.indexOf(a)&&n[a])return t.concat(n)}return t}),[])},T=function(e,t,n){var o={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&y("Helmet: "+e+' should be of type "Array". Instead found type "'+r(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var r={};n.filter((function(e){for(var n=void 0,a=Object.keys(e),i=0;i<a.length;i++){var l=a[i],s=l.toLowerCase();-1===t.indexOf(s)||n===c.TAG_PROPERTIES.REL&&"canonical"===e[n].toLowerCase()||s===c.TAG_PROPERTIES.REL&&"stylesheet"===e[s].toLowerCase()||(n=s),-1===t.indexOf(l)||l!==c.TAG_PROPERTIES.INNER_HTML&&l!==c.TAG_PROPERTIES.CSS_TEXT&&l!==c.TAG_PROPERTIES.ITEM_PROP||(n=l)}if(!n||!e[n])return!1;var u=e[n].toLowerCase();return o[n]||(o[n]={}),r[n]||(r[n]={}),!o[n][u]&&(r[n][u]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var a=Object.keys(r),l=0;l<a.length;l++){var s=a[l],u=(0,i.default)({},o[s],r[s]);o[s]=u}return e}),[]).reverse()},E=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},h=(s=Date.now(),function(e){var t=Date.now();t-s>16?(s=t,e(t)):setTimeout((function(){h(e)}),0)}),A=function(e){return clearTimeout(e)},v="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||h:e.requestAnimationFrame||h,b="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||A:e.cancelAnimationFrame||A,y=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},S=null,g=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,l=e.noscriptTags,s=e.onChangeClientState,u=e.scriptTags,d=e.styleTags,f=e.title,p=e.titleAttributes;P(c.TAG_NAMES.BODY,r),P(c.TAG_NAMES.HTML,o),R(f,p);var m={baseTag:N(c.TAG_NAMES.BASE,n),linkTags:N(c.TAG_NAMES.LINK,a),metaTags:N(c.TAG_NAMES.META,i),noscriptTags:N(c.TAG_NAMES.NOSCRIPT,l),scriptTags:N(c.TAG_NAMES.SCRIPT,u),styleTags:N(c.TAG_NAMES.STYLE,d)},T={},E={};Object.keys(m).forEach((function(e){var t=m[e],n=t.newTags,r=t.oldTags;n.length&&(T[e]=n),r.length&&(E[e]=m[e].oldTags)})),t&&t(),s(e,T,E)},_=function(e){return Array.isArray(e)?e.join(""):e},R=function(e,t){void 0!==e&&document.title!==e&&(document.title=_(e)),P(c.TAG_NAMES.TITLE,t)},P=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(c.HELMET_ATTRIBUTE),o=r?r.split(","):[],a=[].concat(o),i=Object.keys(t),l=0;l<i.length;l++){var s=i[l],u=t[s]||"";n.getAttribute(s)!==u&&n.setAttribute(s,u),-1===o.indexOf(s)&&o.push(s);var d=a.indexOf(s);-1!==d&&a.splice(d,1)}for(var f=a.length-1;f>=0;f--)n.removeAttribute(a[f]);o.length===a.length?n.removeAttribute(c.HELMET_ATTRIBUTE):n.getAttribute(c.HELMET_ATTRIBUTE)!==i.join(",")&&n.setAttribute(c.HELMET_ATTRIBUTE,i.join(","))}},N=function(e,t){var n=document.head||document.querySelector(c.TAG_NAMES.HEAD),r=n.querySelectorAll(e+"["+c.HELMET_ATTRIBUTE+"]"),o=Array.prototype.slice.call(r),a=[],i=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===c.TAG_PROPERTIES.INNER_HTML)n.innerHTML=t.innerHTML;else if(r===c.TAG_PROPERTIES.CSS_TEXT)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var l=void 0===t[r]?"":t[r];n.setAttribute(r,l)}n.setAttribute(c.HELMET_ATTRIBUTE,"true"),o.some((function(e,t){return i=t,n.isEqualNode(e)}))?o.splice(i,1):a.push(n)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),a.forEach((function(e){return n.appendChild(e)})),{oldTags:o,newTags:a}},O=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},w=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[c.REACT_TAG_MAP[n]||n]=e[n],t}),t)},M=function(e,t,n){switch(e){case c.TAG_NAMES.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})[c.HELMET_ATTRIBUTE]=!0,o=w(n,r),[a.default.createElement(c.TAG_NAMES.TITLE,o,e)];var e,n,r,o},toString:function(){return function(e,t,n,r){var o=O(n),a=_(t);return o?"<"+e+" "+c.HELMET_ATTRIBUTE+'="true" '+o+">"+u(a,r)+"</"+e+">":"<"+e+" "+c.HELMET_ATTRIBUTE+'="true">'+u(a,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case c.ATTRIBUTE_NAMES.BODY:case c.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return w(t)},toString:function(){return O(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,o=((r={key:n})[c.HELMET_ATTRIBUTE]=!0,r);return Object.keys(t).forEach((function(e){var n=c.REACT_TAG_MAP[e]||e;if(n===c.TAG_PROPERTIES.INNER_HTML||n===c.TAG_PROPERTIES.CSS_TEXT){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]})),a.default.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var o=Object.keys(r).filter((function(e){return!(e===c.TAG_PROPERTIES.INNER_HTML||e===c.TAG_PROPERTIES.CSS_TEXT)})).reduce((function(e,t){var o=void 0===r[t]?t:t+'="'+u(r[t],n)+'"';return e?e+" "+o:o}),""),a=r.innerHTML||r.cssText||"",i=-1===c.SELF_CLOSING_TAGS.indexOf(e);return t+"<"+e+" "+c.HELMET_ATTRIBUTE+'="true" '+o+(i?"/>":">"+a+"</"+e+">")}),"")}(e,t,n)}}}};t.convertReactPropstoHtmlAttributes=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[c.HTML_TAG_MAP[n]||n]=e[n],t}),t)},t.handleClientStateChange=function(e){S&&b(S),e.defer?S=v((function(){g(e,(function(){S=null}))})):(g(e),S=null)},t.mapStateOnServer=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,l=e.noscriptTags,s=e.scriptTags,u=e.styleTags,d=e.title,f=void 0===d?"":d,p=e.titleAttributes;return{base:M(c.TAG_NAMES.BASE,t,r),bodyAttributes:M(c.ATTRIBUTE_NAMES.BODY,n,r),htmlAttributes:M(c.ATTRIBUTE_NAMES.HTML,o,r),link:M(c.TAG_NAMES.LINK,a,r),meta:M(c.TAG_NAMES.META,i,r),noscript:M(c.TAG_NAMES.NOSCRIPT,l,r),script:M(c.TAG_NAMES.SCRIPT,s,r),style:M(c.TAG_NAMES.STYLE,u,r),title:M(c.TAG_NAMES.TITLE,{title:f,titleAttributes:p},r)}},t.reducePropsToState=function(e){return{baseTag:m([c.TAG_PROPERTIES.HREF],e),bodyAttributes:p(c.ATTRIBUTE_NAMES.BODY,e),defer:E(e,c.HELMET_PROPS.DEFER),encode:E(e,c.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:p(c.ATTRIBUTE_NAMES.HTML,e),linkTags:T(c.TAG_NAMES.LINK,[c.TAG_PROPERTIES.REL,c.TAG_PROPERTIES.HREF],e),metaTags:T(c.TAG_NAMES.META,[c.TAG_PROPERTIES.NAME,c.TAG_PROPERTIES.CHARSET,c.TAG_PROPERTIES.HTTPEQUIV,c.TAG_PROPERTIES.PROPERTY,c.TAG_PROPERTIES.ITEM_PROP],e),noscriptTags:T(c.TAG_NAMES.NOSCRIPT,[c.TAG_PROPERTIES.INNER_HTML],e),onChangeClientState:f(e),scriptTags:T(c.TAG_NAMES.SCRIPT,[c.TAG_PROPERTIES.SRC,c.TAG_PROPERTIES.INNER_HTML],e),styleTags:T(c.TAG_NAMES.STYLE,[c.TAG_PROPERTIES.CSS_TEXT],e),title:d(e),titleAttributes:p(c.ATTRIBUTE_NAMES.TITLE,e)}},t.requestAnimationFrame=v,t.warn=y}).call(this,n("fRV1"))},"8pZI":function(e,t,n){"use strict";var r=n("ERkP"),o=n("VF98"),a=n.n(o),i=n("Wbzz"),c=n("TmcG"),l=n.n(c),s=n("fox7"),u=n.n(s),d={getItem:function(){},setItem:function(){}};try{d=window.localStorage}catch(_){}var f=function(){var e=r.useState((function(){return"0"!==d.getItem("dx-show-banner")})),t=e[0],n=e[1];r.useEffect((function(){localStorage.setItem("dx-show-banner",t?"1":"0")}),[t]);return t?r.createElement("div",{className:u.a.banner},r.createElement("div",{className:"container"},r.createElement("div",{className:"row align-items-center px-2 flex-nowrap"},r.createElement("div",{className:"col-10 col-sm-11"},r.createElement("div",{className:"container"},r.createElement("div",{className:"row"},r.createElement("div",{className:"d-none d-lg-block col pr-0"},r.createElement("p",{className:"pl-3 m-0 banner-text"},"DevExtreme Reactive component libraries are in maintenance support mode.")),r.createElement("div",{className:"d-none d-md-block col col-lg-auto px-0"},r.createElement("img",{src:l.a,alt:"react"})),r.createElement("div",{className:"col-12 col-md-8 col-lg-6"},r.createElement("p",{className:"m-0 banner-text pl-3"},r.createElement("div",{className:"d-block d-lg-none"},"DevExtreme Reactive component libraries are",r.createElement("span",{className:"nowrap"}," in maintenance support mode.")),r.createElement("span",null," For additional information in this regard, "),r.createElement("span",null," please review the following readme on "),r.createElement("span",null,"GitHub: "),r.createElement("a",{href:"https://github.com/DevExpress/devextreme-reactive/blob/master/README.md",target:"_blank",rel:"noopener noreferrer"},r.createElement("span",{className:"nowrap"},"DevExtreme Reactive Components - Maintenance Mode"))))))),r.createElement("div",{className:"col col-lg-1 d-flex justify-content-end"},r.createElement("button",{type:"button",className:u.a.button,"aria-label":"Close",onClick:function(){return n(!1)}},r.createElement("i",{className:u.a.buttonIcon})))))):null},p=n("SxA4"),m=n.n(p),T=function(){return r.createElement("footer",{className:m.a.footer},r.createElement("div",{className:"container"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-3"},r.createElement("div",{className:m.a.links},r.createElement("a",{href:"https://community.devexpress.com/tags/DevExtreme+Reactive/default.aspx",target:"_blank",rel:"noopener noreferrer",title:"Blog"},"Blog"),r.createElement("a",{href:"https://github.com/DevExpress/devextreme-reactive",target:"_blank",rel:"noopener noreferrer",title:"GitHub"},"GitHub"),r.createElement("a",{href:"https://js.devexpress.com/Buy/",target:"_blank",rel:"noopener noreferrer",title:"Buy"},"Buy"))),r.createElement("div",{className:"col-md-9"},r.createElement("div",{className:m.a.copyright},"Copyright © 2011-",(new Date).getFullYear()," ","Developer Express Inc.",r.createElement("br",null),"All trademarks or registered trademarks are property of their respective owners.",r.createElement("br",null),r.createElement("br",null),r.createElement("a",{href:"https://js.devexpress.com/Privacy/",target:"_blank",rel:"noopener noreferrer"},"Your Privacy - Legal Statements"),r.createElement("br",null),r.createElement("a",{href:"https://js.devexpress.com/Licensing/",target:"_blank",rel:"noopener noreferrer"},"Licensing"))))))},E=n("pWxA"),h=n("BFfR"),A=n("a5is"),v=n.n(A),b=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={shown:"undefined"!=typeof document&&-1===document.cookie.indexOf("dx-cookie-policy")},n.close=n.close.bind(Object(E.a)(n)),n}Object(h.a)(t,e);var n=t.prototype;return n.close=function(){this.setState({shown:!1}),document.cookie="dx-cookie-policy="+escape(new Date)+";expires="+new Date(2100,0,1).toGMTString()+";path=/"},n.render=function(){return this.state.shown?r.createElement("footer",{className:v.a.cookie},r.createElement("div",{className:"container"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-8"},r.createElement("div",{className:v.a.title},"Why We Use Cookies"),"This site uses cookies to make your browsing experience more convenient and personal."," ","Cookies store useful information on your computer to help"," ","us improve the efficiency and relevance of our site for you."," ","In some cases, they are essential to making the site work properly."," ","By accessing this site, you consent to the use of cookies."," ","For more information, refer to DevExpress’"," ",r.createElement("a",{href:"https://www.devexpress.com/AboutUs/privacy-policy.xml",target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",r.createElement("a",{href:"https://www.devexpress.com/AboutUs/cookie-policy.xml",target:"_blank",rel:"noopener noreferrer"},"cookie policy"),"."),r.createElement("div",{className:"col-md-4 align-self-center d-flex justify-content-center"},r.createElement("button",{type:"button",className:v.a.button,onClick:this.close},"I Understand"))))):null},t}(r.PureComponent),y=n("Q/qq"),S=[{rel:"icon",type:"image/png",href:""+n.n(y).a,sizes:"16x16"}],g=function(e){var t=e.children;return r.createElement(i.StaticQuery,{query:"3159585216",render:function(e){return r.createElement("div",{style:{overflow:"hidden"}},r.createElement(a.a,{titleTemplate:"%s | "+e.site.siteMetadata.title,defaultTitle:e.site.siteMetadata.title,link:S},r.createElement("script",null,"\n              var _mtm = window._mtm = window._mtm || [];\n              _mtm.push({ 'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start' });\n              var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];\n              g.async = true; g.src = 'https://matomo.devexpress.com/js/container_foTT0fJ8.js'; g.setAttributeNode(d.createAttribute('data-ot-ignore')); s.parentNode.insertBefore(g, s);\n            ")),r.createElement(f,null),t,r.createElement(T,null),r.createElement(b,null))}})};g.defaultProps={children:void 0};t.a=g},IS0O:function(e,t,n){e.exports={main:"product-module--main--2zt0T",prefix:"product-module--prefix--3yerB",title:"product-module--title--LLANS",name:"product-module--name--2Td-u",product:"product-module--product--1_gvz"}},NvPw:function(e,t,n){"use strict";var r=Array.isArray,o=Object.keys,a=Object.prototype.hasOwnProperty,i="undefined"!=typeof Element;e.exports=function(e,t){try{return function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){var c,l,s,u=r(t),d=r(n);if(u&&d){if((l=t.length)!=n.length)return!1;for(c=l;0!=c--;)if(!e(t[c],n[c]))return!1;return!0}if(u!=d)return!1;var f=t instanceof Date,p=n instanceof Date;if(f!=p)return!1;if(f&&p)return t.getTime()==n.getTime();var m=t instanceof RegExp,T=n instanceof RegExp;if(m!=T)return!1;if(m&&T)return t.toString()==n.toString();var E=o(t);if((l=E.length)!==o(n).length)return!1;for(c=l;0!=c--;)if(!a.call(n,E[c]))return!1;if(i&&t instanceof Element&&n instanceof Element)return t===n;for(c=l;0!=c--;)if(!("_owner"===(s=E[c])&&t.$$typeof||e(t[s],n[s])))return!1;return!0}return t!=t&&n!=n}(e,t)}catch(n){if(n.message&&n.message.match(/stack|recursion/i)||-2146828260===n.number)return console.warn("Warning: react-fast-compare does not handle circular references.",n.name,n.message),!1;throw n}}},Pu0A:function(e,t){e.exports=function(e,t,n,r){var o=n?n.call(r,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var a=Object.keys(e),i=Object.keys(t);if(a.length!==i.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(t),l=0;l<a.length;l++){var s=a[l];if(!c(s))return!1;var u=e[s],d=t[s];if(!1===(o=n?n.call(r,u,d,s):void 0)||void 0===o&&u!==d)return!1}return!0}},"Q/qq":function(e,t,n){e.exports=n.p+"static/favicon-8848fb9e18e01a1143d094d69bea69cd.ico"},Q0CA:function(e,t,n){"use strict";var r=n("ERkP"),o=n("aWzz"),a=n.n(o),i=n("O+tk"),c=n.n(i),l=n("YF/v"),s=n.n(l),u=function(e){return e.productInfo.map((function(e){var t=e.title,n=e.location;return r.createElement(c.a,{key:t,partiallyActive:!0,activeClassName:s.a.active,to:n},t)}))};u.propsTypes={productInfo:a.a.object},u.defaultProps={productInfo:[{title:"Demos",location:"/demos/"},{title:"Docs",location:"/docs/"}]},t.a=u},Rb52:function(e,t,n){"use strict";var r=n("pWxA"),o=n("BFfR"),a=n("ERkP"),i=n("O+tk"),c=n.n(i),l=n("IS0O"),s=n.n(l),u=function(){return a.createElement(c.a,{to:"/",className:s.a.product},a.createElement("span",{className:s.a.title},"DevExtreme"),a.createElement("span",{className:s.a.name},"Reactive"))},d=n("aOmW"),f=n.n(d),p=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={menuVisibility:!1},n.toggleMenuVisibility=n.toggleMenuVisibility.bind(Object(r.a)(n)),n.handleOutsideClick=n.handleOutsideClick.bind(Object(r.a)(n)),n.menuRef=a.createRef(),n}Object(o.a)(t,e);var n=t.prototype;return n.handleOutsideClick=function(e){this.menuRef.current.contains(e.target)||this.toggleMenuVisibility()},n.toggleMenuVisibility=function(e){e.stopPropagation();var t=this.state.menuVisibility;t?document.removeEventListener("click",this.handleOutsideClick,!1):document.addEventListener("click",this.handleOutsideClick,!1),this.setState({menuVisibility:!t})},n.render=function(){var e=this.props,t=e.links,n=e.addon,r=e.page,o=this.state.menuVisibility;return a.createElement("header",{className:f.a.header+" "+(r?f.a[r]:"")+" "},a.createElement("div",{className:"container "+f.a.headerContainer},a.createElement("div",{className:"row align-items-center"},a.createElement("div",{className:"col-auto mr-auto"},a.createElement(u,null)),a.createElement("div",{className:"col-auto"},a.createElement("button",{className:f.a.menuSandwich+" "+(o?f.a.clicked:""),type:"button",onClick:this.toggleMenuVisibility}),a.createElement("div",{className:f.a.links+" "+(o?f.a.opened:""),ref:this.menuRef},t,a.createElement("a",{href:"https://community.devexpress.com/tags/DevExtreme+Reactive/default.aspx",target:"_blank",rel:"noopener noreferrer"},"Blog"),a.createElement("a",{href:"https://github.com/DevExpress/devextreme-reactive",target:"_blank",rel:"noopener noreferrer"},"GitHub"),a.createElement("a",{href:"https://js.devexpress.com/Buy/",target:"_blank",rel:"noopener noreferrer"},"Buy"))))),n)},t}(a.Component);p.defaultProps={page:void 0,links:void 0,addon:void 0};t.a=p},SxA4:function(e,t,n){e.exports={footer:"footer-module--footer--cvZzG",copyright:"footer-module--copyright--6g7tT",links:"footer-module--links--3OGPd"}},TmcG:function(e,t,n){e.exports=n.p+"static/banner-react-c78988f906ea703cf88123233d022ef1.svg"},VF98:function(e,t,n){t.__esModule=!0,t.Helmet=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=d(n("ERkP")),i=d(n("aWzz")),c=d(n("rqe8")),l=d(n("NvPw")),s=n("2vRJ"),u=n("kqzl");function d(e){return e&&e.__esModule?e:{default:e}}function f(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var T,E,h,A=(0,c.default)(s.reducePropsToState,s.handleClientStateChange,s.mapStateOnServer)((function(){return null})),v=(T=A,h=E=function(e){function t(){return p(this,t),m(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!(0,l.default)(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case u.TAG_NAMES.SCRIPT:case u.TAG_NAMES.NOSCRIPT:return{innerHTML:t};case u.TAG_NAMES.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,o=e.arrayTypeChildren,a=e.newChildProps,i=e.nestedChildren;return r({},o,((t={})[n.type]=[].concat(o[n.type]||[],[r({},a,this.mapNestedChildrenToProps(n,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,o=e.child,a=e.newProps,i=e.newChildProps,c=e.nestedChildren;switch(o.type){case u.TAG_NAMES.TITLE:return r({},a,((t={})[o.type]=c,t.titleAttributes=r({},i),t));case u.TAG_NAMES.BODY:return r({},a,{bodyAttributes:r({},i)});case u.TAG_NAMES.HTML:return r({},a,{htmlAttributes:r({},i)})}return r({},a,((n={})[o.type]=r({},i),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=r({},t);return Object.keys(e).forEach((function(t){var o;n=r({},n,((o={})[t]=e[t],o))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return a.default.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,a=o.children,i=f(o,["children"]),c=(0,s.convertReactPropstoHtmlAttributes)(i);switch(n.warnOnInvalidChildren(e,a),e.type){case u.TAG_NAMES.LINK:case u.TAG_NAMES.META:case u.TAG_NAMES.NOSCRIPT:case u.TAG_NAMES.SCRIPT:case u.TAG_NAMES.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:c,nestedChildren:a});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:c,nestedChildren:a})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=f(e,["children"]),o=r({},n);return t&&(o=this.mapChildrenToProps(t,o)),a.default.createElement(T,o)},o(t,null,[{key:"canUseDOM",set:function(e){T.canUseDOM=e}}]),t}(a.default.Component),E.propTypes={base:i.default.object,bodyAttributes:i.default.object,children:i.default.oneOfType([i.default.arrayOf(i.default.node),i.default.node]),defaultTitle:i.default.string,defer:i.default.bool,encodeSpecialCharacters:i.default.bool,htmlAttributes:i.default.object,link:i.default.arrayOf(i.default.object),meta:i.default.arrayOf(i.default.object),noscript:i.default.arrayOf(i.default.object),onChangeClientState:i.default.func,script:i.default.arrayOf(i.default.object),style:i.default.arrayOf(i.default.object),title:i.default.string,titleAttributes:i.default.object,titleTemplate:i.default.string},E.defaultProps={defer:!0,encodeSpecialCharacters:!0},E.peek=T.peek,E.rewind=function(){var e=T.rewind();return e||(e=(0,s.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},h);v.renderStatic=v.rewind,t.Helmet=v,t.default=v},"YF/v":function(e,t,n){e.exports={active:"product-links-module--active--cdKup"}},a5is:function(e,t,n){e.exports={cookie:"cookie-module--cookie--pJvQ8",title:"cookie-module--title--2DaMe",button:"cookie-module--button--3dBOi"}},aOmW:function(e,t,n){e.exports={header:"header-module--header--2NYIJ",headerContainer:"header-module--header-container--1srBs",opened:"header-module--opened--bL4tO",links:"header-module--links--Qq43N",menuSandwich:"header-module--menu-sandwich--1lul-",clicked:"header-module--clicked--3zmFz",productPage:"header-module--productPage--2sJSQ"}},fox7:function(e,t,n){e.exports={banner:"banner-module--banner--15fgk",button:"banner-module--button--GRDj9",buttonIcon:"banner-module--button-icon--3giNl"}},kqzl:function(e,t,n){n("KOtZ"),t.__esModule=!0;t.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"};var r=t.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},o=(t.VALID_TAG_NAMES=Object.keys(r).map((function(e){return r[e]})),t.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},t.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});t.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},t.HTML_TAG_MAP=Object.keys(o).reduce((function(e,t){return e[o[t]]=t,e}),{}),t.SELF_CLOSING_TAGS=[r.NOSCRIPT,r.SCRIPT,r.STYLE],t.HELMET_ATTRIBUTE="data-react-helmet"},pWxA:function(e,t,n){"use strict";function r(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n.d(t,"a",(function(){return r}))},rqe8:function(e,t,n){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var o=n("ERkP"),a=r(o),i=r(n("Pu0A"));function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var s,u=[];function d(){s=e(u.map((function(e){return e.props}))),f.canUseDOM?t(s):n&&(s=n(s))}var f=function(e){var t,n;function o(){return e.apply(this,arguments)||this}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,o.peek=function(){return s},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=s;return s=void 0,u=[],e};var c=o.prototype;return c.shouldComponentUpdate=function(e){return!i(e,this.props)},c.componentWillMount=function(){u.push(this),d()},c.componentDidUpdate=function(){d()},c.componentWillUnmount=function(){var e=u.indexOf(this);u.splice(e,1),d()},c.render=function(){return a.createElement(r,this.props)},o}(o.Component);return c(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),c(f,"canUseDOM",l),f}}}}]);
//# sourceMappingURL=dd39707202a5dcfe170dd3f5b4baf201daf58c28-f74af1a076960ae2daaa.js.map