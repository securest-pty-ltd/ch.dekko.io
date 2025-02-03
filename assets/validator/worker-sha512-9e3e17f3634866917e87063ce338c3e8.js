"use strict"
const FILE_CNUNK=4194304
function blobToBuffer(e){return e.arrayBuffer&&"function"==typeof e.arrayBuffer?e.arrayBuffer():new RSVP.Promise((t=>{const r=new FileReader
r.onload=function(e){t(e.target.result)},r.readAsArrayBuffer(e)}))}function concatBuffers(e,t){if(!e)return t
if(!t)return e
const r=new Uint8Array(e.byteLength+t.byteLength)
return r.set(new Uint8Array(e),0),r.set(new Uint8Array(t),e.byteLength),r.buffer}async function digestMessage(e){return Array.from(new Uint8Array(e)).map((e=>e.toString(16).padStart(2,"0"))).join("")}async function encryptData(e){let t
for(let r=0,n=0;r<e.size;r+=4194304,n++){const s=await blobToBuffer(e.slice(r,r+4194304)),a=await crypto.subtle.digest("SHA-512",s)
if(n>0){const e=concatBuffers(t,a)
t=await crypto.subtle.digest("SHA-512",e)}else t=a}return digestMessage(t)}self.onmessage=function(e){encryptData(e.data).then((e=>self.postMessage({response:"success",digestHex:e})))}
