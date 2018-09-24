if (self.CavalryLogger) { CavalryLogger.start_js(["HOLGm"]); }

__d("Number.react",["React","formatNumber"],(function(a,b,c,d,e,f){__p&&__p();var g;c=b("React").PropTypes;g=babelHelpers.inherits(a,b("React").Component);g&&g.prototype;a.prototype.render=function(){"use strict";return b("React").createElement("span",null,b("formatNumber").withThousandDelimiters(this.props.value,this.props.decimals))};function a(){"use strict";g.apply(this,arguments)}a.defaultProps={decimals:0};a.propTypes={value:c.number.isRequired,decimals:c.number};e.exports=a}),null);
__d("SpotlightViewerLoggingEvents",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({LOADED:"loaded",LOADING:"loading",ERROR:"error",ABORT:"abort",OPEN_BEGIN:"open_begin",OPEN_COMPLETE:"open_complete",CLOSE_BEGIN:"close_begin",CLOSE_COMPLETE:"close_complete",PAGE_BEGIN:"page_begin",PAGE_COMPLETE:"page_complete",PHOTO_CHANGE_BEGIN:"photo_change_begin",PHOTO_CHANGE_COMPLETE:"photo_change_complete",DATA_FETCH_BEGIN:"data_fetch_begin",DATA_FETCH_COMPLETE:"data_fetch_complete",PHOTO_FETCH:"photo_fetch"})}),null);
__d("PhotoLogger",["Banzai","BanzaiScuba","Event","SpotlightViewerLoggingEvents","SubscriptionsHandler"],(function(a,b,c,d,e,f){__p&&__p();function a(a){"use strict";this.$1=a,this.$2={}}a.prototype.log=function(a,c,d,e){"use strict";b("Banzai").post("profile_photos_view",{photo_fbid:c,source:d,profile_id:e}),this.$2[a]||(this.$3(a),this.$2[a]=!0)};a.prototype.$3=function(a){"use strict";this.$4(b("SpotlightViewerLoggingEvents").LOADING,{uri:a});var c=new(b("SubscriptionsHandler"))(),d=new Image();c.addSubscriptions(b("Event").listen(d,"load",function(){this.$4(b("SpotlightViewerLoggingEvents").LOADED,{uri:a}),c.release()}.bind(this)),b("Event").listen(d,"error",function(){this.$4(b("SpotlightViewerLoggingEvents").ERROR,{uri:a}),c.release()}.bind(this)),b("Event").listen(d,"abort",function(){this.$4(b("SpotlightViewerLoggingEvents").ABORT,{uri:a}),c.release()}.bind(this)));d.src=a};a.prototype.logEvent=function(a){"use strict";this.$4(a)};a.prototype.$4=function(a,c){"use strict";var d=new(b("BanzaiScuba"))("photos_client_loading",null,{addBrowserFields:!0});d.addNormal("event",a);d.addNormal("viewer",this.$1);for(var e in c)d.addNormal(e,c[e]);d.post()};e.exports=a}),null);
__d("PhotosConst",[],(function(a,b,c,d,e,f){a={VIEWER_PERMALINK:0,VIEWER_SNOWLIFT:6,VIEWER_VAULTBOX:8,VIEWER_SNOWFLAKE:14,VIEWER_COMPOSER:16,VIEWER_CAROUSEL:19,VIEWER_SPHERICAL:20,VIEWER_PERMALINK_STRING:"permalink",VIEWER_SNOWLIFT_STRING:"snowlift",VIEWER_VAULTBOX_STRING:"vaultbox",VIEWER_CAROUSEL_STRING:"carousel",BULK_EDITOR:3,BULK_EDITOR_REACT:15,EDITOR_MODAL:17,FLASH_UPLOADER:4,HTML5_UPLOADER:10,SIZE_NORMAL:"n",PIC_NORMAL_FBX_SIZE:180,ALBUM_NAME_MAXLEN:65};e.exports=a}),null);
__d("PhotosUtils",["Vector"],(function(a,b,c,d,e,f){__p&&__p();function a(){}Object.assign(a,{getNearestBox:function(a,b){var c=Infinity,d=null;for(var e in a){var f=a[e];if(f.contains(b)){f=b.distanceTo(f.getCenter());f<c&&(c=f,d=e)}}return d},absoluteToNormalizedPosition:function(a,c){var d=b("Vector").getElementPosition(a);a=b("Vector").getElementDimensions(a);c=c.sub(d).mul(100/a.x,100/a.y);c.domain="pure";return c},normalizedToAbsolutePosition:function(a,c){var d=b("Vector").getElementPosition(a);a=b("Vector").getElementDimensions(a);c=c.mul(a.x/100,a.y/100).add(d);c.domain="document";return c},isFacebox:function(a){return a.match(/^face:/)},isTag:function(a){return a.match(/^tag:/)}});e.exports=a}),null);
__d("QuestionPollType",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({CHOOSE_ONE:"CHOOSE_ONE",CHOOSE_MULTIPLE:"CHOOSE_MULTIPLE",GIF_CHOOSE_ONE:"GIF_CHOOSE_ONE",IMAGE_CHOOSE_ONE:"IMAGE_CHOOSE_ONE",VISUAL_TEXT_CHOOSE_ONE:"VISUAL_TEXT_CHOOSE_ONE",IMAGE_CHOOSE_MULTIPLE:"IMAGE_CHOOSE_MULTIPLE"})}),null);
__d("ReactComponentRenderer",["React","ReactDOM","warning"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a,b){this.klass=a,this.container=b,this.props={},this.component=null}a.prototype.replaceProps=function(a,b){this.props={},this.setProps(a,b)};a.prototype.setProps=function(a,c){if(this.klass==null)return;Object.assign(this.props,a);a=b("React").createElement(this.klass,this.props);var d=this;b("ReactDOM").render(a,this.container,function(){d.component=this,c&&c.call(this)})};a.prototype.unmount=function(){b("ReactDOM").unmountComponentAtNode(this.container),this.klass=null};e.exports=a}),null);
__d("XBrowseQueryController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/search/{*bqf}/",{q:{type:"String"},bqf:{type:"String"},searchtype:{type:"Enum",enumType:1},page:{type:"Int"},ref:{type:"String"},topicID:{type:"Int"},filters_mp_price_lower:{type:"StringToStringMap"},filters_mp_price_upper:{type:"StringToStringMap"},filters_mp_location:{type:"StringToStringMap"},filters_mp_radius_km:{type:"StringToStringMap"},query:{type:"String"},name:{type:"String"},cursor:{type:"String"},source:{type:"String"}})}),null);