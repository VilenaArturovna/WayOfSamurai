(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[5],{288:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__2LnUP",dialogsItems:"Dialogs_dialogsItems__1q5BC",active:"Dialogs_active__1VhuN",dialog:"Dialogs_dialog__11bYs",messages:"Dialogs_messages__1bkRE",message:"Dialogs_message__-g6Lh"}},297:function(e,s,a){"use strict";a.r(s);var t=a(94),i=a(0),n=a.n(i),c=a(288),o=a.n(c),r=a(21),d=a(1);var l=function(e){return Object(d.jsx)("div",{className:o.a.dialog+" "+o.a.active,children:Object(d.jsx)(r.c,{to:"/dialogs/"+e.id,children:e.name})})};var j=function(e){return Object(d.jsx)("div",{className:o.a.message,children:e.message})},b=a(126),g=a(127),u=a(64),m=a(82);var O=Object(m.a)(20);var h=Object(g.a)({form:"AddMessageForm"})((function(e){return Object(d.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(d.jsx)(b.a,{component:u.b,name:"newMessageBody",placeholder:"Enter your message",validate:[m.b,O]}),Object(d.jsx)("button",{children:"Submit"})]})})),p=function(e){var s=e.dialogsPage.dialogs.map((function(e){return Object(d.jsx)(l,{name:e.name,id:e.id})})),a=e.dialogsPage.messages.map((function(e){return Object(d.jsx)(j,{message:e.message})}));return Object(d.jsxs)("div",{className:o.a.dialogs,children:[Object(d.jsx)("div",{className:o.a.dialogsItems,children:s}),Object(d.jsx)("div",{className:o.a.messages,children:Object(d.jsx)("div",{children:a})}),Object(d.jsx)("div",{children:Object(d.jsx)(h,{onSubmit:function(e){Object(t.b)(e.newMessageText)}})})]})},v=a(19),f=a(5),x=a(51),_=a(52),y=a(54),D=a(53),N=a(11),P=function(e){return{isAuth:e.auth.isAuth}},k=a(10);s.default=Object(k.d)(Object(v.b)((function(e){return{dialogsPage:e.dialogsPage}}),{sendMessage:t.b}),(function(e){var s=function(s){Object(y.a)(t,s);var a=Object(D.a)(t);function t(){return Object(x.a)(this,t),a.apply(this,arguments)}return Object(_.a)(t,[{key:"render",value:function(){return this.props.isAuth?Object(d.jsx)(e,Object(f.a)({},this.props)):Object(d.jsx)(N.a,{to:"/login"})}}]),t}(n.a.Component);return Object(v.b)(P)(s)}))(p)}}]);
//# sourceMappingURL=5.4b199e22.chunk.js.map