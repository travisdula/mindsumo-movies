(this["webpackJsonpmindsumo-movies"]=this["webpackJsonpmindsumo-movies"]||[]).push([[0],{26:function(e,t,r){},47:function(e,t,r){"use strict";r.r(t);var n=r(3),a=r.n(n),s=r(17),c=r.n(s),i=(r(26),r(2)),o=r.n(i),l=r(4),u=r(18),h=r(19),d=r(21),p=r(20),x=r(7),b=r.n(x);function f(e,t){return m.apply(this,arguments)}function m(){return(m=Object(l.a)(o.a.mark((function e(t,r){var n,a=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.length>2&&void 0!==a[2]?a[2]:1,e.abrupt("return",b.a.get("https://www.omdbapi.com/",{params:{type:"movie",apikey:t,s:r,page:n}}).then((function(e){return e.data})).catch((function(e){return console.error(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e,t){return v.apply(this,arguments)}function v(){return(v=Object(l.a)(o.a.mark((function e(t,r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",b.a.get("https://www.omdbapi.com/",{params:{apikey:t,i:r}}).then((function(e){return e.data})).catch((function(e){return console.error(e)})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var g=r(5),y=r(8),O=r(0);function w(e){var t=e.result,r=a.a.useState(!1),n=Object(y.a)(r,2),s=n[0],c=n[1],i=a.a.useState(),u=Object(y.a)(i,2),h=u[0],d=u[1];return Object(O.jsx)("button",{onClick:Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.t0=!(h&&"Title"in h),!e.t0){e.next=7;break}return e.t1=d,e.next=5,j(g.a,t.imdbID);case 5:e.t2=e.sent,(0,e.t1)(e.t2);case 7:c(!s);case 8:case"end":return e.stop()}}),e)}))),className:"movie transition duration-500 rounded-lg bg-opacity-25 hover:bg-opacity-100 md:w-96 w-11/12 bg-gray-400 m-4 mt-0 ",children:Object(O.jsxs)("div",{className:"flex flew-row flex-auto",children:[Object(O.jsx)("img",{className:"w-32 flex-shrink-0 rounded-lg text-gray-500 italic text-center",src:t.Poster,alt:"no poster"}),Object(O.jsxs)("div",{className:"flex flex-col w-full m-2",children:[Object(O.jsxs)("div",{className:"flex flex-row",children:[Object(O.jsxs)("span",{className:"title text-lg text-gray-700 text-left font-semibold flex-grow",children:[" ",t.Title," "]}),Object(O.jsxs)("span",{className:"year text-gray-600 text-right flex-grow",children:[" ",t.Year," "]})]}),s&&Object(O.jsxs)("div",{className:"text-xs",children:[" ",h&&h.Plot," "]})]})]})},t.imdbID)}var N=function(e){Object(d.a)(r,e);var t=Object(p.a)(r);function r(e){var n;return Object(u.a)(this,r),(n=t.call(this,e)).state={query:"",responseArray:[],index:1,totalResults:0,error:""},n}return Object(h.a)(r,[{key:"render",value:function(){var e=""!==this.state.error?Object(O.jsx)("div",{className:"text-gray-200 text-2xl font-semibold bg-gray-700 text-center rounded-lg",children:Object(O.jsx)("div",{className:"m-4",children:this.state.error})}):null,t=this.state.responseArray?this.state.responseArray.map((function(e){return Object(O.jsx)(w,{result:e})})):Object(O.jsx)("div",{children:" no results "}),r=this.state.responseArray.length===this.state.totalResults?null:Object(O.jsx)("button",{className:"loadMoreButton transition duration-500 bg-opacity-60 hover:bg-opacity-100 bg-blue-400 rounded-lg mb-2 text-xl font-medium h-12 w-36 ",onClick:this.loadMore.bind(this),children:"Load More"});return Object(O.jsxs)("div",{className:"App min-h-screen bg-gradient-to-b from-blue-200 to-purple-200",children:[Object(O.jsx)("header",{className:"App-header flex flex-grow justify-center",children:Object(O.jsx)("div",{className:"w-96 m-4",children:Object(O.jsx)("form",{className:"query text-center",onSubmit:this.handleSubmit.bind(this),children:Object(O.jsx)("input",{className:"text-center text-2xl bg-blue-50 rounded-lg",onChange:this.handleChange.bind(this),placeholder:"search a movie"})})})}),Object(O.jsxs)("div",{className:"w-auto flex flex-col items-center",children:[e,t,r]})]})}},{key:"handleChange",value:function(e){var t=e.target.value;this.setState({query:t})}},{key:"handleSubmit",value:function(){var e=Object(l.a)(o.a.mark((function e(t){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,f(g.a,this.state.query);case 3:"False"===(r=e.sent).Response?this.setState({query:"",responseArray:[],index:1,totalResults:0,error:r.Error}):this.setState({responseArray:r.Search,index:1,totalResults:parseInt(r.totalResults),error:""});case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"loadMore",value:function(){var e=Object(l.a)(o.a.mark((function e(t){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=this.state.index+1,e.next=3,f(g.a,this.state.query,r);case 3:n=e.sent,this.setState({responseArray:this.state.responseArray.concat(n.Search),index:r});case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),r}(a.a.Component),k=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,48)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;r(e),n(e),a(e),s(e),c(e)}))};c.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(N,{})}),document.getElementById("root")),k()},5:function(e){e.exports=JSON.parse('{"a":"69f2899"}')}},[[47,1,2]]]);
//# sourceMappingURL=main.f2f27c57.chunk.js.map