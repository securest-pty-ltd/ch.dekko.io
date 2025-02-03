"use strict"
var calcHashArg
function log(c,a){self.postMessage({response:c,msg:a})}function loadScript(c,a,r){try{importScripts(c)}catch(s){return console.error("Error loading script",c,s),void r(s)}a()}function getArg(){return calcHashArg}self.onmessage=function(c){switch(calcHashArg=c.data.arg,c.data.calc){case"wasm":calcWasm()
break
case"simd":calcSimd()}},navigator.userAgent.indexOf("Edge")>=0&&importScripts("text-encoder-lite.min-77d5cbb88bce37d5068b3c35da785e84.js"),importScripts("calc-86081baa87cc7d52cda437377db20866.js")
