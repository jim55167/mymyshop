(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b05e089"],{5529:function(t,s,n){t.exports=n.p+"img/04.9da9dfef.jpg"},"748a":function(t,s,n){t.exports=n.p+"img/03.1a26214a.jpg"},"7e9c":function(t,s,n){t.exports=n.p+"img/05.8617db86.jpg"},"9b37":function(t,s,n){t.exports=n.p+"img/02.4bd2df7d.jpg"},b0eb:function(t,s,n){t.exports=n.p+"img/01.bd652505.jpg"},ba37:function(t,s,n){"use strict";n.r(s);var i=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",[n("loading",{attrs:{active:t.isLoading},on:{"update:active":function(s){t.isLoading=s}}}),t._m(0),n("GoTop")],1)},a=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"design-box"},[i("div",{staticClass:"design-item"},[i("div",{staticClass:"design"},[i("span",[t._v("DESIGN 設計")]),i("p",[t._v("鑽研在衣服的舒適度與角度裡"),i("br"),t._v(" 在乎妳以及與妳有關的生活風格與穿著體驗")]),i("img",{attrs:{alt:"設計",src:n("b0eb")}})]),i("div",{staticClass:"design2"},[i("span",[t._v("MANUFACTURE 縫製")]),i("p",[t._v("師傅們用多年經驗淬煉出的美感"),i("br"),t._v(" 打造剪裁、形狀與細節處理的完美細節")]),i("div",{staticClass:"design-img"},[i("img",{attrs:{alt:"裁縫",src:n("9b37")}}),i("img",{attrs:{alt:"裁縫",src:n("748a")}})])]),i("div",{staticClass:"design3"},[i("span",[t._v("PROCESS 加工")]),i("p",[t._v("綿密厚實、水洗親膚的堅持"),i("br"),t._v(" 使衣料更為舒適並同時達到去除異味、防縮及定色")]),i("div",{staticClass:"design-img"},[i("img",{attrs:{alt:"加工",src:n("5529")}})])]),i("div",{staticClass:"design4"},[i("span",[t._v("CHECKING 品檢")]),i("p",[t._v("就像見情人般的小心只想把完美與溫暖留在妳的心底"),i("br"),t._v(" 出貨前必定經過多重檢測讓妳遇見我們就此癡心絕對")]),i("div",{staticClass:"design-img"},[i("img",{attrs:{alt:"檢測",src:n("7e9c")}})])])])])}],o=(n("99af"),n("c12c")),c={data:function(){return{isLoading:!1}},methods:{getProducts:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("jim55167","/products/all");this.isLoading=!0,this.$http.get(s).then((function(s){t.isLoading=!1,t.products=s.data.products}))}},created:function(){this.getProducts()},components:{GoTop:o["a"]}},e=c,r=n("2877"),d=Object(r["a"])(e,i,a,!1,null,null,null);s["default"]=d.exports},c12c:function(t,s,n){"use strict";var i=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",[n("div",{staticClass:"goTop",class:{btnFlag:t.btnFlag},on:{click:function(s){return s.preventDefault(),t.goTop(s)}}})])},a=[],o={name:"GoTop",data:function(){return{btnFlag:!0}},methods:{goTop:function(){window.scrollTo({top:0,behavior:"smooth"})}},mounted:function(){var t=this;document.body.onscroll=function(){document.documentElement.scrollTop>200?t.btnFlag=!0:t.btnFlag=!1}}},c=o,e=n("2877"),r=Object(e["a"])(c,i,a,!1,null,null,null);s["a"]=r.exports}}]);
//# sourceMappingURL=chunk-2b05e089.7d9e512b.js.map