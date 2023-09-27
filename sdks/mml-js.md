# MML for Javascript

# MML SDK for Javascript

The MML SDK for JavaScript offers simple event tracking for your applications. There are two primary ways to use the SDK: in plain MML and within a React project.

## 1. Installation

### a. Plain MML:

Since NetworkedDOM does not allow the embedding of remote resources, you must embed the SDK directly within your MML using a `<script>` tag.

<!-- prettier-ignore-start -->
```html
<script>"use strict";var Spawnable=(()=>{var l=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var w=(i,e)=>{for(var t in e)l(i,t,{get:e[t],enumerable:!0})},b=(i,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of u(e))!p.call(i,n)&&n!==t&&l(i,n,{get:()=>e[n],enumerable:!(a=g(e,n))||a.enumerable});return i};var v=i=>b(l({},"__esModule",{value:!0}),i);var m={};w(m,{Client:()=>d,Config:()=>c,default:()=>d});var c={Urls:{Api:"https://api.spawnable.io"},Tracking:{CooldownSecondsDefault:10}};var o=class{maxAgeMs;cache;constructor(e){this.maxAgeMs=e,this.cache=new Map}hasPassed(e){let t=this.cache.get(e)||0;return Date.now()>=t+this.maxAgeMs}setTracked(e){this.cache.delete(e),this.cache.set(e,Date.now()),this.removeExpired()}removeExpired(){let e=Date.now(),t=this.cache.values().next().value;if(e>=t+this.maxAgeMs){let a=this.cache.keys().next().value;this.cache.delete(a)}}};var d=class{apiKey;apiUrl;debug;spawnId;cooldown;cooldownCache;constructor(e){let t=window.SPAWNABLE_OPTIONS||{},a=(e==null?void 0:e.apiKey)||t.apiKey;if(!a)throw new Error("an API key is required to initialize Spawnable");this.apiKey=a,this.apiUrl=(e==null?void 0:e.apiUrl)||t.apiUrl||c.Urls.Api,this.debug=(e==null?void 0:e.debug)||t.debug||!1,this.spawnId=(e==null?void 0:e.spawnId)||t.spawnId,this.cooldown=((e==null?void 0:e.cooldown)||t.cooldown||c.Tracking.CooldownSecondsDefault)*1e3,this.cooldownCache=new o(this.cooldown),this.debug&&(this.log("init",e),this.log("preconfig",t))}setSpawnId(e){this.spawnId=e}async track(e,t,a,n){this.log("track",a,n),await this.sendTrackRequest(e,"general",t,a,n)}async trackChat(e,t="Chat Received"){this.log("trackChat",e);let a=document.createElement("m-chat-probe");a.setAttribute("radius",e.toString()),a.setAttribute("debug",this.debug.toString()),a.addEventListener("chat",async n=>{await this.sendTrackRequest(n,"chat-received",null,t,{message:n.detail.message})}),document.body.appendChild(a)}async trackLocation(e,t="Location Entered"){this.log("trackLocation",e);let a=document.createElement("m-position-probe");a.setAttribute("range",e.toString()),a.setAttribute("debug",this.debug.toString()),a.addEventListener("positionenter",async n=>{await this.sendTrackRequest(n,"location-entered",null,t,{})}),document.body.appendChild(a)}async sendTrackRequest(e,t,a,n,r){let s=this.getTrackingKey(e,t,n,r);if(!this.cooldownCache.hasPassed(s)){this.log(t,`Cooldown. Ignoring ${t} event.`);return}let h=await fetch(`${this.apiUrl}/events/track`,{method:"POST",headers:this.headers,body:JSON.stringify({type:t,icon:a,name:n,data:r,spawn:this.spawnId||null})});this.log(t,h.status,h.statusText),this.cooldownCache.setTracked(s)}get headers(){return{Authorization:`Bearer ${this.apiKey}`,Accept:"application/json","Content-Type":"application/json"}}getTrackingKey(e,t,a,n){var s;let r=(s=e==null?void 0:e.detail)==null?void 0:s.connectionId;if(!r)throw new Error("connectionId is required to track events");return JSON.stringify({connectionId:r,type:t,name:a,data:n})}log(e,...t){this.debug&&console.log(`Spawnable [${e}]:`,...t)}};return v(m);})();
</script>
```
<!-- prettier-ignore-end -->

### b. React Project:

Install the SDK via npm:

```bash
npm install @spawnable/sdk-js
```

## 2. Initialization

Here’s how you can initialize the SDK:

```js
import { Client } from '@spawnable/sdk-js'

const client = new Client({
  apiKey: 'YOUR_API_KEY',
  objectId: 'OPTIONAL_OBJECT_ID',
  debug: true, // Optional
  cooldown: 5, // Optional
})
```

::: tip
Note: If the MML is deployed with Spawnable.io, Spawnable will automatically inject the necessary configuration.
:::

## 3. Usage

### a. Set Object ID:

Note: The Object ID is automatically injected when you deploy your code with Spawnable.

```js
client.setObjectId('YOUR_OBJECT_ID')
```

### b. Track General Events:

```js
client.track(mmlEvent, 'eventIcon', 'eventName', {
  property1: 'value1',
  property2: 'value2',
})
```

### c. Track Chat Events:

```js
client.trackChat(radius: number, message = 'Chat Received')
```

### d. Track Location Events:

```js
client.trackLocation(range: number, message = 'Location Entered')
```
