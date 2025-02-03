function dataToBase64(t){return sjcl.codec.base64.fromBits(t)}function hash(t){return dataToBase64(sjcl.hash.sha512.hash(t))}function hashOneString(t,e){return hash(sjcl.codec.utf8String.toBits(t+e))}function hashStr(t,e){return t.map((function(t){return hashOneString(t,e)}))}importScripts("index-document-libs-8be59df033968b0cd31e9dcd59ae39c5.js"),onmessage=function(t){if("textData"===t.data.action){var e=t.data.text?t.data.text.concat(t.data.name):t.data.name,a=[]
e.forEach((function(t){-1===a.indexOf(t)&&a.push(t)}))
var n="id="+t.data.id;(e=hashStr(a,t.data.privateKey)).forEach((function(t){n+="&keywords%5B%5D="+encodeURIComponent(t)}))
var s=new XMLHttpRequest
s.open("POST",t.data.url,!1),s.withCredentials=!0,s.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.send(n),4===s.readyState&&200===s.status&&postMessage({action:"success"})}}
