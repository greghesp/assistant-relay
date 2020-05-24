(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{140:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return b}));var a=n(1),o=n(9),r=(n(0),n(149)),i={id:"configuration",title:"Configuration",description:"How to configure Assistant Relay"},l={id:"getting-started/configuration",title:"Configuration",description:"How to configure Assistant Relay",source:"@site/docs\\getting-started\\configuration.md",permalink:"/assistant-relay/docs/getting-started/configuration",sidebar:"docs",previous:{title:"Installation",permalink:"/assistant-relay/docs/getting-started/installation"},next:{title:"Sending Broadcasts",permalink:"/assistant-relay/docs/commands/broadcast"}},s=[{value:"Configuring Credentials",id:"configuring-credentials",children:[]},{value:"Setting up Assistant Relay",id:"setting-up-assistant-relay",children:[]},{value:"Configuring Assistant Relay",id:"configuring-assistant-relay",children:[{value:"Changing the port before running",id:"changing-the-port-before-running",children:[]}]}],c={rightToc:s};function b(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"configuring-credentials"},"Configuring Credentials"),Object(r.b)("p",null,"To get started with Assistant Relay, you will first need to setup a project in the Google Cloud Console to integrate with.  You will need to repeat these steps, for every Google Account you wish to add to Assistant Rlay"),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"}," ",Object(r.b)("strong",{parentName:"p"},"Make sure you are signed into the Google Account you want this to work with!"))),Object(r.b)("p",null,"Rather than list all the steps on how to configure this, please follow the ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account"}),"Configure a Developer Project and Account Settings")," guide from Google.",Object(r.b)("br",{parentName:"p"}),"\n","Once you have completed steps 1 - 6, come back to this guide and follow the below instructions:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Go to the ",Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://console.developers.google.com/"}),"Google Developer Console")," and ensure that your project is selected from the dropdown at the top"),Object(r.b)("li",{parentName:"ol"},"Click on the ",Object(r.b)("inlineCode",{parentName:"li"},"Credentials")," link in the left hand menu"),Object(r.b)("li",{parentName:"ol"},"At the top, click the ",Object(r.b)("inlineCode",{parentName:"li"},"Create Credentials")," button and select ",Object(r.b)("inlineCode",{parentName:"li"},"Help me choose")),Object(r.b)("li",{parentName:"ol"},"Select ",Object(r.b)("inlineCode",{parentName:"li"},"Google Assistant API")," from the first dropdown list"),Object(r.b)("li",{parentName:"ol"},"In the second dropdown, choose ",Object(r.b)("inlineCode",{parentName:"li"},"Web server (e.g. node.js, Tomcat)"),", and then select ",Object(r.b)("inlineCode",{parentName:"li"},"User data")," from the options below"),Object(r.b)("li",{parentName:"ol"},"Select ",Object(r.b)("inlineCode",{parentName:"li"},"What credentials do I need?")," and then give your client ID a name, such as ",Object(r.b)("inlineCode",{parentName:"li"},"Assistant Relay"),". Click ",Object(r.b)("inlineCode",{parentName:"li"},"Create OAuth client ID"),"."),Object(r.b)("li",{parentName:"ol"},"Click the ",Object(r.b)("inlineCode",{parentName:"li"},"Download")," button to download your credentials json file.")),Object(r.b)("h2",{id:"setting-up-assistant-relay"},"Setting up Assistant Relay"),Object(r.b)("p",null,"Now that you have your credentials json file downloaded, it's time to setup Assistant Relay"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Run the command ",Object(r.b)("inlineCode",{parentName:"li"},"npm run start")," to start Assistant Relay"),Object(r.b)("li",{parentName:"ol"},"In your terminal/command window, you will see a message giving you a link to the Assistant Relay Dashboard. Open this link in a web browser"),Object(r.b)("li",{parentName:"ol"},"You can now follow the setup wizard, adding a username and providing the credentials json you downloaded above"),Object(r.b)("li",{parentName:"ol"},"Once you have setup your first user, Assistant Relay will broadcast a message to announce it is setup.")),Object(r.b)("h2",{id:"configuring-assistant-relay"},"Configuring Assistant Relay"),Object(r.b)("p",null,"Assistant Relay has a set of options that can be configured under the ",Object(r.b)("inlineCode",{parentName:"p"},"Configuration")," tab of the Assistant Relay dashboard."),Object(r.b)("p",null,"At this time, the following configuration options are available:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Mute Startup Sound"),": If set to off, Assistant Relay will broadcast a message when it starts up"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Port Number"),": Change the port Assistant Relay is running on"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Quiet Hours"),": If enabled, Quiet Hours let you set a time when broadcasts are not announced."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Conversation Language"),": Change the language that Assistant Relay communicates with the Assistant SDK")),Object(r.b)("h3",{id:"changing-the-port-before-running"},"Changing the port before running"),Object(r.b)("p",null,"By default, Assistant Relay runs on port 3000. If you need to change this ",Object(r.b)("strong",{parentName:"p"},"before")," running Assistant Relay, you can do this by creating a ",Object(r.b)("inlineCode",{parentName:"p"},"config.json")," file."),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"In the ",Object(r.b)("inlineCode",{parentName:"li"},"assistant-relay")," folder, navigate to the ",Object(r.b)("inlineCode",{parentName:"li"},"bin")," subfolder"),Object(r.b)("li",{parentName:"ol"},"Create a file called ",Object(r.b)("inlineCode",{parentName:"li"},"config.json")),Object(r.b)("li",{parentName:"ol"},"Inside this file, paste the below code, modify the port number and save.")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),'{\n  "port": 3000\n}\n')),Object(r.b)("ol",{start:4},Object(r.b)("li",{parentName:"ol"},"Start Assistant Relay")))}b.isMDXComponent=!0},149:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return g}));var a=n(0),o=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),b=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l({},t,{},e)),n},u=function(e){var t=b(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=b(n),d=a,g=u["".concat(i,".").concat(d)]||u[d]||p[d]||r;return n?o.a.createElement(g,l({ref:t},c,{components:n})):o.a.createElement(g,l({ref:t},c))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);