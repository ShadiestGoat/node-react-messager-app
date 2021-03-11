(this["webpackJsonpschool-msg-app"]=this["webpackJsonpschool-msg-app"]||[]).push([[0],{100:function(e,t,s){},101:function(e,t,s){},258:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s(92),r=s.n(a),i=(s(100),s(101),function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,259)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;s(e),n(e),a(e),r(e),i(e)}))}),c=s(2),o=s.n(c),u=s(5),h=s(17),l=s(18),d=s(7),p=s(25),f=s(24),v=s(50),b=s(51),m=s.n(b),j="http://localhost:12322/",g=function(){function e(t,s){Object(h.a)(this,e),this.id=void 0,this.token=void 0,this.base=void 0,this.id=t,this.token=s,this.base=j+"api"}return Object(l.a)(e,[{key:"getUser",value:function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.makeRequest("/users/"+t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getSelf",value:function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.makeRequest("/self/");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getMessages",value:function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.makeRequest("/channels/"+t+"/messages/");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getChannel",value:function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.makeRequest("/channels/"+t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"block",value:function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.makeRequest("/users/"+t+"/block",void 0,!0);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"OpenDM",value:function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.makeRequest("/users/"+t+"/opendm",void 0,!0);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getRequestHeaders",value:function(){return{id:this.id,token:this.token,Accept:"application/json"}}},{key:"makeRequest",value:function(){var e=Object(u.a)(o.a.mark((function e(t,s){var n,a,r,i=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=i.length>2&&void 0!==i[2]&&i[2],!s&&!n){e.next=9;break}return e.next=4,m.a.post(this.base+t,s,{headers:this.getRequestHeaders()});case 4:if(!("error"in(a=e.sent).data)){e.next=8;break}throw console.error(a.data.error),a.data.error;case 8:return e.abrupt("return",a.data);case 9:return e.next=11,m.a.get(this.base+t,{headers:this.getRequestHeaders()});case 11:if(!("error"in(r=e.sent).data)){e.next=15;break}throw console.error(r.data.error),r.data.error;case 15:return e.abrupt("return",r.data);case 16:case"end":return e.stop()}}),e,this)})));return function(t,s){return e.apply(this,arguments)}}()}]),e}(),x=s(0),O=function(e){Object(p.a)(s,e);var t=Object(f.a)(s);function s(){return Object(h.a)(this,s),t.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(x.jsx)("div",{className:"leftSideBar col-05-f fullCol",children:Object(x.jsx)("img",{className:"home",src:this.props.pfp,alt:"home"})})}}]),s}(n.Component),k=function(e){Object(p.a)(s,e);var t=Object(f.a)(s);function s(){return Object(h.a)(this,s),t.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(x.jsxs)("div",{className:"QuickProfile row",id:this.props.id,children:[Object(x.jsx)("div",{className:"col-3",children:Object(x.jsx)("img",{src:this.props.pfp,className:"pfp-f",alt:this.props.username})}),Object(x.jsxs)("div",{className:"col content NoMargin",children:[Object(x.jsxs)("h3",{className:"username NoMargin",children:[" ",this.props.username]}),Object(x.jsxs)("p",{className:"username NoMargin",children:[" ",this.props.status?this.props.status:""," "]})]})]})}}]),s}(n.Component),w=s(19),y=s(93),M=s.n(y),N=s(94),I=s.n(N),C=s(95),_=s.n(C),S=(s(257),function(e){Object(p.a)(s,e);var t=Object(f.a)(s);function s(e){var a;Object(h.a)(this,s),(a=t.call(this,e)).messagesEndRef=void 0,a.scrollToBottom=function(){a.messagesEndRef.current.scrollIntoView({behavior:"smooth"})};var r=Object(v.io)(j+"?token=".concat(a.props.token,"&id=").concat(a.props.id),{path:"/ws",forceNew:!0});return r.on("RecieveMessage",function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.NewMessageAdder(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).on("error",function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.setState({previewMsg:""});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),a.state={API:new g(a.props.id,a.props.token),channId:a.props.channlId,id:a.props.id,token:a.props.token,messages:{},io:r,content:"",show:function(e){w.c.show({id:"ContextMenuUser",event:e})},userIdContent:a.props.id,msgElmnt:[]},a.messagesEndRef=Object(n.createRef)(),a.sendMessage=a.sendMessage.bind(Object(d.a)(a)),a.handleChange=a.handleChange.bind(Object(d.a)(a)),a.Block=a.Block.bind(Object(d.a)(a)),a.updateChannel=a.updateChannel.bind(Object(d.a)(a)),a.NewMessageAdder=a.NewMessageAdder.bind(Object(d.a)(a)),a.handleChangeOfUser=a.handleChangeOfUser.bind(Object(d.a)(a)),a.ChangeUser=a.ChangeUser.bind(Object(d.a)(a)),a.handleKeyPress=a.handleKeyPress.bind(Object(d.a)(a)),a}return Object(l.a)(s,[{key:"messagesMaker",value:function(){var e,t,s=this;this.setState({msgElmnt:Object.keys((null!==(e=this.state.messages[null!==(t=this.state.channId)&&void 0!==t?t:""])&&void 0!==e?e:{messages:{}}).messages).map((function(e){return s.addMsgToElmnt(e)}))})}},{key:"addMsgToElmnt",value:function(e,t){var s;return Object(x.jsxs)("li",{id:e,className:"message row",children:[Object(x.jsx)("div",{className:"col-05-f",onContextMenu:this.state.show,children:Object(x.jsx)("img",{src:t||this.state.messages[this.state.channId].messages[e].author.pfp,alt:"pfp",className:"pfp"})}),Object(x.jsx)("div",{className:"col message-content",children:Object(x.jsxs)("div",{style:{wordWrap:"break-word",wordBreak:"break-all",flexWrap:"wrap"},className:"MsgContent",children:[Object(x.jsxs)("h3",{children:[" ",t?null===(s=this.state.self)||void 0===s?void 0:s.username:this.state.messages[this.state.channId].messages[e].author.username," "]}),Object(x.jsx)(I.a,{skipHtml:!0,disallowedTypes:["heading","html","break"],plugins:[M.a,_.a],children:t?e:this.state.messages[this.state.channId].messages[e].content})]})})]},e)}},{key:"componentDidMount",value:function(){var e=Object(u.a)(o.a.mark((function e(){var t,s,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new g(this.state.id,this.state.token),e.next=3,this.state.API.getMessages(this.state.channId);case 3:return s=e.sent,(n=this.state.messages)[s._id_]=s,e.t0=this,e.t1=t,e.next=10,t.getSelf();case 10:return e.t2=e.sent,e.t3=n,e.next=14,this.state.API.getChannel(this.state.channId);case 14:e.t4=e.sent,e.t5={API:e.t1,self:e.t2,messages:e.t3,chan:e.t4},e.t0.setState.call(e.t0,e.t5),this.messagesMaker(),this.scrollToBottom();case 19:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"NewMessageAdder",value:function(){var e=Object(u.a)(o.a.mark((function e(t){var s,n,a,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.state.API.getUser(t.author);case 3:s=e.sent,n={_id_:t._id_,channelId:t.channelId,content:t.content,date:t.date,author:{_id_:t.author,DMID:t.channelId,friend:s.friend,pfp:s.pfp,status:s.status,username:s.username}},(a=this.state.messages)[t.channelId]||(a[t.channelId]={_id_:t.channelId,messages:{}}),a[t.channelId].messages[t._id_]=n,(r=this.state.msgElmnt).push(this.addMsgToElmnt(n._id_)),this.setState({previewMsg:"",messages:a,msgElmnt:r}),this.scrollToBottom(),e.next=17;break;case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",e.t0.toString());case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));return function(t){return e.apply(this,arguments)}}()},{key:"ChangeUser",value:function(){var e=Object(u.a)(o.a.mark((function e(){var t,s,n,a,r,i=this;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=new g(this.state.userIdContent,this.props.token),e.next=3,s.getSelf();case 3:if(n=e.sent,null===(t=n.IDDM[Object.keys(n.IDDM)[0]])||void 0===t){e.next=8;break}e.t0=t,e.next=11;break;case 8:return e.next=10,s.OpenDM("47615026313301367274");case 10:e.t0=e.sent._id_;case 11:return a=e.t0,this.state.io.close(),(r=Object(v.io)(j+"?token=".concat(this.props.token,"&id=").concat(s.id),{path:"/ws",forceNew:!0})).on("RecieveMessage",function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.NewMessageAdder(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).on("error",function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i.setState({previewMsg:""});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.t1=this,e.t2=s,e.t3=n,e.t4=s.id,e.t5=r,e.t6=a,e.t7={},e.t8=s.id,e.next=25,s.getChannel(a);case 25:e.t9=e.sent,e.t10={API:e.t2,self:e.t3,id:e.t4,io:e.t5,channId:e.t6,messages:e.t7,userIdContent:e.t8,previewMsg:"",chan:e.t9,content:""},e.t1.setState.call(e.t1,e.t10);case 28:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleChangeOfUser",value:function(e){e.preventDefault(),this.setState({userIdContent:e.target.value})}},{key:"sendMessage",value:function(){if(this.state.content){var e,t;this.state.io.emit("SendMessage",{reciever:this.state.channId,content:this.state.content.trim()});var s=this.state.content;this.setState({content:""}),this.setState({previewMsg:this.addMsgToElmnt(s,null!==(e=null===(t=this.state.self)||void 0===t?void 0:t.pfp)&&void 0!==e?e:"notFound   ")}),this.scrollToBottom()}else alert("No emty messages")}},{key:"handleChange",value:function(e){this.setState({content:e.target.value})}},{key:"handleKeyPress",value:function(e){"Enter"!==e.key||e.shiftKey||this.sendMessage()}},{key:"Block",value:function(){var e=Object(u.a)(o.a.mark((function e(t){var s,n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(null===(s=this.state.self)||void 0===s?void 0:s.blocked.includes(t))){e.next=2;break}throw new Error("alredy blocked");case 2:return e.next=4,null===(n=this.state.API)||void 0===n?void 0:n.block(t);case 4:null===(a=this.state.self)||void 0===a||a.blocked.push(t),this.setState({self:a});case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateChannel",value:function(){var e=Object(u.a)(o.a.mark((function e(t){var s,n=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n.length>1&&void 0!==n[1]&&n[1])){e.next=5;break}return e.next=4,this.state.API.OpenDM(t);case 4:t=e.sent._id_;case 5:if(t!==this.state.channId){e.next=7;break}return e.abrupt("return");case 7:if((s=this.state.messages)[t]){e.next=12;break}return e.next=11,this.state.API.getMessages(t);case 11:s[t]=e.sent;case 12:return e.t0=this,e.next=15,this.state.API.getChannel(t);case 15:e.t1=e.sent,e.t2=t,e.t3=s,e.t4={chan:e.t1,channId:e.t2,messages:e.t3,previewMsg:""},e.t0.setState.call(e.t0,e.t4),this.messagesMaker(),this.scrollToBottom();case 22:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t,s,n,a,r,i,c,o,u,h,l,d,p=this,f=(null!==(e=this.state.self)&&void 0!==e?e:{friends:[]}).friends.map((function(e){return Object(x.jsx)("div",{onClick:function(){p.updateChannel(e._id_,!0)},children:Object(x.jsx)(k,{id:e._id_,pfp:e.pfp,username:e.username})},e._id_)}));return Object(x.jsx)("div",{className:"container",children:Object(x.jsxs)("div",{className:"row",children:[Object(x.jsx)(O,{pfp:null===(t=this.state.self)||void 0===t?void 0:t.pfp,status:(null===(s=this.state.self)||void 0===s?void 0:s.status)?null===(n=this.state.self)||void 0===n?void 0:n.status:"student"}),Object(x.jsxs)("div",{className:"col-2-f",children:[Object(x.jsx)("div",{className:"Box",children:Object(x.jsx)(k,{id:null!==(a=null===(r=this.state.self)||void 0===r?void 0:r._id_)&&void 0!==a?a:"",pfp:null!==(i=null===(c=this.state.self)||void 0===c?void 0:c.pfp)&&void 0!==i?i:"",username:null!==(o=null===(u=this.state.self)||void 0===u?void 0:u.username)&&void 0!==o?o:""})}),Object(x.jsx)("div",{className:"FriendsTab",children:f[0]?f:Object(x.jsxs)("h1",{className:"vertCenter",children:["Oh no!",Object(x.jsx)("br",{}),"You have no friends!"]})}),Object(x.jsx)("form",{className:"UserSwitcher",onSubmit:this.ChangeUser,action:"#",children:Object(x.jsx)("input",{type:"textArea",placeholder:"userId",value:this.state.userIdContent,onChange:this.handleChangeOfUser})})]}),Object(x.jsxs)("div",{className:"col",children:[Object(x.jsxs)("div",{className:"Box row",children:[Object(x.jsx)("div",{className:"col-05",children:Object(x.jsxs)("h1",{className:"NoMargin TopicBar",children:[" ","DM"===(null===(h=this.state.chan)||void 0===h?void 0:h.name)?"@ ":"#"," "]})}),Object(x.jsx)("div",{className:"col",children:Object(x.jsx)("h1",{className:"NoMargin TopicBar",children:"DM"===(null===(l=this.state.chan)||void 0===l?void 0:l.name)?this.state.chan.otherMembers[0].username:null===(d=this.state.chan)||void 0===d?void 0:d.name})})]}),Object(x.jsxs)("div",{className:"chat col-auto",children:[Object(x.jsxs)("div",{className:"Messages row",children:[Object(x.jsx)("ul",{children:this.state.msgElmnt}),this.state.previewMsg,Object(x.jsx)("div",{ref:this.messagesEndRef})]}),Object(x.jsx)(w.b,{id:"ContextMenuUser",theme:"dark",animation:"slide",children:Object(x.jsxs)("div",{className:"Local",children:[Object(x.jsx)(w.a,{children:"Profile"}),Object(x.jsx)(w.a,{children:"Toggle Friendship"}),Object(x.jsx)(w.a,{children:"Report"}),Object(x.jsx)(w.a,{onClick:function(){var e,t;p.Block(null!==(e=null===(t=p.state.chan)||void 0===t?void 0:t.otherMembers[0]._id_)&&void 0!==e?e:"")},children:"Block"}),Object(x.jsx)(w.a,{children:"Note"})]})}),Object(x.jsx)("div",{className:"row",children:Object(x.jsx)("textarea",{style:{resize:"none"},className:"MessageBar",value:this.state.content,onChange:this.handleChange,onKeyPress:this.handleKeyPress})})]})]})]})})}}]),s}(n.Component));r.a.render(Object(x.jsx)("div",{className:"App",children:Object(x.jsx)(S,{channlId:"98282717244666928854",token:"544709652e868f2cb7dc8bb95ff6bdaad9002c4109501be3a32c89244cf4e773",id:"47615026313301367274",children:" "})}),document.getElementById("root")),i()}},[[258,1,2]]]);
//# sourceMappingURL=main.acd8b357.chunk.js.map