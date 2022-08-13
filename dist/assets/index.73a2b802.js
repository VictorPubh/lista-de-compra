(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerpolicy&&(s.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?s.credentials="include":l.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(l){if(l.ep)return;l.ep=!0;const s=n(l);fetch(l.href,s)}})();function H(){}function oe(e){return e()}function Y(){return Object.create(null)}function D(e){e.forEach(oe)}function fe(e){return typeof e=="function"}function de(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function pe(e){return Object.keys(e).length===0}function f(e,t){e.appendChild(t)}function S(e,t,n){e.insertBefore(t,n||null)}function N(e){e.parentNode.removeChild(e)}function re(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function m(e){return document.createElement(e)}function R(e){return document.createTextNode(e)}function L(){return R(" ")}function ae(){return R("")}function O(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function p(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function z(e){return e===""?null:+e}function _e(e){return Array.from(e.childNodes)}function K(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function j(e,t){e.value=t==null?"":t}let W;function B(e){W=e}const F=[],$=[],G=[],x=[],he=Promise.resolve();let U=!1;function me(){U||(U=!0,he.then(ce))}function V(e){G.push(e)}const J=new Set;let Z=0;function ce(){const e=W;do{for(;Z<F.length;){const t=F[Z];Z++,B(t),be(t.$$)}for(B(null),F.length=0,Z=0;$.length;)$.pop()();for(let t=0;t<G.length;t+=1){const n=G[t];J.has(n)||(J.add(n),n())}G.length=0}while(F.length);for(;x.length;)x.pop()();U=!1,J.clear(),B(e)}function be(e){if(e.fragment!==null){e.update(),D(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(V)}}const ge=new Set;function ye(e,t){e&&e.i&&(ge.delete(e),e.i(t))}function ve(e,t,n,o){const{fragment:l,on_mount:s,on_destroy:i,after_update:r}=e.$$;l&&l.m(t,n),o||V(()=>{const u=s.map(oe).filter(fe);i?i.push(...u):D(u),e.$$.on_mount=[]}),r.forEach(V)}function ke(e,t){const n=e.$$;n.fragment!==null&&(D(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function we(e,t){e.$$.dirty[0]===-1&&(F.push(e),me(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function qe(e,t,n,o,l,s,i,r=[-1]){const u=W;B(e);const a=e.$$={fragment:null,ctx:null,props:s,update:H,not_equal:l,bound:Y(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(u?u.$$.context:[])),callbacks:Y(),dirty:r,skip_bound:!1,root:t.target||u.$$.root};i&&i(a.root);let c=!1;if(a.ctx=n?n(e,t.props||{},(_,b,...v)=>{const E=v.length?v[0]:b;return a.ctx&&l(a.ctx[_],a.ctx[_]=E)&&(!a.skip_bound&&a.bound[_]&&a.bound[_](E),c&&we(e,_)),b}):[],a.update(),c=!0,D(a.before_update),a.fragment=o?o(a.ctx):!1,t.target){if(t.hydrate){const _=_e(t.target);a.fragment&&a.fragment.l(_),_.forEach(N)}else a.fragment&&a.fragment.c();t.intro&&ye(e.$$.fragment),ve(e,t.target,t.anchor,t.customElement),ce()}B(u)}class Le{$destroy(){ke(this,1),this.$destroy=H}$on(t,n){const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const l=o.indexOf(n);l!==-1&&o.splice(l,1)}}$set(t){this.$$set&&!pe(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function ee(e,t,n){const o=e.slice();return o[20]=t[n],o[21]=t,o[22]=n,o}function te(e,t,n){const o=e.slice();return o[23]=t[n],o}function ne(e){let t,n=e[7](e[0]).length+"",o,l;return{c(){t=m("span"),o=R(n),l=R("x Itens"),p(t,"class","tag is-info is-medium")},m(s,i){S(s,t,i),f(t,o),f(t,l)},p(s,i){i&129&&n!==(n=s[7](s[0]).length+"")&&K(o,n)},d(s){s&&N(t)}}}function le(e){let t,n,o,l=e[23].label+"",s,i,r,u,a,c;function _(){return e[12](e[23])}return{c(){t=m("li"),n=m("a"),o=m("span"),s=R(l),r=L(),p(n,"href",i=`#${e[23].label}`),p(t,"class",u=e[23].active&&"is-active")},m(b,v){S(b,t,v),f(t,n),f(n,o),f(o,s),f(t,r),a||(c=O(n,"click",_),a=!0)},p(b,v){e=b,v&2&&l!==(l=e[23].label+"")&&K(s,l),v&2&&i!==(i=`#${e[23].label}`)&&p(n,"href",i),v&2&&u!==(u=e[23].active&&"is-active")&&p(t,"class",u)},d(b){b&&N(t),a=!1,c()}}}function Ee(e){let t,n,o,l=e[4]&&ie(e);return{c(){t=m("h1"),t.textContent="Nenhum produto foi adicionado.",n=L(),l&&l.c(),o=ae(),p(t,"class","has-text-centered mt-3")},m(s,i){S(s,t,i),S(s,n,i),l&&l.m(s,i),S(s,o,i)},p(s,i){s[4]?l?l.p(s,i):(l=ie(s),l.c(),l.m(o.parentNode,o)):l&&(l.d(1),l=null)},d(s){s&&N(t),s&&N(n),l&&l.d(s),s&&N(o)}}}function Ce(e){let t,n,o=e[5]()!="R$ 0,00"&&!e[1][2].active,l,s=e[7](e[0]),i=[];for(let u=0;u<s.length;u+=1)i[u]=se(ee(e,s,u));let r=o&&ue(e);return{c(){t=m("div");for(let u=0;u<i.length;u+=1)i[u].c();n=L(),r&&r.c(),l=ae(),p(t,"class","gridListItems")},m(u,a){S(u,t,a);for(let c=0;c<i.length;c+=1)i[c].m(t,null);S(u,n,a),r&&r.m(u,a),S(u,l,a)},p(u,a){if(a&2753){s=u[7](u[0]);let c;for(c=0;c<s.length;c+=1){const _=ee(u,s,c);i[c]?i[c].p(_,a):(i[c]=se(_),i[c].c(),i[c].m(t,null))}for(;c<i.length;c+=1)i[c].d(1);i.length=s.length}a&34&&(o=u[5]()!="R$ 0,00"&&!u[1][2].active),o?r?r.p(u,a):(r=ue(u),r.c(),r.m(l.parentNode,l)):r&&(r.d(1),r=null)},d(u){u&&N(t),re(i,u),u&&N(n),r&&r.d(u),u&&N(l)}}}function ie(e){let t,n,o,l,s,i,r,u,a;return{c(){t=m("article"),n=m("div"),o=m("p"),o.textContent="Como usar?",l=L(),s=m("button"),i=L(),r=m("div"),r.innerHTML=`Adicione os itens e as quantidades de itens na sua lista e depois popule-os com os valores da prateleiras enquanto voc\xEA escolhe os itens no com\xE9rcio, os itens selecionados (em azul) s\xE3o somados no final da listagem.  
            <br/> 
            <br/>
            Para remover um item da sua lista, defina a quantidade dele como 0.`,p(s,"class","delete"),p(s,"aria-label","delete"),p(n,"class","message-header"),p(r,"class","message-body"),p(t,"class","message is-info mx-2 my-4")},m(c,_){S(c,t,_),f(t,n),f(n,o),f(n,l),f(n,s),f(t,i),f(t,r),u||(a=O(s,"click",e[17]),u=!0)},p:H,d(c){c&&N(t),u=!1,a()}}}function se(e){let t,n,o,l,s=e[20].name+"",i,r,u,a,c,_=e[6](e[20])+"",b,v,E,q,I;function T(){e[13].call(n,e[21],e[22])}function M(){return e[14](e[20])}function Q(){e[15].call(u,e[21],e[22])}function k(){return e[16](e[20])}return{c(){t=m("span"),n=m("input"),o=L(),l=m("span"),i=R(s),r=L(),u=m("input"),a=L(),c=m("span"),b=R(_),v=L(),p(n,"class","input input-quantity is-small"),p(n,"type","number"),p(n,"placeholder","1"),p(u,"class","input input-value is-small"),p(u,"type","number"),p(u,"placeholder","R$ 0,00"),p(c,"class","endmoney"),p(t,"class",E=`notification ${e[20].purchased?"is-info":"is-grey"} mb-0`)},m(C,g){S(C,t,g),f(t,n),j(n,e[20].quantity),f(t,o),f(t,l),f(l,i),f(t,r),f(t,u),j(u,e[20].value),f(t,a),f(t,c),f(c,b),f(t,v),q||(I=[O(n,"input",T),O(n,"change",e[9]),O(l,"click",M),O(u,"input",Q),O(c,"click",k)],q=!0)},p(C,g){e=C,g&129&&z(n.value)!==e[20].quantity&&j(n,e[20].quantity),g&129&&s!==(s=e[20].name+"")&&K(i,s),g&129&&z(u.value)!==e[20].value&&j(u,e[20].value),g&193&&_!==(_=e[6](e[20])+"")&&K(b,_),g&129&&E!==(E=`notification ${e[20].purchased?"is-info":"is-grey"} mb-0`)&&p(t,"class",E)},d(C){C&&N(t),q=!1,D(I)}}}function ue(e){let t,n,o,l,s=e[5]()+"",i;return{c(){t=m("div"),n=m("span"),n.textContent="Total:",o=L(),l=m("span"),i=R(s),p(n,"class","has-text-grey is-size-6"),p(t,"class","total-selected")},m(r,u){S(r,t,u),f(t,n),f(t,o),f(t,l),f(l,i)},p(r,u){u&32&&s!==(s=r[5]()+"")&&K(i,s)},d(r){r&&N(t)}}}function Ne(e){let t,n,o,l=e[7](e[0]).length>0,s,i,r,u,a,c,_,b,v,E,q,I,T,M,Q,k=l&&ne(e),C=e[1],g=[];for(let h=0;h<C.length;h+=1)g[h]=le(te(e,C,h));function d(h,P){return P&129&&(c=null),c==null&&(c=h[7](h[0]).length>0),c?Ce:Ee}let y=d(e,-1),A=y(e);return{c(){t=m("container"),n=m("h1"),o=R(`Lista de Compras
    `),k&&k.c(),s=L(),i=m("div"),r=m("ul");for(let h=0;h<g.length;h+=1)g[h].c();u=L(),a=m("div"),A.c(),_=L(),b=m("div"),v=m("input"),E=L(),q=m("input"),I=L(),T=m("button"),T.textContent="Adicionar",p(n,"class","is-size-4 py-4 has-text-centered"),p(i,"class","tabs is-centered mb-1"),p(v,"class","input"),p(v,"type","number"),p(v,"placeholder","1"),p(q,"class","input"),p(q,"type","text"),p(q,"placeholder","Leite Condensado"),p(T,"class","button is-info"),p(b,"class","addNew"),p(a,"class","table-container"),p(t,"class","screen")},m(h,P){S(h,t,P),f(t,n),f(n,o),k&&k.m(n,null),f(t,s),f(t,i),f(i,r);for(let w=0;w<g.length;w+=1)g[w].m(r,null);f(t,u),f(t,a),A.m(a,null),f(a,_),f(a,b),f(b,v),j(v,e[2]),f(b,E),f(b,q),j(q,e[3]),f(b,I),f(b,T),M||(Q=[O(v,"input",e[18]),O(q,"input",e[19]),O(T,"click",e[10])],M=!0)},p(h,[P]){if(P&129&&(l=h[7](h[0]).length>0),l?k?k.p(h,P):(k=ne(h),k.c(),k.m(n,null)):k&&(k.d(1),k=null),P&258){C=h[1];let w;for(w=0;w<C.length;w+=1){const X=te(h,C,w);g[w]?g[w].p(X,P):(g[w]=le(X),g[w].c(),g[w].m(r,null))}for(;w<g.length;w+=1)g[w].d(1);g.length=C.length}y===(y=d(h,P))&&A?A.p(h,P):(A.d(1),A=y(h),A&&(A.c(),A.m(a,_))),P&4&&z(v.value)!==h[2]&&j(v,h[2]),P&8&&q.value!==h[3]&&j(q,h[3])},i:H,o:H,d(h){h&&N(t),k&&k.d(),re(g,h),A.d(),M=!1,D(Q)}}}function Ae(e,t,n){let o,l,s,{listQuantity:i=[{id:0,purchased:!1,quantity:2,name:"Milho de Pipoca",value:2.7},{id:1,purchased:!1,quantity:1,name:"\xD3leo de Soja",value:5.9}]}=t,r=[{label:"Todos",active:!0,fn:d=>d},{label:"Escolhidos",active:!1,fn:d=>d.filter(y=>{if(y.purchased===!0)return!0})},{label:"Restantes",active:!1,fn:d=>d.filter(y=>{if(y.purchased===!1)return!0})}];function u(d){r.map(y=>{y.active=y.label===d}),n(1,r)}function a(){let d=i.filter(y=>y.quantity>0);n(0,i=d)}let c,_,b=!0;function v(){i.push({id:i.length,purchased:!1,quantity:c,name:_,value:0}),n(0,i),n(2,c=""),n(3,_="")}function E(d,y){n(0,i[d].purchased=y,i),n(0,i)}const q=d=>u(d.label);function I(d,y){d[y].quantity=z(this.value),n(7,o),n(1,r),n(0,i)}const T=d=>E(d.id,!d.purchased);function M(d,y){d[y].value=z(this.value),n(7,o),n(1,r),n(0,i)}const Q=d=>E(d.id,!d.purchased),k=()=>n(4,b=!1);function C(){c=z(this.value),n(2,c)}function g(){_=this.value,n(3,_)}return e.$$set=d=>{"listQuantity"in d&&n(0,i=d.listQuantity)},e.$$.update=()=>{e.$$.dirty&2&&n(7,o=function(d){return r.find(A=>A.active).fn(d)}),e.$$.dirty&1&&n(5,s=function(){let d=0;return i.forEach(y=>{y.purchased&&(d+=y.value*y.quantity)}),`R$ ${d.toLocaleString("pt-br",{minimumFractionDigits:2})}`})},n(6,l=function(d){return`R$${(d.value*d.quantity).toLocaleString("pt-br",{minimumFractionDigits:2})}`}),[i,r,c,_,b,s,l,o,u,a,v,E,q,I,T,M,Q,k,C,g]}class Pe extends Le{constructor(t){super(),qe(this,t,Ae,Ne,de,{listQuantity:0})}}new Pe({target:document.getElementById("app")});
