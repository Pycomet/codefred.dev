exports.id=772,exports.ids=[772],exports.modules={5682:(e,t,s)=>{Promise.resolve().then(s.bind(s,87932)),Promise.resolve().then(s.t.bind(s,81918,23)),Promise.resolve().then(s.t.bind(s,25290,23)),Promise.resolve().then(s.t.bind(s,81943,23)),Promise.resolve().then(s.t.bind(s,59607,23)),Promise.resolve().then(s.t.bind(s,16638,23)),Promise.resolve().then(s.bind(s,61062))},45594:(e,t,s)=>{Promise.resolve().then(s.bind(s,29704)),Promise.resolve().then(s.bind(s,62530)),Promise.resolve().then(s.bind(s,30998)),Promise.resolve().then(s.bind(s,24251)),Promise.resolve().then(s.t.bind(s,28531,23)),Promise.resolve().then(s.t.bind(s,37882,23)),Promise.resolve().then(s.bind(s,48981))},18805:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,59607,23))},60661:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,28531,23))},77769:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,13219,23)),Promise.resolve().then(s.t.bind(s,34863,23)),Promise.resolve().then(s.t.bind(s,25155,23)),Promise.resolve().then(s.t.bind(s,40802,23)),Promise.resolve().then(s.t.bind(s,9350,23)),Promise.resolve().then(s.t.bind(s,48530,23)),Promise.resolve().then(s.t.bind(s,88921,23))},68041:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,66959,23)),Promise.resolve().then(s.t.bind(s,33875,23)),Promise.resolve().then(s.t.bind(s,88903,23)),Promise.resolve().then(s.t.bind(s,57174,23)),Promise.resolve().then(s.t.bind(s,84178,23)),Promise.resolve().then(s.t.bind(s,87190,23)),Promise.resolve().then(s.t.bind(s,61365,23))},29704:(e,t,s)=>{"use strict";s.d(t,{default:()=>i});var r=s(45512),n=s(58009),o=s(99580);let l="fixed bottom-8 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-4 hover:text-xl transition-all duration-300 ease-out",i=()=>{let[e,t]=(0,n.useState)(l);return(0,n.useEffect)(()=>{let e=()=>{window.scrollY>50?t(l.replace(" hidden","")):t(l+" hidden")};return window.addEventListener("scroll",e,{passive:!0}),()=>{window.removeEventListener("scroll",e,{passive:!0})}},[]),(0,r.jsx)("button",{className:e,onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:(0,r.jsx)(o.uCC,{})})}},87932:(e,t,s)=>{"use strict";s.d(t,{default:()=>r});let r=(0,s(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/macbookpro/Documents/codefred.dev/app/components/helper/scroll-to-top.jsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/macbookpro/Documents/codefred.dev/app/components/helper/scroll-to-top.jsx","default")},19299:(e,t,s)=>{"use strict";s.d(t,{A:()=>d});var r=s(62740),n=s(35635),o=s(59607),l=s.n(o),i=s(91370),a=s(44108);let d=function({blog:e}){return(0,r.jsxs)("div",{className:"border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group",children:[(0,r.jsx)("div",{className:"h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg",children:(0,r.jsx)(n.default,{src:e?.cover_image,height:1080,width:1920,alt:"",className:"h-full w-full group-hover:scale-110 transition-all duration-300"})}),(0,r.jsxs)("div",{className:"p-2 sm:p-3 flex flex-col",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center text-[#16f2b3] text-sm",children:[(0,r.jsx)("p",{children:function(e){let t=Math.floor((new Date().getTime()-new Date(e).getTime())/1e3),s=Math.floor(t/60),r=Math.floor(s/60),n=Math.floor(r/24),o=Math.floor(n/30),l=Math.floor(o/12);return t<60?`${t} seconds ago`:s<60?`${s} minutes ago`:r<24?`${r} hours ago`:n<30?`${n} days ago`:o<12?`${o} months ago`:`${l} years ago`}(e.published_at)}),(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[(0,r.jsxs)("p",{className:"flex items-center gap-1",children:[(0,r.jsx)(i.z8S,{}),(0,r.jsx)("span",{children:e.public_reactions_count})]}),e.comments_count>0&&(0,r.jsxs)("p",{className:"flex items-center gap-1",children:[(0,r.jsx)(a.g5D,{}),(0,r.jsx)("span",{children:e.comments_count})]})]})]}),(0,r.jsx)(l(),{target:"_blank",href:e.url,children:(0,r.jsx)("p",{className:"my-2 lg:my-3 cursor-pointer text-lg text-white sm:text-xl font-medium hover:text-violet-500",children:e.title})}),(0,r.jsx)("p",{className:"mb-2 text-sm text-[#16f2b3]",children:`${e.reading_time_minutes} Min Read`}),(0,r.jsx)("p",{className:"text-sm lg:text-base text-[#d3d8e8] pb-3 lg:pb-6 line-clamp-3",children:e.description})]})]})}},50470:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>f,metadata:()=>u});var r=s(62740),n=s(20300),o=s(69792),l=s.n(o),i=s(61062);s(56070);var a=s(59607),d=s.n(a),c=s(40199),m=s(15390);let h=function(){return(0,r.jsx)("div",{className:"relative border-t bg-[#0d1224] border-[#353951] text-white",children:(0,r.jsxs)("div",{className:"mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10",children:[(0,r.jsx)("div",{className:"flex justify-center -z-40",children:(0,r.jsx)("div",{className:"absolute top-0 h-[1px] w-1/2  bg-gradient-to-r from-transparent via-violet-500 to-transparent"})}),(0,r.jsxs)("div",{className:"flex flex-col md:flex-row items-center justify-between",children:[(0,r.jsxs)("p",{className:"text-sm",children:["\xa9 Developer Portfolio by ",(0,r.jsx)(d(),{target:"_blank",href:"https://www.linkedin.com/in/abu-said-bd/",className:"text-[#16f2b3]",children:"Alfred Emmanuel"})]}),(0,r.jsxs)("div",{className:"flex items-center gap-5",children:[(0,r.jsxs)(d(),{target:"_blank",href:"https://github.com/said7388/developer-portfolio",className:"flex items-center gap-2 uppercase hover:text-[#16f2b3]",children:[(0,r.jsx)(m.DBe,{}),(0,r.jsx)("span",{children:"Star"})]}),(0,r.jsxs)(d(),{target:"_blank",href:"https://github.com/said7388/developer-portfolio/fork",className:"flex items-center gap-2 uppercase hover:text-[#16f2b3]",children:[(0,r.jsx)(c.xk2,{}),(0,r.jsx)("span",{children:"Fork"})]})]})]})]})})};var x=s(87932);let p=function(){return(0,r.jsx)("nav",{className:"bg-transparent",children:(0,r.jsxs)("div",{className:"flex items-center justify-between py-5",children:[(0,r.jsx)("div",{className:"flex flex-shrink-0 items-center",children:(0,r.jsx)(d(),{href:"/",className:" text-[#16f2b3] text-3xl font-bold",children:"Alfred Emmanuel"})}),(0,r.jsxs)("ul",{className:"mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100",id:"navbar-default",children:[(0,r.jsx)("li",{children:(0,r.jsx)(d(),{className:"block px-4 py-2 no-underline outline-none hover:no-underline",href:"/#about",children:(0,r.jsx)("div",{className:"text-sm text-white transition-colors duration-300 hover:text-pink-600",children:"ABOUT"})})}),(0,r.jsx)("li",{children:(0,r.jsx)(d(),{className:"block px-4 py-2 no-underline outline-none hover:no-underline",href:"/#experience",children:(0,r.jsx)("div",{className:"text-sm text-white transition-colors duration-300 hover:text-pink-600",children:"EXPERIENCE"})})}),(0,r.jsx)("li",{children:(0,r.jsx)(d(),{className:"block px-4 py-2 no-underline outline-none hover:no-underline",href:"/#skills",children:(0,r.jsx)("div",{className:"text-sm text-white transition-colors duration-300 hover:text-pink-600",children:"SKILLS"})})}),(0,r.jsx)("li",{children:(0,r.jsx)(d(),{className:"block px-4 py-2 no-underline outline-none hover:no-underline",href:"/#education",children:(0,r.jsx)("div",{className:"text-sm text-white transition-colors duration-300 hover:text-pink-600",children:"EDUCATION"})})}),(0,r.jsx)("li",{children:(0,r.jsx)(d(),{className:"block px-4 py-2 no-underline outline-none hover:no-underline",href:"/blog",children:(0,r.jsx)("div",{className:"text-sm text-white transition-colors duration-300 hover:text-pink-600",children:"BLOGS"})})}),(0,r.jsx)("li",{children:(0,r.jsx)(d(),{className:"block px-4 py-2 no-underline outline-none hover:no-underline",href:"/#projects",children:(0,r.jsx)("div",{className:"text-sm text-white transition-colors duration-300 hover:text-pink-600",children:"PROJECTS"})})})]})]})})};s(86235),s(18295);let u={title:"Portfolio of Alfred Emmanuel - Software Engineer",description:"This is the portfolio of Alfred Emmanuel. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges."};function f({children:e}){return(0,r.jsxs)("html",{lang:"en",children:[(0,r.jsxs)("body",{className:l().className,children:[(0,r.jsx)(i.ToastContainer,{}),(0,r.jsxs)("main",{className:"min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white",children:[(0,r.jsx)(p,{}),e,(0,r.jsx)(x.default,{})]}),(0,r.jsx)(h,{})]}),(0,r.jsx)(n.GoogleTagManager,{gtmId:process.env.NEXT_PUBLIC_GTM})]})}},58255:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var r=s(62740),n=s(59607),o=s.n(n);let l=function(){return(0,r.jsxs)("div",{className:"flex flex-col items-center justify-center h-screen text-center",children:[(0,r.jsx)("h1",{className:"text-6xl font-bold text-gray-800 dark:text-gray-100",children:"404"}),(0,r.jsx)("p",{className:"mt-4 text-lg text-gray-600 dark:text-gray-300",children:"Page Not Found"}),(0,r.jsx)("p",{className:"mt-2 text-gray-500 dark:text-gray-400",children:"Sorry, the page you are looking for does not exist."}),(0,r.jsx)(o(),{className:"mt-5 flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold",role:"button",href:"/",children:"Go to Home"})]})}},33983:(e,t,s)=>{"use strict";s.d(t,{v:()=>r});let r={name:"Alfred Emmanuel",profile:"/profile.png",designation:"Software Developer",description:"My name is Alfred Emmanuel. I am a professional and enthusiastic programmer in my daily life. I am a quick learner with a self-learning attitude. I love to learn and explore new technologies and am passionate about problem-solving. I love almost all the stacks of web application development and love to make the web more open to the world. My core skill is based on JavaScript and I love to do most of the things using JavaScript. I am available for any kind of job opportunity that suits my skills and interests.",email:"alfredemmanuelinyang@gmail.com",phone:"+2348187827291",address:"Plot 2485 Adeyemi Koledoye Close, F.C.T Abuja",github:"https://github.com/pycomet",facebook:"https://www.facebook.com",linkedIn:"https://www.linkedin.com/in/alfredemmanuelinyang/",twitter:"https://twitter.com/pycomet",stackOverflow:"https://stackoverflow.com/users/12743929/codefred",leetcode:"https://leetcode.com/u/Codefred",devUsername:"pycomet",resume:"https://drive.google.com/drive/folders/1st3Hp658rD06zoJtibsHm1nz59URHxrL?usp=drive_link"}},46055:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var r=s(88077);let n=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},86235:()=>{},18295:()=>{}};