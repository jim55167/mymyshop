(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e6be1a8"],{"0d5f":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),e("table",{staticClass:"table mt-4"},[t._m(0),e("tbody",t._l(t.sortOrder,(function(a,n){return e("tr",{key:n,class:{"text-secondary":!a.is_paid}},[e("td",[t._v(t._s(t._f("date")(a.create_at)))]),e("td",[a.user?e("span",{domProps:{textContent:t._s(a.user.email)}}):t._e()]),e("td",[e("ul",{staticClass:"list-unstyled"},t._l(a.products,(function(a,n){return e("li",{key:n},[t._v(" "+t._s(a.product.title)+" 數量："+t._s(a.qty)+" "+t._s(a.product.unit)+" ")])})),0)]),e("td",[t._v(t._s(a.message))]),e("td",{staticClass:"text-left"},[t._v(t._s(t._f("currency")(a.total)))]),e("td",[a.is_paid?e("strong",{staticClass:"text-success"},[t._v("已付款")]):e("span",{staticClass:"text-muted"},[t._v("尚未付款")])])])})),0)]),e("Pagination",{attrs:{pagination:t.pagination},on:{changePage:t.getOrders}})],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{attrs:{width:"120"}},[t._v("購買時間")]),e("th",{attrs:{width:"250"}},[t._v("Email")]),e("th",{attrs:{width:"300"}},[t._v("購買款項")]),e("th",[t._v("備註內容")]),e("th",{attrs:{width:"120"}},[t._v("應付金額")]),e("th",{attrs:{width:"120"}},[t._v("是否付款")])])])}],s=(e("99af"),e("1799")),r={data:function(){return{orders:{},isNew:!1,pagination:{},isLoading:!1}},methods:{getOrders:function(){var t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("jim55167","/admin/orders?page=").concat(a);this.isLoading=!0,this.$http.get(e).then((function(a){t.orders=a.data.orders,t.pagination=a.data.pagination,t.isLoading=!1}))}},computed:{sortOrder:function(){var t=[];return this.orders.length?(t=this.orders,t.sort((function(t,a){var e=t.is_paid?1:0,n=a.is_paid?1:0;return n-e}))):t}},created:function(){this.getOrders()},components:{Pagination:s["a"]}},o=r,c=e("2877"),l=Object(c["a"])(o,n,i,!1,null,null,null);a["default"]=l.exports},1799:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{staticClass:"d-flex",attrs:{"aria-label":"Page navigation example"}},[e("ul",{staticClass:"pagination",staticStyle:{margin:"0 auto"}},[e("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_pre}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){return a.preventDefault(),t.changePage(t.pagination.current_page-1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pagination.total_pages,(function(a){return e("li",{key:a,staticClass:"page-item",class:{active:t.pagination.current_page==a}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.changePage(a)}}},[t._v(t._s(a))])])})),e("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_next}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(a){return a.preventDefault(),t.changePage(t.pagination.current_page+1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])])},i=[],s=e("1157"),r=e.n(s),o={props:["pagination"],data:function(){return{}},methods:{changePage:function(t){r()("html, body").animate({scrollTop:0},600),this.$emit("changePage",t)}}},c=o,l=e("2877"),u=Object(l["a"])(c,n,i,!1,null,null,null);a["a"]=u.exports}}]);
//# sourceMappingURL=chunk-7e6be1a8.4b472b68.js.map