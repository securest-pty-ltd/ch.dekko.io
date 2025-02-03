(function(e){var t={}
function n(r){if(t[r])return t[r].exports
var a=t[r]={i:r,l:!1,exports:{}}
return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e
if(4&t&&"object"==typeof e&&e&&e.__esModule)return e
var r=Object.create(null)
if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a))
return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)})([function(e,t,n){"use strict"
n.r(t)
const r={key:10,delta:3,undefined:1}
class a{constructor(e,t,n){this._id=e,this._dekkoIv=t,this._dekkoKey=n}async setKey(e,t){}_setKeys(e,t=-1){}async _digestMessage(e,t,n){const r=new Uint32Array([t]).buffer,a=new Uint32Array([n]).buffer,i=new Uint8Array(20)
i.set(e,0),i.set(new Uint8Array(r),12),i.set(new Uint8Array(a),16)
const s=(await crypto.subtle.digest("SHA-256",i.buffer)).slice(0,12)
return new Uint8Array(s)}async encodeFunction(e,t){const n=e.timestamp,a=e.getMetadata().synchronizationSource,i=new ArrayBuffer(8),s=new DataView(i)
s.setUint32(0,n),s.setUint32(4,a)
const o=e.data.slice(r[e.type]),y=await this._digestMessage(this._dekkoIv,n,a),c=await crypto.subtle.encrypt({name:"AES-GCM",iv:y},this._dekkoKey,o)
if(!c)return
const d=new ArrayBuffer(r[e.type]+c.byteLength+8),u=new Uint8Array(d)
return u.set(new Uint8Array(e.data,0,r[e.type])),u.set(new Uint8Array(c),r[e.type]),u.set(new Uint8Array(i),r[e.type]+c.byteLength),e.data=d,t.enqueue(e)}async decodeFunction(e,t){try{const t=e.data.slice(-8),n=new DataView(t),a=n.getUint32(0),i=n.getUint32(4),s=e.data.byteLength-8,o=r[e.type],y=e.data.slice(o,s),c=await this._digestMessage(this._dekkoIv,a,i),d=await crypto.subtle.decrypt({name:"AES-GCM",iv:c},this._dekkoKey,y),u=new ArrayBuffer(r[e.type]+d.byteLength),p=new Uint8Array(u)
p.set(new Uint8Array(e.data,0,r[e.type])),p.set(new Uint8Array(d),r[e.type]),e.data=u}catch(n){console.error(n,"decrypt error frame")}return t.enqueue(e)}async _decryptFrame(e,t,n=0){const{encryptionKey:a}=this._cryptoKeyRing[t]
let{material:i}=this._cryptoKeyRing[t]
try{const t=new Uint8Array(e.data,0,r[e.type]),n=new Uint8Array(e.data,e.data.byteLength-2,2),i=n[0],s=new Uint8Array(e.data,e.data.byteLength-i-n.byteLength,i),o=t.byteLength,y=e.data.byteLength-(t.byteLength+i+n.byteLength),c=await crypto.subtle.decrypt({name:"AES-GCM",iv:s,additionalData:new Uint8Array(e.data,0,t.byteLength)},a,new Uint8Array(e.data,o,y)),d=new ArrayBuffer(t.byteLength+c.byteLength),u=new Uint8Array(d)
u.set(new Uint8Array(e.data,0,t.byteLength)),u.set(new Uint8Array(c),t.byteLength),e.data=d}catch(s){if(n<8){i=await async function(e){return crypto.subtle.importKey("raw",e,"HKDF",!1,["deriveBits","deriveKey"])}(await async function(e){const t=new TextEncoder
return crypto.subtle.deriveBits({name:"HKDF",salt:t.encode("JFrameRatchetKey"),hash:"SHA-256",info:new ArrayBuffer},e,256)}(i))
const r=await async function(e){const t=new ArrayBuffer,n=new TextEncoder
return{material:e,encryptionKey:await crypto.subtle.deriveKey({name:"HKDF",salt:n.encode("JFrameEncryptionKey"),hash:"SHA-256",info:t},e,{name:"AES-GCM",length:128},!1,["encrypt","decrypt"])}}(i)
return this._setKeys(r),await this._decryptFrame(e,t,n+1)}}return e}_makeIV(e,t){const n=new ArrayBuffer(12),r=new DataView(n)
this._sendCounts.has(e)||this._sendCounts.set(e,Math.floor(65535*Math.random()))
const a=this._sendCounts.get(e)
return r.setUint32(0,e),r.setUint32(4,t),r.setUint32(8,a%65535),this._sendCounts.set(e,a+1),n}}const i=new Map
onmessage=async e=>{const{operation:t}=e.data
if("encode"===t){const{readableStream:t,writableStream:n,participantId:r,dekkoIv:s,dekkoKey:o}=e.data
i.has(r)||i.set(r,new a(r,s,o))
const y=i.get(r),c=new TransformStream({transform:y.encodeFunction.bind(y)})
t.pipeThrough(c).pipeTo(n)}else if("decode"===t){const{readableStream:t,writableStream:n,participantId:r,dekkoIv:s,dekkoKey:o}=e.data
i.has(r)||i.set(r,new a(r,s,o))
const y=i.get(r),c=new TransformStream({transform:y.decodeFunction.bind(y)})
t.pipeThrough(c).pipeTo(n)}else if("setKey"===t){const{participantId:t,key:n,keyIndex:r}=e.data
i.has(t)||i.set(t,new a(t))
const s=i.get(t)
n?s.setKey(n,r):s.setKey(!1,r)}else if("cleanup"===t){const{participantId:t}=e.data
i.delete(t)}else console.error("e2ee worker",t)}}])
