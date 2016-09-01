define(["dom","scroller","browser","registerElement","css!./emby-tabs","scrollStyles"],function(e,t,a){function n(e){return e.getBoundingClientRect?e.getBoundingClientRect():{top:0,left:0}}function s(e,t,a,n,s){var r=a?"translateX("+Math.round(a)+"px)":"none",i=t?"translateX("+Math.round(t)+"px)":"none";if(!n||!e.animate)return e.style.transform=r,void(s&&s());e.style.transform=i;var l=[{transform:"translateX("+t+"px)",offset:0},{transform:r,offset:1}];e.animate(l,{duration:n,iterations:1,easing:"linear",fill:"forwards"}),setTimeout(s,n)}function r(e,t,a,r){var i=e.selectionBar;i&&(i.style.width=t.offsetWidth+"px",i.classList.remove("hide"));var l=n(e),c=e.currentOffset||0;a&&(c=e.scroller?e.scroller.getCenterPosition(a):n(a).left-l.left);var o;if(e.scroller)o=e.scroller.getCenterPosition(t);else{var d=n(t);o=d.left-l.left}var f=r?100:0;e.currentOffset=o;var v=function(){t.classList.add(u),i&&i.classList.add("hide")};i?s(i,c,o,f,v):v()}function i(t){var a=this,n=a.querySelector("."+u),s=e.parentWithClass(t.target,d);if(s&&s!=n){n&&n.classList.remove(u);var i=n?parseInt(n.getAttribute("data-index")):null;r(a,s,n,!0);var l=parseInt(s.getAttribute("data-index"));a.dispatchEvent(new CustomEvent("beforetabchange",{detail:{selectedTabIndex:l,previousIndex:i}})),setTimeout(function(){a.selectedTabIndex=l,a.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:l,previousIndex:i}}))},120),a.scroller&&a.scroller.toCenter(s,!1)}}function l(e){if(!e.scroller){var n=e.querySelector(".emby-tabs-slider");n?(e.scroller=new t(e,{horizontal:1,itemNav:0,mouseDragging:1,touchDragging:1,slidee:n,smart:!0,releaseSwing:!0,scrollBy:200,speed:120,elasticBounds:1,dragHandle:1,dynamicHandle:1,clickBar:1,hiddenScroll:!0,requireAnimation:!a.safari}),e.scroller.init()):e.classList.add("hiddenScrollX")}}function c(e){if(a.animate){var t=e.querySelector(".emby-tabs-slider");if(t&&"false"!=e.getAttribute("data-selectionbar")){var n=document.createElement("div");n.classList.add("emby-tabs-selection-bar"),t.appendChild(n),e.selectionBar=n}}}var o=Object.create(HTMLDivElement.prototype),d="emby-tab-button",u=d+"-active";o.createdCallback=function(){this.classList.contains("emby-tabs")||(this.classList.add("emby-tabs"),e.addEventListener(this,"click",i,{passive:!0}),c(this))},o.attachedCallback=function(){l(this);var e=this.querySelector("."+u),t=e?parseInt(e.getAttribute("data-index")):0,a=this.querySelectorAll("."+d)[t];a&&r(this,a,e,!1)},o.detachedCallback=function(){this.scroller&&(this.scroller.destroy(),this.scroller=null),e.removeEventListener(this,"click",i,{passive:!0}),this.selectionBar=null},o.selectedIndex=function(e,t){var a=this;if(null==e)return a.selectedTabIndex||0;var n=a.selectedIndex();a.selectedTabIndex=e;var s=a.querySelectorAll("."+d);if(n==e||t===!1){a.dispatchEvent(new CustomEvent("beforetabchange",{detail:{selectedTabIndex:e}})),a.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:e}}));var i=s[n];r(a,s[e],i,!1),n!=e&&i&&i.classList.remove(u)}else s[e].click()},o.triggerBeforeTabChange=function(){var e=this;e.dispatchEvent(new CustomEvent("beforetabchange",{detail:{selectedTabIndex:e.selectedIndex()}}))},o.triggerTabChange=function(){var e=this;e.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:e.selectedIndex()}}))},document.registerElement("emby-tabs",{prototype:o,"extends":"div"})});