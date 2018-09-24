if (self.CavalryLogger) { CavalryLogger.start_js(["9pdg9"]); }

__d("NotifType",[],(function(a,b,c,d,e,f){e.exports={LIKE:"like",OPEN_GRAPH_ACTION_LIKE:"open_graph_action_like",LIKE_TAGGED:"like_tagged",PAGE_FAN:"page_fan",IG_MEDIA_LIKE:"ig_media_like",FEEDBACK_REACTION_GENERIC:"feedback_reaction_generic",FEEDBACK_REACTION_GENERIC_TAGGED:"feedback_reaction_generic_tagged",MESSENGER_REACTIONS:"messenger_reactions",MARKETPLACE_RECEIVED_RATING:"marketplace_received_rating",MARKETPLACE_RECEIVED_RATING_COMPLETED:"marketplace_received_rating_completed"}}),null);
__d("NotificationGenericBucket",["NotificationSeenState"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a){this.$2=[],this.$3={},this.$4={},this.$7=function(a,b){a=this.$4[a];b=this.$4[b];return Number(b)-Number(a)}.bind(this),this.$1=a}a.prototype.reset=function(){this.$2=[],this.$3={},this.$4={}};a.prototype.getType=function(){return this.$1.bucket_type};a.prototype.getTitle=function(){return this.$1.title};a.prototype.getSortedIDs=function(){return this.$2.slice()};a.prototype.insertIfEligible=function(a){var b=this.$5(a);if(!b.eligible)return b;this.$6(a);return{eligible:!0}};a.prototype.remove=function(a){if(!this.$3[a])return!1;delete this.$3[a];delete this.$4[a];a=this.$2.indexOf(a);a>-1&&this.$2.splice(a,1);return!0};a.prototype.$6=function(a){__p&&__p();var b=a.alert_id;if(this.$3[b])return!0;this.$2.push(b);this.$3[b]=!0;var c=this.$8(this.$1.sort_key_index);if(c>-1){a=a.sort_keys?a.sort_keys[c]:null;a&&(this.$4[b]=a,this.$9())}return!0};a.prototype.$9=function(){this.$2.sort(this.$7)};a.prototype.$5=function(a){__p&&__p();if(!this.$10(a))return{eligible:!1,type:"bucket",data:a.eligible_buckets};if(!this.$11(a))return{eligible:!1,type:"exp_time"};if(!this.$12(a))return{eligible:!1,type:"seen_filter"};if(!this.$13(a))return{eligible:!1,type:"max_count"};if(!this.$14(a))return{eligible:!1,type:"seen_evict",data:this.$15(a)};return!this.$16(a)?{eligible:!1,type:"read_evict"}:{eligible:!0}};a.prototype.$8=function(a){return Number.isInteger(a)?Number(a):-1};a.prototype.$10=function(a){return!a.eligible_buckets?!1:a.eligible_buckets.includes(this.getType())};a.prototype.$12=function(a){return b("NotificationSeenState").validateFilter(a.alert_id,this.$1.seen_filter)};a.prototype.$11=function(a){var b=this.$8(this.$1.min_to_expire);return b===-1?!0:Date.now()-a.creation_time<b*60*1e3};a.prototype.$13=function(a){a=this.$8(this.$1.max_count);return a===-1?!0:this.$2.length<a};a.prototype.$15=function(a){var b=this.$8(this.$1.sec_to_evict_seen);return{secToEvict:b,firstTime:a.first_seen_time||0,currentTime:Date.now()/1e3}};a.prototype.$17=function(a){var b=this.$8(this.$1.sec_to_evict_read);return{secToEvict:b,firstTime:a.first_read_time||0,currentTime:Date.now()/1e3}};a.prototype.$18=function(a){var b=a.secToEvict,c=a.firstTime;a=a.currentTime;return b===-1||c===0?!0:a-c<b};a.prototype.$14=function(a){return this.$18(this.$15(a))};a.prototype.$16=function(a){return this.$18(this.$17(a))};a.prototype.$19=function(a){return!0};e.exports=a}),null);
__d("NotificationServerTransport",["invariant","DOM","UIPagelet","compactArray","ifRequired","objectValues","once","promiseDone","setImmediateAcrossTransitions","uniqueID"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();var h={},i={},j={},k={};function l(a){k[a]==null&&(k[a]=b("DOM").create("div",{"class":"hidden_elem",id:a}),b("DOM").appendContent(document.documentElement,k[a]));return k[a].id}function m(a){return a.reduce(function(a,b){b=b.targetNumToLoad;return Math.max(a,b)},0)}function n(a,b){var c=b.getHash(),d=h[c];if(!d||d.clientRequestID!==a)return;delete h[c];d.calls.forEach(function(a){a=a.onCompleted;a&&a()});i[c]!=null&&p(b)}function o(a,b,c){var d=b.getHash(),e=h[d];if(!e||e.clientRequestID!==a)return;delete h[d];e.calls.forEach(function(a){a=a.onError;a&&a(c)});i[d]!=null&&p(b)}function p(a){__p&&__p();var c=a.getHash();if(j[c]!=null)return;j[c]=b("setImmediateAcrossTransitions")(function(){__p&&__p();delete j[c];var d=b("uniqueID")(),e=i[c];delete i[c];if(e==null)return;var f=m(e);f=a.getRequestParams(f);if(f.length<=0){e.forEach(function(a){a=a.onCompleted;a&&a()});return}var k=function(b){o(d,a,b.toError())},n=a.getStreamingTransportPageletName();n!=null||g(0,undefined,a.getHash());n=b("UIPagelet").loadFromEndpoint(n,l(d),babelHelpers["extends"]({},f,{clientRequestID:d}),{allowIrrelevantRequests:!0,automatic:!1,crossPage:!0,errorHandler:k,jsNonblock:!0,transportErrorHandler:k,usePipe:!0,usePostRequest:!1});h[c]={calls:e,clientRequestID:d,endpointState:a,transport:n}})}a={makeRequest:function(a,b,c){__p&&__p();var d=c.onChunkResponse,e=c.onCompleted;c=c.onError;var f=a.getHash(),j={onChunkResponse:d,onCompleted:e,onError:c,targetNumToLoad:b};s(f);d=h[f];e=d?m(d.calls)>=b:!1;e?(d!=null||g(0,undefined),d.calls.push(j)):(i[f]==null&&(i[f]=[]),i[f].push(j),d==null&&p(a));return{remove:function(){__p&&__p();var b=h[f];if(b!=null){var c=b.calls.indexOf(j);c!==-1&&b.calls.splice(c,1);b.calls.length===0&&(b.transport&&b.transport.abandon(),delete h[f],i[f]!=null&&p(a))}c=i[f];if(c!=null){b=c.indexOf(j);b!==-1&&c.splice(b,1)}}}},handleResponseChunk:function(a,b){a=q(a);a.forEach(function(a){a(b)})},handleRequestCompleted:function(a){var c=b("objectValues")(h).find(function(b){return b&&b.clientRequestID===a});c||g(0,undefined,a);n(a,c.endpointState)},handleRequestFailed:function(a,c){__p&&__p();var d=b("objectValues")(h).find(function(b){return b&&b.clientRequestID===a});d||g(0,undefined,a);var e=d.endpointState.getHash(),f=h[e];if(!f||f.clientRequestID!==a)return;delete h[e];f.calls.forEach(function(a){a=a.onError;a&&a(new Error(c))});i[e]!=null&&p(d.endpointState)}};function q(a){__p&&__p();var c=Object.keys(h).find(function(b){b=h[b];return b&&b.clientRequestID===a}),d=c&&h[c];if(!d||!c)return[];d=d.calls;c=i[c];c&&(d=d.concat(c));return b("compactArray")(d.map(function(a){return a.onChunkResponse}))}function r(a,c){__p&&__p();var d=c.targetNumToLoad,e=c.endpointState;c=c.payloadPromise;if(h[a]!=null)return;var f=b("uniqueID")();d={calls:[{targetNumToLoad:d}],clientRequestID:f,endpointState:e};h[a]=d;c||g(0,undefined);a=c.then(function(a){var b=q(f);b.forEach(function(b){b(a)})});b("promiseDone")(a["finally"](function(){n(f,e)}))}c=function(a){b("ifRequired")("NotificationEagerLoader",function(b){b=b.eagerlyLoadedData;b.hasData&&a===b.endpointState.getHash()&&r(a,b)})};var s=b("once")(c);e.exports=a}),null);
__d("NotificationStore",["FBLogger","NotificationConstants","NotificationEndpointState","NotificationServerTransport","NotificationUpdates","createObjectBy","distinctArrayBy","flatMapArray","objectValues","sortBy"],(function(a,b,c,d,e,f){__p&&__p();var g={};function h(a,b,c){return a.page_info!=null&&b.classification==c.classification&&b.endpointControllerName===c.endpointControllerName&&b.environment==c.environment&&b.readness==c.readness}function i(a,c){__p&&__p();var d={};b("NotificationEndpointState").getAllInstances(c.endpointControllerName).forEach(function(e){var f;h(a,e,c)?(e.graphQLPageInfo=a.page_info,f=a):a.payloadsource===b("NotificationConstants").PayloadSourceType.SYNC&&c.endpointControllerName==="WebNotificationsPayloadPagelet"&&e.classification==null&&e.readness==null?f=a:f=babelHelpers["extends"]({},a,{nodes:a.nodes?a.nodes.filter(function(a){return j(a,e)}):undefined});if(f.nodes&&f.nodes.length>0){f=k(e,f);f!=null&&f.forEach(function(a){d[a]=!0})}});b("NotificationUpdates").didUpdateNotifications(Object.keys(d))}function j(a,b){__p&&__p();var c=b.classification,d=b.notifications,e=b.order;b=b.readness;e=e.getAllResources();e.length===0;if(e.length>0){e=e[0];d=d.getResource(e);if(d.creation_time>=a.creation_time)return!1}if(c&&(!a.classifications||!a.classifications.includes(c)))return!1;return b&&b==="SEEN_AND_READ"!==(a.seen_state==="SEEN_AND_READ")?!1:!0}function k(a,b){var c=[],d={};b.nodes&&b.nodes.length>0&&b.nodes.forEach(function(b){var e=b.alert_id,f=a.notifications.getResource(e);(!f||f.creation_time<b.creation_time)&&(c.push(e),d[e]=b)});a.notifications.addResourcesAndExecute(d);a.order.addResources(c);return c}b("NotificationUpdates").subscribe("update-notifications",function(a,c){c.payloadsource!==b("NotificationConstants").PayloadSourceType.ENDPOINT&&i(c,{endpointControllerName:c.endpoint!=null?c.endpoint:"WebNotificationsPayloadPagelet"})});var l={getNotifications:function(a,c,d){__p&&__p();var e=b("NotificationEndpointState").getInstance(c),f=e.notifications,h=e.order,j,k=h.executeOrEnqueue(0,a,function(a){if(d){j=f.executeOrEnqueue(a,d);a=f.getUnavailableResources(j);a.length>0&&b("FBLogger")("notifications").warn("The range for this endpoint contained notification IDs for which we have no payload (Notification IDs: %s, Endpoint config: %s)",JSON.stringify(a),JSON.stringify(e.getConfig()))}});function m(){h.unsubscribe(k),j&&f.unsubscribe(j)}if(h.getUnavailableResources(k).length===0)return{remove:m};if(!l.canFetchMore(c)){h.forceRunCallbacks();return{remove:m}}var n=e.getHash();g[n]==null?g[n]=1:g[n]++;function o(){g[n]--,g[n]===0&&h.forceRunCallbacks()}function p(a){if(!(a&&a.nodes))return;b("NotificationUpdates").handleUpdate(b("NotificationConstants").PayloadSourceType.ENDPOINT,a,c.readness,c.classification);i(babelHelpers["extends"]({},a,{payloadsource:b("NotificationConstants").PayloadSourceType.ENDPOINT}),c)}function q(){g[n]--,g[n]===0&&h.forceRunCallbacks()}a=b("NotificationServerTransport").makeRequest(e,a,{onChunkResponse:p,onCompleted:q,onError:o});var r=a.remove;return{remove:function(){m(),r()}}},getNotification:function(a,c){c=c===void 0?{}:c;var d=c.classification,e=c.endpointControllerName;e=e===void 0?"WebNotificationsPayloadPagelet":e;c=c.readness;d=b("NotificationEndpointState").getInstance({classification:d,endpointControllerName:e,readness:c});e=d.notifications;return e.getResource(a)},getAllForAllEndpoints:function(){__p&&__p();var a=b("NotificationEndpointState").getAllInstances();a=b("flatMapArray")(a,function(a){a=this.getAll(a.getConfig());return b("objectValues")(a)}.bind(this));a=b("sortBy")(a,function(a){return a.creation_time});a=a.reverse();a=b("distinctArrayBy")(a,function(a){return a.alert_id});return b("createObjectBy")(a,function(a){return a.alert_id})},getAll:function(a){var c=b("NotificationEndpointState").getInstance(a),d=c.notifications;c=c.order;var e={};c.getAllResources().forEach(function(c){var f=d.getResource(c);f==null?b("FBLogger")("notifications").warn("The range for this endpoint contained a notification ID for which we have no payload (Notification ID: %s, Endpoint config: %s)",c,JSON.stringify(a)):e[c]=f});return e},getCount:function(a){a=b("NotificationEndpointState").getInstance(a);return a.order.getAllResources().length},canFetchMore:function(a){a=b("NotificationEndpointState").getInstance(a);a=a.graphQLPageInfo;return!a||!Object.prototype.hasOwnProperty.call(a,"has_next_page")||a.has_next_page},registerEndpoint:function(a){b("NotificationEndpointState").getInstance(a)}};l.registerEndpoint({endpointControllerName:"WebNotificationsPayloadPagelet"});e.exports=l}),null);
__d("NotificationBucketStore",["Arbiter","Banzai","JSLogger","NotificationConstants","NotificationGenericBucket","NotificationsBucketList","NotificationStore","NotificationUpdates"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("NotificationConstants").PayloadSourceType,h=[],i={},j={},k=[],l=!1,m={},n={},o="notif_jewel_buckets";a=function(){if(l)return;l=!0;b("NotificationsBucketList").buckets.forEach(function(a){a.bucket_type=a.bucket_type.toUpperCase();a=new(b("NotificationGenericBucket"))(a);h.push(a);i[a.getType()]=a});y()};var p=function(){k=h.map(function(a){return{ids:a.getSortedIDs(),title:a.getTitle()||"",bucketType:a.getType()}})},q=function(a){__p&&__p();var b=a.alert_id;m[b]||(m[b]=[]);var c=[];for(var d=0,e=h.length;d<e;d++){var f=h[d],g=f.insertIfEligible(a);c.push({bucket:f.getType(),result:g});if(g.eligible){m[b].push(c);s(a,f);return f.getType()}}m[b].push(c);return null},r=function(a,c){__p&&__p();var d="PRIORITY_INBOX";if(!i[d]||c.getType()===d)return;c=a.alert_id;if(n[c]||a.creation_time>Date.now()/1e3-60*60){d=m[c];d=d[d.length-1]||[];a={notif_data:{alert_id:a.alert_id.split(":")[1],creation_time:a.creation_time,eligible_buckets:a.eligible_buckets,first_seen_time:a.first_seen_time,notif_type:a.notif_type,seen_state:a.seen_state,sort_keys:a.sort_keys},eviction_data:d,was_live_send:n[c]===!0,priority_eviction_reason:d[0]?d[0].result.type:null};b("Banzai").post(o,{event_type:"bucketing_error",data:a})}},s=function(a,b){j[a.alert_id]=b.getType(),r(a,b)},t=function(a,b){delete j[a.alert_id]},u=function(a){var b=a.alert_id,c=v(b);if(c){c=w(c);c&&(c.remove(b),t(a,c))}q(a)},v=function(a){return j[a]},w=function(a){return i[a]},x=function(){j={},h.forEach(function(a){return a.reset()}),m={},p()},y=function(){var a=b("NotificationStore").getAll({endpointControllerName:"WebNotificationsPayloadPagelet"});z(Object.keys(a).map(function(b){return a[b]}))},z=function(a){a.forEach(u),p()};b("NotificationUpdates").subscribe("update-notifications",function(a,b){if(!b.nodes||b.nodes.length===0)return;b.payloadsource===g.LIVE_SEND?(b.nodes.forEach(function(a){return n[a.alert_id]=!0}),x(),y()):b.nodes&&(b.nodes.forEach(function(a){return n[a.alert_id]=!1}),z(b.nodes))});b("Arbiter").subscribe(b("JSLogger").DUMP_EVENT,function(a,b){b.notifs_bucket_data={bucketInfo:k,data:k.reduce(function(b,a){a=a.ids.map(function(a){return{id:a,results:m[a]}});return[].concat(b,a)},[])}});a();c={getBucketListData:function(){return k},isEmptyBucketListData:function(){var a=k.reduce(function(a,b){return a+b.ids.length},0);return a===0}};e.exports=c}),null);
__d("NotificationHiddenState",["NotificationConstants","NotificationUpdates","isEmpty"],(function(a,b,c,d,e,f){__p&&__p();var g={};b("NotificationUpdates").subscribe("update-notifications",function(a,c){a=c.nodes;c=c.payloadsource;if(c===b("NotificationConstants").PayloadSourceType.LIVE_SEND&&a&&a.length){var d={};a.forEach(function(a){a=a.alert_id;g[a]&&(d[a]=!1)});b("isEmpty")(d)||(g=Object.assign(g,d),b("NotificationUpdates").didUpdateHiddenState(Object.keys(d)))}});b("NotificationUpdates").subscribe("update-hidden",function(a,c){if(c.hiddenState){a=c.hiddenState;g=Object.assign(g,a);b("NotificationUpdates").didUpdateHiddenState(Object.keys(a))}});a={isHidden:function(a){return g[a]?g[a]:!1}};e.exports=a}),null);
__d("BizChromeNotifTab",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({ACCOUNT:"account",ALL:"all",PAGES:"pages"})}),null);
__d("NotificationVPVs",["MarauderLogger","getElementRect"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=new Set();function a(a){if(h(a))return;b("MarauderLogger").log("notifications_vpv",undefined,null,"notification",a);g.add(a)}function h(a){return g.has(a)}function c(){g.clear()}function d(a,b){return!a||!b?!1:!(a.bottom<b.top||a.top>b.bottom||a.right<b.left||a.left>b.right)}function f(a){a=b("getElementRect")(a);return!a||a.top==0&&a.bottom==0&&a.left==0&&a.right==0?null:a}a={logImpression:a,clearImpressions:c,hasLoggedImpression:h,getValidatedRectangle:f,areRectsOverlapping:d};e.exports=a}),null);
__d("NotificationList.react",["regeneratorRuntime","Promise","Arbiter","BizChromeNotifTab","FunnelLogger","NotificationBucketStore","NotificationConstants","NotificationHiddenState","NotificationJewelFunnelLoggingConstants","NotificationSeenState","NotificationStore","NotificationUpdates","NotificationUserActions","NotificationVPVs","NotifType","React","SubscriptionsHandler","TimeSlice","createCancelableFunction","getObjectValues","isEmpty","mapObject","retry"],(function(a,b,c,d,e,f){__p&&__p();var g,h=b("NotificationJewelFunnelLoggingConstants").FUNNEL_LOGGING_EVENT,i=b("NotificationJewelFunnelLoggingConstants").FUNNEL_LOGGING_NAME;a=b("React").PropTypes;var j=b("NotificationConstants").PayloadSourceType.LIVE_SEND,k=3,l="notification_clicked";function m(a){return{classification:a.classification,endpointControllerName:a.endpoint!=null?a.endpoint:"WebNotificationsPayloadPagelet",environment:a.environment,readness:a.readness}}c=babelHelpers.inherits(n,b("React").Component);g=c&&c.prototype;function n(a){__p&&__p();var c;for(var d=arguments.length,e=new Array(d>1?d-1:0),f=1;f<d;f++)e[f-1]=arguments[f];(c=g.constructor).call.apply(c,[this,a].concat(e));this.$1={};this.$2=!1;this.$3=new(b("SubscriptionsHandler"))();this.$4=0;this.$9=function(){this.setState({retryLimitReached:!1}),this.$10()}.bind(this);this.$11=function(){var a={};Object.keys(this.$1).forEach(function(c){var d=b("NotificationHiddenState").isHidden(c);d!=this.state.hiddenState[c]&&(a[c]=d)}.bind(this));b("isEmpty")(a)||this.setState({hiddenState:babelHelpers["extends"]({},this.state.hiddenState,a)});this.$1={};this.$8(b("NotificationStore").getCount(m(this.props)))}.bind(this);this.$12=function(a,c,d){if(this.state.currentlyFetching||!this.state.canFetchMore)return;a&&(b("FunnelLogger").appendAction(i,h.FETCH_NEXT_SET),this.$10());this.$13(c,d)}.bind(this);this.$14=function(){this.setState({showingChevron:!0})}.bind(this);this.$15=function(){this.setState({showingChevron:!1})}.bind(this);this.$18=function(a){this.props.onClick&&this.props.onClick(a),b("Arbiter").inform(l,{endpointConfig:m(this.props),alertID:a})}.bind(this);this.$19=function(a){if(this.props.paused&&this.props.readness==="UNREAD"){var b=babelHelpers["extends"]({},this.state.readWhilePausedOrNavigating);b[a]=!0;this.setState({readWhilePausedOrNavigating:b})}}.bind(this);this.$20=function(a){this.$4=a}.bind(this);var j=m(a);b("NotificationStore").registerEndpoint(j);var k=b("NotificationStore").getAll(j);this.state={currentlyFetching:!1,canFetchMore:b("NotificationStore").canFetchMore(j),notifs:k,hiddenState:b("mapObject")(k,function(a,c){return b("NotificationHiddenState").isHidden(c)}),readState:b("mapObject")(k,function(a,c){return b("NotificationSeenState").isRead(c)}),showingChevron:!1,readWhilePausedOrNavigating:{},retryLimitReached:!1}}n.prototype.UNSAFE_componentWillMount=function(){"use strict";__p&&__p();b("FunnelLogger").appendAction(i,h.FETCH_NOTIFICATIONS),this.$3.addSubscriptions(b("NotificationUpdates").subscribe("notifications-updated",function(a,c){if(c.source==j&&!b("isEmpty")(c.updates)){this.$2=!0;a=this.props.paused;if(a){this.$1=babelHelpers["extends"]({},this.$1,c.updates);return}}this.$5(b("NotificationStore").getAll(m(this.props)))}.bind(this)),b("NotificationUpdates").subscribe(["hidden-state-updated","read-state-updated"],function(a,c){__p&&__p();if(a=="hidden-state-updated"){if(c.source!==j||!this.props.paused){a=b("mapObject")(c.updates,function(a,c){return b("NotificationHiddenState").isHidden(c)});this.setState({hiddenState:babelHelpers["extends"]({},this.state.hiddenState,a)})}}else{a=b("mapObject")(c.updates,function(a,c){return b("NotificationSeenState").isRead(c)});this.setState({readState:babelHelpers["extends"]({},this.state.readState,a)})}}.bind(this)))};n.prototype.componentWillUnmount=function(){"use strict";this.$3.release()};n.prototype.UNSAFE_componentWillReceiveProps=function(a){"use strict";if(!this.$6(a)&&a.paused)return;if(this.props.enableHubView&&this.props.readness==="UNREAD")return;this.setState({readWhilePausedOrNavigating:{}})};n.prototype.$6=function(a){"use strict";return a.classification!==this.props.classification||a.readness!==this.props.readness};n.prototype.$7=function(a){"use strict";var b=Object.keys(this.state.notifs),c=Object.keys(a).filter(function(a){return!this.state.notifs[a]}.bind(this));b=b.concat(c);var d={};b.forEach(function(b){this.$1[b]?this.state.notifs[b]&&(d[b]=this.state.notifs[b]):d[b]=a[b]||this.state.notifs[b]}.bind(this));return d};n.prototype.$5=function(a){"use strict";a=b("isEmpty")(this.$1)?a:this.$7(a);var c={},d={};b("getObjectValues")(a).forEach(function(a){a=a.alert_id;c[a]=b("NotificationSeenState").isRead(a);d[a]=b("NotificationHiddenState").isHidden(a)});var e=m(this.props);this.setState({notifs:a,canFetchMore:b("NotificationStore").canFetchMore(e)||b("NotificationStore").getCount(e)!==Object.keys(a).length,readState:babelHelpers["extends"]({},this.state.readState,c),hiddenState:babelHelpers["extends"]({},this.state.hiddenState,d)})};n.prototype.$8=function(a){"use strict";__p&&__p();var c,d,e;return b("regeneratorRuntime").async(function(f){__p&&__p();while(1)switch(f.prev=f.next){case 0:this.setState({currentlyFetching:!0});c=m(this.props);d=b("createCancelableFunction")(function(){this.setState({currentlyFetching:!1,retryLimitReached:!0})}.bind(this));this.$3.addSubscriptions({remove:function(){d.cancel()}});e=b("retry").limit(k).onError().withBackoff(2).withInterval(100).withJitter(.1);f.prev=5;f.next=8;return b("regeneratorRuntime").awrap(e.call(function(){return new(b("Promise"))(function(d,f){var g=b("NotificationStore").getNotifications(a,c,function(e){this.$5(e),Object.keys(e).length<a&&b("NotificationStore").canFetchMore(c)?f():d()}.bind(this)),h=g.remove;this.$3.addSubscriptions({remove:function(){h(),e.abort(),f()}})}.bind(this))}.bind(this)));case 8:this.setState({currentlyFetching:!1});f.next=18;break;case 11:f.prev=11;f.t0=f["catch"](5);if(!(f.t0 instanceof b("retry").RetryError)){f.next=17;break}d();f.next=18;break;case 17:throw f.t0;case 18:case"end":return f.stop()}},null,this,[[5,11]])};n.prototype.$10=function(){"use strict";if(!this.state.currentlyFetching){var a=Object.keys(this.state.notifs).length;this.$8(a+this.props.numPerPage)}};n.prototype.$13=function(a,c){"use strict";__p&&__p();if(!a||!c)return;for(var d=0,e=a.children.length;d<e;d++){var f=a.children[d];if(f){var g=f.getAttribute("data-alert-id");if(g&&!b("NotificationVPVs").hasLoggedImpression(g)){f=b("NotificationVPVs").getValidatedRectangle(f);f&&b("NotificationVPVs").areRectsOverlapping(c,f)&&b("NotificationVPVs").logImpression(g)}}}};n.prototype.$16=function(a){"use strict";a=Math.max(this.props.numPerPage,Math.ceil(this.$4));a>0&&this.$8(a)};n.prototype.$17=function(a){"use strict";var c=b("NotificationSeenState").getUnseenIDs();b("isEmpty")(this.$1)||(c=c.filter(function(a){return!this.$1[a]}.bind(this)));c.length&&(this.props.paused||this.props.enableHubView)&&b("TimeSlice").guard(function(){return b("NotificationUserActions").markNotificationsAsSeen(c,this.props.sourceView)}.bind(this),"NotificationList _populateList markNotificationsAsSeen",{propagationType:b("TimeSlice").PropagationType.ORPHAN})();this.props.hasEverBeenOpened&&((!a||!a.hasEverBeenOpened)&&this.$16(c))};n.isReaction=function(a){"use strict";return a===b("NotifType").LIKE||a===b("NotifType").OPEN_GRAPH_ACTION_LIKE||a===b("NotifType").LIKE_TAGGED||a===b("NotifType").PAGE_FAN||a===b("NotifType").IG_MEDIA_LIKE||a===b("NotifType").FEEDBACK_REACTION_GENERIC||a===b("NotifType").FEEDBACK_REACTION_GENERIC_TAGGED||a===b("NotifType").MESSENGER_REACTIONS};n.prototype.componentDidUpdate=function(a){"use strict";__p&&__p();this.$17(a);if(a.paused&&!this.props.paused){this.$2=!1;var b=setTimeout(this.$11,0);this.$3.addSubscriptions({remove:function(){clearTimeout(b)}});return}if(this.props.paused&&this.$6(a)){var c=setTimeout(this.$11,0);this.$3.addSubscriptions({remove:function(){clearTimeout(c)}});return}};n.prototype.componentDidMount=function(){"use strict";this.$17()};n.prototype.render=function(){"use strict";__p&&__p();var a=this.props.listRenderer,c=this.state,d=c.notifs,e=c.readState,f=c.readWhilePausedOrNavigating,g={};this.props.readness==null?g=d:Object.keys(d).forEach(function(a){a=d[a];var b=a.alert_id,c=e[b];this.props.readness==="UNREAD"&&(c=!c||Object.prototype.hasOwnProperty.call(f,b));c&&(g[b]=a)}.bind(this));if(this.props.hideReactions){var h={};Object.keys(g).forEach(function(a){a=d[a];n.isReaction(a.notif_type)||(h[a.alert_id]=a)});g=h}var i=this.props.classification;i&&Object.keys(d).forEach(function(a){a=d[a];(!a.classifications||!a.classifications.includes(i))&&delete g[a.alert_id]});c=Object.values(this.state.notifs)[0];this.props.latestNotifCreationTime?Object.keys(d).forEach(function(a){a=d[a];a.creation_time>this.props.latestNotifCreationTime&&delete g[a.alert_id]}.bind(this)):c&&c.creation_time&&(this.props.onTabOpenedFirstTime&&this.props.onTabOpenedFirstTime(this.props.notifTab||b("BizChromeNotifTab").ALL,c.creation_time));c=b("NotificationBucketStore").isEmptyBucketListData()?null:b("NotificationBucketStore").getBucketListData();return b("React").createElement(a,{paused:this.props.paused,isFlyoutOpened:this.props.isFlyoutOpened,target:this.props.target,tracking:this.props.tracking,shortenTimestamp:this.props.shortenTimestamp,sourceView:this.props.sourceView,maxHeight:this.props.maxHeight,useChevron:this.props.useChevron,chevronType:this.props.chevronType,buckets:c,notifs:g,afterScroll:this.$12,onChevronShow:this.$14,onChevronHide:this.$15,currentlyFetching:this.state.currentlyFetching,canFetchMore:this.state.canFetchMore,hiddenState:this.state.hiddenState,readState:this.state.readState,showingChevron:this.state.showingChevron,shouldScroll:this.$2,upsell:this.props.upsell||null,isRHC:this.props.isRHC,enableMarkUnread:this.props.enableMarkUnread,onClick:this.$18,onRead:this.$19,onNumNotificationsViewableChange:this.$20,onResetRetryCount:this.$9,retryLimitReached:this.state.retryLimitReached})};n.propTypes={hasEverBeenOpened:a.bool,enableHubView:a.bool,enableMarkUnread:a.bool,maxHeight:a.number,paused:a.bool,isFlyoutOpened:a.bool,tracking:a.string,useChevron:a.bool,chevronType:a.string,numPerPage:a.number.isRequired,listRenderer:a.func.isRequired,upsell:a.object,endpoint:a.string,environment:a.string,readness:a.string,classification:a.string};e.exports=n}),null);
__d("NotificationListDelightUtils",["RelationshipDelightUtils"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=-1;a={canShowHeartDelight:function(a,c,d){if(c)return!1;if(!b("RelationshipDelightUtils").shouldHeartNotification(a))return!1;(g<0||g>d)&&(g=d);return!0},getFirstDelightRow:function(){return g}};e.exports=a}),null);
__d("NotificationListDelights.react",["cx","BootloadedComponent.react","JSResource","NotificationListDelightUtils","NotificationSeenState","React","RelationshipDelightUtils"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();-1;function a(a){var c=a.rowIndex;a=a.notification;a=a.alert_id;var d=b("NotificationListDelightUtils").getFirstDelightRow()===c&&!b("NotificationSeenState").isSeen(a)?1:2;b("RelationshipDelightUtils").logNotificationAnimation(a,d,c);return b("React").createElement("div",{className:"_3u5l _3u5m"},b("React").createElement(b("BootloadedComponent.react"),{bootloadPlaceholder:b("React").createElement("div",null),bootloadLoader:b("JSResource")("RelationshipDelightsActorAnimation.react").__setRef("NotificationListDelights.react"),animationPhase:d}))}e.exports=a}),null);
__d("NotificationListItem.react",["cx","Bootloader","Event","GamingDestinationEntrypoints","Keys","Link.react","NotificationListConfig","NotificationListDelights.react","NotificationListDelightUtils","NotificationListItemBaseModule","NotificationListRendererUtils","NotificationURI","NotificationUserActions","PageTransitions","React","URI"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();var h,i=b("NotificationListItemBaseModule").NotificationListItemBase;c=babelHelpers.inherits(a,b("React").Component);h=c&&c.prototype;function a(){__p&&__p();var a,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return c=(a=h.constructor).call.apply(a,[this].concat(e)),this.$5=function(a){__p&&__p();a=this.props.notification;var c=a.primerAttributes;a=a.url;if(c&&c.ajaxify){c=new(b("URI"))(c.ajaxify);c=c.getQueryData();var d=c.app_id,e=c.page_id,f=c.post_id,g=c.ref;g==="aymt_auto_opened_dialog"&&b("Bootloader").loadModules(["BoostedComponentAYMTActionsV2"],function(a){a.aymtAutoOpenDialogLinkClick(d,e,f,g)},"NotificationListItem.react")}else if(a){c=new(b("URI"))(a);a=c.getQueryData();var h=a.aymt_tip;a=a.external_ref;h==="1"&&b("PageTransitions").go(c.addQueryData("aymt_link_click",Date.now()));a===b("GamingDestinationEntrypoints").LIVE_NOTIFICATION&&b("PageTransitions").go(c)}}.bind(this),this.$6=function(a){this.props.onClick&&this.props.onClick(this.$4()),this.$7(a),b("NotificationListRendererUtils").openNotification(a,this.props.notification),b("NotificationListRendererUtils").startTTLMarkers(a,this.props.notification)}.bind(this),this.$8=function(a){if(b("Event").getKeyCode(a.nativeEvent)==b("Keys").RETURN){var c=this.$4();this.props.onSelected&&this.props.onSelected(c);this.$7(a)}}.bind(this),this.$7=function(a){var c=this.$4();this.props.onRead&&a&&this.props.onRead(c);b("NotificationUserActions").markNotificationsAsRead([c],this.props.sourceView)}.bind(this),this.$9=function(){var a=this.$4();b("NotificationUserActions").markNotificationsAsUnread([a],this.props.sourceView)}.bind(this),this.$11=function(a){var c;b("NotificationListRendererUtils").isStoryOnlyLiveVideoNotification(this.props.notification)||(c=b("NotificationURI").localize(new(b("URI"))(this.props.notification.url)));return b("React").createElement("a",babelHelpers["extends"]({},this.props.notification.primerAttributes,{target:this.props.target,href:c,role:"button",tabIndex:0,className:"_33e _1_0e",onClick:this.$5,onClickCapture:this.$6,onKeyUp:this.$8}),a,this.$10())}.bind(this),c}a.prototype.$2=function(){return b("NotificationListConfig").canMarkUnread||(this.props.enableHubView||!1)&&b("NotificationListConfig").canMarkUnreadInHub};a.prototype.$3=function(){var a=this.props,c=a.notification,d=a.isRead;a=a.rowIndex;return b("NotificationListDelightUtils").canShowHeartDelight(c,d,a)};a.prototype.$4=function(){return this.props.notification.alert_id};a.prototype.$10=function(){return!this.$3()||!this.props.paused?null:b("React").createElement(b("NotificationListDelights.react"),{notification:this.props.notification,rowIndex:this.props.rowIndex})};a.prototype.render=function(){return b("React").createElement(i,babelHelpers["extends"]({},this.props,{canMarkUnread:this.$2(),hasCustomForeground:this.$3(),renderLink:this.$11,onMarkItemRead:this.$7,onMarkItemUnread:this.$9,hideIcon:!1}))};e.exports=a}),null);
__d("NotificationListPropTypes",["React"],(function(a,b,c,d,e,f){"use strict";a=b("React").PropTypes;c={tracking:a.string,notifs:a.object,afterScroll:a.func,onChevronShow:a.func,onChevronHide:a.func,onRead:a.func,canFetchMore:a.bool,hiddenState:a.object,readState:a.object,showingChevron:a.bool,paused:a.bool,maxHeight:a.number,shouldScroll:a.bool,listItemRenderer:a.func};e.exports=c}),null);
__d("NotificationPageList.react",["cx","fbt","ErrorBoundary.react","Event","LoadingIndicator.react","LogicalGrid.react","NotificationListItem.react","NotificationListPropTypes","NotifTestIDs","React","ReactDOM","Vector","debounce","getObjectValues","getViewportDimensions","isEmpty"],(function(a,b,c,d,e,f,g,h){__p&&__p();var i;c=babelHelpers.inherits(a,b("React").Component);i=c&&c.prototype;function a(){var a,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return c=(a=i.constructor).call.apply(a,[this].concat(e)),this.$5=function(){var a=b("ReactDOM").findDOMNode(this.$2),c=this.$4();this.props.afterScroll&&this.props.afterScroll(this.$3(),a,c)}.bind(this),this.$7=function(){return b("getObjectValues")(this.props.notifs).map(function(a){return JSON.stringify(a)})}.bind(this),c}a.prototype.$3=function(){"use strict";if(!this.$1)return!1;var a=b("ReactDOM").findDOMNode(this.$1);if(!a)return!1;a=b("Vector").getElementPosition(a,"viewport").y;return a<b("Vector").getViewportDimensions().y};a.prototype.$4=function(){"use strict";var a=b("getViewportDimensions").withoutScrollbars();return{top:0,bottom:a.height,left:0,right:a.width}};a.prototype.$6=function(a,b){"use strict";return b.indexOf(a)};a.prototype.componentDidUpdate=function(){"use strict";this.$5()};a.prototype.componentDidMount=function(){"use strict";b("Event").listen(window,"scroll",b("debounce")(this.$5,200)),this.$5()};a.prototype.$8=function(){"use strict";var a=b("getObjectValues")(this.props.notifs).map(function(a){return a.alert_id}),c=this.props.listItemRenderer;return b("getObjectValues")(this.props.notifs).map(function(d,e){var f=d.alert_id,g=this.$6(f,a);return b("React").createElement(b("ErrorBoundary.react"),{key:f},b("React").createElement(c,{getDebugData:this.$7,enableMarkUnread:this.props.enableMarkUnread,isNotifsPage:!0,isRead:this.props.readState[f],isSelected:this.props.selectedID===f,noPhotoPreviews:!0,notification:d,onRead:this.props.onRead,onChevronHide:this.props.onChevronHide,onChevronShow:this.props.onChevronShow,paused:!!this.props.paused,row:g,rowIndex:e,shortenTimestamp:this.props.shortenTimestamp,sourceView:this.props.sourceView,visible:!this.props.hiddenState[f]}))}.bind(this))};a.prototype.render=function(){"use strict";__p&&__p();var a=null,c=null,d=b("React").createElement("ul",{"data-gt":this.props.tracking,"data-testid":b("NotifTestIDs").SEE_ALL_LIST});!b("isEmpty")(this.props.notifs)?a=b("React").createElement(b("LogicalGrid.react"),{ref:function(a){return this.$2=a}.bind(this),component:d},this.$8()):(!this.props.canFetchMore||this.props.retryLimitReached)&&(a=b("React").createElement("div",{className:"_44_s","data-testid":b("NotifTestIDs").SEE_ALL_LIST},h._("No new notifications")));this.props.canFetchMore&&!this.props.retryLimitReached&&(c=b("React").createElement(b("LoadingIndicator.react"),{color:"white",size:"large",ref:function(a){return this.$1=a}.bind(this),className:"_44_t"}));d=null;if(this.props.upsell){var e=this.props.upsell.module;d=b("React").createElement(e,babelHelpers["extends"]({isPage:!0},this.props.upsell.props))}e="_44_u"+(this.props.showingChevron?" _44_v":"");return b("React").createElement("div",{className:e},d,a,c)};a.propTypes=b("NotificationListPropTypes");a.defaultProps={listItemRenderer:b("NotificationListItem.react")};e.exports=a}),null);