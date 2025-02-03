"use strict"
var global="undefined"==typeof window?self:window,root="/"
function calc(e){return function(o){o.preventDefault()
try{e()}catch(o){log("error","Error: "+o)}}}function calcWasm(){calcBinaryen("native-wasm")}function calcSimd(){calcBinaryen("native-wasm",{simd:!0})}function calcBinaryen(e,o){if(!global.WebAssembly)return void log("error","Your browser doesn't support WebAssembly, please try it in Chrome Canary or Firefox Nightly with WASM flag enabled")
const r=getArg().mem
if(global.Module&&global.Module.wasmJSMethod===e&&global.Module._argon2_hash_ext)return void setTimeout(calcHash,10)
const a=65536,n=Math.min(Math.max(Math.ceil(1024*r/a),256)+256,32767),l=new WebAssembly.Memory({initial:n,maximum:32767})
global.Module={print:console.log,printErr:console.error,setStatus:console.log,wasmBinary:null,wasmJSMethod:e,wasmMemory:l,buffer:l.buffer,TOTAL_MEMORY:n*a}
var t="argon2.wasm"
o&&o.simd&&(t="argon2-simd.wasm")
var s=new XMLHttpRequest
s.open("GET",root+"assets/argon2/"+t,!0),s.responseType="arraybuffer",s.onload=function(){global.Module.wasmBinary=s.response,global.Module.postRun=calcHash
now()
loadScript(root+"assets/argon2/argon2.js",(function(){}),(function(){log("error","Error loading script")}))},s.onerror=function(){log("error","Error loading wasm")},s.send(null)}function calcHash(){var e=getArg()
if(!Module._argon2_hash_ext)return log("error","Error")
var o,r=now(),a=e&&e.time||10,n=e&&e.mem||1024,l=e&&e.parallelism||1,t=encodeUtf8(e.pass||"password"),s=allocateArray(t),c=t.length,i=encodeUtf8(e.salt||"somesalt"),u=e&&e.type||0,d=allocateArray(i),g=i.length,f=Module.allocate(new Array(e&&e.hashLen||32),"i8",Module.ALLOC_NORMAL),m=e&&e.hashLen||32,M=Module._argon2_encodedlen(a,n,l,g,m,u),h=Module.allocate(new Array(M+1),"i8",Module.ALLOC_NORMAL)
try{var w=Module._argon2_hash_ext(a,n,l,s,c,d,g,f,m,h,M,u,0,0,0,0,19)}catch(_){o=_}now()
if(0!==w||o){try{o||(o=Module.UTF8ToString(Module._argon2_error_message(w)))}catch(_){}log("error","Error: "+w+(o?": "+o:""))}else{for(var y=[],p=f;p<f+m;p++)y.push(Module.HEAP8[p])
log("success",y.map((function(e){return("0"+(255&e).toString(16)).slice(-2)})).join(""))}try{Module._free(s),Module._free(d),Module._free(f),Module._free(h)}catch(_){}}function encodeUtf8(e){return(new TextEncoder).encode(e)}function allocateArray(e){return Module.allocate(e,"i8",Module.ALLOC_NORMAL)}function now(){return global.performance?performance.now():Date.now()}