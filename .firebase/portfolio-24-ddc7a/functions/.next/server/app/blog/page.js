(()=>{var e={};e.id=831,e.ids=[831],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},79551:e=>{"use strict";e.exports=require("url")},91778:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.a,__next_app__:()=>c,pages:()=>p,routeModule:()=>u,tree:()=>l});var s=t(70260),a=t(28203),o=t(25155),n=t.n(o),i=t(67292),d={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);t.d(r,d);let l=["",{children:["blog",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,98251)),"/Users/macbookpro/Documents/codefred.dev/app/blog/page.js"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,50470)),"/Users/macbookpro/Documents/codefred.dev/app/layout.js"],"not-found":[()=>Promise.resolve().then(t.bind(t,58255)),"/Users/macbookpro/Documents/codefred.dev/app/not-found.jsx"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],p=["/Users/macbookpro/Documents/codefred.dev/app/blog/page.js"],c={require:t,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/blog/page",pathname:"/blog",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},46831:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,59607,23)),Promise.resolve().then(t.t.bind(t,71066,23))},55079:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,28531,23)),Promise.resolve().then(t.t.bind(t,41902,23))},98251:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i});var s=t(62740),a=t(33983),o=t(19299);async function n(){let e=await fetch(`https://dev.to/api/articles?username=${a.v.devUsername}`);if(!e.ok)throw Error("Failed to fetch data");return await e.json()}let i=async function(){let e=await n();return(0,s.jsxs)("div",{className:"py-8",children:[(0,s.jsx)("div",{className:"flex justify-center my-5 lg:py-8",children:(0,s.jsxs)("div",{className:"flex  items-center",children:[(0,s.jsx)("span",{className:"w-24 h-[2px] bg-[#1a1443]"}),(0,s.jsx)("span",{className:"bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md",children:"All Blog"}),(0,s.jsx)("span",{className:"w-24 h-[2px] bg-[#1a1443]"})]})}),(0,s.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10",children:e.map((e,r)=>e?.cover_image&&(0,s.jsx)(o.A,{blog:e},r))})]})}}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,739,320,772],()=>t(91778));module.exports=s})();