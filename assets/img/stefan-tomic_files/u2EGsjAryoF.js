if (self.CavalryLogger) { CavalryLogger.start_js(["l\/\/Sq"]); }

__d("ChannelConnectionEvents",[],(function(a,b,c,d,e,f){e.exports={CONNECTED:"chat-connection/connected",RECONNECTING:"chat-connection/reconnecting",SHUTDOWN:"chat-connection/shutdown",MUTE_WARNING:"chat-connection/mute",UNMUTE_WARNING:"chat-connection/unmute"}}),null);
__d("ChannelConnection",["Arbiter","ArbiterMixin","ChannelConnectionEvents","ChannelConstants","ChannelManager","JSLogger","Run","SystemEvents","Visibility","clearTimeout","mixin","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){__p&&__p();var g,h=b("JSLogger").create("channel_connection"),i=null,j=null,k=null,l=null,m=0;b("ChannelManager").startChannelManager();c=babelHelpers.inherits(a,b("mixin")(b("ArbiterMixin")));g=c&&c.prototype;function a(){var a,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return c=(a=g.constructor).call.apply(a,[this].concat(e)),this.CONNECTED=b("ChannelConnectionEvents").CONNECTED,this.RECONNECTING=b("ChannelConnectionEvents").RECONNECTING,this.SHUTDOWN=b("ChannelConnectionEvents").SHUTDOWN,this.MUTE_WARNING="chat-connection/mute",this.UNMUTE_WARNING="chat-connection/unmute",this.unmuteWarning=p,c}a.prototype.disconnected=function(){"use strict";return l===n.SHUTDOWN||l===n.RECONNECTING&&!j&&m>1};a.prototype.isShutdown=function(){"use strict";return l===n.SHUTDOWN};a.prototype.reconnect=function(a){a===void 0&&(a=!1);if(b("ChannelManager").state==="ping"||b("ChannelManager").state==="pull"||b("ChannelManager").isShutdown())return;h.log("reconnect",{now:a});n.inform(n.RECONNECTING,0);a?(i!==null&&(b("clearTimeout")(i),i=null),b("ChannelManager").enterState("ping!")):i||(i=b("setTimeoutAcrossTransitions")(function(){b("ChannelManager").enterState("ping!"),i=null},b("ChannelConstants").CHANNEL_MANUAL_RECONNECT_DEFER_MSEC));b("ChannelManager").resetDelay()};a.prototype.mockAfterLoad=function(){"use strict";t(),u()};var n=new a();b("Run").onBeforeUnload(function(){});function o(){j&&(b("clearTimeout")(j),j=null)}function p(){o(),h.log("unmute_warning"),n.inform(n.UNMUTE_WARNING)}function q(a){o(),j=b("setTimeoutAcrossTransitions")(p,a),h.log("mute_warning",{time:a}),n.inform(n.MUTE_WARNING)}function r(){k&&(b("clearTimeout")(k),k=null)}function s(a,c){__p&&__p();r();if(a===b("ChannelConstants").ON_ENTER_STATE&&(c.nextState||c.state)==="pull"){if(l!==n.CONNECTED){h.log("connected");var d=!l;l=n.CONNECTED;m=0;n.inform(n.CONNECTED,{init:d})}}else a===b("ChannelConstants").ON_ENTER_STATE&&((c.nextState||c.state)==="ping"||!c.nextState&&c.state==="idle")?k=b("setTimeoutAcrossTransitions")(function(){var b=null;c.state==="idle"&&!c.nextState||(b=c.delay||0);h.log("reconnecting",{delay:b});n.disconnected()&&h.log("reconnecting_ui",{delay:b});l=n.RECONNECTING;c.state==="idle"&&m++;m>1?n.inform(n.RECONNECTING,b):!c.nextState&&c.state==="idle"&&s(a,c)},500):a===b("ChannelConstants").ON_SHUTDOWN&&(h.log("shutdown",{reason:c.reason}),l=n.SHUTDOWN,m=0,n.inform(n.SHUTDOWN,c.reason))}function t(){b("ChannelManager").isShutdown()?s(b("ChannelConstants").ON_SHUTDOWN,b("ChannelManager")._shutdownHint):s(b("ChannelConstants").ON_ENTER_STATE,{state:b("ChannelManager").state,nextState:b("ChannelManager").nextState,delay:0}),b("Visibility").addListener(b("Visibility").VISIBLE,n.reconnect)}b("Run").onAfterLoad(t);function u(){b("Arbiter").subscribe([b("ChannelConstants").ON_ENTER_STATE,b("ChannelConstants").ON_SHUTDOWN],s),b("Arbiter").subscribe(b("ChannelConstants").ATTEMPT_RECONNECT,function(){n.disconnected()&&n.reconnect()}),b("SystemEvents").subscribe(b("SystemEvents").TIME_TRAVEL,function(){n.reconnect(),q(b("ChannelConstants").MUTE_WARNING_TIME_MSEC)}),b("Run").onBeforeUnload(r,!1)}b("Run").onAfterLoad(u);b("Arbiter").subscribe(b("JSLogger").DUMP_EVENT,function(a,b){b.channel_connected=!n.disconnected()});e.exports=n}),3);
__d("ChatOpenTabEventLogger",["Banzai","Bootloader"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g="messaging_tracking";a={_log:function(a,c,d,e){var f={referrer:a||"",message_thread_id:c,message_view:"chat",timestamp_send:Date.now(),message_target_ids:[]};d!==undefined&&(f.message_target_ids=[d]);b("Bootloader").loadModules(["ChatImpressionLogger"],function(c){c.logImpression(a,d,e),b("Banzai").post(g,f,{delay:0,retry:!0})},"ChatOpenTabEventLogger")},logClickOpen:function(a,c,d,e){b("Bootloader").loadModules(["MercuryIDs","getPageIDFromThreadID","ChatImpressionLogger"],function(b,f){this._log(a,c,d,e);b=f(String(c));b&&this._logPageClick(a,b)}.bind(this),"ChatOpenTabEventLogger")},logUserClickOpen:function(a,c,d){b("Bootloader").loadModules(["MercuryIDs","ChatImpressionLogger"],function(b){b=b.getThreadIDFromUserID(c);this.logClickOpen(a,b,c,d)}.bind(this),"ChatOpenTabEventLogger")},logAutoOpen:function(a,b,c,d){this._log(a,b,c,d)},logUserAutoOpen:function(a,c){b("Bootloader").loadModules(["MercuryIDs","ChatImpressionLogger"],function(b){b=b.getThreadIDFromUserID(c);this._log(a,b,c)}.bind(this),"ChatOpenTabEventLogger")},_logPageClick:function(a,c){b("Banzai").post("page_message_button_click",{page_id:c,ref:a}),b("Bootloader").loadModules(["PagesLogger","PagesLoggerEventEnum","PagesLoggerEventTargetEnum"],function(b,d,e){b.log(c,d.CLICK,e.PAGE_MESSAGE,a)},"ChatOpenTabEventLogger")}};e.exports=a}),null);
__d("MessengerMQTTConnectionEvents",[],(function(a,b,c,d,e,f){"use strict";e.exports={DELTA_EVENT:"messenger-mqtt-delta",STREAM_DISCONNECT:"messenger-mqtt-stream-disconnect",STREAM_CONNECTING:"messenger-mqtt-stream-connecting",STREAM_CONNECT:"messenger-mqtt-stream-connect",STATE_CONNECTED:"Connected",STATE_DISCONNECTED:"Disconnected",STATE_CONNECTING:"Connecting",TYP:"messenger-mqtt-typ"}}),null);
__d("MessengerMQTTGating",["gkx"],(function(a,b,c,d,e,f){"use strict";var g={_forcedOff:!1,isEnabled:function(){return b("gkx")("AT4L8DlAE0WEKOKYkeJWzHDsRi3-ZWFYr4agMbkLtMUBERlxiBLblqdrc15ka2y0CqeZkLHc9yfq9QS1H3akL6e9")&&!g._forcedOff},turnOff:function(){g._forcedOff=!0}};e.exports=g}),null);
__d("XGroupsController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/groups/{idorvanity}/{?view}/{?post_id}/",{idorvanity:{type:"String",required:!0},view:{type:"Enum",enumType:1},post_id:{type:"Int"},rule_id:{type:"Int"},ref:{type:"String"},source_id:{type:"String"},notif_t:{type:"String"},nux:{type:"Enum",enumType:1},tip_id:{type:"Int"},feedback_id:{type:"FBID"},member_tag_id:{type:"FBID"},inner_tab:{type:"String"},section:{type:"Enum",enumType:1},thread_id:{type:"String"},mentorship_profile_id:{type:"FBID"},autopopup_create_chat_dialog:{type:"Bool",defaultValue:!1},sorting_setting:{type:"String"},multi_events:{type:"String"},stories:{type:"Exists",defaultValue:!1},highlight_location:{type:"Exists",defaultValue:!1},highlight_sections:{type:"Exists",defaultValue:!1},highlight_groupapps:{type:"Exists",defaultValue:!1},highlight_pixel:{type:"Exists",defaultValue:!1},highlight_mentorship_option:{type:"Exists",defaultValue:!1},highlight_auto_approval:{type:"Exists",defaultValue:!1},highlight_page_member:{type:"Exists",defaultValue:!1},highlight_units_edit_bar:{type:"Exists",defaultValue:!1},queue:{type:"Enum",enumType:1},composer_prefill:{type:"String"},hide_workplace_pagelet:{type:"Bool",defaultValue:!1},permalink_add_comment_nux_shown:{type:"Bool",defaultValue:!1},comment_id:{type:"Int"},reply_comment_id:{type:"Int"}})}),null);
__d("ChatUnreadCount",["ChatDispatcher","ChatUnreadCountActionTypes","MercuryIDs","MercurySingletonProvider","MercuryThreadInformer","MessengerState.bs"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a.getForFBID=function(a){return g.getForFBID(a)};a.get=function(){return g.get()};function a(a){this.$1=a,this.$2=b("MercuryThreadInformer").getForFBID(a),this.$3=new Map(),this.setupSubscriptions()}a.prototype.getUnreadCountForUID=function(a){if(!a)return null;var c=b("MercuryIDs").getThreadIDFromUserID(a),d=b("MessengerState.bs").getThreadMetaNow(this.$1,c);d||b("MessengerState.bs").getThreadMeta(this.$1,c,function(a){});c=d&&d.unread_count;this.$3.set(a,c);return c};a.prototype.setupSubscriptions=function(){__p&&__p();this.$2.subscribe("threads-updated",function(a,c){a=Object.keys(c).some(function(a){a=b("MercuryIDs").getUserIDFromThreadID(a);if(!a)return!1;var c=this.getUnreadCountForUID(a);a=this.$3.get(a)||0;return c!==a}.bind(this));a&&b("ChatDispatcher").dispatch({type:b("ChatUnreadCountActionTypes").COUNT_UPDATED})}.bind(this)),this.$2.subscribe("unread-updated",function(){return b("ChatDispatcher").dispatch({type:b("ChatUnreadCountActionTypes").COUNT_UPDATED})})};var g=new(b("MercurySingletonProvider"))(a);e.exports=a}),null);
__d("ChatAppActionTypes",["keyMirror"],(function(a,b,c,d,e,f){"use strict";e.exports=b("keyMirror")({INITIAL_DISPLAY_DONE:null,HIDE:null,LOAD:null,TTI:null,UNHIDE:null})}),null);
__d("ChatAppStore",["ChatAppActionTypes","ChatDispatcher","FluxStore"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g;c=babelHelpers.inherits(a,b("FluxStore"));g=c&&c.prototype;function a(){g.constructor.call(this,b("ChatDispatcher")),this.$ChatAppStore2={initialDisplayDone:!1,isHidden:!1,isInitialized:!1,isLoaded:!1},this.$ChatAppStore1=babelHelpers["extends"]({},this.$ChatAppStore2)}a.prototype.__onDispatch=function(a){__p&&__p();a=a.type;this.$ChatAppStore1=babelHelpers["extends"]({},this.$ChatAppStore2);switch(a){case b("ChatAppActionTypes").INITIAL_DISPLAY_DONE:this.$ChatAppStore2.initialDisplayDone=!0;this.__emitChange();break;case b("ChatAppActionTypes").HIDE:this.$ChatAppStore2.isHidden=!0;this.__emitChange();break;case b("ChatAppActionTypes").UNHIDE:this.$ChatAppStore2.isHidden=!1;this.__emitChange();break;case b("ChatAppActionTypes").TTI:this.$ChatAppStore2.isInitialized=this.$ChatAppStore2.isLoaded=!0;this.__emitChange();break;case b("ChatAppActionTypes").LOAD:this.$ChatAppStore2.isLoaded=!0;this.__emitChange();break}};a.prototype.getPreviousState=function(){return this.$ChatAppStore1};a.prototype.getState=function(){return this.$ChatAppStore2};a.__moduleID=e.id;e.exports=new a()}),null);
__d("FantaDispatcher",["ExplicitRegistrationDispatcher"],(function(a,b,c,d,e,f){"use strict";var g;g=babelHelpers.inherits(a,b("ExplicitRegistrationDispatcher"));g&&g.prototype;function a(){g.apply(this,arguments)}e.exports=new a({strict:!1})}),null);
__d("FantaTabActions",["Bootloader","CurrentUser","FantaDispatcher","MercuryIDs","MessengerURIConstants","URI","WebMessengerThreadPermalinks","WorkplaceChatHelper","gkx","goURI","ifRequired","keyMirror"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("keyMirror")({BLUR_TAB:null,CLEAR_PAGE_INDICATOR_DESCRIPTION:null,CLOSE_ALL_TABS:null,CLOSE_AND_TAB_NEXT:null,CLOSE_TAB:null,DELETE_TAB:null,FOCUS_NEXT_TAB:null,FOCUS_PREVIOUS_TAB:null,FOCUS_TAB:null,HIGHLIGHT_NEW_MESSAGE:null,HOVERED_TAB:null,JUMP_TO_MESSAGE:null,LOAD_FROM_DATA:null,MINIMIZE_ALL_TABS:null,MINIMIZE_TAB:null,OPEN_TAB_WITH_INTERSTITIAL_DATA:null,OPEN_TAB:null,REPLACE_TAB:null,SCROLL_BOTTOM_CHANGED:null,SET_ALLOWED_RAISED_TABS:null,SET_MESSAGE_COUNT:null,SET_PAGE_INDICATOR_DESCRIPTION:null,SET_PERMANENT_URI:null,SHOW_UNSEEN_MESSAGES:null,UNHIGHLIGHT_NEW_MESSAGE:null,UNHOVERED_TAB:null,UNMINIMIZE_TAB:null,WIPE_JUMP_TO_MESSAGE:null});function h(a,c){var d=a?new(b("URI"))(b("WebMessengerThreadPermalinks").getThreadURIFromServerID(a)):new(b("URI"))(b("MessengerURIConstants").COMPOSE_SUBPATH);b("ifRequired")("BusinessURI.brands",function(a){return b("goURI")(a(d))},function(){return setTimeout(function(){i.openTab(a,c)},100)})}var i={Types:g,openNewMessageTab:function(a,b,c){i.openTab(a,b,c,!0)},openTab:function(a,c,d,e,f){__p&&__p();if(b("CurrentUser").isWorkUser()&&b("WorkplaceChatHelper").suppressChatIfActiveOnDesktop()&&b("gkx")("AT7jinnyRPDg4OtD2DVZhvkvAcwN4UEfD67JxgYKN8ktNW7yrzWDgUhjX86ZgaJp_pMk__upuP12-9rZjDRDprZwcbUv5zDffty-rkNZ2YUXjQ")){if(c==="jewel_new_message"){b("goURI")("workchat://new");return}if(!b("MercuryIDs").isLocalThread(a)||c!=="groupsync_fbgroupmall_chat_button"){b("goURI")("workchat://"+(a||""));return}}b("ifRequired")("FantaTabsEagerBootloader",function(a){return a.bootload()});this.dispatchOrBootloadGetMessages(function(){b("FantaDispatcher").dispatch({type:g.OPEN_TAB,tabID:a,entryPoint:c,defaultText:d,isNewMessageTab:e,defaultPreview:f}),b("ifRequired")("FantaTabsReactApp",function(b){this._tryLoadSlimApp(a,c)}.bind(this),function(){this._tryLoadSlimApp(a,c,function(){return h(a,c)})}.bind(this))}.bind(this))},openInterstitialTab:function(a,c,d){this.dispatchOrBootloadGetMessages(function(){b("FantaDispatcher").dispatch({type:g.OPEN_TAB_WITH_INTERSTITIAL_DATA,tabID:a,interstitialData:c,entryPoint:d}),b("ifRequired")("FantaTabsReactApp",function(b){this._tryLoadSlimAppWithInterstitialData(a,c,d)}.bind(this),function(){this._tryLoadSlimAppWithInterstitialData(a,c,d)}.bind(this))}.bind(this))},_tryLoadSlimApp:function(a,c,d){b("ifRequired")("FantaTabsSlimApp",function(d){b("ifRequired")("FantaAppStore",function(){},function(){d.getPumpedUp(function(){b("FantaDispatcher").dispatch({type:g.OPEN_TAB,tabID:a,entryPoint:c})})})},function(){return d&&d(a)})},_tryLoadSlimAppWithInterstitialData:function(a,c,d){b("ifRequired")("FantaTabsSlimApp",function(e){b("ifRequired")("FantaAppStore",function(){},function(){e.getPumpedUp(function(){b("FantaDispatcher").dispatch({type:g.OPEN_TAB_WITH_INTERSTITIAL_DATA,tabID:a,interstitialData:c,entryPoint:d})})})})},replaceTab:function(a,c){b("FantaDispatcher").dispatch({type:g.REPLACE_TAB,tabID:a,newTabID:c})},minimizeTab:function(a){b("FantaDispatcher").dispatch({type:g.MINIMIZE_TAB,tabID:a})},minimizeAllTabs:function(){b("FantaDispatcher").dispatch({type:g.MINIMIZE_ALL_TABS})},unminimizeTab:function(a){b("FantaDispatcher").dispatch({type:g.UNMINIMIZE_TAB,tabID:a})},closeTab:function(a){b("FantaDispatcher").dispatch({type:g.CLOSE_TAB,tabID:a})},closeAllTabs:function(){b("FantaDispatcher").dispatch({type:g.CLOSE_ALL_TABS})},closeAndTabNext:function(a){b("FantaDispatcher").dispatch({type:g.CLOSE_AND_TAB_NEXT,tabID:a})},deleteTab:function(a){b("FantaDispatcher").dispatch({type:g.DELETE_TAB,tabID:a})},focusTab:function(a){b("FantaDispatcher").dispatch({type:g.FOCUS_TAB,tabID:a})},blurTab:function(a){b("FantaDispatcher").dispatch({type:g.BLUR_TAB,tabID:a})},hoveredTab:function(a){b("FantaDispatcher").dispatch({type:g.HOVERED_TAB,tabID:a})},unhoveredTab:function(a){b("FantaDispatcher").dispatch({type:g.UNHOVERED_TAB,tabID:a})},highlightNewMessage:function(a){b("FantaDispatcher").dispatch({type:g.HIGHLIGHT_NEW_MESSAGE,tabId:a})},unhighlightNewMessage:function(a){b("FantaDispatcher").dispatch({type:g.UNHIGHLIGHT_NEW_MESSAGE,tabId:a})},setAllowedRaisedTabs:function(a){b("FantaDispatcher").dispatch({type:g.SET_ALLOWED_RAISED_TABS,allowedRaisedTabs:a})},loadFromData:function(a){this.dispatchOrBootloadGetMessages(function(){a&&b("FantaDispatcher").dispatch({type:g.LOAD_FROM_DATA,tabData:a})})},focusNextTab:function(event){b("FantaDispatcher").dispatch({type:g.FOCUS_NEXT_TAB,event:event})},focusPreviousTab:function(event){b("FantaDispatcher").dispatch({type:g.FOCUS_PREVIOUS_TAB,event:event})},scrollBottomChanged:function(a,c,d){b("FantaDispatcher").dispatch({type:g.SCROLL_BOTTOM_CHANGED,isScrolledToBottom:c,tabID:a,showUnseenMessages:d})},jumpToMessage:function(a,c){b("FantaDispatcher").dispatch({type:g.JUMP_TO_MESSAGE,mid:c,tabID:a})},wipeJumpToMessage:function(a){b("FantaDispatcher").dispatch({type:g.WIPE_JUMP_TO_MESSAGE,tabID:a})},setPageIndicatorDescription:function(a,c){b("FantaDispatcher").dispatch({type:g.SET_PAGE_INDICATOR_DESCRIPTION,tabID:a,description:c})},clearPageIndicatorDescription:function(a){b("FantaDispatcher").dispatch({type:g.CLEAR_PAGE_INDICATOR_DESCRIPTION,tabID:a})},showUnseenMessages:function(a){b("FantaDispatcher").dispatch({type:g.SHOW_UNSEEN_MESSAGES,tabID:a})},setPermanentUri:function(a,c){b("FantaDispatcher").dispatch({type:g.SET_PERMANENT_URI,tabID:a,uri:c})},dispatchOrBootloadGetMessages:function(a){b("ifRequired")("FantaReducersGetMessages",function(){a()},function(){b("ifRequired")("FantaAppStore",function(c){b("Bootloader").loadModules(["FantaReducersGetMessages"],function(b){c.addReducers(b),a()},"FantaTabActions")},function(){a()})})}};e.exports=i}),null);
__d("P2PActionConstants",[],(function(a,b,c,d,e,f){"use strict";a=Object.freeze({CREDIT_CARDS_UPDATED:"credit_cards_updated",CREDIT_CARDS_UPDATED_ERROR:"credit_cards_updated_error",CHANNEL_EVENTS_ALLOWED:"channel_events_allowed",CHANNEL_EVENTS_IGNORED:"channel_events_ignored",CREDIT_CARD_SAVING:"credit_card_saving",CREDIT_CARD_ADDED:"credit_card_added",CREDIT_CARD_ADDED_ERROR:"credit_card_added_error",CREDIT_CARD_ADDED_ERROR_CLEARED:"credit_card_added_error_cleared",CREDIT_CARD_DELETED:"credit_card_deleted",CREDIT_CARD_DELETED_ERROR:"credit_card_deleted_error",CREDIT_CARD_UPDATED:"credit_card_updated",CREDIT_CARD_UPDATED_ERROR:"credit_card_updated_error",PRESET_CREDIT_CARD_UPDATED:"preset_credit_card_updated",PRESET_CREDIT_CARD_UPDATED_ERROR:"preset_credit_card_updated_error",CREDIT_CARD_VERIFIED:"credit_card_verified",CREDIT_CARD_VERIFIED_ERROR:"credit_card_verified_error",PAYMENT_METHODS_UPDATED:"payment_methods_updated",PAYMENT_METHODS_UPDATED_ERROR:"payment_methods_updated_error",TRANSFERS_UPDATED:"transfers_updated",TRANSFERS_UPDATED_ERROR:"transfers_updated_error",NUX_TRANSFERS_UPDATED:"nux_transfers_updated",TRANSFER_ADDED:"transfer_added",TRANSFER_ADDED_ERROR:"transfer_added_error",TRANSFER_UPDATED:"transfer_updated",TRANSFER_UPDATED_ERROR:"transfer_updated_error",TRANSFER_ACCEPTED:"transfer_accepted",TRANSFER_DECLINED:"transfer_declined",CHAT_SEND_VIEW_OPENED:"chat_send_view_opened",CHAT_SEND_VIEW_CLOSED:"chat_send_view_closed",BIN_NUMBER_VALIDATED:"bin_number_validated",BIN_NUMBER_VALIDATED_ERROR:"bin_number_validated_error",USER_ELIGIBILITY_UDPATED:"user_eligibility_updated",FRIENDS_LIST_UPDATED:"friends_list_updated",DIALOG_SHOWN:"dialog_shown",DIALOG_CLOSED:"dialog_closed",BANNER_STATES_UPDATED:"banner_states_updated",BANNER_DISMISSED:"banner_dismissed",BANNER_VIEWED:"banner_viewed",BANNER_COMPLETED:"banner_completed",MONEYPENNY_TRANSFER_CREATED:"moneypenny_transfer_created",MONEYPENNY_TRANSFER_CREATED_ERROR:"moneypenny_transfer_created_error",PLATFORM_CONTEXT_ADDED:"platform_context_added",PLATFORM_CONTEXT_ADDED_ERROR:"platform_context_added_error",PLATFORM_CONTEXT_SAVE_ERRORS_CLEARED:"platform_context_save_errors_cleared",PLATFORM_CONTEXT_BANNER_DISMISSED:"platform_context_banner_dismissed",PLATFORM_CONTEXT_PRODUCT_ITEM_SOLD:"platform_context_product_item_sold",PLATFORM_CONTEXT_CHANGED:"platform_context_changed",EXTENSIVE_TRANSFER_DETAILS_UPDATED:"extensive_transfer_details_updated",ADDRESS_SAVING:"address_saving",ADDRESSES_UPDATED:"addresses_updated",ADDRESS_ADDED:"address_added",ADDRESS_ADDED_ERROR:"address_added_error",ADDRESS_ADDED_ERROR_CLEARED:"address_added_error_cleared",CHECKOUT_CART_INITIATED:"checkout_cart_initiated",CHECKOUT_CART_CREATED:"checkout_cart_created",CHECKOUT_SHIPPING_OPTION_SELECTED:"checkout_shipping_option_selected",CHECKOUT_ADDRESS_SELECTED:"checkout_address_selected",CHECKOUT_CREDIT_CARD_SELECTED:"checkout_credit_card_selected",CHECKOUT_ADDRESS_FORM_TOGGLED:"checkout_address_form_toggled",CHECKOUT_CREDIT_CARD_FORM_TOGGLED:"checkout_credit_card_form_toggled",CHECKOUT_ADDRESS_EDIT_OPTIONS_TOGGLED:"checkout_address_options_toggled",CHECKOUT_CREDIT_CARD_EDIT_OPTIONS_TOGGLED:"checkout_credit_card_edit_options_toggled",CHECKOUT_PAYMENT_METHOD_EDIT_OPTIONS_TOGGLED:"checkout_payment_edit_options_toggled",CHECKOUT_PAYMENT_METHOD_SELECTED:"checkout_payment_method_selected",CHECKOUT_PAYMENT_METHOD_CONFIGURED:"checkout_payment_method_configured",CHECKOUT_PAYMENT_METHOD_CONFIRMED:"checkout_payment_method_confirmed",CHECKOUT_ADDRESS_FORM_VALIDATED:"checkout_address_form_validated",CHECKOUT_CREDIT_CARD_FORM_VALIDATED:"checkout_credit_card_form_validated",CHECKOUT_EDIT_COMPLETED:"checkout_completed",CHECKOUT_PROCESSING:"checkout_processing",CHECKOUT_BUYER_PROFILE_UPDATED:"checkout_buyer_profile_updated",CHECKOUT_MANUAL_PAYMENT_RECEIPT_UPDATED:"checkout_manual_payment_receipt_updated",PAYMENT_REQUEST_INITIATED:"payment_request_initiated",PAYMENT_REQUEST_INITIATED_COMPLETE:"payment_request_initiated_completed",PAYMENT_REQUEST_CREATED:"payment_request_created",PAYMENT_REQUEST_CREATED_ERROR:"payment_request_created_error",PAYMENT_REQUEST_UPDATED:"payment_request_updated",PAYMENT_REQUEST_DECLINE_INITIATED:"payment_request_decline_initiated",PAYMENT_REQUEST_DECLINED:"payment_request_declined",PAYMENT_REQUEST_DECLINE_ERROR:"payment_request_decline_error",PAYMENT_REQUESTS_FETCHED:"payment_requests_fetched",PAYMENT_REQUEST_CANCEL_INITIATED:"payment_request_cancel_initiated",PAYMENT_REQUEST_CANCELED:"payment_request_canceled",PAYMENT_REQUEST_CANCEL_ERROR:"payment_request_cancel_error"});e.exports=a}),null);
__d("P2PDispatcher",["ExplicitRegistrationReactDispatcher"],(function(a,b,c,d,e,f){"use strict";var g;c=babelHelpers.inherits(a,b("ExplicitRegistrationReactDispatcher"));g=c&&c.prototype;function a(a){g.constructor.call(this,a),this.dispatch=this.dispatch.bind(this)}e.exports=new a({strict:!1})}),null);
__d("FluxMixinLegacyInstrumentation",["FluxContainerInstrumentation"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function g(a){return a.constructor.displayName||a.constructor.name||"FluxMixinLegacy(unknown)"}var h={_callCalculateState:function(){var a=b("FluxContainerInstrumentation").onCalculateStateStart(g(this)),c=this._FluxMixinLegacyInstrumentationCalculateStateCaller.apply(this,arguments);a&&a();return c},UNSAFE_componentWillMount:function(){this.constructor._FluxMixinLegacyInstrumentationOnInitCalled||(b("FluxContainerInstrumentation").onInit(this.constructor),this.constructor._FluxMixinLegacyInstrumentationOnInitCalled=!0)},_FluxMixinLegacyInstrumentationEmittedChangeStores:null,_getCurrentDispatchForInstrumentation:function(){return b("FluxContainerInstrumentation").updateTracking&&b("FluxContainerInstrumentation").updateTracking.getCurrentDispatch()},_onInitialStateForInstrumentation:function(){b("FluxContainerInstrumentation").updateTracking&&b("FluxContainerInstrumentation").updateTracking.initialState(this,g(this))},_onReceivePropsForInstrumentation:function(a){b("FluxContainerInstrumentation").updateTracking&&b("FluxContainerInstrumentation").updateTracking.receiveProps(this,g(this),a)},_addStoreEmitForInstrumentation:function(a){b("FluxContainerInstrumentation").updateTracking&&b("FluxContainerInstrumentation").updateTracking.shouldRecord()&&(this._FluxMixinLegacyInstrumentationEmittedChangeStores=this._FluxMixinLegacyInstrumentationEmittedChangeStores||[],b("FluxContainerInstrumentation").addStoreDependencies(this._FluxMixinLegacyInstrumentationEmittedChangeStores,a))},_collectStoreEmitsForInstrumentation:function(){var a=this._FluxMixinLegacyInstrumentationEmittedChangeStores;this._FluxMixinLegacyInstrumentationEmittedChangeStores=null;return a},_logStoreEmitsForInstrumentation:function(a,c){b("FluxContainerInstrumentation").updateTracking&&b("FluxContainerInstrumentation").updateTracking.storeEmitChange(this,g(this),a||[],c)},componentDidUpdate:function(a,c){b("FluxContainerInstrumentation").onDidUpdate(this,g(this),a,this.props,c,this.state)}};function a(a){b("FluxContainerInstrumentation").hasInstrumentation()&&(a.mixins=a.mixins||[],a.mixins.push(h),a._FluxMixinLegacyInstrumentationCalculateStateCaller=a._callCalculateState,delete a._callCalculateState);return a}e.exports={addInstrumentation:a}}),null);
__d("PureStoreBasedStateMixin",["invariant","FluxMixinLegacyInstrumentation","StoreBasedStateMixinHelper","setImmediate"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();a=function(){__p&&__p();for(var a=arguments.length,c=new Array(a),d=0;d<a;d++)c[d]=arguments[d];return b("FluxMixinLegacyInstrumentation").addInstrumentation({_callCalculateState:function(){return this.constructor.calculateState()},getInitialState:function(){this._onInitialStateForInstrumentation&&this._onInitialStateForInstrumentation();return this._callCalculateState()},UNSAFE_componentWillMount:function(){__p&&__p();this.constructor.calculateState||g(0,undefined);this._recalculateStateID=null;var a=function(){if(this.isMounted()){var a=this._collectStoreEmitsForInstrumentation?this._collectStoreEmitsForInstrumentation():null,b=this._callCalculateState();this.setState(this._logStoreEmitsForInstrumentation!=null?function(){a!=null&&this._logStoreEmitsForInstrumentation&&this._logStoreEmitsForInstrumentation(a);return b}.bind(this):b)}this._recalculateStateID=null}.bind(this);this._mixin=new(b("StoreBasedStateMixinHelper"))(c);this._mixin.subscribeCallback(function(){this._recalculateStateID===null&&(this._recalculateStateID=b("setImmediate")(a))}.bind(this),this._addStoreEmitForInstrumentation)},componentWillUnmount:function(){this._mixin.release(),this._mixin=null}})}.bind(this);e.exports=a}),null);
__d("filterSet",[],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a,b){__p&&__p();var c=new Set();for(var a=a,d=Array.isArray(a),e=0,a=d?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var f;if(d){if(e>=a.length)break;f=a[e++]}else{e=a.next();if(e.done)break;f=e.value}f=f;b(f)&&c.add(f)}return c}e.exports=a}),null);
__d("FBPaymentsDispatcher",["ExplicitRegistrationReactDispatcher"],(function(a,b,c,d,e,f){"use strict";var g;c=babelHelpers.inherits(a,b("ExplicitRegistrationReactDispatcher"));g=c&&c.prototype;function a(a){g.constructor.call(this,a),this.dispatch=this.dispatch.bind(this)}e.exports=new a({strict:!1})}),null);
__d("FBPaymentsDialogActions",["FBPaymentsDispatcher","keyMirror"],(function(a,b,c,d,e,f){"use strict";var g={types:b("keyMirror")({SHOW_DIALOG:null,HIDE_DIALOG:null}),showDialog:function(a,c){b("FBPaymentsDispatcher").dispatch({type:g.types.SHOW_DIALOG,data:{dialogClass:a,dialogProps:c}})},hideDialog:function(){b("FBPaymentsDispatcher").dispatch({type:g.types.HIDE_DIALOG,data:{}})}};e.exports=g}),null);
__d("FBPaymentsDialogStore",["FBPaymentsDialogActions","FBPaymentsDispatcher","FluxStore"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g;c=babelHelpers.inherits(a,b("FluxStore"));g=c&&c.prototype;function a(){g.constructor.call(this,b("FBPaymentsDispatcher")),this.$FBPaymentsDialogStore1={dialogClass:null,dialogProps:null}}a.prototype.__onDispatch=function(a){var c=a.type;a=a.data;switch(c){case b("FBPaymentsDialogActions").types.SHOW_DIALOG:this.$FBPaymentsDialogStore1={dialogClass:a.dialogClass,dialogProps:a.dialogProps};this.__emitChange();break;case b("FBPaymentsDialogActions").types.HIDE_DIALOG:this.$FBPaymentsDialogStore1={dialogClass:null,dialogProps:null};this.__emitChange();break}};a.prototype.getState=function(){return this.$FBPaymentsDialogStore1};a.__moduleID=e.id;e.exports=new a()}),null);
__d("FBPaymentsDialogContainer.react",["FBPaymentsDialogStore","FBPaymentsDispatcher","FluxContainer","React"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g;g=babelHelpers.inherits(a,b("React").Component);g&&g.prototype;a.calculateState=function(){return b("FBPaymentsDialogStore").getState()};a.getStores=function(){return[b("FBPaymentsDialogStore")]};a.prototype.UNSAFE_componentWillMount=function(){b("FBPaymentsDispatcher").explicitlyRegisterStore(b("FBPaymentsDialogStore"))};a.prototype.render=function(){if(!this.state.dialogClass)return null;var a=this.state.dialogClass;return b("React").createElement(a,babelHelpers["extends"]({},this.state.dialogProps,{key:"dialog"}))};function a(){g.apply(this,arguments)}e.exports=b("FluxContainer").create(a)}),null);
__d("MessengerDiscoveryEntryPoint",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({BROWSER_PROFILE_ICON:"browser_profile_icon",MESSENGER_SEARCH_M4:"messenger_search_m4",MESSENGER_SEARCH_M4_HOME:"messenger_search_m4:home",MESSENGER_SEARCH_M4_PEOPLE:"messenger_search_m4:people",MESSENGER_SEARCH_M4_GAMES:"messenger_search_m4:games",MESSENGER_SEARCH_M4_DISCOVER:"messenger_search_m4:discover",MESSENGER_SEARCH_M4_NULL_STATE:"messenger_search_m4:null_state",FB_STORY:"fb_story",FB_STORY_VIEWER_SHEET_ROW:"fb_story:viewer_sheet_row",FB_STORY_VIEWER_SHEET_MENU:"fb_story:viewer_sheet_menu",ANONYMOUS_MESSAGING:"anonymous_messaging",FIRST_PARTY_BOT:"first_party_bot",FIRST_PARTY_BOT_RECRUITING_BOT:"first_party_bot:recruiting_bot",FIRST_PARTY_BOT_MESSENGER_BOT:"first_party_bot:messenger_bot",FIRST_PARTY_BOT_WORKPLACE_APP:"first_party_bot:workplace_app",FIRST_PARTY_BOT_REPORT_SPAM:"first_party_bot:report_spam",FIRST_PARTY_BOT_MOBILE_BUILDS_BOT:"first_party_bot:mobile_builds_bot",FIRST_PARTY_BOT_FB_TEST_PAGE:"first_party_bot:fb_test_page",FIRST_PARTY_BOT_CALENDAR_BOT:"first_party_bot:calendar_bot",FIRST_PARTY_BOT_ORDER_FOOD:"first_party_bot:order_food",FIRST_PARTY_BOT_BUSINESS_ASSISTANT:"first_party_bot:business_assistant",FIRST_PARTY_BOT_MOBILE_FINANCIAL_SERVICE:"first_party_bot:mobile_financial_service",FIRST_PARTY_BOT_FACEBOOK_BUSINESS:"first_party_bot:facebook_business",FIRST_PARTY_BOT_LEAD_GEN:"first_party_bot:lead_gen",FIRST_PARTY_BOT_MARKETPLACE:"first_party_bot:marketplace",FIRST_PARTY_BOT_INSTANT_EXPERIENCES:"first_party_bot:instant_experiences",FIRST_PARTY_BOT_PRODUCT_SUPPORT_TOOL:"first_party_bot:product_support_tool",FIRST_PARTY_BOT_CTA_ADS:"first_party_bot:cta_ads",FIRST_PARTY_BOT_FB_LOGIN_ALERTS:"first_party_bot:fb_login_alerts",FIRST_PARTY_BOT_M:"first_party_bot:m",MESSENGER_SEARCH:"messenger_search",MESSENGER_SEARCH_HOME:"messenger_search:home",MESSENGER_SEARCH_PEOPLE:"messenger_search:people",MESSENGER_SEARCH_GAMES:"messenger_search:games",MESSENGER_SEARCH_DISCOVER:"messenger_search:discover",MESSENGER_SEARCH_NULL_STATE:"messenger_search:null_state",FB_NOTIFICATIONS:"fb_notifications",BEGIN_SHARE_FLOW:"begin_share_flow",APP_INSIGHTS:"app_insights",BRANDED_CAMERA:"branded_camera",SAMPLE_BOTS:"sample_bots",PAGES_COMMS_AUTOMATED_RESPONSES:"pages_comms_automated_responses",CUSTOMER_MATCHING:"customer_matching",CUSTOMER_MATCHING_PHONE_NUMBER:"customer_matching:phone_number",VERTICAL_SERVICES:"vertical_services",VERTICAL_SERVICES_GET_QUOTE:"vertical_services:get_quote",MESSENGERDOTCOM:"messengerdotcom",MESSENGERDOTCOM_WEB_SEARCH:"messengerdotcom:web_search",MESSENGERDOTCOM_PAGES_PLUGIN:"messengerdotcom:pages_plugin",MESSENGER_INBOX:"messenger_inbox",MESSENGER_INBOX_THREAD_LIST:"messenger_inbox:thread_list",MESSENGER_INBOX_IN_THREAD:"messenger_inbox:in_thread",BYMM_NULL_STATE:"bymm_null_state",FUNDRAISER_SUPPORT:"fundraiser_support",FUNDRAISER_SUPPORT_REACTIVE_MORE_MENU:"fundraiser_support:reactive_more_menu",FUNDRAISER_SUPPORT_REACTIVE_FAQ:"fundraiser_support:reactive_faq",FUNDRAISER_SUPPORT_PROACTIVE:"fundraiser_support:proactive",FUNDRAISER_SUPPORT_CHECKLIST:"fundraiser_support:checklist",FB_SEARCH:"fb_search",FB_SEARCH_CHAT_SIDEBAR_TYPEAHEAD:"fb_search:chat_sidebar_typeahead",FB_SEARCH_SEARCH_ENTITY_CARD:"fb_search:search_entity_card",FB_SEARCH_HIGH_CONFIDENCE_CARD:"fb_search:high_confidence_card",SPONSORED_MESSAGES_ADS:"sponsored_messages_ads",INSTANT_ARTICLE:"instant_article",INSTANT_ARTICLE_CTA:"instant_article:cta",INSTANT_ARTICLE_OVERFLOW_MENU:"instant_article:overflow_menu",FB_FEED:"fb_feed",FB_FEED_PYMM_RHC:"fb_feed:pymm_rhc",FB_FEED_PAGE_HOVER_CARD:"fb_feed:page_hover_card",FB_FEED_ADMIN:"fb_feed:admin",FB_FEED_ORGANIC_POST:"fb_feed:organic_post",PAGES_MANAGER_APP:"pages_manager_app",PAGES_MANAGER_APP_NOTIFICATION_DIRECT_REPLY_TEXT:"pages_manager_app:notification_direct_reply_text",PAGES_MANAGER_APP_NOTIFICATION_DIRECT_REPLY_LIKE:"pages_manager_app:notification_direct_reply_like",BUSINESS_ON_MESSENGER:"business_on_messenger",CLICK_TO_MESSENGER_AD:"click_to_messenger_ad",CLICK_TO_MESSENGER_AD_MESSENGER_DEEPLINK_ADS:"click_to_messenger_ad:messenger_deeplink_ads",CLICK_TO_MESSENGER_AD_ADS_WELCOME_ADMIN:"click_to_messenger_ad:ads_welcome_admin",CLICK_TO_MESSENGER_AD_USER_SENT:"click_to_messenger_ad:user_sent",CLICK_TO_MESSENGER_AD_PARTIAL_AUTOMATED:"click_to_messenger_ad:partial_automated",MDOTME:"mdotme",PRIVATE_REPLY:"private_reply",PRIVATE_REPLY_ADMIN:"private_reply:admin",ADMIN_MESSAGES:"admin_messages",DISCOVER_TAB_M3:"discover_tab_m3",DISCOVER_TAB_M4:"discover_tab_m4",DISCOVER_TAB_M4_BUSINESSES:"discover_tab_m4:businesses",DISCOVER_TAB_M4_GAMES:"discover_tab_m4:games",DISCOVER_TAB_M4_FOR_YOU:"discover_tab_m4:for_you",FB_PAGE:"fb_page",FB_PAGE_ICEBREAKER_RHC:"fb_page:icebreaker_rhc",FB_PAGE_SEND_AND_POST_FROM_COMPOSER:"fb_page:send_and_post_from_composer",FB_PAGE_ADMIN_TEST_LINK:"fb_page:admin_test_link",FB_PAGE_SHOP_PDP:"fb_page:shop_pdp",FB_PAGE_FREQUENTLY_ASKED_QUESTION_CARD:"fb_page:frequently_asked_question_card",FB_PAGE_ABOUT_CARD_DETAIL_VIEW:"fb_page:about_card_detail_view",FB_PAGE_RESPONSIVENESS_CONTEXT_CARD:"fb_page:responsiveness_context_card",FB_PAGE_ABOUT_CARD:"fb_page:about_card",FB_PAGE_ABOUT_CARD_PQI_MESSAGE_UPSELL:"fb_page:about_card_pqi_message_upsell",FB_PAGE_PAGE_HEADER:"fb_page:page_header",FB_PAGE_PRIMARY_MESSAGE_BUTTON:"fb_page:primary_message_button",FB_PAGE_SECONDARY_MESSAGE_BUTTON:"fb_page:secondary_message_button",FB_PAGE_FB_PAGE_CTA_PAGES_ACTIONS_UNIT:"fb_page:fb_page_cta_pages_actions_unit",FB_PAGE_JEWEL_THREAD:"fb_page:jewel_thread",FB_PAGE_USER_MESSAGE_PROMPT:"fb_page:user_message_prompt",FB_PAGE_PAGES_INFO:"fb_page:pages_info",FB_PAGE_LOADED_FROM_DATA:"fb_page:loaded_from_data",FB_PAGE_CHAT_SIDEBAR_TYPEAHEAD:"fb_page:chat_sidebar_typeahead",FB_PAGE_DYNAMICHOVERCARD:"fb_page:dynamicHoverCard",FB_PAGE_ABOUT_ROW:"fb_page:about_row",FB_PAGE_PYMM_RHC:"fb_page:pymm_rhc",FB_PAGE_GROUPS_RHC:"fb_page:groups_rhc",FB_PAGE_CONTEXT_CARD:"fb_page:context_card",FB_PAGE_CONTEXTUAL_RECOMMENDATIONS:"fb_page:contextual_recommendations",FB_PAGE_SEARCHENTITYCARD:"fb_page:searchEntityCard",FB_PAGE_MESSAGE_RECEIVED:"fb_page:message_received",FB_PAGE_PAGE_HOVERCARD:"fb_page:page_hovercard",FB_PAGE_QUESTION_TRIGGERED_CONVO:"fb_page:question_triggered_convo",FB_PAGE_DEFAULT_NATIVE_TEMPLATES_CTA:"fb_page:default_native_templates_cta",FB_PAGE_LAUNCHPAD_MORE_DRAWER:"fb_page:launchpad_more_drawer",FB_PAGE_LAUNCHPAD_HEADER:"fb_page:launchpad_header",FB_PAGE_LAUNCHPAD_FOOTER:"fb_page:launchpad_footer",BROADCAST:"broadcast",CUSTOMER_CHAT_PLUGIN:"customer_chat_plugin",NULL_STATE_CTA:"null_state_cta",INSTANT_GAMES:"instant_games",INSTANT_GAMES_ADMIN_INTRO:"instant_games:admin_intro",SEND_TO_MESSENGER_PLUGIN:"send_to_messenger_plugin",FB_HEADER_DOCK:"fb_header_dock",FB_HEADER_DOCK_LOADED_FROM_BROWSER_COOKIE:"fb_header_dock:loaded_from_browser_cookie",FB_HEADER_DOCK_JEWEL_THREAD:"fb_header_dock:jewel_thread",FB_HEADER_DOCK_JEWEL_SEE_ALL_MESSAGES:"fb_header_dock:jewel_see_all_messages",PAGES_PLUGIN:"pages_plugin",PAGES_PLUGIN_MESSAGE_TAB:"pages_plugin:message_tab",FB_LOGIN_ALERTS:"fb_login_alerts",WORK_CHAT:"work_chat",WORK_CHAT_WORK_IDS:"work_chat:work_ids",WORK_CHAT_EMAIL:"work_chat:email",CHECKBOX_PLUGIN:"checkbox_plugin",DEPRECATED:"deprecated",DEPRECATED_BUSINESS_ON_MESSENGER:"deprecated:business_on_messenger",DEPRECATED_ADMIN_MESSAGES:"deprecated:admin_messages",DEPRECATED_PIXEL_EVENT:"deprecated:pixel_event",DEPRECATED_NULL_STATE_CTA:"deprecated:null_state_cta",DEPRECATED_SUBSCRIPTIONS:"deprecated:subscriptions",FB_JOB:"fb_job",FB_JOB_JOB_APPLICATION:"fb_job:job_application",M:"m",FB_EVENT:"fb_event",FB_EVENT_MESSAGE_HOST:"fb_event:message_host",UNKNOWN:"unknown",UNKNOWN_BNP_PSID:"unknown:bnp_psid",UNKNOWN_ORGANIC_POST:"unknown:organic_post",IG_FEED:"ig_feed",IG_FEED_ORGANIC_POST:"ig_feed:organic_post",DYNAMIC_LOCAL_ADS:"dynamic_local_ads"})}),null);