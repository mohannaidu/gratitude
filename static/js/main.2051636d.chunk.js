(this.webpackJsonpgratitude=this.webpackJsonpgratitude||[]).push([[0],{101:function(e,t,a){"use strict";a.r(t);var n=a(3),c=a.n(n),s=a(13),i=a.n(s),l=(a(45),a(36)),r=(a(46),a(47),a(31)),o=a(32),d=a(16),u=a(38),h=a(37),b=(a(48),a(4)),j=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).textInput=void 0,n.focus=function(){var e=n.textInput.current;e&&e.focus()},n.state={counter:2,text:"1. "},n.textInput=c.a.createRef(),n.handleChange=n.handleChange.bind(Object(d.a)(n)),n.handleKeyDown=n.handleKeyDown.bind(Object(d.a)(n)),n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){console.log("component mounted"),this.focus()}},{key:"handleKeyDown",value:function(e){"Enter"===e.key&&(this.setState({counter:this.state.counter+1}),this.setState({text:this.state.text+"\n"+this.state.counter+". "}),e.preventDefault(),e.stopPropagation())}},{key:"handleChange",value:function(e){console.log(e.target.value),this.setState({text:e.target.value})}},{key:"render",value:function(){var e=this.state.text;return Object(b.jsx)("textarea",{ref:this.textInput,value:e,onKeyDown:this.handleKeyDown,onChange:this.handleChange,spellCheck:"false"})}}]),a}(n.Component),v=a(33),g=a.n(v);a(50);function x(){var e=Object(n.useState)(new Date),t=Object(l.a)(e,2),a=t[0],c=t[1];return Object(b.jsxs)("div",{className:"container",children:[Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-6 offset-md-3",children:Object(b.jsxs)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",children:[Object(b.jsx)("div",{className:"navbar-brand",children:"Daily Gratitude"}),Object(b.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(b.jsx)("span",{className:"navbar-toggler-icon"})}),Object(b.jsx)("div",{className:"collapse navbar-collapse justify-content-end",id:"navbarNav",children:Object(b.jsx)("ul",{className:"navbar-nav",children:Object(b.jsx)("li",{className:"nav-item",children:Object(b.jsx)("div",{className:"nav-link",children:"Login"})})})})]})})}),Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-6 offset-md-3 text-right",children:Object(b.jsx)(g.a,{selected:a,onChange:function(e){return c(e)}})})}),Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-6 offset-md-3",children:Object(b.jsx)(j,{})})})]})}var f=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,106)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;a(e),n(e),c(e),s(e),i(e)}))};i.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(x,{})}),document.getElementById("root")),f()},45:function(e,t,a){},46:function(e,t,a){},48:function(e,t,a){}},[[101,1,2]]]);
//# sourceMappingURL=main.2051636d.chunk.js.map