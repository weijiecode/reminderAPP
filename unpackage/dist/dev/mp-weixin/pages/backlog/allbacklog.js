(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/backlog/allbacklog"],{210:function(e,t,n){"use strict";(function(e){n(5);o(n(3));var t=o(n(211));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},211:function(e,t,n){"use strict";n.r(t);var o=n(212),a=n(214);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n(216);var c,s=n(11),u=Object(s["default"])(a["default"],o["render"],o["staticRenderFns"],!1,null,"1697f1c7",null,!1,o["components"],c);u.options.__file="pages/backlog/allbacklog.vue",t["default"]=u.exports},212:function(e,t,n){"use strict";n.r(t);var o=n(213);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},213:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return c})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return o}));try{o={uToast:function(){return n.e("uni_modules/uview-ui/components/u-toast/u-toast").then(n.bind(null,306))},uPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(n.bind(null,313))},uButton:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-button/u-button")]).then(n.bind(null,420))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,321))},uCalendar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-calendar/u-calendar")]).then(n.bind(null,327))},uDatetimePicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-datetime-picker/u-datetime-picker")]).then(n.bind(null,338))},uPicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-picker/u-picker")]).then(n.bind(null,346))},uTag:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-tag/u-tag")]).then(n.bind(null,354))},uSwipeAction:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swipe-action/u-swipe-action")]).then(n.bind(null,481))},uSwipeActionItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swipe-action-item/u-swipe-action-item")]).then(n.bind(null,487))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var a=function(){var e=this,t=e.$createElement,n=(e._self._c,"生活"===e.backlogtype?e.__map(e.alla,(function(t,n){var o=e.__get_orig(t),a=JSON.stringify(t);return{$orig:o,g0:a}})):null),o="工作"===e.backlogtype?e.__map(e.allb,(function(t,n){var o=e.__get_orig(t),a=JSON.stringify(t);return{$orig:o,g1:a}})):null,a="学习"===e.backlogtype?e.__map(e.allc,(function(t,n){var o=e.__get_orig(t),a=JSON.stringify(t);return{$orig:o,g2:a}})):null,i="健康"===e.backlogtype?e.__map(e.alld,(function(t,n){var o=e.__get_orig(t),a=JSON.stringify(t);return{$orig:o,g3:a}})):null,c="社交"===e.backlogtype?e.__map(e.alle,(function(t,n){var o=e.__get_orig(t),a=JSON.stringify(t);return{$orig:o,g4:a}})):null,s="其它"===e.backlogtype?e.__map(e.allf,(function(t,n){var o=e.__get_orig(t),a=JSON.stringify(t);return{$orig:o,g5:a}})):null;e._isMounted||(e.e0=function(t){e.showdel=!1},e.e1=function(t){e.showdel=!0},e.e2=function(t){e.showdel=!1},e.e3=function(t){e.showedit=!1},e.e4=function(t){e.showcalendar=!0},e.e5=function(t){e.showcalendar=!1},e.e6=function(t){e.showdatetime=!0},e.e7=function(t){e.showdatetime=!1},e.e8=function(t){e.showdatetime=!1},e.e9=function(t){e.showtypepicker=!0},e.e10=function(t){e.showtypepicker=!1},e.e11=function(t){e.showtypepicker=!1}),e.$mp.data=Object.assign({},{$root:{l0:n,l1:o,l2:a,l3:i,l4:c,l5:s}})},i=!1,c=[];a._withStripped=!0},214:function(e,t,n){"use strict";n.r(t);var o=n(215),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},215:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n(36)),a=n(145);function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,o,a,i,c){try{var s=e[i](c),u=s.value}catch(r){return void n(r)}s.done?t(u):Promise.resolve(u).then(o,a)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var i=e.apply(t,n);function s(e){c(i,o,a,s,u,"next",e)}function u(e){c(i,o,a,s,u,"throw",e)}s(void 0)}))}}var u={mixins:[a.getstatusBarHeight,a.datetimes],onLoad:function(t){this.backlogtype=t.type;var n=JSON.parse(e.getStorageSync("allbacklogstorage")),o=n.alla,a=n.allb,i=n.allc,c=n.alld,s=n.alle,u=n.allf;this.alla=o,this.allb=a,this.allc=i,this.alld=c,this.alle=s,this.allf=u},onReady:function(){var t=this;e.createSelectorQuery().in(this).select(".listcontent").boundingClientRect((function(e){t.topheight="calc(100% - "+e.top+"px)"})).exec()},data:function(){return{alla:[],allb:[],allc:[],alld:[],alle:[],allf:[],topheight:"",mode:"square",iconStyle:{fontSize:"32rpx",color:"#7766E7"},showdel:!1,showedit:!1,showcalendar:!1,showdatetime:!1,showtypepicker:!1,toid:"",totype:"",tocontents:"",todatetime:"",toclassvalue:"",tocolorbg:"",toname:"",columns:[[{name:"生活",names:{cvalue:"#icon-life",cbg:"#7766E7",cname:"生活"},classvalue:"#icon-life"},{name:"工作",names:{cvalue:"#icon-work",cbg:"#518BF1",cname:"工作"},classvalue:"#icon-work"},{name:"学习",names:{cvalue:"#icon-study",cbg:"#FFCD00",cname:"学习"},classvalue:"#icon-study"},{name:"健康",names:{cvalue:"#icon-health",cbg:"#1DBD84",cname:"健康"},classvalue:"#icon-health"},{name:"社交",names:{cvalue:"#icon-social",cbg:"#FE738A",cname:"社交"},classvalue:"#icon-social"},{name:"其它",names:{cvalue:"#icon-other",cbg:"#C4C4C4",cname:"其它"},classvalue:"#icon-other"}]],datebacklog:"",timebacklog:"",tagshow1:!1,tagshow2:!1,tagshow3:!1,backlogtype:"",options2:[{icon:"edit-pen",style:{backgroundColor:"#7766E7",fontSize:"36rpx",borderRadius:"50%",width:"100rpx",height:"100rpx"}},{icon:"trash",style:{backgroundColor:"#FE748B",fontSize:"36rpx",borderRadius:"50%",width:"100rpx",height:"100rpx"}}]}},methods:{backmycenter:function(){e.switchTab({url:"../index/index"})},todone:function(e,t){var n=this;return s(o.default.mark((function a(){var i,c,s,u;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return i=e.id,c=e.done,c="0"==c?"1":"0",o.next=4,n.$http({url:"backlog/updatebacklog",method:"POST",data:{done:c,id:i}});case 4:s=o.sent,u=s.data,"200"==u.code&&("1"==c?(n[t].forEach((function(e,t){i==e.id&&(e.done=1)})),n.$refs.uToast.show({type:"success",duration:1e3,message:"该条待办清单已完成",iconUrl:"https://cdn.uviewui.com/uview/demo/toast/success.png"})):"0"==c&&(n[t].forEach((function(e,t){i==e.id&&(e.done=0)})),n.$refs.uToast.show({type:"default",duration:1e3,message:"该条待办清单已修改为待完成",iconUrl:"https://cdn.uviewui.com/uview/demo/toast/success.png"})));case 7:case"end":return o.stop()}}),a)})))()},changebacklog:function(e){switch(this.toid=JSON.parse(e.name).id,this.tocontents=JSON.parse(e.name).contents,this.todatetime=JSON.parse(e.name).datetime,this.datebacklog=this.todatetime.split(" ")[0],this.timebacklog=this.todatetime.split(" ")[1],this.tagshow1=!0,this.tagshow2=!0,this.tagshow3=!0,this.toclassvalue=JSON.parse(e.name).classvalue,this.tocolorbg=JSON.parse(e.name).colorbg,JSON.parse(e.name).classvalue){case"#icon-life":this.totype="alla",this.toname="生活";break;case"#icon-work":this.totype="allb",this.toname="工作";break;case"#icon-study":this.totype="allc",this.toname="学习";break;case"#icon-health":this.totype="alld",this.toname="健康";break;case"#icon-social":this.totype="alle",this.toname="社交";break;case"#icon-other":this.totype="allf",this.toname="其它";break;default:console.log("error...")}"1"==e.index?this.showdel=!0:"0"==e.index&&(this.showedit=!0)},confirmdel:function(){var e=this;return s(o.default.mark((function t(){var n,a;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http({url:"backlog/deletebacklog",method:"POST",data:{id:e.toid}});case 2:n=t.sent,a=n.data,"200"==a.code&&(e.showdel=!1,e[e.totype].forEach((function(t,n){e.toid==t.id&&e[e.totype].splice(n,1)})));case 5:case"end":return t.stop()}}),t)})))()},confirmdate:function(e){this.showcalendar=!1,this.datebacklog=e[0],this.tagshow1=!0},confirmdatetime:function(e){this.showdatetime=!1,this.timebacklog=e.value,this.tagshow2=!0},confirmtype:function(e){this.showtypepicker=!1,this.toclassvalue=e.value[0].names.cvalue,this.tocolorbg=e.value[0].names.cbg,this.toname=e.value[0].name,this.tagshow3=!0},tagclose1:function(){this.tagshow1=!1,this.datebacklog=""},tagclose2:function(){this.tagshow2=!1,this.timebacklog=""},tagclose3:function(){this.tagshow3=!1,this.toname=""},savebacklog:function(){var e=this;return s(o.default.mark((function t(){var n,a;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http({url:"backlog/updatecontents",method:"POST",data:{contents:e.tocontents,datetime:e.datebacklog+" "+e.timebacklog,classvalue:e.toclassvalue,colorbg:e.tocolorbg,id:e.toid}});case 2:n=t.sent,a=n.data,"200"==a.code?(e.showedit=!1,e[e.totype].forEach((function(t,n){e.toid==t.id&&(e[e.totype][n].contents=e.tocontents,e[e.totype][n].datetime=e.datebacklog+" "+e.timebacklog,e.toclassvalue!=e[e.totype][n].classvalue&&e[e.totype].splice(n,1))})),e.$refs.uToast.show({type:"success",duration:1e3,message:"该条待办清单修改成功",iconUrl:"https://cdn.uviewui.com/uview/demo/toast/success.png"})):(e.showedit=!1,e.$refs.uToast.show({type:"error",icon:!1,message:"该条待办清单修改失败,请重试",iconUrl:"https://cdn.uviewui.com/uview/demo/toast/error.png"}));case 5:case"end":return t.stop()}}),t)})))()}}};t.default=u}).call(this,n(1)["default"])},216:function(e,t,n){"use strict";n.r(t);var o=n(217),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},217:function(e,t,n){}},[[210,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/backlog/allbacklog.js.map