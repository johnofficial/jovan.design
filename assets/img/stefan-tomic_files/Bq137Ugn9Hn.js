if (self.CavalryLogger) { CavalryLogger.start_js(["q2Goa"]); }

__d("ResetScrollOnUnload",["Run"],(function(a,b,c,d,e,f){a={disableScrollRestoration:function(){b("Run").onUnload(function(){window.history.scrollRestoration="manual"})},init:function(a){b("Run").onUnload(function(){window.history.scrollRestoration="manual",a.style.opacity="0",window.scrollTo(0,0)})}};e.exports=a}),null);
__d("NavigationMenubarInteractionsTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(){this.clear()}a.prototype.log=function(){b("GeneratedLoggerUtils").log("logger:NavigationMenubarInteractionsLoggerConfig",this.$1,b("Banzai").BASIC)};a.prototype.logVital=function(){b("GeneratedLoggerUtils").log("logger:NavigationMenubarInteractionsLoggerConfig",this.$1,b("Banzai").VITAL)};a.prototype.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:NavigationMenubarInteractionsLoggerConfig",this.$1,{signal:!0})};a.prototype.clear=function(){this.$1={};return this};a.prototype.getData=function(){return babelHelpers["extends"]({},this.$1)};a.prototype.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.setAction=function(a){this.$1.action=a;return this};a.prototype.setTargetItem=function(a){this.$1.target_item=a;return this};a.prototype.updateExtraData=function(a){a=b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));b("GeneratedLoggerUtils").checkExtraDataFieldNames(a,g);this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.addToExtraData=function(a,b){var c={};c[a]=b;return this.updateExtraData(c)};var g={action:!0,target_item:!0};e.exports=a}),null);
__d("NavigationAssistantController",["csx","cx","fbt","Arbiter","AsyncRequest","CSS","DOM","DOMEventListener","DOMQuery","DOMTraverser","Event","Focus","KeyboardShortcuts","KeyEventController","Menu","MenuItem","NavigationMenubarInteractionsTypedLogger","PageTransitions","PopoverMenu","RTLKeys","TabbableElements","debounce","ge","getActiveElement","getOrCreateDOMID","gkx","setImmediate"],(function(a,b,c,d,e,f,g,h,i){"use strict";__p&&__p();var j=["main","banner","search","navigation","region","complementary","form","contentinfo"],k={main:function(a){return a?i._("Main: {section name}",[i._param("section name",a)]):i._("Main section")},banner:function(a){return i._("{section name} banner",[i._param("section name",a)])},search:function(a){return i._("Search {section name}",[i._param("section name",a)])},navigation:function(a){return a?i._("Navigate {section name}",[i._param("section name",a)]):i._("Navigation")},region:function(a){return a},complementary:function(a){return a?a:i._("Complementary information")},form:function(a){return i._("{section name} form",[i._param("section name",a)])},contentinfo:function(a){return i._("{section name} footer",[i._param("section name",a)])}},l=500;a={init:function(a,c,d,e,f,g){__p&&__p();this._banner=a;this._menubar=c;this._sectionsMenu=d;this._accessibilityMenu=e;this._globalMenu=f;this._shortcutMenuItem=this._accessibilityMenu&&this._accessibilityMenu.getItemAt(0);this._menubarMenus=[{menu:this._sectionsMenu,logName:"page_sections"}];this._accessibilityMenu&&this._menubarMenus.push({menu:this._accessibilityMenu,logName:"accessibility"});this._globalMenu&&this._menubarMenus.push({menu:this._globalMenu,logName:"global"});document.body&&b("CSS").addClass(document.body,"hasAXNavMenubar");this._hasBanner=document.body&&b("CSS").hasClass(document.body,"hasBanner");this._shown=!1;this._items=[];this._hotKeyTrigger=null;this._menubarMenuItems=b("DOMQuery").scry(this._menubar,'[role="button"]');this._menubarMenuItems.forEach(function(a){a.setAttribute("role","menuitem")});this._activeItem=this._menubarMenuItems[0];this._activeItemIndex=0;if(g!=null)for(var h in g)Object.prototype.hasOwnProperty.call(g,h)&&g[h]!=null&&g[h].disableTypeaheadActivation();this._setupEvents();this._keysSoFar="";this._clearKeysSoFarAfterDelay=b("debounce")(function(){this._keysSoFar=""}.bind(this),l);this._handlePageLoad()},_setupEvents:function(){this._menubarMenuItems[0].addEventListener("focus",this._showMenubar.bind(this)),this._menubar.addEventListener("keydown",this._checkHide.bind(this)),this._menubar.addEventListener("keyup",this._checkMenuSwitch.bind(this)),this._menubarMenus.forEach(function(a){a.menu.subscribe("show",this._menuShown.bind(this,a)),a.menu.subscribe("hide",this._menuHidden.bind(this,a)),a.menu.subscribe("done",this._checkBlur.bind(this)),a.menu.getRoot().addEventListener("keyup",this._checkMenuSwitch.bind(this))}.bind(this)),b("DOMEventListener").add(document,"click",this._checkClickBlur.bind(this)),this._sectionsMenu.subscribe("focus",this._highlightFocused.bind(this)),this._sectionsMenu.subscribe("blur",this._unhighlightFocused.bind(this)),this._accessibilityMenu&&this._accessibilityMenu.subscribe("itemclick",this._checkShortcutsShow.bind(this)),this._globalMenu&&this._globalMenu.subscribe("itemclick",this._checkLogEvent.bind(this)),b("gkx")("AT5huHG2ZwhQRG4wsq3SGMN3nvTL0cl6WnMDmJ4szQP1y0o6thXp_6CfXUwNbqgDFgYrK5iR2HDgMq3_mzv-_V8b")&&(b("DOMEventListener").add(document,"keydown",this._checkHotKey.bind(this)),b("DOMEventListener").add(document,"keypress",this._trackHotKeyPress.bind(this)),b("DOMEventListener").add(document,"keyup",this._unsetHotKey.bind(this)))},_checkHide:function(a){a=b("Event").getKeyCode(a);if(a===b("RTLKeys").ESC){this._hideMenubar();this._returnFocus();return}a===b("RTLKeys").TAB&&b("setImmediate")(function(){this._hideMenubar()}.bind(this))},_returnFocus:function(){if(this._hotKeyTrigger)b("Focus").set(this._hotKeyTrigger,!0),this._hotKeyTrigger=null;else{var a=this._banner.nextElementSibling;b("TabbableElements").isTabbable(a)||(a=b("DOMTraverser").nextFilteredNode(document.body,a,b("TabbableElements").isTabbable));b("Focus").set(a)}},_setActiveItem:function(a){if(a<0||a>=this._menubarMenuItems.length)return;this._activeItem.setAttribute("tabindex","-1");this._activeItem=this._menubarMenuItems[a];this._activeItemIndex=a;this._activeItem.setAttribute("tabindex","0")},_checkMenuSwitch:function(event){__p&&__p();var a=b("Event").getKeyCode(event),c=this._menubarMenus.length,d=this._activeItemIndex;switch(a){case b("RTLKeys").getLeft():d=this._activeItemIndex===0?c-1:this._activeItemIndex-1;break;case b("RTLKeys").getRight():d=this._activeItemIndex===c-1?0:this._activeItemIndex+1;break;default:d=this._findItemToFocus(a);if(d<0)return!1}this._isShowingMenu&&this._isShowingMenu.done();this._setActiveItem(d);setTimeout(function(){b("Focus").set(this._activeItem,!0)}.bind(this),0);return!0},_findItemToFocus:function(a){if(this._isShowingMenu)return-1;a=String.fromCharCode(a).toLowerCase();this._keysSoFar||(this._searchIndex=this._activeItemIndex);this._keysSoFar+=a;this._clearKeysSoFarAfterDelay();a=this._findMatchInRange(this._searchIndex+1,this._menubarMenuItems.length);a<0&&(a=this._findMatchInRange(0,this._searchIndex));return a<0?this._searchIndex:a},_findMatchInRange:function(a,b){for(var a=a;a<b;a++){var c=this._menubarMenuItems[a].innerText;if(c.toLowerCase().indexOf(this._keysSoFar)===0)return a}return-1},_menuShown:function(a){this._ignoreBlur=!0,this._isShowingMenu=a.menu,this._logEvent("menu_shown",a.logName)},_menuHidden:function(a){this._ignoreBlur=!1,this._isShowingMenu===a.menu&&(this._isShowingMenu=null)},_checkClickBlur:function(){this._ignoreBlur||this._checkBlur()},_checkBlur:function(){var a=b("getActiveElement")();this._shown&&a&&!b("DOM").contains(this._menubar,a)&&!this._ignoreBlur&&this._hideMenubar();this._highlighted&&(b("CSS").removeClass(this._highlighted,"_1toc"),this._highlighted=null)},_highlightFocused:function(a,c){this._highlighted&&b("CSS").removeClass(this._highlighted,"_1toc"),this._highlighted=b("ge")(c.item.getValue()),this._highlighted&&b("CSS").addClass(this._highlighted,"_1toc")},_unhighlightFocused:function(a,c){this._highlighted&&b("CSS").removeClass(this._highlighted,"_1toc")},_checkHotKey:function(a){__p&&__p();var c=b("Event").getKeyCode(a),d=a.altKey;if(!b("gkx")("AT6Q2x7gNg7Gis3g_Acxq5QKW2uVkTcYAELBQCGsE3TGJOtPLz-mx51ETR-YD6ugDTtNRWwZZrCB6V07w1aU__FR")&&!b("KeyEventController").filterEventTargets(a,"keydown"))return;if(c===b("RTLKeys").FORWARD_SLASH&&d){c=b("getActiveElement")();this._listenHotKeyPress=!0;if(this._shown){this._menubarMenus.forEach(function(a){a.menu.done()});setTimeout(function(){this._returnFocus(),this._hideMenubar()}.bind(this),0);return}if(c&&this._isInDialog(c))return;this._hotKeyTrigger=c;this._showMenubar();b("Focus").set(this._activeItem,!0);this._logEvent("hotkey_triggered","menubar");return}this._listenHotKeyPress=!1;this._shown&&this._checkHide(a)},_unsetHotKey:function(a){this._listenHotKeyPress=!1},_trackHotKeyPress:function(a){if(this._listenHotKeyPress){a=b("Event").getKeyCode(a);this._logEvent("hotkey_char",""+a)}},_handlePageLoad:function(){this._validateMainSection(),this._setupSectionsMenu(),this._setupAccessibilityMenu(),b("PageTransitions").registerCompletionCallback(function(){this._handlePageLoad()}.bind(this))},_validateMainSection:function(){var a=document.getElementById("content");if(!a)return;var c=b("DOMQuery").scry(a,'[role="main"]'),d=a.getAttribute("role")==="main";c.length&&d?a.setAttribute("role",""):!c.length&&!d&&a.setAttribute("role","main")},_isInDialog:function(a){a=a;while(a&&a!==document&&a.getAttribute("role")!=="dialog")a=a.parentNode;return a!==document},_hideMenubar:function(){if(!this._shown)return;this._shown=!1;b("KeyboardShortcuts").popLayer();b("CSS").addClass(this._banner,"_1toe");this._setActiveItem(0);!this._hasBanner&&document.body&&b("CSS").removeClass(document.body,"hasBanner");setTimeout(function(){b("Event").fire(window,"scroll")},350)},_showMenubar:function(){__p&&__p();if(this._shown)return;this._shown=!0;this._ignoreBlur=!1;this._validateMainSection();this._setupSectionsMenu();this._setupAccessibilityMenu();b("KeyboardShortcuts").pushLayer();b("CSS").matchesSelector(this._banner.nextElementSibling,"._3d9x")?b("CSS").addClass(this._banner,"_1tof"):b("CSS").removeClass(this._banner,"_1tof");b("CSS").removeClass(this._banner,"_1toe");!this._hasBanner&&document.body&&b("CSS").addClass(document.body,"hasBanner");setTimeout(function(){b("Event").fire(window,"scroll"),b("Arbiter").inform("banner/shown",null,"state")},50);this._logEvent("shown","menubar")},_addMenuItem:function(a,c,d){c=b("Menu").buildItemFromData({ctor:b("MenuItem"),label:a,selected:!1,value:c,onclick:function(c){setTimeout(function(){b("Focus").set(b("ge")(d),!0),this._hideMenubar()}.bind(this),0),this._logEvent("selected_item",a),this._ignoreBlur=!1}.bind(this)});this._sectionsMenu.addItem(c);this._items.push(c)},_getLandmarkSections:function(a){var b=[],c=[];a.forEach(function(a){var d=a.getAttribute("role");d==="main"?b.push(a):j.indexOf(d)>-1&&c.push(a)});return b.concat(c)},_computeElementLabel:function(a,b,c){__p&&__p();var d=a.getAttribute("id");c=c||[];var e=c.includes(d);!e&&d&&c.push(d);d=a.getAttribute("aria-labelledby");if(!e&&d){e=d.split(" ");var f="";e.forEach(function(a){a=document.getElementById(a);if(!a)return;f+=this._computeElementLabel(a,!1,c)}.bind(this));return f}d=a.getAttribute("aria-label");if(d)return d;return b?"":a.innerText?a.innerText.substring(0,100):""},_addSectionItems:function(a){__p&&__p();a.forEach(function(a){__p&&__p();if(!b("TabbableElements").isVisible(a)||!a.offsetHeight||!a.offsetWidth)return;var c=a.getAttribute("role");if(!c||!Object.prototype.hasOwnProperty.call(k,c))return;var d=k[c](this._computeElementLabel(a,!0)),e=a;if(c==="search"||c==="region"||c==="form"){c=b("DOMQuery").scry(a,".navigationFocus");c.length&&(e=c[0],!b("TabbableElements").isTabbable(e)&&b("TabbableElements").find(e).length&&(e=b("TabbableElements").find(e)[0]))}d&&this._addMenuItem(d,b("getOrCreateDOMID")(a),b("getOrCreateDOMID")(e))}.bind(this))},_setupSectionsMenu:function(){var a=b("DOMQuery").scry(document.body,"[role]");a=this._getLandmarkSections(a);this._cleanupSectionsMenu();this._addSectionItems(a)},_cleanupSectionsMenu:function(){while(this._items.length)this._sectionsMenu.removeItem(this._items.pop())},_setupAccessibilityMenu:function(){if(!this._accessibilityMenu)return;if(b("KeyboardShortcuts").hasFlyoutToShow()){var a=this._accessibilityMenu.getItemAt(0);a!==this._shortcutMenuItem&&this._accessibilityMenu.addItemBefore(this._shortcutMenuItem,a)}else this._accessibilityMenu.removeItem(this._shortcutMenuItem)},_logEvent:function(a,c){new(b("NavigationMenubarInteractionsTypedLogger"))().setAction(a).setTargetItem(c).log()},_checkShortcutsShow:function(a,c){c.item.getValue()==="key_shortcuts"&&(this._ignoreBlur=!1,this._hideMenubar(),setTimeout(function(){b("KeyboardShortcuts").showShortcutFlyout()},0)),this._logEvent("selected_item_ax",c.item.getValue())},_checkLogEvent:function(a,b){a=b.item.getValue();this._logEvent("selected_item_global",a);this._ignoreBlur=!1},_getHelpDialogRequest:function(){if(!this._dialogRequest)this._dialogRequest=new(b("AsyncRequest"))("/ajax/keyboard_shortcuts"),this._dialogRequest.setReadOnly(!0);else if(this._dialogRequest.transport)return null;return this._dialogRequest}};e.exports=a}),null);
__d("getTime",[],(function(a,b,c,d,e,f){"use strict";function a(){return Date.now()}e.exports=a}),null);
__d("XIntegrityMouseMovementLoggingAsyncController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/ajax/imm/",{})}),null);
__d("IntegrityMouseMovementLogger",["AsyncRequest","BotDetectionMouseMovementSitevarConfig","PageTransitions","URI","XIntegrityMouseMovementLoggingAsyncController","getTime","guid","setIntervalAcrossTransitions"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("BotDetectionMouseMovementSitevarConfig").run_time_ms,h=b("BotDetectionMouseMovementSitevarConfig").interval_time_ms,i=!1,j,k,l,m,n,o,p,q=!1;function r(){__p&&__p();var a=b("getTime")(),c=-1,d=-1,e=-1,f=-1,i=!1;window.document.onmousemove=function(a){c=a.pageX,d=a.pageY,e=a.clientX,f=a.clientY};window.document.onclick=function(a){i=!0};j=b("guid")();var p=b("setIntervalAcrossTransitions")(r,h);function r(){__p&&__p();if(q){clearInterval(p);return}if(b("getTime")()-a>g){s.logData();clearInterval(p);return}k.push([c,d]);l.push([e,f]);i?(m.push([c,d]),n.push([e,f]),i=!1):(m.push([-1,-1]),n.push([-1,-1]))}b("PageTransitions").registerHandler(t);function t(a){if(q)return;s.logData();s.clearData();o=a.getPath()}}var s={schedule:function(a){__p&&__p();if(i)return;i=!0;k=[];l=[];m=[];n=[];o=b("URI").getRequestURI().getPath();p=a;r()},logData:function(){var a=b("XIntegrityMouseMovementLoggingAsyncController").getURIBuilder().getURI(),c=JSON.stringify(k),d=JSON.stringify(l),e=JSON.stringify(m),f=JSON.stringify(n);q=!0;new(b("AsyncRequest"))(a).setData({coords_string:c,coords_no_scroll_string:d,wsid:j,page_uri:o,script_path:p,click_coords_string:e,click_coords_no_scroll_string:f}).setOption("suppressEvaluation",!0).send()},clearData:function(){k=[],l=[]}};e.exports=s}),null);
__d("AccessibilityWebAssistiveTechTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(){this.clear()}a.prototype.log=function(){b("GeneratedLoggerUtils").log("logger:AccessibilityWebAssistiveTechLoggerConfig",this.$1,b("Banzai").BASIC)};a.prototype.logVital=function(){b("GeneratedLoggerUtils").log("logger:AccessibilityWebAssistiveTechLoggerConfig",this.$1,b("Banzai").VITAL)};a.prototype.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:AccessibilityWebAssistiveTechLoggerConfig",this.$1,{signal:!0})};a.prototype.clear=function(){this.$1={};return this};a.prototype.getData=function(){return babelHelpers["extends"]({},this.$1)};a.prototype.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.setIndicatedBrowsers=function(a){this.$1.indicated_browsers=b("GeneratedLoggerUtils").serializeVector(a);return this};a.prototype.setIsVirtualCursorAction=function(a){this.$1.is_virtual_cursor_action=a;return this};a.prototype.setVC=function(a){this.$1.vc=a;return this};a.prototype.updateExtraData=function(a){a=b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));b("GeneratedLoggerUtils").checkExtraDataFieldNames(a,g);this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.addToExtraData=function(a,b){var c={};c[a]=b;return this.updateExtraData(c)};var g={indicated_browsers:!0,is_virtual_cursor_action:!0,vc:!0};e.exports=a}),null);
__d("KeyboardActivityTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(){this.clear()}a.prototype.log=function(){b("GeneratedLoggerUtils").log("logger:KeyboardActivityLoggerConfig",this.$1,b("Banzai").BASIC)};a.prototype.logVital=function(){b("GeneratedLoggerUtils").log("logger:KeyboardActivityLoggerConfig",this.$1,b("Banzai").VITAL)};a.prototype.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:KeyboardActivityLoggerConfig",this.$1,{signal:!0})};a.prototype.clear=function(){this.$1={};return this};a.prototype.getData=function(){return babelHelpers["extends"]({},this.$1)};a.prototype.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.setDuration=function(a){this.$1.duration=a;return this};a.prototype.setKey=function(a){this.$1.key=a;return this};a.prototype.setVC=function(a){this.$1.vc=a;return this};c={duration:!0,key:!0,vc:!0};e.exports=a}),null);
__d("FocusRing",["cx","CSS","Event","KeyEventController","Keys","VirtualCursorStatus","emptyFunction"],(function(a,b,c,d,e,f,g){__p&&__p();var h=["mousedown","mouseup"];a={KEY_CODES:[b("Keys").UP,b("Keys").RIGHT,b("Keys").DOWN,b("Keys").LEFT,b("Keys").TAB,b("Keys").RETURN,b("Keys").SPACE,b("Keys").ESC],init:function(){if(this._initialized)return;this._userInteractingWithKeyboard=!1;this._attachVirtualCursorListener();this._attachKeyDownListener();document.body&&b("CSS").addClass(document.body,"_19_u");this._initialized=!0},usingKeyboardNavigation:function(){return this._userInteractingWithKeyboard},_attachVirtualCursorListener:function(){document.documentElement&&(this._onClickListener=b("VirtualCursorStatus").add(document.documentElement,this._onClick.bind(this)))},_attachMouseListeners:function(){this._onMouseListeners=h.map(function(a){return b("Event").listen(document.documentElement,a,this._onMouseEvent.bind(this))}.bind(this))},_attachKeyDownListener:function(){this._onKeyDownListener=b("Event").listen(document.documentElement,"keydown",this._onKeyDown.bind(this))},_initialized:!1,_userInteractingWithKeyboard:!0,_onMouseEvent:function(){this._hideFocusRing()},_onMouseListeners:h.map(function(a){return{remove:b("emptyFunction")}}),_removeMouseListeners:function(){this._onMouseListeners.forEach(function(a){return a.remove()})},_onClick:function(a,b,c){a&&this._showFocusRing()},_onKeyDown:function(event){this.KEY_CODES.indexOf(b("Event").getKeyCode(event))>-1&&b("KeyEventController").filterEventTargets(event,"keydown")&&this._showFocusRing()},_showFocusRing:function(){this._onKeyDownListener.remove(),this._attachMouseListeners(),this._userInteractingWithKeyboard=!0,document.body&&b("CSS").removeClass(document.body,"_19_u")},_hideFocusRing:function(){this._removeMouseListeners(),this._attachKeyDownListener(),this._userInteractingWithKeyboard=!1,document.body&&b("CSS").addClass(document.body,"_19_u")},_onKeyDownListener:{remove:b("emptyFunction")},_onClickListener:{remove:b("emptyFunction")}};e.exports=a}),null);
__d("StringTransformations",[],(function(a,b,c,d,e,f){e.exports={unicodeEscape:function(a){return a.replace(/[^A-Za-z0-9\-\.\:\_\$\/\+\=]/g,function(a){a=a.charCodeAt().toString(16);return"\\u"+("0000"+a.toUpperCase()).slice(-4)})},unicodeUnescape:function(a){return a.replace(/(\\u[0-9A-Fa-f]{4})/g,function(a){return String.fromCharCode(parseInt(a.slice(2),16))})}}}),null);
__d("XHPTemplate",["DataStore","DOM","HTML","XHPTemplateProcessor"],(function(a,b,c,d,e,f){__p&&__p();var g=b("XHPTemplateProcessor").processor;function h(a){"use strict";g instanceof Function&&(a=g(a)),this._model=a}h.prototype.render=function(){"use strict";b("HTML").isHTML(this._model)&&(this._model=b("DOM").setContent(document.createDocumentFragment(),this._model)[0]);return this._model.cloneNode(!0)};h.prototype.build=function(){"use strict";return new i(this.render())};h.getNode=function(a,b){"use strict";return h.getNodes(a)[b]};h.getNodes=function(a){"use strict";__p&&__p();var c=b("DataStore").get(a,"XHPTemplate:nodes");if(!c){c={};var d=b("DOM").scry(a,"[data-jsid]");d.push(a);var e=d.length;while(e--){var f=d[e];c[f.getAttribute("data-jsid")]=f;f.removeAttribute("data-jsid")}b("DataStore").set(a,"XHPTemplate:nodes",c)}return c};function i(a){"use strict";this._root=a,this._populateNodes()}i.prototype._populateNodes=function(){"use strict";this._nodes={};this._leaves={};var a=this._root.getElementsByTagName("*");for(var b=0,c=a.length;b<c;b++){var d=a[b],e=d.getAttribute("data-jsid");e&&(d.removeAttribute("data-jsid"),this._nodes[e]=d,this._leaves[e]=!d.childNodes.length)}};i.prototype.getRoot=function(){"use strict";return this._root};i.prototype.getNode=function(a){"use strict";return this._nodes[a]};i.prototype.setNodeProperty=function(a,b,c){"use strict";this.getNode(a)[b]=c;return this};i.prototype.setNodeContent=function(a,c){"use strict";if(!this._leaves[a])throw new Error("Can't setContent on non-leaf node: "+a);b("DOM").setContent(this.getNode(a),c);return this};e.exports=h}),null);
__d("NotificationJewelFunnelLoggingConstants",[],(function(a,b,c,d,e,f){"use strict";e.exports={FUNNEL_LOGGING_NAME:"WWW_NOTIFICATION_FUNNEL",FUNNEL_LOGGING_EVENT:{FETCH_NOTIFICATIONS:"fetch_notifications",OPEN_JEWEL:"open_jewel",CLOSE_JEWEL:"close_jewel",MOUSE_OVER_ON_JEWEL:"mouse_over_on_jewel",SCROLL_TO_FETCH:"scroll_to_fetch",FETCH_NEXT_SET:"fetch_next_set",CLEAR_BADGE_COUNT:"clear_badge_count"}}}),null);
__d("WebStorageMonster",["AsyncRequest","Event","StringTransformations","UserActivity","WebStorage","WebStorageMonsterLoggingURI","isEmpty","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){__p&&__p();var g=3e5,h=!1;function i(a){var c={};for(var d in a){var e=a.getItem(d),f=b("StringTransformations").unicodeEscape(d);typeof e==="string"&&(c[f]=e.length)}return c}function j(a){var c=b("WebStorage").getLocalStorage();if(!c||!a.keys)return;m._getLocalStorageKeys().forEach(function(b){a.keys.includes(b)&&(c.removeItem(b),!1)})}function k(a){var c=b("WebStorage").getLocalStorage();c&&m._getLocalStorageKeys().forEach(function(b){a.some(function(a){return new RegExp(a).test(b)})||(c.removeItem(b),!1)})}function l(a){a===void 0&&(a=!1),b("UserActivity").isActive(g)?b("setTimeoutAcrossTransitions")(function(){l(a)},g):m.cleanNow(a)}var m={registerLogoutForm:function(a,c){b("Event").listen(a,"submit",function(a){m.cleanOnLogout(c)})},schedule:function(a){a===void 0&&(a=!1);if(h)return;h=!0;l(a)},cleanNow:function(a){__p&&__p();a===void 0&&(a=!1);var c=Date.now(),d={},e=b("WebStorage").getLocalStorage();e&&(d.local_storage=i(e));e=b("WebStorage").getSessionStorage();e&&(d.session_storage=i(e));e=!b("isEmpty")(d);var f=Date.now();d.logtime=f-c;if(e){f=b("WebStorageMonsterLoggingURI").uri;if(f===null)return null;new(b("AsyncRequest"))(f).setData(d).setHandler(function(c){c=c.getPayload();c.keys&&(c.keys=c.keys.map(b("StringTransformations").unicodeUnescape));a||j(c)}).send()}},cleanOnLogout:function(a){a&&k(a);a=b("WebStorage").getSessionStorage();a&&a.clear()},_getLocalStorageKeys:function(){var a=b("WebStorage").getLocalStorage();return a?Object.keys(a):[]}};e.exports=m}),null);
__d("AccessibilityWebVirtualCursorClickLogger",["AccessibilityWebAssistiveTechTypedLogger","VirtualCursorStatus"],(function(a,b,c,d,e,f){a={init:function(a){a.forEach(function(a){b("VirtualCursorStatus").add(a,this._log)}.bind(this),this)},_log:function(a,c,d){d===void 0&&(d=!1),a&&new(b("AccessibilityWebAssistiveTechTypedLogger"))().setIndicatedBrowsers(c).setIsVirtualCursorAction(d).log()}};e.exports=a}),null);
__d("KeyboardActivityLogger",["Event","KeyboardActivityTypedLogger","Keys","isElementInteractive"],(function(a,b,c,d,e,f){__p&&__p();a=["tab","right","left","up","down","enter"];var g=a.reduce(function(a,b){a[b]={count:0,startTS:0};return a},{}),h=20;c={init:function(){document.addEventListener("keydown",this._listenForKey.bind(this))},_listenForKey:function(a){__p&&__p();var c=a.getTarget();if(b("isElementInteractive")(c))return;switch(b("Event").getKeyCode(a)){case b("Keys").TAB:this._checkKeyActivity("tab");break;case b("Keys").RIGHT:this._checkKeyActivity("right");break;case b("Keys").LEFT:this._checkKeyActivity("left");break;case b("Keys").UP:this._checkKeyActivity("up");break;case b("Keys").DOWN:this._checkKeyActivity("down");break;case b("Keys").RETURN:this._checkKeyActivity("enter");break}},_checkKeyActivity:function(a){var b=g[a];b.count++;b.startTS===0&&(b.startTS=Date.now());b.count===h&&(this._log(a),b.count=0,b.startTS=0)},_log:function(a){var c=g[a];c=Date.now()-c.startTS;new(b("KeyboardActivityTypedLogger"))().setKey(a).setDuration(c).log()}};e.exports=c}),null);
__d("QuickLogEvents",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({22347782:{moduleName:"STORIES_ARCHIVE",name:"ARCHIVE_GRID_TTI_WWW",sampleRate:100},27983876:{moduleName:"COMET_VISUAL_COMPLETION",name:"BLUE_SPEED_INDEX_WWW",sampleRate:1},27983875:{moduleName:"COMET_VISUAL_COMPLETION",name:"BLUE_VISUALLY_COMPLETE_WWW",sampleRate:1},23265284:{moduleName:"CHECKOUT_PURCHASE_EXPERIENCES",name:"CHECKOUT_FLOW_WWW",sampleRate:1},23265285:{moduleName:"CHECKOUT_PURCHASE_EXPERIENCES",name:"CHECKOUT_LAUNCH_BY_PRODUCT_WWW",sampleRate:1},23855110:{moduleName:"UNIDASH",name:"CLEAN_LOAD_WWW",sampleRate:1},27983874:{moduleName:"COMET_VISUAL_COMPLETION",name:"COMET_SPEED_INDEX_WWW",sampleRate:1},27983873:{moduleName:"COMET_VISUAL_COMPLETION",name:"COMET_VISUALLY_COMPLETE_WWW",sampleRate:1},655585:{moduleName:"FEED",name:"COMMENT_TTL_WWW",sampleRate:250},25296900:{moduleName:"MESSENGER_WEB",name:"COMPOSER_INTERACTION",sampleRate:null},655575:{moduleName:"FEED",name:"CONSUMPTION_RESTORATION_WWW",sampleRate:1},26869763:{moduleName:"CREATOR_STUDIO",name:"CREATOR_STUDIO_CONTEXT_SWITCH",sampleRate:1},26869762:{moduleName:"CREATOR_STUDIO",name:"CREATOR_STUDIO_FEED_LOAD",sampleRate:1},26869761:{moduleName:"CREATOR_STUDIO",name:"CREATOR_STUDIO_INITIAL_LOAD",sampleRate:1},27459587:{moduleName:"IG_WEB",name:"EMBED_LOAD",sampleRate:1e4},25296897:{moduleName:"MESSENGER_WEB",name:"FIRSTCHATTABOPEN_WWW",sampleRate:1},25296899:{moduleName:"MESSENGER_WEB",name:"GROUP_INPUT_INDIVIDUAL_TAB_OPEN_WWW",sampleRate:null},25296898:{moduleName:"MESSENGER_WEB",name:"GROUP_INPUT_TAB_OPEN_WWW",sampleRate:0},27459585:{moduleName:"IG_WEB",name:"IG_FEED_LOAD",sampleRate:1e4},27459586:{moduleName:"IG_WEB",name:"IG_FEED_LOAD_MORE",sampleRate:1e4},655576:{moduleName:"FEED",name:"IMAGE_LOAD_WWW",sampleRate:5e3},23855105:{moduleName:"UNIDASH",name:"INIT_LOAD_WWW",sampleRate:1},19202060:{moduleName:"PAGES_INSIGHTS",name:"LIKES_TAB_LOAD_WWW",sampleRate:10},19202061:{moduleName:"PAGES_INSIGHTS",name:"LIKES_TAB_UPDATE_WWW",sampleRate:10},655596:{moduleName:"FEED",name:"LOAD_ANY_DESTINATION_FROM_NOTIFICATIONS_WWW",sampleRate:50},655597:{moduleName:"FEED",name:"LOAD_STORY_PERMALINK_FROM_ANYWHERE_WWW",sampleRate:100},655595:{moduleName:"FEED",name:"MAIN_THREAD_PERFORMANCE",sampleRate:1},20578316:{moduleName:"GROUPS_ADMIN",name:"MEMBER_REQUESTS_TTI_WWW",sampleRate:0},7995401:{moduleName:"RELAY",name:"NETWORK_FETCH_QUERY",sampleRate:1},655584:{moduleName:"FEED",name:"NOTIFICATION_INTERACTION_WWW",sampleRate:1},19202053:{moduleName:"PAGES_INSIGHTS",name:"OVERVIEW_CARD_WWW",sampleRate:100},19202055:{moduleName:"PAGES_INSIGHTS",name:"OVERVIEW_TAB_MOST_RECENT_POST_WWW",sampleRate:10},19202054:{moduleName:"PAGES_INSIGHTS",name:"OVERVIEW_TAB_PAGE_SUMMARY_WWW",sampleRate:10},23855108:{moduleName:"UNIDASH",name:"PAGE_LOAD_END_WWW",sampleRate:1},24117250:{moduleName:"SRT",name:"PAGE_NAVIGATION_START_WWW",sampleRate:0},23265286:{moduleName:"CHECKOUT_PURCHASE_EXPERIENCES",name:"PAY_FLOW_WWW",sampleRate:1},19202056:{moduleName:"PAGES_INSIGHTS",name:"POSTS_TAB_ALL_POSTS_PUBLISHED_WWW",sampleRate:10},19202066:{moduleName:"PAGES_INSIGHTS",name:"POSTS_TAB_ALL_POSTS_SEE_MORE_WWW",sampleRate:10},19202058:{moduleName:"PAGES_INSIGHTS",name:"POSTS_TAB_BEST_POSTS_WWW",sampleRate:10},19202057:{moduleName:"PAGES_INSIGHTS",name:"POSTS_TAB_WHEN_FANS_ONLINE_WWW",sampleRate:10},19202059:{moduleName:"PAGES_INSIGHTS",name:"POST_TAB_PAGE_YOU_WATCH_WWW",sampleRate:10},19202062:{moduleName:"PAGES_INSIGHTS",name:"REACH_TAB_LOAD_WWW",sampleRate:10},19202064:{moduleName:"PAGES_INSIGHTS",name:"REACH_TAB_REACTION_LOAD_WWW",sampleRate:10},19202065:{moduleName:"PAGES_INSIGHTS",name:"REACH_TAB_REACTION_UPDATE_WWW",sampleRate:10},19202063:{moduleName:"PAGES_INSIGHTS",name:"REACH_TAB_UPDATE_WWW",sampleRate:10},11075606:{moduleName:"MARKETPLACE",name:"REACT_TTI_WWW",sampleRate:100},7995404:{moduleName:"RELAY",name:"RESPONSE_NORMALIZER_NORMALIZE",sampleRate:100},7995402:{moduleName:"RELAY",name:"RUNTIME_GC",sampleRate:1},7995403:{moduleName:"RELAY",name:"RUNTIME_NOTIFY",sampleRate:100},7995400:{moduleName:"RELAY",name:"RUNTIME_SUBSCRIPTIONS",sampleRate:1},13238314:{moduleName:"STORIES",name:"STORY_VIEWER_LOAD_FIRST_TIME_WWW",sampleRate:100},13238313:{moduleName:"STORIES",name:"STORY_VIEWER_LOAD_TTI_WWW",sampleRate:100},23855109:{moduleName:"UNIDASH",name:"TAB_NAV_START_WWW",sampleRate:1},23855112:{moduleName:"UNIDASH",name:"TAB_NAV_WWW",sampleRate:1},25493506:{moduleName:"TAHOE",name:"TAHOE_DISPLAY_DONE",sampleRate:null},25493505:{moduleName:"TAHOE",name:"TAHOE_MEDIA_DONE",sampleRate:null},26476545:{moduleName:"WWW_PROFILE",name:"TIMELINE_TAIL_LOAD_WWW",sampleRate:1},24117249:{moduleName:"SRT",name:"TIME_TO_FIRST_JOB_WWW",sampleRate:1},24117251:{moduleName:"SRT",name:"TIME_TO_NEXT_JOB_WWW",sampleRate:1},3735603:{moduleName:"UFI",name:"UFI2_COMMENT_REACTION",sampleRate:1},3735606:{moduleName:"UFI",name:"UFI2_COMPOSER_KEYPRESS_LATENCY",sampleRate:1},3735590:{moduleName:"UFI",name:"UFI2_OPTIMISTIC_COMMENT",sampleRate:1},3735593:{moduleName:"UFI",name:"UFI2_OPTIMISTIC_COMMENT_EDIT",sampleRate:1},3735592:{moduleName:"UFI",name:"UFI2_PERSISTED_COMMENT",sampleRate:1},3735594:{moduleName:"UFI",name:"UFI2_PERSISTED_COMMENT_EDIT",sampleRate:1},3735597:{moduleName:"UFI",name:"UFI2_REPLY_COMMENTS_PAGINATION",sampleRate:1},3735599:{moduleName:"UFI",name:"UFI2_SHARE_DIALOG_OPENS",sampleRate:1},3735602:{moduleName:"UFI",name:"UFI2_STORY_REACTION",sampleRate:1},3735596:{moduleName:"UFI",name:"UFI2_TOP_LEVEL_COMMENTS_PAGINATION",sampleRate:1},3735604:{moduleName:"UFI",name:"UFI_COMMENT_REACTION",sampleRate:100},3735600:{moduleName:"UFI",name:"UFI_COMPOSER_INPUT_FOCUS",sampleRate:100},3735605:{moduleName:"UFI",name:"UFI_COMPOSER_KEYPRESS_LATENCY",sampleRate:100},3735589:{moduleName:"UFI",name:"UFI_OPTIMISTIC_COMMENT",sampleRate:100},3735591:{moduleName:"UFI",name:"UFI_PERSISTED_COMMENT",sampleRate:100},3735598:{moduleName:"UFI",name:"UFI_SHARE_DIALOG_OPENS",sampleRate:100},3735601:{moduleName:"UFI",name:"UFI_STORY_REACTION",sampleRate:100},3735595:{moduleName:"UFI",name:"UFI_TOP_LEVEL_COMMENTS_PAGINATION",sampleRate:100},7995399:{moduleName:"RELAY",name:"UNSAFE_ASYNC_TEST",sampleRate:100},7995396:{moduleName:"RELAY",name:"UNSAFE_SUBSCRIPTIONS_TEST",sampleRate:100},7995398:{moduleName:"RELAY",name:"UNSAFE_SYNC_TEST",sampleRate:100},14549005:{moduleName:"LIVE",name:"VIDEO_COMPONENT_TTL",sampleRate:null},23855107:{moduleName:"UNIDASH",name:"WIDGET_LOAD_END_WWW",sampleRate:1},23855106:{moduleName:"UNIDASH",name:"WIDGET_LOAD_START_WWW",sampleRate:1},23855111:{moduleName:"UNIDASH",name:"WIDGET_LOAD_WWW",sampleRate:1},12517384:{moduleName:"ABOUTPAGE",name:"Z_AMPERANDY_TEST_WWW",sampleRate:0}})}),null);
__d("ServiceWorkerLoginAndLogout",["ClientServiceWorkerMessage"],(function(a,b,c,d,e,f){function g(a){new(b("ClientServiceWorkerMessage"))(a,null).sendViaController()}a={login:function(){g("login")},logout:function(){g("logout")}};e.exports=a}),null);