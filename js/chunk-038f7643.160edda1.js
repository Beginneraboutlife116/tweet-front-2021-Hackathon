(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-038f7643"],{"102e":function(t,e,o){"use strict";var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"follow"},[o("router-link",{staticClass:"follow__avatar",attrs:{to:"/home/"+t.follow.followingId}},[o("img",{staticClass:"follow__avatar--img",attrs:{src:t.follow.avatar||"https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg",alt:"avatar","aria-label":"avatar"}})]),o("div",{staticClass:"follow__info"},[o("div",{staticClass:"follow__info-followship"},[o("router-link",{attrs:{to:"/home/"+t.follow.followingId}},[o("p",{staticClass:"name"},[t._v(t._s(t.follow.name||"NoName"))]),o("p",{staticClass:"account"},[t._v("@"+t._s(t.follow.account))])])],1),o("p",{staticClass:"follow__info-description"},[t._v(" "+t._s(t.follow.introduction||"（作者目前還沒有自我介紹內容）")+" ")])]),o("button",{class:{active:t.follow.isFollowing},attrs:{disabled:t.currentUser.id===t.follow.followingId||t.currentUser.id===t.follow.followerId},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.toggleFollow(t.follow.followingId||t.follow.followerId,t.follow.isFollowing)}}},[t._v(" "+t._s(t.follow.isFollowing?"正在跟隨":"跟隨")+" ")])],1)},l=[],i=o("1da1"),n=o("5530"),s=(o("96cf"),o("2f62")),a=o("b132"),c=o("8845"),f={name:"Followship",props:{initialFollow:{type:Object,required:!0}},data:function(){return{follow:{followingId:20,account:"user2",name:"user2",avatar:null,introduction:null,isFollowing:!1}}},created:function(){this.fetchFollow()},computed:Object(n["a"])({},Object(s["b"])(["currentUser"])),methods:{fetchFollow:function(){this.follow=Object(n["a"])({},this.initialFollow)},toggleFollow:function(t,e){var o=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var l,i,n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(r.prev=0,!e){r.next=12;break}return r.next=4,c["a"].cancelFollow(t);case 4:if(l=r.sent,i=l.data,"error"!==i.status){r.next=8;break}throw new Error(i.message);case 8:o.follow.isFollowing=!1,a["a"].fire({icon:"success",title:"成功取消追隨"}),r.next=20;break;case 12:return r.next=14,c["a"].addFollow(t);case 14:if(n=r.sent,s=n.data,"error"!==s.status){r.next=18;break}throw new Error(s.message);case 18:o.follow.isFollowing=!0,a["a"].fire({icon:"success",title:"成功加入追隨"});case 20:r.next=25;break;case 22:r.prev=22,r.t0=r["catch"](0),a["a"].fire({icon:"error",title:"無法修改追隨狀態"});case 25:case"end":return r.stop()}}),r,null,[[0,22]])})))()}},watch:{initialFollow:function(t){this.follow=Object(n["a"])(Object(n["a"])({},this.follow),t)}}},u=f,w=(o("9760"),o("2877")),d=Object(w["a"])(u,r,l,!1,null,null,null);e["a"]=d.exports},2375:function(t,e,o){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},l=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"spinner"},[o("div",{staticClass:"bouncing-loader"},[o("div"),o("div"),o("div")])])}],i=(o("d0b5"),o("2877")),n={},s=Object(i["a"])(n,r,l,!1,null,"03284d6c",null);e["a"]=s.exports},"703e":function(t,e,o){},8845:function(t,e,o){"use strict";var r=o("b132");e["a"]={getFollowings:function(t){return r["b"].get("/users/".concat(t,"/followings"))},getFollowers:function(t){return r["b"].get("/users/".concat(t,"/followers"))},getTopFollow:function(){return r["b"].get("/followships/top")},addFollow:function(t){return r["b"].post("/followships",{id:t})},cancelFollow:function(t){return r["b"].delete("/followships/".concat(t))}}},"8e34":function(t,e,o){},9760:function(t,e,o){"use strict";o("f395")},"98b9":function(t,e,o){"use strict";o("8e34")},d0b5:function(t,e,o){"use strict";o("703e")},d13f:function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"followers-container"},[o("header",{staticClass:"followers__header"},[o("div",{staticClass:"followers__header__title"},[o("svg",{attrs:{width:"23",height:"24",viewBox:"0 0 23 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},on:{click:function(e){return t.$router.back()}}},[o("path",{attrs:{d:"M18.9995 10.9999H6.4135L10.7065 6.70687C11.0965 6.31687 11.0965 5.68388 10.7065 5.29288C10.3165 4.90188 9.6835 4.90288 9.2925 5.29288L3.2925 11.2929C2.9025 11.6829 2.9025 12.3159 3.2925 12.7069L9.2925 18.7069C9.4875 18.9019 9.7425 18.9999 9.9995 18.9999C10.2565 18.9999 10.5115 18.9019 10.7065 18.7069C11.0965 18.3169 11.0965 17.6839 10.7065 17.2929L6.4135 12.9999H18.9995C19.5525 12.9999 19.9995 12.5529 19.9995 11.9999C19.9995 11.4469 19.5525 10.9999 18.9995 10.9999Z",fill:"black"}})]),o("div",{staticClass:"followers__header__title__wrapper"},[o("p",{staticClass:"name",style:{visibility:t.isLoading?"hidden;":"visible;"}},[t._v(t._s(t.isLoading?"-":t.profile.name))]),o("p",{staticClass:"tweetCounts",style:{visibility:t.isLoading?"hidden;":"visible;"}},[t._v(t._s(t.profile.tweetCounts)+" 推文")])])])]),o("div",{staticClass:"main__follow__tabs"},[o("router-link",{staticClass:"main__follow__tabs--link",attrs:{to:"/home/"+t.profile.id+"/followers"}},[o("p",[t._v("跟隨者")])]),o("router-link",{staticClass:"main__follow__tabs--link",attrs:{to:"/home/"+t.profile.id+"/followings"}},[o("p",[t._v("正在跟隨")])])],1),t._l(t.followers,(function(t){return o("Followship",{key:t.followerId,attrs:{initialFollow:t}})})),t.isLoading?o("Spinner"):t._e()],2)},l=[],i=o("5530"),n=o("1da1"),s=(o("96cf"),o("d81d"),o("b132")),a=o("4cce"),c=o("102e"),f=o("8845"),u=o("2375"),w={name:"Followers",components:{Followship:c["a"],Spinner:u["a"]},data:function(){return{followers:[],profile:{id:0,name:"user1",tweetCounts:0},isLoading:!0}},created:function(){var t=this.$route.params.userId;this.fetchFollowers(t),this.fetchProfile(t)},beforeRouteUpdate:function(t,e,o){var r=t.params.userId;this.fetchFollowers(r),this.fetchProfile(r),o()},methods:{fetchFollowers:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function o(){var r,l;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,e.isProcessing=!0,e.isLoading=!0,o.next=5,f["a"].getFollowers(t);case 5:if(r=o.sent,l=r.data,"error"!==l.status){o.next=9;break}throw new Error(l.message);case 9:e.followers=l.map((function(t){return Object(i["a"])({},t)})),e.isLoading=!1,o.next=17;break;case 13:o.prev=13,o.t0=o["catch"](0),e.isLoading=!1,s["a"].fire({icon:"error",title:"無法獲取跟隨者資料，請稍後再嘗試"});case 17:case"end":return o.stop()}}),o,null,[[0,13]])})))()},fetchProfile:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function o(){var r,l;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,e.isProcessing=!0,e.isLoading=!0,o.next=5,a["a"].getUserProfile(t);case 5:if(r=o.sent,l=r.data,"error"!==l.status){o.next=9;break}throw new Error(l.message);case 9:e.profile=Object(i["a"])({},l),e.isLoading=!1,o.next=17;break;case 13:o.prev=13,o.t0=o["catch"](0),e.isLoading=!1,s["a"].fire({icon:"error",title:"無法獲取個人資料，請稍後再嘗試"});case 17:case"end":return o.stop()}}),o,null,[[0,13]])})))()}}},d=w,p=(o("98b9"),o("2877")),h=Object(p["a"])(d,r,l,!1,null,null,null);e["default"]=h.exports},d81d:function(t,e,o){"use strict";var r=o("23e7"),l=o("b727").map,i=o("1dde"),n=i("map");r({target:"Array",proto:!0,forced:!n},{map:function(t){return l(this,t,arguments.length>1?arguments[1]:void 0)}})},f395:function(t,e,o){}}]);
//# sourceMappingURL=chunk-038f7643.160edda1.js.map