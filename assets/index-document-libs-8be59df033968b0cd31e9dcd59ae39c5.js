"use strict"
var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(t){this.toString=function(){return"CORRUPT: "+this.message},this.message=t},invalid:function(t){this.toString=function(){return"INVALID: "+this.message},this.message=t},bug:function(t){this.toString=function(){return"BUG: "+this.message},this.message=t},notReady:function(t){this.toString=function(){return"NOT READY: "+this.message},this.message=t}}}
function t(t,e,i){if(4!==e.length)throw new sjcl.exception.invalid("invalid aes block size")
var s=t.b[i],r=e[0]^s[0],n=e[i?3:1]^s[1],c=e[2]^s[2]
e=e[i?1:3]^s[3]
var o,a,l,h,f=s.length/4-2,u=4,d=[0,0,0,0]
t=(o=t.s[i])[0]
var p=o[1],b=o[2],m=o[3],y=o[4]
for(h=0;h<f;h++)o=t[r>>>24]^p[n>>16&255]^b[c>>8&255]^m[255&e]^s[u],a=t[n>>>24]^p[c>>16&255]^b[e>>8&255]^m[255&r]^s[u+1],l=t[c>>>24]^p[e>>16&255]^b[r>>8&255]^m[255&n]^s[u+2],e=t[e>>>24]^p[r>>16&255]^b[n>>8&255]^m[255&c]^s[u+3],u+=4,r=o,n=a,c=l
for(h=0;4>h;h++)d[i?3&-h:h]=y[r>>>24]<<24^y[n>>16&255]<<16^y[c>>8&255]<<8^y[255&e]^s[u++],o=r,r=n,n=c,c=e,e=o
return d}function u(t,e){var i,s,r,n=t.F,c=t.b,o=n[0],a=n[1],l=n[2],h=n[3],f=n[4],u=n[5],d=n[6],p=n[7]
for(i=0;64>i;i++)16>i?s=e[i]:(s=e[i+1&15],r=e[i+14&15],s=e[15&i]=(s>>>7^s>>>18^s>>>3^s<<25^s<<14)+(r>>>17^r>>>19^r>>>10^r<<15^r<<13)+e[15&i]+e[i+9&15]|0),s=s+p+(f>>>6^f>>>11^f>>>25^f<<26^f<<21^f<<7)+(d^f&(u^d))+c[i],p=d,d=u,u=f,f=h+s|0,h=l,l=a,o=s+((a=o)&l^h&(a^l))+(a>>>2^a>>>13^a>>>22^a<<30^a<<19^a<<10)|0
n[0]=n[0]+o|0,n[1]=n[1]+a|0,n[2]=n[2]+l|0,n[3]=n[3]+h|0,n[4]=n[4]+f|0,n[5]=n[5]+u|0,n[6]=n[6]+d|0,n[7]=n[7]+p|0}function A(t,e){var i,s=sjcl.random.K[t],r=[]
for(i in s)s.hasOwnProperty(i)&&r.push(s[i])
for(i=0;i<r.length;i++)r[i](e)}function C(t,e){"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?t.addEntropy(window.performance.now(),e,"loadtime"):t.addEntropy((new Date).valueOf(),e,"loadtime")}function y(t){t.b=z(t).concat(z(t)),t.L=new sjcl.cipher.aes(t.b)}function z(t){for(var e=0;4>e&&(t.h[e]=t.h[e]+1|0,!t.h[e]);e++);return t.L.encrypt(t.h)}function B(t,e){return function(){e.apply(t,arguments)}}sjcl.cipher.aes=function(t){this.s[0][0][0]||this.O()
var e,i,s,r,n=this.s[0][4],c=this.s[1],o=1
if(4!==(e=t.length)&&6!==e&&8!==e)throw new sjcl.exception.invalid("invalid aes key size")
for(this.b=[s=t.slice(0),r=[]],t=e;t<4*e+28;t++)i=s[t-1],(0==t%e||8===e&&4==t%e)&&(i=n[i>>>24]<<24^n[i>>16&255]<<16^n[i>>8&255]<<8^n[255&i],0==t%e&&(i=i<<8^i>>>24^o<<24,o=o<<1^283*(o>>7))),s[t]=s[t-e]^i
for(e=0;t;e++,t--)i=s[3&e?t:t-4],r[e]=4>=t||4>e?i:c[0][n[i>>>24]]^c[1][n[i>>16&255]]^c[2][n[i>>8&255]]^c[3][n[255&i]]},sjcl.cipher.aes.prototype={encrypt:function(e){return t(this,e,0)},decrypt:function(e){return t(this,e,1)},s:[[[],[],[],[],[]],[[],[],[],[],[]]],O:function(){var t,e,i,s,r,n,c,o=this.s[0],a=this.s[1],l=o[4],h=a[4],f=[],u=[]
for(t=0;256>t;t++)u[(f[t]=t<<1^283*(t>>7))^t]=t
for(e=i=0;!l[e];e^=s||1,i=u[i]||1)for(n=(n=i^i<<1^i<<2^i<<3^i<<4)>>8^255&n^99,l[e]=n,h[n]=e,c=16843009*(r=f[t=f[s=f[e]]])^65537*t^257*s^16843008*e,r=257*f[n]^16843008*n,t=0;4>t;t++)o[t][e]=r=r<<24^r>>>8,a[t][n]=c=c<<24^c>>>8
for(t=0;5>t;t++)o[t]=o[t].slice(0),a[t]=a[t].slice(0)}},sjcl.bitArray={bitSlice:function(t,e,i){return t=sjcl.bitArray.$(t.slice(e/32),32-(31&e)).slice(1),void 0===i?t:sjcl.bitArray.clamp(t,i-e)},extract:function(t,e,i){var s=Math.floor(-e-i&31)
return(-32&(e+i-1^e)?t[e/32|0]<<32-s^t[e/32+1|0]>>>s:t[e/32|0]>>>s)&(1<<i)-1},concat:function(t,e){if(0===t.length||0===e.length)return t.concat(e)
var i=t[t.length-1],s=sjcl.bitArray.getPartial(i)
return 32===s?t.concat(e):sjcl.bitArray.$(e,s,0|i,t.slice(0,t.length-1))},bitLength:function(t){var e=t.length
return 0===e?0:32*(e-1)+sjcl.bitArray.getPartial(t[e-1])},clamp:function(t,e){if(32*t.length<e)return t
var i=(t=t.slice(0,Math.ceil(e/32))).length
return e&=31,0<i&&e&&(t[i-1]=sjcl.bitArray.partial(e,t[i-1]&2147483648>>e-1,1)),t},partial:function(t,e,i){return 32===t?e:(i?0|e:e<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,e){if(sjcl.bitArray.bitLength(t)!==sjcl.bitArray.bitLength(e))return!1
var i,s=0
for(i=0;i<t.length;i++)s|=t[i]^e[i]
return 0===s},$:function(t,e,i,s){var r
for(r=0,void 0===s&&(s=[]);32<=e;e-=32)s.push(i),i=0
if(0===e)return s.concat(t)
for(r=0;r<t.length;r++)s.push(i|t[r]>>>e),i=t[r]<<32-e
return r=t.length?t[t.length-1]:0,t=sjcl.bitArray.getPartial(r),s.push(sjcl.bitArray.partial(e+t&31,32<e+t?i:s.pop(),1)),s},i:function(t,e){return[t[0]^e[0],t[1]^e[1],t[2]^e[2],t[3]^e[3]]},byteswapM:function(t){var e,i
for(e=0;e<t.length;++e)i=t[e],t[e]=i>>>24|i>>>8&65280|(65280&i)<<8|i<<24
return t}},sjcl.codec.utf8String={fromBits:function(t){var e,i,s="",r=sjcl.bitArray.bitLength(t)
for(e=0;e<r/8;e++)0==(3&e)&&(i=t[e/4]),s+=String.fromCharCode(i>>>8>>>8>>>8),i<<=8
return decodeURIComponent(escape(s))},toBits:function(t){t=unescape(encodeURIComponent(t))
var e,i=[],s=0
for(e=0;e<t.length;e++)s=s<<8|t.charCodeAt(e),3==(3&e)&&(i.push(s),s=0)
return 3&e&&i.push(sjcl.bitArray.partial(8*(3&e),s)),i}},sjcl.codec.hex={fromBits:function(t){var e,i=""
for(e=0;e<t.length;e++)i+=(0xf00000000000+(0|t[e])).toString(16).substr(4)
return i.substr(0,sjcl.bitArray.bitLength(t)/4)},toBits:function(t){var e,i,s=[]
for(i=(t=t.replace(/\s|0x/g,"")).length,t+="00000000",e=0;e<t.length;e+=8)s.push(0^parseInt(t.substr(e,8),16))
return sjcl.bitArray.clamp(s,4*i)}},sjcl.codec.base32={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",X:"0123456789ABCDEFGHIJKLMNOPQRSTUV",BITS:32,BASE:5,REMAINING:27,fromBits:function(t,e,i){var s=sjcl.codec.base32.BASE,r=sjcl.codec.base32.REMAINING,n="",c=0,o=sjcl.codec.base32.B,a=0,l=sjcl.bitArray.bitLength(t)
for(i&&(o=sjcl.codec.base32.X),i=0;n.length*s<l;)n+=o.charAt((a^t[i]>>>c)>>>r),c<s?(a=t[i]<<s-c,c+=r,i++):(a<<=s,c-=s)
for(;7&n.length&&!e;)n+="="
return n},toBits:function(t,e){t=t.replace(/\s|=/g,"").toUpperCase()
var i,s,r=sjcl.codec.base32.BITS,n=sjcl.codec.base32.BASE,c=sjcl.codec.base32.REMAINING,o=[],a=0,l=sjcl.codec.base32.B,h=0,f="base32"
for(e&&(l=sjcl.codec.base32.X,f="base32hex"),i=0;i<t.length;i++){if(0>(s=l.indexOf(t.charAt(i)))){if(!e)try{return sjcl.codec.base32hex.toBits(t)}catch(u){}throw new sjcl.exception.invalid("this isn't "+f+"!")}a>c?(a-=c,o.push(h^s>>>a),h=s<<r-a):h^=s<<r-(a+=n)}return 56&a&&o.push(sjcl.bitArray.partial(56&a,h,1)),o}},sjcl.codec.base32hex={fromBits:function(t,e){return sjcl.codec.base32.fromBits(t,e,1)},toBits:function(t){return sjcl.codec.base32.toBits(t,1)}},sjcl.codec.base64={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(t,e,i){var s="",r=0,n=sjcl.codec.base64.B,c=0,o=sjcl.bitArray.bitLength(t)
for(i&&(n=n.substr(0,62)+"-_"),i=0;6*s.length<o;)s+=n.charAt((c^t[i]>>>r)>>>26),6>r?(c=t[i]<<6-r,r+=26,i++):(c<<=6,r-=6)
for(;3&s.length&&!e;)s+="="
return s},toBits:function(t,e){t=t.replace(/\s|=/g,"")
var i,s,r=[],n=0,c=sjcl.codec.base64.B,o=0
for(e&&(c=c.substr(0,62)+"-_"),i=0;i<t.length;i++){if(0>(s=c.indexOf(t.charAt(i))))throw new sjcl.exception.invalid("this isn't base64!")
26<n?(n-=26,r.push(o^s>>>n),o=s<<32-n):o^=s<<32-(n+=6)}return 56&n&&r.push(sjcl.bitArray.partial(56&n,o,1)),r}},sjcl.codec.base64url={fromBits:function(t){return sjcl.codec.base64.fromBits(t,1,1)},toBits:function(t){return sjcl.codec.base64.toBits(t,1)}},sjcl.hash.sha256=function(t){this.b[0]||this.O(),t?(this.F=t.F.slice(0),this.A=t.A.slice(0),this.l=t.l):this.reset()},sjcl.hash.sha256.hash=function(t){return(new sjcl.hash.sha256).update(t).finalize()},sjcl.hash.sha256.prototype={blockSize:512,reset:function(){return this.F=this.Y.slice(0),this.A=[],this.l=0,this},update:function(t){"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t))
var e,i=this.A=sjcl.bitArray.concat(this.A,t)
if(e=this.l,9007199254740991<(t=this.l=e+sjcl.bitArray.bitLength(t)))throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits")
if("undefined"!=typeof Uint32Array){var s=new Uint32Array(i),r=0
for(e=512+e-(512+e&511);e<=t;e+=512)u(this,s.subarray(16*r,16*(r+1))),r+=1
i.splice(0,16*r)}else for(e=512+e-(512+e&511);e<=t;e+=512)u(this,i.splice(0,16))
return this},finalize:function(){var t,e=this.A,i=this.F
for(t=(e=sjcl.bitArray.concat(e,[sjcl.bitArray.partial(1,1)])).length+2;15&t;t++)e.push(0)
for(e.push(Math.floor(this.l/4294967296)),e.push(0|this.l);e.length;)u(this,e.splice(0,16))
return this.reset(),i},Y:[],b:[],O:function(){function t(t){return 4294967296*(t-Math.floor(t))|0}for(var e,i,s=0,r=2;64>s;r++){for(i=!0,e=2;e*e<=r;e++)if(0==r%e){i=!1
break}i&&(8>s&&(this.Y[s]=t(Math.pow(r,.5))),this.b[s]=t(Math.pow(r,1/3)),s++)}}},sjcl.mode.ccm={name:"ccm",G:[],listenProgress:function(t){sjcl.mode.ccm.G.push(t)},unListenProgress:function(t){-1<(t=sjcl.mode.ccm.G.indexOf(t))&&sjcl.mode.ccm.G.splice(t,1)},fa:function(t){var e,i=sjcl.mode.ccm.G.slice()
for(e=0;e<i.length;e+=1)i[e](t)},encrypt:function(t,e,i,s,r){var n,c=e.slice(0),o=sjcl.bitArray,a=o.bitLength(i)/8,l=o.bitLength(c)/8
if(r=r||64,s=s||[],7>a)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")
for(n=2;4>n&&l>>>8*n;n++);return n<15-a&&(n=15-a),i=o.clamp(i,8*(15-n)),e=sjcl.mode.ccm.V(t,e,i,s,r,n),c=sjcl.mode.ccm.C(t,c,i,e,r,n),o.concat(c.data,c.tag)},decrypt:function(t,e,i,s,r){r=r||64,s=s||[]
var n=sjcl.bitArray,c=n.bitLength(i)/8,o=n.bitLength(e),a=n.clamp(e,o-r),l=n.bitSlice(e,o-r)
o=(o-r)/8
if(7>c)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")
for(e=2;4>e&&o>>>8*e;e++);if(e<15-c&&(e=15-c),i=n.clamp(i,8*(15-e)),a=sjcl.mode.ccm.C(t,a,i,l,r,e),t=sjcl.mode.ccm.V(t,a.data,i,s,r,e),!n.equal(a.tag,t))throw new sjcl.exception.corrupt("ccm: tag doesn't match")
return a.data},na:function(t,e,i,s,r,n){var c=[],o=sjcl.bitArray,a=o.i
if(s=[o.partial(8,(e.length?64:0)|s-2<<2|n-1)],(s=o.concat(s,i))[3]|=r,s=t.encrypt(s),e.length)for(65279>=(i=o.bitLength(e)/8)?c=[o.partial(16,i)]:4294967295>=i&&(c=o.concat([o.partial(16,65534)],[i])),c=o.concat(c,e),e=0;e<c.length;e+=4)s=t.encrypt(a(s,c.slice(e,e+4).concat([0,0,0])))
return s},V:function(t,e,i,s,r,n){var c=sjcl.bitArray,o=c.i
if((r/=8)%2||4>r||16<r)throw new sjcl.exception.invalid("ccm: invalid tag length")
if(4294967295<s.length||4294967295<e.length)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data")
for(i=sjcl.mode.ccm.na(t,s,i,r,c.bitLength(e)/8,n),s=0;s<e.length;s+=4)i=t.encrypt(o(i,e.slice(s,s+4).concat([0,0,0])))
return c.clamp(i,8*r)},C:function(t,e,i,s,r,n){var c,o=sjcl.bitArray
c=o.i
var a=e.length,l=o.bitLength(e),h=a/50,f=h
if(i=o.concat([o.partial(8,n-1)],i).concat([0,0,0]).slice(0,4),s=o.bitSlice(c(s,t.encrypt(i)),0,r),!a)return{tag:s,data:[]}
for(c=0;c<a;c+=4)c>h&&(sjcl.mode.ccm.fa(c/a),h+=f),i[3]++,r=t.encrypt(i),e[c]^=r[0],e[c+1]^=r[1],e[c+2]^=r[2],e[c+3]^=r[3]
return{tag:s,data:o.clamp(e,l)}}},sjcl.mode.ocb2={name:"ocb2",encrypt:function(t,e,i,s,r,n){if(128!==sjcl.bitArray.bitLength(i))throw new sjcl.exception.invalid("ocb iv must be 128 bits")
var c,o=sjcl.mode.ocb2.S,a=sjcl.bitArray,l=a.i,h=[0,0,0,0]
i=o(t.encrypt(i))
var f,u=[]
for(s=s||[],r=r||64,c=0;c+4<e.length;c+=4)h=l(h,f=e.slice(c,c+4)),u=u.concat(l(i,t.encrypt(l(i,f)))),i=o(i)
return f=e.slice(c),e=a.bitLength(f),c=t.encrypt(l(i,[0,0,0,e])),f=a.clamp(l(f.concat([0,0,0]),c),e),h=l(h,l(f.concat([0,0,0]),c)),h=t.encrypt(l(h,l(i,o(i)))),s.length&&(h=l(h,n?s:sjcl.mode.ocb2.pmac(t,s))),u.concat(a.concat(f,a.clamp(h,r)))},decrypt:function(t,e,i,s,r,n){if(128!==sjcl.bitArray.bitLength(i))throw new sjcl.exception.invalid("ocb iv must be 128 bits")
r=r||64
var c,o,a=sjcl.mode.ocb2.S,l=sjcl.bitArray,h=l.i,f=[0,0,0,0],u=a(t.encrypt(i)),d=sjcl.bitArray.bitLength(e)-r,p=[]
for(s=s||[],i=0;i+4<d/32;i+=4)c=h(u,t.decrypt(h(u,e.slice(i,i+4)))),f=h(f,c),p=p.concat(c),u=a(u)
if(o=d-32*i,c=t.encrypt(h(u,[0,0,0,o])),c=h(c,l.clamp(e.slice(i),o).concat([0,0,0])),f=h(f,c),f=t.encrypt(h(f,h(u,a(u)))),s.length&&(f=h(f,n?s:sjcl.mode.ocb2.pmac(t,s))),!l.equal(l.clamp(f,r),l.bitSlice(e,d)))throw new sjcl.exception.corrupt("ocb: tag doesn't match")
return p.concat(l.clamp(c,o))},pmac:function(t,e){var i,s=sjcl.mode.ocb2.S,r=sjcl.bitArray,n=r.i,c=[0,0,0,0],o=n(o=t.encrypt([0,0,0,0]),s(s(o)))
for(i=0;i+4<e.length;i+=4)o=s(o),c=n(c,t.encrypt(n(o,e.slice(i,i+4))))
return i=e.slice(i),128>r.bitLength(i)&&(o=n(o,s(o)),i=r.concat(i,[-2147483648,0,0,0])),c=n(c,i),t.encrypt(n(s(n(o,s(o))),c))},S:function(t){return[t[0]<<1^t[1]>>>31,t[1]<<1^t[2]>>>31,t[2]<<1^t[3]>>>31,t[3]<<1^135*(t[0]>>>31)]}},sjcl.mode.gcm={name:"gcm",encrypt:function(t,e,i,s,r){var n=e.slice(0)
return e=sjcl.bitArray,s=s||[],t=sjcl.mode.gcm.C(!0,t,n,s,i,r||128),e.concat(t.data,t.tag)},decrypt:function(t,e,i,s,r){var n=e.slice(0),c=sjcl.bitArray,o=c.bitLength(n)
if(s=s||[],(r=r||128)<=o?(e=c.bitSlice(n,o-r),n=c.bitSlice(n,0,o-r)):(e=n,n=[]),t=sjcl.mode.gcm.C(!1,t,n,s,i,r),!c.equal(t.tag,e))throw new sjcl.exception.corrupt("gcm: tag doesn't match")
return t.data},ka:function(t,e){var i,s,r,n,c,o=sjcl.bitArray.i
for(r=[0,0,0,0],n=e.slice(0),i=0;128>i;i++){for((s=0!=(t[Math.floor(i/32)]&1<<31-i%32))&&(r=o(r,n)),c=0!=(1&n[3]),s=3;0<s;s--)n[s]=n[s]>>>1|(1&n[s-1])<<31
n[0]>>>=1,c&&(n[0]^=-520093696)}return r},j:function(t,e,i){var s,r=i.length
for(e=e.slice(0),s=0;s<r;s+=4)e[0]^=4294967295&i[s],e[1]^=4294967295&i[s+1],e[2]^=4294967295&i[s+2],e[3]^=4294967295&i[s+3],e=sjcl.mode.gcm.ka(e,t)
return e},C:function(t,e,i,s,r,n){var c,o,a,l,h,f,u,d,p=sjcl.bitArray
for(f=i.length,u=p.bitLength(i),d=p.bitLength(s),o=p.bitLength(r),c=e.encrypt([0,0,0,0]),96===o?(r=r.slice(0),r=p.concat(r,[1])):(r=sjcl.mode.gcm.j(c,[0,0,0,0],r),r=sjcl.mode.gcm.j(c,r,[0,0,Math.floor(o/4294967296),4294967295&o])),o=sjcl.mode.gcm.j(c,[0,0,0,0],s),h=r.slice(0),s=o.slice(0),t||(s=sjcl.mode.gcm.j(c,o,i)),l=0;l<f;l+=4)h[3]++,a=e.encrypt(h),i[l]^=a[0],i[l+1]^=a[1],i[l+2]^=a[2],i[l+3]^=a[3]
return i=p.clamp(i,u),t&&(s=sjcl.mode.gcm.j(c,o,i)),t=[Math.floor(d/4294967296),4294967295&d,Math.floor(u/4294967296),4294967295&u],s=sjcl.mode.gcm.j(c,s,t),a=e.encrypt(r),s[0]^=a[0],s[1]^=a[1],s[2]^=a[2],s[3]^=a[3],{tag:p.bitSlice(s,0,n),data:i}}},sjcl.misc.hmac=function(t,e){this.W=e=e||sjcl.hash.sha256
var i,s=[[],[]],r=e.prototype.blockSize/32
for(this.w=[new e,new e],t.length>r&&(t=e.hash(t)),i=0;i<r;i++)s[0][i]=909522486^t[i],s[1][i]=1549556828^t[i]
this.w[0].update(s[0]),this.w[1].update(s[1]),this.R=new e(this.w[0])},sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(t){if(this.aa)throw new sjcl.exception.invalid("encrypt on already updated hmac called!")
return this.update(t),this.digest(t)},sjcl.misc.hmac.prototype.reset=function(){this.R=new this.W(this.w[0]),this.aa=!1},sjcl.misc.hmac.prototype.update=function(t){this.aa=!0,this.R.update(t)},sjcl.misc.hmac.prototype.digest=function(){var t=this.R.finalize()
t=new this.W(this.w[1]).update(t).finalize()
return this.reset(),t},sjcl.misc.pbkdf2=function(t,e,i,s,r){if(i=i||1e4,0>s||0>i)throw new sjcl.exception.invalid("invalid params to pbkdf2")
"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),t=new(r=r||sjcl.misc.hmac)(t)
var n,c,o,a,l=[],h=sjcl.bitArray
for(a=1;32*l.length<(s||1);a++){for(r=n=t.encrypt(h.concat(e,[a])),c=1;c<i;c++)for(n=t.encrypt(n),o=0;o<n.length;o++)r[o]^=n[o]
l=l.concat(r)}return s&&(l=h.clamp(l,s)),l},sjcl.prng=function(t){this.c=[new sjcl.hash.sha256],this.m=[0],this.P=0,this.H={},this.N=0,this.U={},this.Z=this.f=this.o=this.ha=0,this.b=[0,0,0,0,0,0,0,0],this.h=[0,0,0,0],this.L=void 0,this.M=t,this.D=!1,this.K={progress:{},seeded:{}},this.u=this.ga=0,this.I=1,this.J=2,this.ca=65536,this.T=[0,48,64,96,128,192,256,384,512,768,1024],this.da=3e4,this.ba=80},sjcl.prng.prototype={randomWords:function(t,e){var i,s,r=[]
if((i=this.isReady(e))===this.u)throw new sjcl.exception.notReady("generator isn't seeded")
if(i&this.J){i=!(i&this.I),s=[]
var n,c=0
for(this.Z=s[0]=(new Date).valueOf()+this.da,n=0;16>n;n++)s.push(4294967296*Math.random()|0)
for(n=0;n<this.c.length&&(s=s.concat(this.c[n].finalize()),c+=this.m[n],this.m[n]=0,i||!(this.P&1<<n));n++);for(this.P>=1<<this.c.length&&(this.c.push(new sjcl.hash.sha256),this.m.push(0)),this.f-=c,c>this.o&&(this.o=c),this.P++,this.b=sjcl.hash.sha256.hash(this.b.concat(s)),this.L=new sjcl.cipher.aes(this.b),i=0;4>i&&(this.h[i]=this.h[i]+1|0,!this.h[i]);i++);}for(i=0;i<t;i+=4)0==(i+1)%this.ca&&y(this),s=z(this),r.push(s[0],s[1],s[2],s[3])
return y(this),r.slice(0,t)},setDefaultParanoia:function(t,e){if(0===t&&"Setting paranoia=0 will ruin your security; use it only for testing"!==e)throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing")
this.M=t},addEntropy:function(t,e,i){i=i||"user"
var s,r,n=(new Date).valueOf(),c=this.H[i],o=this.isReady(),a=0
switch(void 0===(s=this.U[i])&&(s=this.U[i]=this.ha++),void 0===c&&(c=this.H[i]=0),this.H[i]=(this.H[i]+1)%this.c.length,typeof t){case"number":void 0===e&&(e=1),this.c[c].update([s,this.N++,1,e,n,1,0|t])
break
case"object":if("[object Uint32Array]"===(i=Object.prototype.toString.call(t))){for(r=[],i=0;i<t.length;i++)r.push(t[i])
t=r}else for("[object Array]"!==i&&(a=1),i=0;i<t.length&&!a;i++)"number"!=typeof t[i]&&(a=1)
if(!a){if(void 0===e)for(i=e=0;i<t.length;i++)for(r=t[i];0<r;)e++,r>>>=1
this.c[c].update([s,this.N++,2,e,n,t.length].concat(t))}break
case"string":void 0===e&&(e=t.length),this.c[c].update([s,this.N++,3,e,n,t.length]),this.c[c].update(t)
break
default:a=1}if(a)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string")
this.m[c]+=e,this.f+=e,o===this.u&&(this.isReady()!==this.u&&A("seeded",Math.max(this.o,this.f)),A("progress",this.getProgress()))},isReady:function(t){return t=this.T[void 0!==t?t:this.M],this.o&&this.o>=t?this.m[0]>this.ba&&(new Date).valueOf()>this.Z?this.J|this.I:this.I:this.f>=t?this.J|this.u:this.u},getProgress:function(t){return t=this.T[t||this.M],this.o>=t||this.f>t?1:this.f/t},startCollectors:function(){if(!this.D){if(this.a={loadTimeCollector:B(this,this.ma),mouseCollector:B(this,this.oa),keyboardCollector:B(this,this.la),accelerometerCollector:B(this,this.ea),touchCollector:B(this,this.qa)},window.addEventListener)window.addEventListener("load",this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window.addEventListener("touchmove",this.a.touchCollector,!1)
else{if(!document.attachEvent)throw new sjcl.exception.bug("can't attach event")
document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector)}this.D=!0}},stopCollectors:function(){this.D&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove",this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.D=!1)},addEventListener:function(t,e){this.K[t][this.ga++]=e},removeEventListener:function(t,e){var i,s,r=this.K[t],n=[]
for(s in r)r.hasOwnProperty(s)&&r[s]===e&&n.push(s)
for(i=0;i<n.length;i++)delete r[s=n[i]]},la:function(){C(this,1)},oa:function(t){var e,i
try{e=t.x||t.clientX||t.offsetX||0,i=t.y||t.clientY||t.offsetY||0}catch(s){i=e=0}0!=e&&0!=i&&this.addEntropy([e,i],2,"mouse"),C(this,0)},qa:function(t){t=t.touches[0]||t.changedTouches[0],this.addEntropy([t.pageX||t.clientX,t.pageY||t.clientY],1,"touch"),C(this,0)},ma:function(){C(this,2)},ea:function(t){if(t=t.accelerationIncludingGravity.x||t.accelerationIncludingGravity.y||t.accelerationIncludingGravity.z,window.orientation){var e=window.orientation
"number"==typeof e&&this.addEntropy(e,1,"accelerometer")}t&&this.addEntropy(t,2,"accelerometer"),C(this,0)}},sjcl.random=new sjcl.prng(6)
t:try{var D,E,F,G
if(G="undefined"!=typeof module&&module.exports){var H
try{H=require("crypto")}catch(a){H=null}G=E=H}if(G&&E.randomBytes)D=E.randomBytes(128),D=new Uint32Array(new Uint8Array(D).buffer),sjcl.random.addEntropy(D,1024,"crypto['randomBytes']")
else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){if(F=new Uint32Array(32),window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(F)
else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break t
window.msCrypto.getRandomValues(F)}sjcl.random.addEntropy(F,1024,"crypto['getRandomValues']")}}catch(a){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(a))}sjcl.json={defaults:{v:1,iter:1e4,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},ja:function(t,e,i,s){i=i||{},s=s||{}
var r,n=sjcl.json,c=n.g({iv:sjcl.random.randomWords(4,0)},n.defaults)
if(n.g(c,i),i=c.adata,"string"==typeof c.salt&&(c.salt=sjcl.codec.base64.toBits(c.salt)),"string"==typeof c.iv&&(c.iv=sjcl.codec.base64.toBits(c.iv)),!sjcl.mode[c.mode]||!sjcl.cipher[c.cipher]||"string"==typeof t&&100>=c.iter||64!==c.ts&&96!==c.ts&&128!==c.ts||128!==c.ks&&192!==c.ks&&256!==c.ks||2>c.iv.length||4<c.iv.length)throw new sjcl.exception.invalid("json encrypt: invalid parameters")
return"string"==typeof t?(t=(r=sjcl.misc.cachedPbkdf2(t,c)).key.slice(0,c.ks/32),c.salt=r.salt):sjcl.ecc&&t instanceof sjcl.ecc.elGamal.publicKey&&(r=t.kem(),c.kemtag=r.tag,t=r.key.slice(0,c.ks/32)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),"string"==typeof i&&(c.adata=i=sjcl.codec.utf8String.toBits(i)),r=new sjcl.cipher[c.cipher](t),n.g(s,c),s.key=t,c.ct="ccm"===c.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&e instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.encrypt(r,e,c.iv,i,c.ts):sjcl.mode[c.mode].encrypt(r,e,c.iv,i,c.ts),c},encrypt:function(t,e,i,s){var r=sjcl.json,n=r.ja.apply(r,arguments)
return r.encode(n)},ia:function(t,e,i,s){i=i||{},s=s||{}
var r,n,c=sjcl.json
if(r=(e=c.g(c.g(c.g({},c.defaults),e),i,!0)).adata,"string"==typeof e.salt&&(e.salt=sjcl.codec.base64.toBits(e.salt)),"string"==typeof e.iv&&(e.iv=sjcl.codec.base64.toBits(e.iv)),!sjcl.mode[e.mode]||!sjcl.cipher[e.cipher]||"string"==typeof t&&100>=e.iter||64!==e.ts&&96!==e.ts&&128!==e.ts||128!==e.ks&&192!==e.ks&&256!==e.ks||!e.iv||2>e.iv.length||4<e.iv.length)throw new sjcl.exception.invalid("json decrypt: invalid parameters")
return"string"==typeof t?(t=(n=sjcl.misc.cachedPbkdf2(t,e)).key.slice(0,e.ks/32),e.salt=n.salt):sjcl.ecc&&t instanceof sjcl.ecc.elGamal.secretKey&&(t=t.unkem(sjcl.codec.base64.toBits(e.kemtag)).slice(0,e.ks/32)),"string"==typeof r&&(r=sjcl.codec.utf8String.toBits(r)),n=new sjcl.cipher[e.cipher](t),r="ccm"===e.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&e.ct instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.decrypt(n,e.ct,e.iv,e.tag,r,e.ts):sjcl.mode[e.mode].decrypt(n,e.ct,e.iv,r,e.ts),c.g(s,e),s.key=t,1===i.raw?r:sjcl.codec.utf8String.fromBits(r)},decrypt:function(t,e,i,s){var r=sjcl.json
return r.ia(t,r.decode(e),i,s)},encode:function(t){var e,i="{",s=""
for(e in t)if(t.hasOwnProperty(e)){if(!e.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name")
switch(i+=s+'"'+e+'":',s=",",typeof t[e]){case"number":case"boolean":i+=t[e]
break
case"string":i+='"'+escape(t[e])+'"'
break
case"object":i+='"'+sjcl.codec.base64.fromBits(t[e],0)+'"'
break
default:throw new sjcl.exception.bug("json encode: unsupported type")}}return i+"}"},decode:function(t){if(!(t=t.replace(/\s/g,"")).match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!")
t=t.replace(/^\{|\}$/g,"").split(/,/)
var e,i,s={}
for(e=0;e<t.length;e++){if(!(i=t[e].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!")
null!=i[3]?s[i[2]]=parseInt(i[3],10):null!=i[4]?s[i[2]]=i[2].match(/^(ct|adata|salt|iv)$/)?sjcl.codec.base64.toBits(i[4]):unescape(i[4]):null!=i[5]&&(s[i[2]]="true"===i[5])}return s},g:function(t,e,i){if(void 0===t&&(t={}),void 0===e)return t
for(var s in e)if(e.hasOwnProperty(s)){if(i&&void 0!==t[s]&&t[s]!==e[s])throw new sjcl.exception.invalid("required parameter overridden")
t[s]=e[s]}return t},sa:function(t,e){var i,s={}
for(i in t)t.hasOwnProperty(i)&&t[i]!==e[i]&&(s[i]=t[i])
return s},ra:function(t,e){var i,s={}
for(i=0;i<e.length;i++)void 0!==t[e[i]]&&(s[e[i]]=t[e[i]])
return s}},sjcl.encrypt=sjcl.json.encrypt,sjcl.decrypt=sjcl.json.decrypt,sjcl.misc.pa={},sjcl.misc.cachedPbkdf2=function(t,e){var i,s=sjcl.misc.pa
return i=(e=e||{}).iter||1e3,(i=(s=s[t]=s[t]||{})[i]=s[i]||{firstSalt:e.salt&&e.salt.length?e.salt.slice(0):sjcl.random.randomWords(2,0)})[s=void 0===e.salt?i.firstSalt:e.salt]=i[s]||sjcl.misc.pbkdf2(t,s,e.iter),{key:i[s].slice(0),salt:s.slice(0)}},"undefined"!=typeof module&&module.exports&&(module.exports=sjcl),"function"==typeof define&&define([],(function(){return sjcl})),sjcl.cipher.aes=function(t){this._tables[0][0][0]||this._precompute()
var e,i,s,r,n,c=this._tables[0][4],o=this._tables[1],a=t.length,l=1
if(4!==a&&6!==a&&8!==a)throw new sjcl.exception.invalid("invalid aes key size")
for(this._key=[r=t.slice(0),n=[]],e=a;e<4*a+28;e++)s=r[e-1],(e%a==0||8===a&&e%a==4)&&(s=c[s>>>24]<<24^c[s>>16&255]<<16^c[s>>8&255]<<8^c[255&s],e%a==0&&(s=s<<8^s>>>24^l<<24,l=l<<1^283*(l>>7))),r[e]=r[e-a]^s
for(i=0;e;i++,e--)s=r[3&i?e:e-4],n[i]=e<=4||i<4?s:o[0][c[s>>>24]]^o[1][c[s>>16&255]]^o[2][c[s>>8&255]]^o[3][c[255&s]]},sjcl.cipher.aes.prototype={encrypt:function(t){return this._crypt(t,0)},decrypt:function(t){return this._crypt(t,1)},_tables:[[[],[],[],[],[]],[[],[],[],[],[]]],_precompute:function(){var t,e,i,s,r,n,c,o,a=this._tables[0],l=this._tables[1],h=a[4],f=l[4],u=[],d=[]
for(t=0;t<256;t++)d[(u[t]=t<<1^283*(t>>7))^t]=t
for(e=i=0;!h[e];e^=s||1,i=d[i]||1)for(n=(n=i^i<<1^i<<2^i<<3^i<<4)>>8^255&n^99,h[e]=n,f[n]=e,o=16843009*u[r=u[s=u[e]]]^65537*r^257*s^16843008*e,c=257*u[n]^16843008*n,t=0;t<4;t++)a[t][e]=c=c<<24^c>>>8,l[t][n]=o=o<<24^o>>>8
for(t=0;t<5;t++)a[t]=a[t].slice(0),l[t]=l[t].slice(0)},_crypt:function(t,e){if(4!==t.length)throw new sjcl.exception.invalid("invalid aes block size")
var i,s,r,n,c=this._key[e],o=t[0]^c[0],a=t[e?3:1]^c[1],l=t[2]^c[2],h=t[e?1:3]^c[3],f=c.length/4-2,u=4,d=[0,0,0,0],p=this._tables[e],b=p[0],m=p[1],y=p[2],g=p[3],j=p[4]
for(n=0;n<f;n++)i=b[o>>>24]^m[a>>16&255]^y[l>>8&255]^g[255&h]^c[u],s=b[a>>>24]^m[l>>16&255]^y[h>>8&255]^g[255&o]^c[u+1],r=b[l>>>24]^m[h>>16&255]^y[o>>8&255]^g[255&a]^c[u+2],h=b[h>>>24]^m[o>>16&255]^y[a>>8&255]^g[255&l]^c[u+3],u+=4,o=i,a=s,l=r
for(n=0;n<4;n++)d[e?3&-n:n]=j[o>>>24]<<24^j[a>>16&255]<<16^j[l>>8&255]<<8^j[255&h]^c[u++],i=o,o=a,a=l,l=h,h=i
return d}},sjcl.bitArray={bitSlice:function(t,e,i){return t=sjcl.bitArray._shiftRight(t.slice(e/32),32-(31&e)).slice(1),void 0===i?t:sjcl.bitArray.clamp(t,i-e)},extract:function(t,e,i){var s=Math.floor(-e-i&31)
return(-32&(e+i-1^e)?t[e/32|0]<<32-s^t[e/32+1|0]>>>s:t[e/32|0]>>>s)&(1<<i)-1},concat:function(t,e){if(0===t.length||0===e.length)return t.concat(e)
var i=t[t.length-1],s=sjcl.bitArray.getPartial(i)
return 32===s?t.concat(e):sjcl.bitArray._shiftRight(e,s,0|i,t.slice(0,t.length-1))},bitLength:function(t){var e,i=t.length
return 0===i?0:(e=t[i-1],32*(i-1)+sjcl.bitArray.getPartial(e))},clamp:function(t,e){if(32*t.length<e)return t
var i=(t=t.slice(0,Math.ceil(e/32))).length
return e&=31,i>0&&e&&(t[i-1]=sjcl.bitArray.partial(e,t[i-1]&2147483648>>e-1,1)),t},partial:function(t,e,i){return 32===t?e:(i?0|e:e<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,e){if(sjcl.bitArray.bitLength(t)!==sjcl.bitArray.bitLength(e))return!1
var i,s=0
for(i=0;i<t.length;i++)s|=t[i]^e[i]
return 0===s},_shiftRight:function(t,e,i,s){var r,n,c
for(void 0===s&&(s=[]);e>=32;e-=32)s.push(i),i=0
if(0===e)return s.concat(t)
for(r=0;r<t.length;r++)s.push(i|t[r]>>>e),i=t[r]<<32-e
return n=t.length?t[t.length-1]:0,c=sjcl.bitArray.getPartial(n),s.push(sjcl.bitArray.partial(e+c&31,e+c>32?i:s.pop(),1)),s},_xor4:function(t,e){return[t[0]^e[0],t[1]^e[1],t[2]^e[2],t[3]^e[3]]},byteswapM:function(t){var e,i
for(e=0;e<t.length;++e)i=t[e],t[e]=i>>>24|i>>>8&65280|(65280&i)<<8|i<<24
return t}},sjcl.bn=function(t){this.initWith(t)},sjcl.bn.prototype={radix:24,maxMul:8,_class:sjcl.bn,copy:function(){return new this._class(this)},initWith:function(t){var e,i=0
switch(typeof t){case"object":this.limbs=t.limbs.slice(0)
break
case"number":this.limbs=[t],this.normalize()
break
case"string":for(t=t.replace(/^0x/,""),this.limbs=[],e=this.radix/4,i=0;i<t.length;i+=e)this.limbs.push(parseInt(t.substring(Math.max(t.length-i-e,0),t.length-i),16))
break
default:this.limbs=[0]}return this},equals:function(t){"number"==typeof t&&(t=new this._class(t))
var e,i=0
for(this.fullReduce(),t.fullReduce(),e=0;e<this.limbs.length||e<t.limbs.length;e++)i|=this.getLimb(e)^t.getLimb(e)
return 0===i},getLimb:function(t){return t>=this.limbs.length?0:this.limbs[t]},greaterEquals:function(t){"number"==typeof t&&(t=new this._class(t))
var e,i,s,r=0,n=0
for(e=Math.max(this.limbs.length,t.limbs.length)-1;e>=0;e--)r|=(i=this.getLimb(e))-(s=t.getLimb(e))&~(n|=s-i&~r)
return(n|~r)>>>31},toString:function(){this.fullReduce()
var t,e,i="",s=this.limbs
for(t=0;t<this.limbs.length;t++){for(e=s[t].toString(16);t<this.limbs.length-1&&e.length<6;)e="0"+e
i=e+i}return"0x"+i},addM:function(t){"object"!=typeof t&&(t=new this._class(t))
var e,i=this.limbs,s=t.limbs
for(e=i.length;e<s.length;e++)i[e]=0
for(e=0;e<s.length;e++)i[e]+=s[e]
return this},doubleM:function(){var t,e,i=0,s=this.radix,r=this.radixMask,n=this.limbs
for(t=0;t<n.length;t++)e=(e=n[t])+e+i,n[t]=e&r,i=e>>s
return i&&n.push(i),this},halveM:function(){var t,e,i=0,s=this.radix,r=this.limbs
for(t=r.length-1;t>=0;t--)e=r[t],r[t]=e+i>>1,i=(1&e)<<s
return r[r.length-1]||r.pop(),this},subM:function(t){"object"!=typeof t&&(t=new this._class(t))
var e,i=this.limbs,s=t.limbs
for(e=i.length;e<s.length;e++)i[e]=0
for(e=0;e<s.length;e++)i[e]-=s[e]
return this},mod:function(t){var e=!this.greaterEquals(new sjcl.bn(0))
t=new sjcl.bn(t).normalize()
var i=new sjcl.bn(this).normalize(),s=0
for(e&&(i=new sjcl.bn(0).subM(i).normalize());i.greaterEquals(t);s++)t.doubleM()
for(e&&(i=t.sub(i).normalize());s>0;s--)t.halveM(),i.greaterEquals(t)&&i.subM(t).normalize()
return i.trim()},inverseMod:function(t){var e,i,s=new sjcl.bn(1),r=new sjcl.bn(0),n=new sjcl.bn(this),c=new sjcl.bn(t),o=1
if(!(1&t.limbs[0]))throw new sjcl.exception.invalid("inverseMod: p must be odd")
do{for(1&n.limbs[0]&&(n.greaterEquals(c)||(e=n,n=c,c=e,e=s,s=r,r=e),n.subM(c),n.normalize(),s.greaterEquals(r)||s.addM(t),s.subM(r)),n.halveM(),1&s.limbs[0]&&s.addM(t),s.normalize(),s.halveM(),i=o=0;i<n.limbs.length;i++)o|=n.limbs[i]}while(o)
if(!c.equals(1))throw new sjcl.exception.invalid("inverseMod: p and x must be relatively prime")
return r},add:function(t){return this.copy().addM(t)},sub:function(t){return this.copy().subM(t)},mul:function(t){"number"==typeof t?t=new this._class(t):t.normalize(),this.normalize()
var e,i,s,r=this.limbs,n=t.limbs,c=r.length,o=n.length,a=new this._class,l=a.limbs,h=this.maxMul
for(e=0;e<this.limbs.length+t.limbs.length+1;e++)l[e]=0
for(e=0;e<c;e++){for(s=r[e],i=0;i<o;i++)l[e+i]+=s*n[i];--h||(h=this.maxMul,a.cnormalize())}return a.cnormalize().reduce()},square:function(){return this.mul(this)},power:function(t){t=new sjcl.bn(t).normalize().trim().limbs
var e,i,s=new this._class(1),r=this
for(e=0;e<t.length;e++)for(i=0;i<this.radix&&(t[e]&1<<i&&(s=s.mul(r)),e!=t.length-1||t[e]>>i+1!=0);i++)r=r.square()
return s},mulmod:function(t,e){return this.mod(e).mul(t.mod(e)).mod(e)},powermod:function(t,e){if(t=new sjcl.bn(t),1==(1&(e=new sjcl.bn(e)).limbs[0])){var i=this.montpowermod(t,e)
if(0!=i)return i}var s,r,n=t.normalize().trim().limbs,c=new this._class(1),o=this
for(s=0;s<n.length;s++)for(r=0;r<this.radix&&(n[s]&1<<r&&(c=c.mulmod(o,e)),s!=n.length-1||n[s]>>r+1!=0);r++)o=o.mulmod(o,e)
return c},montpowermod:function(t,e){t=new sjcl.bn(t).normalize().trim(),e=new sjcl.bn(e)
var i,s,r,n,c,o=this.radix,a=new this._class(1),l=this.copy(),h=t.bitLength()
for(r=new sjcl.bn({limbs:e.copy().normalize().trim().limbs.map((function(){return 0}))}),n=this.radix;n>0;n--)if(1==(e.limbs[e.limbs.length-1]>>n&1)){r.limbs[r.limbs.length-1]=1<<n
break}if(0==h)return this
c=h<18?1:h<48?3:h<144?4:h<768?5:6
for(var f=r.copy(),u=e.copy(),d=new sjcl.bn(1),p=new sjcl.bn(0),b=r.copy();b.greaterEquals(1);)b.halveM(),0==(1&d.limbs[0])?(d.halveM(),p.halveM()):(d.addM(u),d.halveM(),p.halveM(),p.addM(f))
d=d.normalize(),p=p.normalize(),f.doubleM()
var m=f.mulmod(f,e)
if(!f.mul(d).sub(e.mul(p)).equals(1))return!1
var y=function(t){return g(t,m)},g=function(t,i){var s,c,a,l,h=(1<<n+1)-1
for((a=(c=t.mul(i)).mul(p)).limbs=a.limbs.slice(0,r.limbs.length),a.limbs.length==r.limbs.length&&(a.limbs[r.limbs.length-1]&=h),a=a.mul(e),(l=c.add(a).normalize().trim()).limbs=l.limbs.slice(r.limbs.length-1),s=0;s<l.limbs.length;s++)s>0&&(l.limbs[s-1]|=(l.limbs[s]&h)<<o-n-1),l.limbs[s]=l.limbs[s]>>n+1
return l.greaterEquals(e)&&l.subM(e),l}
l=y(l),a=y(a)
var j,A={},B=(1<<c-1)-1
for(A[1]=l.copy(),A[2]=g(l,l),j=1;j<=B;j++)A[2*j+1]=g(A[2*j-1],A[2])
var E=function(t,e){var i=e%t.radix
return(t.limbs[Math.floor(e/t.radix)]&1<<i)>>i}
for(i=t.bitLength()-1;i>=0;)if(0==E(t,i))a=g(a,a),i-=1
else{for(var F=i-c+1;0==E(t,F);)F++
var v=0
for(s=F;s<=i;s++)v+=E(t,s)<<s-F,a=g(a,a)
a=g(a,A[v]),i=F-1}return g(a,1)},trim:function(){var t,e=this.limbs
do{t=e.pop()}while(e.length&&0===t)
return e.push(t),this},reduce:function(){return this},fullReduce:function(){return this.normalize()},normalize:function(){var t,e,i=0,s=this.placeVal,r=this.ipv,n=this.limbs,c=n.length,o=this.radixMask
for(t=0;t<c||0!==i&&-1!==i;t++)i=((e=(n[t]||0)+i)-(n[t]=e&o))*r
return-1===i&&(n[t-1]-=s),this.trim(),this},cnormalize:function(){var t,e,i=0,s=this.ipv,r=this.limbs,n=r.length,c=this.radixMask
for(t=0;t<n-1;t++)i=((e=r[t]+i)-(r[t]=e&c))*s
return r[t]+=i,this},toBits:function(t){this.fullReduce(),t=t||this.exponent||this.bitLength()
var e=Math.floor((t-1)/24),i=sjcl.bitArray,s=(t+7&-8)%this.radix||this.radix,r=[i.partial(s,this.getLimb(e))]
for(e--;e>=0;e--)r=i.concat(r,[i.partial(Math.min(this.radix,t),this.getLimb(e))]),t-=this.radix
return r},bitLength:function(){this.fullReduce()
for(var t=this.radix*(this.limbs.length-1),e=this.limbs[this.limbs.length-1];e;e>>>=1)t++
return t+7&-8}},sjcl.bn.fromBits=function(t){var e=new this,i=[],s=sjcl.bitArray,r=this.prototype,n=Math.min(this.bitLength||4294967296,s.bitLength(t)),c=n%r.radix||r.radix
for(i[0]=s.extract(t,0,c);c<n;c+=r.radix)i.unshift(s.extract(t,c,r.radix))
return e.limbs=i,e},sjcl.bn.prototype.ipv=1/(sjcl.bn.prototype.placeVal=Math.pow(2,sjcl.bn.prototype.radix)),sjcl.bn.prototype.radixMask=(1<<sjcl.bn.prototype.radix)-1,sjcl.bn.pseudoMersennePrime=function(t,e){function i(t){this.initWith(t)}var s,r,n,c=i.prototype=new sjcl.bn
for(n=c.modOffset=Math.ceil(r=t/c.radix),c.exponent=t,c.offset=[],c.factor=[],c.minOffset=n,c.fullMask=0,c.fullOffset=[],c.fullFactor=[],c.modulus=i.modulus=new sjcl.bn(Math.pow(2,t)),c.fullMask=0|-Math.pow(2,t%c.radix),s=0;s<e.length;s++)c.offset[s]=Math.floor(e[s][0]/c.radix-r),c.fullOffset[s]=Math.floor(e[s][0]/c.radix)-n+1,c.factor[s]=e[s][1]*Math.pow(.5,t-e[s][0]+c.offset[s]*c.radix),c.fullFactor[s]=e[s][1]*Math.pow(.5,t-e[s][0]+c.fullOffset[s]*c.radix),c.modulus.addM(new sjcl.bn(Math.pow(2,e[s][0])*e[s][1])),c.minOffset=Math.min(c.minOffset,-c.offset[s])
return c._class=i,c.modulus.cnormalize(),c.reduce=function(){var t,e,i,s,r=this.modOffset,n=this.limbs,c=this.offset,o=this.offset.length,a=this.factor
for(t=this.minOffset;n.length>r;){for(i=n.pop(),s=n.length,e=0;e<o;e++)n[s+c[e]]-=a[e]*i;--t||(n.push(0),this.cnormalize(),t=this.minOffset)}return this.cnormalize(),this},c._strongReduce=-1===c.fullMask?c.reduce:function(){var t,e,i=this.limbs,s=i.length-1
if(this.reduce(),s===this.modOffset-1){for(e=i[s]&this.fullMask,i[s]-=e,t=0;t<this.fullOffset.length;t++)i[s+this.fullOffset[t]]-=this.fullFactor[t]*e
this.normalize()}},c.fullReduce=function(){var t,e
for(this._strongReduce(),this.addM(this.modulus),this.addM(this.modulus),this.normalize(),this._strongReduce(),e=this.limbs.length;e<this.modOffset;e++)this.limbs[e]=0
for(t=this.greaterEquals(this.modulus),e=0;e<this.limbs.length;e++)this.limbs[e]-=this.modulus.limbs[e]*t
return this.cnormalize(),this},c.inverse=function(){return this.power(this.modulus.sub(2))},i.fromBits=sjcl.bn.fromBits,i}
var sbp=sjcl.bn.pseudoMersennePrime
sjcl.bn.prime={p127:sbp(127,[[0,-1]]),p25519:sbp(255,[[0,-19]]),p192k:sbp(192,[[32,-1],[12,-1],[8,-1],[7,-1],[6,-1],[3,-1],[0,-1]]),p224k:sbp(224,[[32,-1],[12,-1],[11,-1],[9,-1],[7,-1],[4,-1],[1,-1],[0,-1]]),p256k:sbp(256,[[32,-1],[9,-1],[8,-1],[7,-1],[6,-1],[4,-1],[0,-1]]),p192:sbp(192,[[0,-1],[64,-1]]),p224:sbp(224,[[0,1],[96,-1]]),p256:sbp(256,[[0,-1],[96,1],[192,1],[224,-1]]),p384:sbp(384,[[0,-1],[32,1],[96,-1],[128,-1]]),p521:sbp(521,[[0,-1]])},sjcl.bn.random=function(t,e){"object"!=typeof t&&(t=new sjcl.bn(t))
for(var i,s,r=t.limbs.length,n=t.limbs[r-1]+1,c=new sjcl.bn;;){do{(i=sjcl.random.randomWords(r,e))[r-1]<0&&(i[r-1]+=4294967296)}while(Math.floor(i[r-1]/n)===Math.floor(4294967296/n))
for(i[r-1]%=n,s=0;s<r-1;s++)i[s]&=t.radixMask
if(c.limbs=i,!c.greaterEquals(t))return c}},void 0===sjcl.beware&&(sjcl.beware={}),sjcl.beware["CBC mode is dangerous because it doesn't protect message integrity."]=function(){sjcl.mode.cbc={name:"cbc",encrypt:function(t,e,i,s){if(s&&s.length)throw new sjcl.exception.invalid("cbc can't authenticate data")
if(128!==sjcl.bitArray.bitLength(i))throw new sjcl.exception.invalid("cbc iv must be 128 bits")
var r,n=sjcl.bitArray,c=n._xor4,o=n.bitLength(e),a=0,l=[]
if(7&o)throw new sjcl.exception.invalid("pkcs#5 padding only works for multiples of a byte")
for(r=0;a+128<=o;r+=4,a+=128)i=t.encrypt(c(i,e.slice(r,r+4))),l.splice(r,0,i[0],i[1],i[2],i[3])
return o=16843009*(16-(o>>3&15)),i=t.encrypt(c(i,n.concat(e,[o,o,o,o]).slice(r,r+4))),l.splice(r,0,i[0],i[1],i[2],i[3]),l},decrypt:function(t,e,i,s){if(s&&s.length)throw new sjcl.exception.invalid("cbc can't authenticate data")
if(128!==sjcl.bitArray.bitLength(i))throw new sjcl.exception.invalid("cbc iv must be 128 bits")
if(127&sjcl.bitArray.bitLength(e)||!e.length)throw new sjcl.exception.corrupt("cbc ciphertext must be a positive multiple of the block size")
var r,n,c,o=sjcl.bitArray,a=o._xor4,l=[]
for(s=s||[],r=0;r<e.length;r+=4)n=e.slice(r,r+4),c=a(i,t.decrypt(n)),l.splice(r,0,c[0],c[1],c[2],c[3]),i=n
if(0===(n=255&l[r-1])||n>16)throw new sjcl.exception.corrupt("pkcs#5 padding corrupt")
if(c=16843009*n,!o.equal(o.bitSlice([c,c,c,c],0,8*n),o.bitSlice(l,32*l.length-8*n,32*l.length)))throw new sjcl.exception.corrupt("pkcs#5 padding corrupt")
return o.bitSlice(l,0,32*l.length-8*n)}}},sjcl.mode.ccm={name:"ccm",_progressListeners:[],listenProgress:function(t){sjcl.mode.ccm._progressListeners.push(t)},unListenProgress:function(t){var e=sjcl.mode.ccm._progressListeners.indexOf(t)
e>-1&&sjcl.mode.ccm._progressListeners.splice(e,1)},_callProgressListener:function(t){var e,i=sjcl.mode.ccm._progressListeners.slice()
for(e=0;e<i.length;e+=1)i[e](t)},encrypt:function(t,e,i,s,r){var n,c,o=e.slice(0),a=sjcl.bitArray,l=a.bitLength(i)/8,h=a.bitLength(o)/8
if(r=r||64,s=s||[],l<7)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")
for(n=2;n<4&&h>>>8*n;n++);return n<15-l&&(n=15-l),i=a.clamp(i,8*(15-n)),c=sjcl.mode.ccm._computeTag(t,e,i,s,r,n),o=sjcl.mode.ccm._ctrMode(t,o,i,c,r,n),a.concat(o.data,o.tag)},decrypt:function(t,e,i,s,r){r=r||64,s=s||[]
var n,c,o=sjcl.bitArray,a=o.bitLength(i)/8,l=o.bitLength(e),h=o.clamp(e,l-r),f=o.bitSlice(e,l-r)
if(l=(l-r)/8,a<7)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")
for(n=2;n<4&&l>>>8*n;n++);if(n<15-a&&(n=15-a),i=o.clamp(i,8*(15-n)),h=sjcl.mode.ccm._ctrMode(t,h,i,f,r,n),c=sjcl.mode.ccm._computeTag(t,h.data,i,s,r,n),!o.equal(h.tag,c))throw new sjcl.exception.corrupt("ccm: tag doesn't match")
return h.data},_macAdditionalData:function(t,e,i,s,r,n){var c,o,a,l=[],h=sjcl.bitArray,f=h._xor4
if(c=[h.partial(8,(e.length?64:0)|s-2<<2|n-1)],(c=h.concat(c,i))[3]|=r,c=t.encrypt(c),e.length)for((o=h.bitLength(e)/8)<=65279?l=[h.partial(16,o)]:o<=4294967295&&(l=h.concat([h.partial(16,65534)],[o])),l=h.concat(l,e),a=0;a<l.length;a+=4)c=t.encrypt(f(c,l.slice(a,a+4).concat([0,0,0])))
return c},_computeTag:function(t,e,i,s,r,n){var c,o,a=sjcl.bitArray,l=a._xor4
if((r/=8)%2||r<4||r>16)throw new sjcl.exception.invalid("ccm: invalid tag length")
if(s.length>4294967295||e.length>4294967295)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data")
for(c=sjcl.mode.ccm._macAdditionalData(t,s,i,r,a.bitLength(e)/8,n),o=0;o<e.length;o+=4)c=t.encrypt(l(c,e.slice(o,o+4).concat([0,0,0])))
return a.clamp(c,8*r)},_ctrMode:function(t,e,i,s,r,n){var c,o,a,l=sjcl.bitArray,h=l._xor4,f=e.length,u=l.bitLength(e),d=f/50,p=d
if(a=l.concat([l.partial(8,n-1)],i).concat([0,0,0]).slice(0,4),s=l.bitSlice(h(s,t.encrypt(a)),0,r),!f)return{tag:s,data:[]}
for(o=0;o<f;o+=4)o>d&&(sjcl.mode.ccm._callProgressListener(o/f),d+=p),a[3]++,c=t.encrypt(a),e[o]^=c[0],e[o+1]^=c[1],e[o+2]^=c[2],e[o+3]^=c[3]
return{tag:s,data:l.clamp(e,u)}}},sjcl.codec.base32={_chars:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",_hexChars:"0123456789ABCDEFGHIJKLMNOPQRSTUV",BITS:32,BASE:5,REMAINING:27,fromBits:function(t,e,i){sjcl.codec.base32.BITS
var s,r=sjcl.codec.base32.BASE,n=sjcl.codec.base32.REMAINING,c="",o=0,a=sjcl.codec.base32._chars,l=0,h=sjcl.bitArray.bitLength(t)
for(i&&(a=sjcl.codec.base32._hexChars),s=0;c.length*r<h;)c+=a.charAt((l^t[s]>>>o)>>>n),o<r?(l=t[s]<<r-o,o+=n,s++):(l<<=r,o-=r)
for(;7&c.length&&!e;)c+="="
return c},toBits:function(t,e){t=t.replace(/\s|=/g,"").toUpperCase()
var i,s,r=sjcl.codec.base32.BITS,n=sjcl.codec.base32.BASE,c=sjcl.codec.base32.REMAINING,o=[],a=0,l=sjcl.codec.base32._chars,h=0,f="base32"
for(e&&(l=sjcl.codec.base32._hexChars,f="base32hex"),i=0;i<t.length;i++){if((s=l.indexOf(t.charAt(i)))<0){if(!e)try{return sjcl.codec.base32hex.toBits(t)}catch(u){}throw new sjcl.exception.invalid("this isn't "+f+"!")}a>c?(a-=c,o.push(h^s>>>a),h=s<<r-a):h^=s<<r-(a+=n)}return 56&a&&o.push(sjcl.bitArray.partial(56&a,h,1)),o}},sjcl.codec.base32hex={fromBits:function(t,e){return sjcl.codec.base32.fromBits(t,e,1)},toBits:function(t){return sjcl.codec.base32.toBits(t,1)}},sjcl.codec.base64={_chars:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(t,e,i){var s,r="",n=0,c=sjcl.codec.base64._chars,o=0,a=sjcl.bitArray.bitLength(t)
for(i&&(c=c.substr(0,62)+"-_"),s=0;6*r.length<a;)r+=c.charAt((o^t[s]>>>n)>>>26),n<6?(o=t[s]<<6-n,n+=26,s++):(o<<=6,n-=6)
for(;3&r.length&&!e;)r+="="
return r},toBits:function(t,e){t=t.replace(/\s|=/g,"")
var i,s,r=[],n=0,c=sjcl.codec.base64._chars,o=0
for(e&&(c=c.substr(0,62)+"-_"),i=0;i<t.length;i++){if((s=c.indexOf(t.charAt(i)))<0)throw new sjcl.exception.invalid("this isn't base64!")
n>26?(n-=26,r.push(o^s>>>n),o=s<<32-n):o^=s<<32-(n+=6)}return 56&n&&r.push(sjcl.bitArray.partial(56&n,o,1)),r}},sjcl.codec.base64url={fromBits:function(t){return sjcl.codec.base64.fromBits(t,1,1)},toBits:function(t){return sjcl.codec.base64.toBits(t,1)}},"undefined"==typeof ArrayBuffer&&function(t){t.ArrayBuffer=function(){},t.DataView=function(){}}(this),sjcl.codec.arrayBuffer={fromBits:function(t,e,i){var s,r,n,c,o
if(e=null==e||e,i=i||8,0===t.length)return new ArrayBuffer(0)
if(n=sjcl.bitArray.bitLength(t)/8,sjcl.bitArray.bitLength(t)%8!=0)throw new sjcl.exception.invalid("Invalid bit size, must be divisble by 8 to fit in an arraybuffer correctly")
for(e&&n%i!=0&&(n+=i-n%i),c=new DataView(new ArrayBuffer(4*t.length)),r=0;r<t.length;r++)c.setUint32(4*r,t[r]<<32)
if((s=new DataView(new ArrayBuffer(n))).byteLength===c.byteLength)return c.buffer
for(o=c.byteLength<s.byteLength?c.byteLength:s.byteLength,r=0;r<o;r++)s.setUint8(r,c.getUint8(r))
return s.buffer},toBits:function(t){var e,i,s,r=[]
if(0===t.byteLength)return[]
e=(i=new DataView(t)).byteLength-i.byteLength%4
for(var n=0;n<e;n+=4)r.push(i.getUint32(n))
if(i.byteLength%4!=0){s=new DataView(new ArrayBuffer(4))
n=0
for(var c=i.byteLength%4;n<c;n++)s.setUint8(n+4-c,i.getUint8(e+n))
r.push(sjcl.bitArray.partial(i.byteLength%4*8,s.getUint32(0)))}return r},hexDumpBuffer:function(t){for(var e,i,s=new DataView(t),r="",n=0;n<s.byteLength;n+=2)n%16==0&&(r+="\n"+n.toString(16)+"\t"),r+=(e=s.getUint16(n).toString(16),((e+="").length>=(i=4)?e:new Array(i-e.length+1).join("0")+e)+" ")
void 0===typeof console&&(console=console||{log:function(){}}),console.log(r.toUpperCase())}},sjcl.codec.bytes={fromBits:function(t){var e,i,s=[],r=sjcl.bitArray.bitLength(t)
for(e=0;e<r/8;e++)0==(3&e)&&(i=t[e/4]),s.push(i>>>24),i<<=8
return s},toBits:function(t){var e,i=[],s=0
for(e=0;e<t.length;e++)s=s<<8|t[e],3==(3&e)&&(i.push(s),s=0)
return 3&e&&i.push(sjcl.bitArray.partial(8*(3&e),s)),i}},sjcl.codec.hex={fromBits:function(t){var e,i=""
for(e=0;e<t.length;e++)i+=(0xf00000000000+(0|t[e])).toString(16).substr(4)
return i.substr(0,sjcl.bitArray.bitLength(t)/4)},toBits:function(t){var e,i,s=[]
for(i=(t=t.replace(/\s|0x/g,"")).length,t+="00000000",e=0;e<t.length;e+=8)s.push(0^parseInt(t.substr(e,8),16))
return sjcl.bitArray.clamp(s,4*i)}},sjcl.codec.utf8String={fromBits:function(t){var e,i,s="",r=sjcl.bitArray.bitLength(t)
for(e=0;e<r/8;e++)0==(3&e)&&(i=t[e/4]),s+=String.fromCharCode(i>>>8>>>8>>>8),i<<=8
return decodeURIComponent(escape(s))},toBits:function(t){t=unescape(encodeURIComponent(t))
var e,i=[],s=0
for(e=0;e<t.length;e++)s=s<<8|t.charCodeAt(e),3==(3&e)&&(i.push(s),s=0)
return 3&e&&i.push(sjcl.bitArray.partial(8*(3&e),s)),i}},sjcl.json={defaults:{v:1,iter:1e4,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},_encrypt:function(t,e,i,s){i=i||{},s=s||{}
var r,n,c,o=sjcl.json,a=o._add({iv:sjcl.random.randomWords(4,0)},o.defaults)
if(o._add(a,i),c=a.adata,"string"==typeof a.salt&&(a.salt=sjcl.codec.base64.toBits(a.salt)),"string"==typeof a.iv&&(a.iv=sjcl.codec.base64.toBits(a.iv)),!sjcl.mode[a.mode]||!sjcl.cipher[a.cipher]||"string"==typeof t&&a.iter<=100||64!==a.ts&&96!==a.ts&&128!==a.ts||128!==a.ks&&192!==a.ks&&256!==a.ks||a.iv.length<2||a.iv.length>4)throw new sjcl.exception.invalid("json encrypt: invalid parameters")
return"string"==typeof t?(t=(r=sjcl.misc.cachedPbkdf2(t,a)).key.slice(0,a.ks/32),a.salt=r.salt):sjcl.ecc&&t instanceof sjcl.ecc.elGamal.publicKey&&(r=t.kem(),a.kemtag=r.tag,t=r.key.slice(0,a.ks/32)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),"string"==typeof c&&(a.adata=c=sjcl.codec.utf8String.toBits(c)),n=new sjcl.cipher[a.cipher](t),o._add(s,a),s.key=t,"ccm"===a.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&e instanceof ArrayBuffer?a.ct=sjcl.arrayBuffer.ccm.encrypt(n,e,a.iv,c,a.ts):a.ct=sjcl.mode[a.mode].encrypt(n,e,a.iv,c,a.ts),a},encrypt:function(t,e,i,s){var r=sjcl.json,n=r._encrypt.apply(r,arguments)
return r.encode(n)},_decrypt:function(t,e,i,s){i=i||{},s=s||{}
var r,n,c,o=sjcl.json,a=o._add(o._add(o._add({},o.defaults),e),i,!0),l=a.adata
if("string"==typeof a.salt&&(a.salt=sjcl.codec.base64.toBits(a.salt)),"string"==typeof a.iv&&(a.iv=sjcl.codec.base64.toBits(a.iv)),!sjcl.mode[a.mode]||!sjcl.cipher[a.cipher]||"string"==typeof t&&a.iter<=100||64!==a.ts&&96!==a.ts&&128!==a.ts||128!==a.ks&&192!==a.ks&&256!==a.ks||!a.iv||a.iv.length<2||a.iv.length>4)throw new sjcl.exception.invalid("json decrypt: invalid parameters")
return"string"==typeof t?(t=(n=sjcl.misc.cachedPbkdf2(t,a)).key.slice(0,a.ks/32),a.salt=n.salt):sjcl.ecc&&t instanceof sjcl.ecc.elGamal.secretKey&&(t=t.unkem(sjcl.codec.base64.toBits(a.kemtag)).slice(0,a.ks/32)),"string"==typeof l&&(l=sjcl.codec.utf8String.toBits(l)),c=new sjcl.cipher[a.cipher](t),r="ccm"===a.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&a.ct instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.decrypt(c,a.ct,a.iv,a.tag,l,a.ts):sjcl.mode[a.mode].decrypt(c,a.ct,a.iv,l,a.ts),o._add(s,a),s.key=t,1===i.raw?r:sjcl.codec.utf8String.fromBits(r)},decrypt:function(t,e,i,s){var r=sjcl.json
return r._decrypt(t,r.decode(e),i,s)},encode:function(t){var e,i="{",s=""
for(e in t)if(t.hasOwnProperty(e)){if(!e.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name")
switch(i+=s+'"'+e+'":',s=",",typeof t[e]){case"number":case"boolean":i+=t[e]
break
case"string":i+='"'+escape(t[e])+'"'
break
case"object":i+='"'+sjcl.codec.base64.fromBits(t[e],0)+'"'
break
default:throw new sjcl.exception.bug("json encode: unsupported type")}}return i+"}"},decode:function(t){if(!(t=t.replace(/\s/g,"")).match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!")
var e,i,s=t.replace(/^\{|\}$/g,"").split(/,/),r={}
for(e=0;e<s.length;e++){if(!(i=s[e].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!")
null!=i[3]?r[i[2]]=parseInt(i[3],10):null!=i[4]?r[i[2]]=i[2].match(/^(ct|adata|salt|iv)$/)?sjcl.codec.base64.toBits(i[4]):unescape(i[4]):null!=i[5]&&(r[i[2]]="true"===i[5])}return r},_add:function(t,e,i){if(void 0===t&&(t={}),void 0===e)return t
var s
for(s in e)if(e.hasOwnProperty(s)){if(i&&void 0!==t[s]&&t[s]!==e[s])throw new sjcl.exception.invalid("required parameter overridden")
t[s]=e[s]}return t},_subtract:function(t,e){var i,s={}
for(i in t)t.hasOwnProperty(i)&&t[i]!==e[i]&&(s[i]=t[i])
return s},_filter:function(t,e){var i,s={}
for(i=0;i<e.length;i++)void 0!==t[e[i]]&&(s[e[i]]=t[e[i]])
return s}},sjcl.encrypt=sjcl.json.encrypt,sjcl.decrypt=sjcl.json.decrypt,sjcl.misc._pbkdf2Cache={},sjcl.misc.cachedPbkdf2=function(t,e){var i,s,r,n,c=sjcl.misc._pbkdf2Cache
return n=(e=e||{}).iter||1e3,(i=(s=c[t]=c[t]||{})[n]=s[n]||{firstSalt:e.salt&&e.salt.length?e.salt.slice(0):sjcl.random.randomWords(2,0)})[r=void 0===e.salt?i.firstSalt:e.salt]=i[r]||sjcl.misc.pbkdf2(t,r,e.iter),{key:i[r].slice(0),salt:r.slice(0)}},sjcl.ecc={},sjcl.ecc.point=function(t,e,i){void 0===e?this.isIdentity=!0:(e instanceof sjcl.bn&&(e=new t.field(e)),i instanceof sjcl.bn&&(i=new t.field(i)),this.x=e,this.y=i,this.isIdentity=!1),this.curve=t},sjcl.ecc.point.prototype={toJac:function(){return new sjcl.ecc.pointJac(this.curve,this.x,this.y,new this.curve.field(1))},mult:function(t){return this.toJac().mult(t,this).toAffine()},mult2:function(t,e,i){return this.toJac().mult2(t,this,e,i).toAffine()},multiples:function(){var t,e,i
if(void 0===this._multiples)for(i=this.toJac().doubl(),t=this._multiples=[new sjcl.ecc.point(this.curve),this,i.toAffine()],e=3;e<16;e++)i=i.add(this),t.push(i.toAffine())
return this._multiples},negate:function(){var t=new this.curve.field(0).sub(this.y).normalize().reduce()
return new sjcl.ecc.point(this.curve,this.x,t)},isValid:function(){return this.y.square().equals(this.curve.b.add(this.x.mul(this.curve.a.add(this.x.square()))))},toBits:function(){return sjcl.bitArray.concat(this.x.toBits(),this.y.toBits())}},sjcl.ecc.pointJac=function(t,e,i,s){void 0===e?this.isIdentity=!0:(this.x=e,this.y=i,this.z=s,this.isIdentity=!1),this.curve=t},sjcl.ecc.pointJac.prototype={add:function(t){var e,i,s,r,n,c,o,a,l,h,f,u=this
if(u.curve!==t.curve)throw new sjcl.exception.invalid("sjcl.ecc.add(): Points must be on the same curve to add them!")
return u.isIdentity?t.toJac():t.isIdentity?u:(e=u.z.square(),(i=t.x.mul(e).subM(u.x)).equals(0)?u.y.equals(t.y.mul(e.mul(u.z)))?u.doubl():new sjcl.ecc.pointJac(u.curve):(s=t.y.mul(e.mul(u.z)).subM(u.y),r=i.square(),n=s.square(),c=i.square().mul(i).addM(u.x.add(u.x).mul(r)),o=n.subM(c),a=u.x.mul(r).subM(o).mul(s),l=u.y.mul(i.square().mul(i)),h=a.subM(l),f=u.z.mul(i),new sjcl.ecc.pointJac(this.curve,o,h,f)))},doubl:function(){if(this.isIdentity)return this
var t=this.y.square(),e=t.mul(this.x.mul(4)),i=t.square().mul(8),s=this.z.square(),r=this.curve.a.toString()==new sjcl.bn(-3).toString()?this.x.sub(s).mul(3).mul(this.x.add(s)):this.x.square().mul(3).add(s.square().mul(this.curve.a)),n=r.square().subM(e).subM(e),c=e.sub(n).mul(r).subM(i),o=this.y.add(this.y).mul(this.z)
return new sjcl.ecc.pointJac(this.curve,n,c,o)},toAffine:function(){if(this.isIdentity||this.z.equals(0))return new sjcl.ecc.point(this.curve)
var t=this.z.inverse(),e=t.square()
return new sjcl.ecc.point(this.curve,this.x.mul(e).fullReduce(),this.y.mul(e.mul(t)).fullReduce())},mult:function(t,e){"number"==typeof t?t=[t]:void 0!==t.limbs&&(t=t.normalize().limbs)
var i,s,r=new sjcl.ecc.point(this.curve).toJac(),n=e.multiples()
for(i=t.length-1;i>=0;i--)for(s=sjcl.bn.prototype.radix-4;s>=0;s-=4)r=r.doubl().doubl().doubl().doubl().add(n[t[i]>>s&15])
return r},mult2:function(t,e,i,s){"number"==typeof t?t=[t]:void 0!==t.limbs&&(t=t.normalize().limbs),"number"==typeof i?i=[i]:void 0!==i.limbs&&(i=i.normalize().limbs)
var r,n,c,o,a=new sjcl.ecc.point(this.curve).toJac(),l=e.multiples(),h=s.multiples()
for(r=Math.max(t.length,i.length)-1;r>=0;r--)for(c=0|t[r],o=0|i[r],n=sjcl.bn.prototype.radix-4;n>=0;n-=4)a=a.doubl().doubl().doubl().doubl().add(l[c>>n&15]).add(h[o>>n&15])
return a},negate:function(){return this.toAffine().negate().toJac()},isValid:function(){var t=this.z.square(),e=t.square(),i=e.mul(t)
return this.y.square().equals(this.curve.b.mul(i).add(this.x.mul(this.curve.a.mul(e).add(this.x.square()))))}},sjcl.ecc.curve=function(t,e,i,s,r,n){this.field=t,this.r=new sjcl.bn(e),this.a=new t(i),this.b=new t(s),this.G=new sjcl.ecc.point(this,new t(r),new t(n))},sjcl.ecc.curve.prototype.fromBits=function(t){var e=sjcl.bitArray,i=this.field.prototype.exponent+7&-8,s=new sjcl.ecc.point(this,this.field.fromBits(e.bitSlice(t,0,i)),this.field.fromBits(e.bitSlice(t,i,2*i)))
if(!s.isValid())throw new sjcl.exception.corrupt("not on the curve!")
return s},sjcl.ecc.curves={c192:new sjcl.ecc.curve(sjcl.bn.prime.p192,"0xffffffffffffffffffffffff99def836146bc9b1b4d22831",-3,"0x64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1","0x188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012","0x07192b95ffc8da78631011ed6b24cdd573f977a11e794811"),c224:new sjcl.ecc.curve(sjcl.bn.prime.p224,"0xffffffffffffffffffffffffffff16a2e0b8f03e13dd29455c5c2a3d",-3,"0xb4050a850c04b3abf54132565044b0b7d7bfd8ba270b39432355ffb4","0xb70e0cbd6bb4bf7f321390b94a03c1d356c21122343280d6115c1d21","0xbd376388b5f723fb4c22dfe6cd4375a05a07476444d5819985007e34"),c256:new sjcl.ecc.curve(sjcl.bn.prime.p256,"0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551",-3,"0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b","0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296","0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),c384:new sjcl.ecc.curve(sjcl.bn.prime.p384,"0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973",-3,"0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef","0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7","0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f"),c521:new sjcl.ecc.curve(sjcl.bn.prime.p521,"0x1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409",-3,"0x051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00","0xC6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66","0x11839296A789A3BC0045C8A5FB42C7D1BD998F54449579B446817AFBD17273E662C97EE72995EF42640C550B9013FAD0761353C7086A272C24088BE94769FD16650"),k192:new sjcl.ecc.curve(sjcl.bn.prime.p192k,"0xfffffffffffffffffffffffe26f2fc170f69466a74defd8d",0,3,"0xdb4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d","0x9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d"),k224:new sjcl.ecc.curve(sjcl.bn.prime.p224k,"0x010000000000000000000000000001dce8d2ec6184caf0a971769fb1f7",0,5,"0xa1455b334df099df30fc28a169a467e9e47075a90f7e650eb6b7a45c","0x7e089fed7fba344282cafbd6f7e319f7c0b0bd59e2ca4bdb556d61a5"),k256:new sjcl.ecc.curve(sjcl.bn.prime.p256k,"0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",0,7,"0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")},sjcl.ecc.curveName=function(t){var e
for(e in sjcl.ecc.curves)if(sjcl.ecc.curves.hasOwnProperty(e)&&sjcl.ecc.curves[e]===t)return e
throw new sjcl.exception.invalid("no such curve")},sjcl.ecc.deserialize=function(t){if(!t||!t.curve||!sjcl.ecc.curves[t.curve])throw new sjcl.exception.invalid("invalid serialization")
if(-1===["elGamal","ecdsa"].indexOf(t.type))throw new sjcl.exception.invalid("invalid type")
var e=sjcl.ecc.curves[t.curve]
if(t.secretKey){if(!t.exponent)throw new sjcl.exception.invalid("invalid exponent")
var i=new sjcl.bn(t.exponent)
return new sjcl.ecc[t.type].secretKey(e,i)}if(!t.point)throw new sjcl.exception.invalid("invalid point")
var s=e.fromBits(sjcl.codec.hex.toBits(t.point))
return new sjcl.ecc[t.type].publicKey(e,s)},sjcl.ecc.basicKey={publicKey:function(t,e){this._curve=t,this._curveBitLength=t.r.bitLength(),this._point=e instanceof Array?t.fromBits(e):e,this.serialize=function(){var e=sjcl.ecc.curveName(t)
return{type:this.getType(),secretKey:!1,point:sjcl.codec.hex.fromBits(this._point.toBits()),curve:e}},this.get=function(){var t=this._point.toBits(),e=sjcl.bitArray.bitLength(t)
return{x:sjcl.bitArray.bitSlice(t,0,e/2),y:sjcl.bitArray.bitSlice(t,e/2)}}},secretKey:function(t,e){this._curve=t,this._curveBitLength=t.r.bitLength(),this._exponent=e,this.serialize=function(){var e=this.get(),i=sjcl.ecc.curveName(t)
return{type:this.getType(),secretKey:!0,exponent:sjcl.codec.hex.fromBits(e),curve:i}},this.get=function(){return this._exponent.toBits()}}}
sjcl.ecc.basicKey.generateKeys=function(t){return function(e,i,s){if("number"==typeof(e=e||256)&&void 0===(e=sjcl.ecc.curves["c"+e]))throw new sjcl.exception.invalid("no such curve")
s=s||sjcl.bn.random(e.r,i)
var r=e.G.mult(s)
return{pub:new sjcl.ecc[t].publicKey(e,r),sec:new sjcl.ecc[t].secretKey(e,s)}}},sjcl.ecc.elGamal={generateKeys:sjcl.ecc.basicKey.generateKeys("elGamal"),publicKey:function(t,e){sjcl.ecc.basicKey.publicKey.apply(this,arguments)},secretKey:function(t,e){sjcl.ecc.basicKey.secretKey.apply(this,arguments)}},sjcl.ecc.elGamal.publicKey.prototype={kem:function(t){var e=sjcl.bn.random(this._curve.r,t),i=this._curve.G.mult(e).toBits()
return{key:sjcl.hash.sha256.hash(this._point.mult(e).toBits()),tag:i}},getType:function(){return"elGamal"}},sjcl.ecc.elGamal.secretKey.prototype={unkem:function(t){return sjcl.hash.sha256.hash(this._curve.fromBits(t).mult(this._exponent).toBits())},dh:function(t){return sjcl.hash.sha256.hash(t._point.mult(this._exponent).toBits())},dhJavaEc:function(t){return t._point.mult(this._exponent).x.toBits()},getType:function(){return"elGamal"}},sjcl.ecc.ecdsa={generateKeys:sjcl.ecc.basicKey.generateKeys("ecdsa")},sjcl.ecc.ecdsa.publicKey=function(t,e){sjcl.ecc.basicKey.publicKey.apply(this,arguments)},sjcl.ecc.ecdsa.publicKey.prototype={verify:function(t,e,i){sjcl.bitArray.bitLength(t)>this._curveBitLength&&(t=sjcl.bitArray.clamp(t,this._curveBitLength))
var s=sjcl.bitArray,r=this._curve.r,n=this._curveBitLength,c=sjcl.bn.fromBits(s.bitSlice(e,0,n)),o=sjcl.bn.fromBits(s.bitSlice(e,n,2*n)),a=i?o:o.inverseMod(r),l=sjcl.bn.fromBits(t).mul(a).mod(r),h=c.mul(a).mod(r),f=this._curve.G.mult2(l,h,this._point).x
if(c.equals(0)||o.equals(0)||c.greaterEquals(r)||o.greaterEquals(r)||!f.equals(c)){if(void 0===i)return this.verify(t,e,!0)
throw new sjcl.exception.corrupt("signature didn't check out")}return!0},getType:function(){return"ecdsa"}},sjcl.ecc.ecdsa.secretKey=function(t,e){sjcl.ecc.basicKey.secretKey.apply(this,arguments)},sjcl.ecc.ecdsa.secretKey.prototype={sign:function(t,e,i,s){sjcl.bitArray.bitLength(t)>this._curveBitLength&&(t=sjcl.bitArray.clamp(t,this._curveBitLength))
var r=this._curve.r,n=r.bitLength(),c=s||sjcl.bn.random(r.sub(1),e).add(1),o=this._curve.G.mult(c).x.mod(r),a=sjcl.bn.fromBits(t).add(o.mul(this._exponent)),l=i?a.inverseMod(r).mul(c).mod(r):a.mul(c.inverseMod(r)).mod(r)
return sjcl.bitArray.concat(o.toBits(n),l.toBits(n))},getType:function(){return"ecdsa"}},sjcl.mode.gcm={name:"gcm",encrypt:function(t,e,i,s,r){var n,c=e.slice(0),o=sjcl.bitArray
return r=r||128,s=s||[],n=sjcl.mode.gcm._ctrMode(!0,t,c,s,i,r),o.concat(n.data,n.tag)},decrypt:function(t,e,i,s,r){var n,c,o=e.slice(0),a=sjcl.bitArray,l=a.bitLength(o)
if(s=s||[],(r=r||128)<=l?(c=a.bitSlice(o,l-r),o=a.bitSlice(o,0,l-r)):(c=o,o=[]),n=sjcl.mode.gcm._ctrMode(!1,t,o,s,i,r),!a.equal(n.tag,c))throw new sjcl.exception.corrupt("gcm: tag doesn't match")
return n.data},_galoisMultiply:function(t,e){var i,s,r,n,c,o=sjcl.bitArray._xor4
for(r=[0,0,0,0],n=e.slice(0),i=0;i<128;i++){for(0!=(t[Math.floor(i/32)]&1<<31-i%32)&&(r=o(r,n)),c=0!=(1&n[3]),s=3;s>0;s--)n[s]=n[s]>>>1|(1&n[s-1])<<31
n[0]=n[0]>>>1,c&&(n[0]=n[0]^225<<24)}return r},_ghash:function(t,e,i){var s,r,n=i.length
for(s=e.slice(0),r=0;r<n;r+=4)s[0]^=4294967295&i[r],s[1]^=4294967295&i[r+1],s[2]^=4294967295&i[r+2],s[3]^=4294967295&i[r+3],s=sjcl.mode.gcm._galoisMultiply(s,t)
return s},_ctrMode:function(t,e,i,s,r,n){var c,o,a,l,h,f,u,d,p,b,m,y,g=sjcl.bitArray
for(p=i.length,b=g.bitLength(i),m=g.bitLength(s),y=g.bitLength(r),c=e.encrypt([0,0,0,0]),96===y?(o=r.slice(0),o=g.concat(o,[1])):(o=sjcl.mode.gcm._ghash(c,[0,0,0,0],r),o=sjcl.mode.gcm._ghash(c,o,[0,0,Math.floor(y/4294967296),4294967295&y])),a=sjcl.mode.gcm._ghash(c,[0,0,0,0],s),f=o.slice(0),u=a.slice(0),t||(u=sjcl.mode.gcm._ghash(c,a,i)),h=0;h<p;h+=4)f[3]++,l=e.encrypt(f),i[h]^=l[0],i[h+1]^=l[1],i[h+2]^=l[2],i[h+3]^=l[3]
return i=g.clamp(i,b),t&&(u=sjcl.mode.gcm._ghash(c,a,i)),d=[Math.floor(m/4294967296),4294967295&m,Math.floor(b/4294967296),4294967295&b],u=sjcl.mode.gcm._ghash(c,u,d),l=e.encrypt(o),u[0]^=l[0],u[1]^=l[1],u[2]^=l[2],u[3]^=l[3],{tag:g.bitSlice(u,0,n),data:i}}},sjcl.misc.hmac=function(t,e){this._hash=e=e||sjcl.hash.sha256
var i,s=[[],[]],r=e.prototype.blockSize/32
for(this._baseHash=[new e,new e],t.length>r&&(t=e.hash(t)),i=0;i<r;i++)s[0][i]=909522486^t[i],s[1][i]=1549556828^t[i]
this._baseHash[0].update(s[0]),this._baseHash[1].update(s[1]),this._resultHash=new e(this._baseHash[0])},sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(t){if(this._updated)throw new sjcl.exception.invalid("encrypt on already updated hmac called!")
return this.update(t),this.digest(t)},sjcl.misc.hmac.prototype.reset=function(){this._resultHash=new this._hash(this._baseHash[0]),this._updated=!1},sjcl.misc.hmac.prototype.update=function(t){this._updated=!0,this._resultHash.update(t)},sjcl.misc.hmac.prototype.digest=function(){var t=this._resultHash.finalize(),e=new this._hash(this._baseHash[1]).update(t).finalize()
return this.reset(),e},sjcl.mode.ocb2={name:"ocb2",encrypt:function(t,e,i,s,r,n){if(128!==sjcl.bitArray.bitLength(i))throw new sjcl.exception.invalid("ocb iv must be 128 bits")
var c,o,a,l,h=sjcl.mode.ocb2._times2,f=sjcl.bitArray,u=f._xor4,d=[0,0,0,0],p=h(t.encrypt(i)),b=[]
for(s=s||[],r=r||64,c=0;c+4<e.length;c+=4)d=u(d,o=e.slice(c,c+4)),b=b.concat(u(p,t.encrypt(u(p,o)))),p=h(p)
return o=e.slice(c),a=f.bitLength(o),l=t.encrypt(u(p,[0,0,0,a])),o=f.clamp(u(o.concat([0,0,0]),l),a),d=u(d,u(o.concat([0,0,0]),l)),d=t.encrypt(u(d,u(p,h(p)))),s.length&&(d=u(d,n?s:sjcl.mode.ocb2.pmac(t,s))),b.concat(f.concat(o,f.clamp(d,r)))},decrypt:function(t,e,i,s,r,n){if(128!==sjcl.bitArray.bitLength(i))throw new sjcl.exception.invalid("ocb iv must be 128 bits")
r=r||64
var c,o,a,l,h=sjcl.mode.ocb2._times2,f=sjcl.bitArray,u=f._xor4,d=[0,0,0,0],p=h(t.encrypt(i)),b=sjcl.bitArray.bitLength(e)-r,m=[]
for(s=s||[],c=0;c+4<b/32;c+=4)o=u(p,t.decrypt(u(p,e.slice(c,c+4)))),d=u(d,o),m=m.concat(o),p=h(p)
if(a=b-32*c,l=t.encrypt(u(p,[0,0,0,a])),o=u(l,f.clamp(e.slice(c),a).concat([0,0,0])),d=u(d,o),d=t.encrypt(u(d,u(p,h(p)))),s.length&&(d=u(d,n?s:sjcl.mode.ocb2.pmac(t,s))),!f.equal(f.clamp(d,r),f.bitSlice(e,b)))throw new sjcl.exception.corrupt("ocb: tag doesn't match")
return m.concat(f.clamp(o,a))},pmac:function(t,e){var i,s,r=sjcl.mode.ocb2._times2,n=sjcl.bitArray,c=n._xor4,o=[0,0,0,0],a=t.encrypt([0,0,0,0])
for(a=c(a,r(r(a))),i=0;i+4<e.length;i+=4)a=r(a),o=c(o,t.encrypt(c(a,e.slice(i,i+4))))
return s=e.slice(i),n.bitLength(s)<128&&(a=c(a,r(a)),s=n.concat(s,[-2147483648,0,0,0])),o=c(o,s),t.encrypt(c(r(c(a,r(a))),o))},_times2:function(t){return[t[0]<<1^t[1]>>>31,t[1]<<1^t[2]>>>31,t[2]<<1^t[3]>>>31,t[3]<<1^135*(t[0]>>>31)]}},sjcl.misc.pbkdf2=function(t,e,i,s,r){if(i=i||1e4,s<0||i<0)throw new sjcl.exception.invalid("invalid params to pbkdf2")
"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e))
var n,c,o,a,l,h=new(r=r||sjcl.misc.hmac)(t),f=[],u=sjcl.bitArray
for(l=1;32*f.length<(s||1);l++){for(n=c=h.encrypt(u.concat(e,[l])),o=1;o<i;o++)for(c=h.encrypt(c),a=0;a<c.length;a++)n[a]^=c[a]
f=f.concat(n)}return s&&(f=u.clamp(f,s)),f},sjcl.hash.sha1=function(t){t?(this._h=t._h.slice(0),this._buffer=t._buffer.slice(0),this._length=t._length):this.reset()},sjcl.hash.sha1.hash=function(t){return(new sjcl.hash.sha1).update(t).finalize()},sjcl.hash.sha1.prototype={blockSize:512,reset:function(){return this._h=this._init.slice(0),this._buffer=[],this._length=0,this},update:function(t){"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t))
var e,i=this._buffer=sjcl.bitArray.concat(this._buffer,t),s=this._length,r=this._length=s+sjcl.bitArray.bitLength(t)
if(r>9007199254740991)throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits")
if("undefined"!=typeof Uint32Array){var n=new Uint32Array(i),c=0
for(e=this.blockSize+s-(this.blockSize+s&this.blockSize-1);e<=r;e+=this.blockSize)this._block(n.subarray(16*c,16*(c+1))),c+=1
i.splice(0,16*c)}else for(e=this.blockSize+s-(this.blockSize+s&this.blockSize-1);e<=r;e+=this.blockSize)this._block(i.splice(0,16))
return this},finalize:function(){var t,e=this._buffer,i=this._h
for(t=(e=sjcl.bitArray.concat(e,[sjcl.bitArray.partial(1,1)])).length+2;15&t;t++)e.push(0)
for(e.push(Math.floor(this._length/4294967296)),e.push(0|this._length);e.length;)this._block(e.splice(0,16))
return this.reset(),i},_init:[1732584193,4023233417,2562383102,271733878,3285377520],_key:[1518500249,1859775393,2400959708,3395469782],_f:function(t,e,i,s){return t<=19?e&i|~e&s:t<=39?e^i^s:t<=59?e&i|e&s|i&s:t<=79?e^i^s:void 0},_S:function(t,e){return e<<t|e>>>32-t},_block:function(t){var e,i,s,r,n,c,o,a,l=this._h
if("undefined"!=typeof Uint32Array){a=Array(80)
for(var h=0;h<16;h++)a[h]=t[h]}else a=t
for(s=l[0],r=l[1],n=l[2],c=l[3],o=l[4],e=0;e<=79;e++)e>=16&&(a[e]=this._S(1,a[e-3]^a[e-8]^a[e-14]^a[e-16])),i=this._S(5,s)+this._f(e,r,n,c)+o+a[e]+this._key[Math.floor(e/20)]|0,o=c,c=n,n=this._S(30,r),r=s,s=i
l[0]=l[0]+s|0,l[1]=l[1]+r|0,l[2]=l[2]+n|0,l[3]=l[3]+c|0,l[4]=l[4]+o|0}},sjcl.hash.sha256=function(t){this._key[0]||this._precompute(),t?(this._h=t._h.slice(0),this._buffer=t._buffer.slice(0),this._length=t._length):this.reset()},sjcl.hash.sha256.hash=function(t){return(new sjcl.hash.sha256).update(t).finalize()},sjcl.hash.sha256.prototype={blockSize:512,reset:function(){return this._h=this._init.slice(0),this._buffer=[],this._length=0,this},update:function(t){"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t))
var e,i=this._buffer=sjcl.bitArray.concat(this._buffer,t),s=this._length,r=this._length=s+sjcl.bitArray.bitLength(t)
if(r>9007199254740991)throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits")
if("undefined"!=typeof Uint32Array){var n=new Uint32Array(i),c=0
for(e=512+s-(512+s&511);e<=r;e+=512)this._block(n.subarray(16*c,16*(c+1))),c+=1
i.splice(0,16*c)}else for(e=512+s-(512+s&511);e<=r;e+=512)this._block(i.splice(0,16))
return this},finalize:function(){var t,e=this._buffer,i=this._h
for(t=(e=sjcl.bitArray.concat(e,[sjcl.bitArray.partial(1,1)])).length+2;15&t;t++)e.push(0)
for(e.push(Math.floor(this._length/4294967296)),e.push(0|this._length);e.length;)this._block(e.splice(0,16))
return this.reset(),i},_init:[],_key:[],_precompute:function(){var t,e,i=0,s=2
function r(t){return 4294967296*(t-Math.floor(t))|0}for(;i<64;s++){for(e=!0,t=2;t*t<=s;t++)if(s%t==0){e=!1
break}e&&(i<8&&(this._init[i]=r(Math.pow(s,.5))),this._key[i]=r(Math.pow(s,1/3)),i++)}},_block:function(t){var e,i,s,r,n=this._h,c=this._key,o=n[0],a=n[1],l=n[2],h=n[3],f=n[4],u=n[5],d=n[6],p=n[7]
for(e=0;e<64;e++)e<16?i=t[e]:(s=t[e+1&15],r=t[e+14&15],i=t[15&e]=(s>>>7^s>>>18^s>>>3^s<<25^s<<14)+(r>>>17^r>>>19^r>>>10^r<<15^r<<13)+t[15&e]+t[e+9&15]|0),i=i+p+(f>>>6^f>>>11^f>>>25^f<<26^f<<21^f<<7)+(d^f&(u^d))+c[e],p=d,d=u,u=f,f=h+i|0,h=l,l=a,o=i+((a=o)&l^h&(a^l))+(a>>>2^a>>>13^a>>>22^a<<30^a<<19^a<<10)|0
n[0]=n[0]+o|0,n[1]=n[1]+a|0,n[2]=n[2]+l|0,n[3]=n[3]+h|0,n[4]=n[4]+f|0,n[5]=n[5]+u|0,n[6]=n[6]+d|0,n[7]=n[7]+p|0}},sjcl.hash.sha512=function(t){this._key[0]||this._precompute(),t?(this._h=t._h.slice(0),this._buffer=t._buffer.slice(0),this._length=t._length):this.reset()},sjcl.hash.sha512.hash=function(t){return(new sjcl.hash.sha512).update(t).finalize()},sjcl.hash.sha512.prototype={blockSize:1024,reset:function(){return this._h=this._init.slice(0),this._buffer=[],this._length=0,this},update:function(t){"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t))
var e,i=this._buffer=sjcl.bitArray.concat(this._buffer,t),s=this._length,r=this._length=s+sjcl.bitArray.bitLength(t)
if(r>9007199254740991)throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits")
if("undefined"!=typeof Uint32Array){var n=new Uint32Array(i),c=0
for(e=1024+s-(1024+s&1023);e<=r;e+=1024)this._block(n.subarray(32*c,32*(c+1))),c+=1
i.splice(0,32*c)}else for(e=1024+s-(1024+s&1023);e<=r;e+=1024)this._block(i.splice(0,32))
return this},finalize:function(){var t,e=this._buffer,i=this._h
for(t=(e=sjcl.bitArray.concat(e,[sjcl.bitArray.partial(1,1)])).length+4;31&t;t++)e.push(0)
for(e.push(0),e.push(0),e.push(Math.floor(this._length/4294967296)),e.push(0|this._length);e.length;)this._block(e.splice(0,32))
return this.reset(),i},_init:[],_initr:[12372232,13281083,9762859,1914609,15106769,4090911,4308331,8266105],_key:[],_keyr:[2666018,15689165,5061423,9034684,4764984,380953,1658779,7176472,197186,7368638,14987916,16757986,8096111,1480369,13046325,6891156,15813330,5187043,9229749,11312229,2818677,10937475,4324308,1135541,6741931,11809296,16458047,15666916,11046850,698149,229999,945776,13774844,2541862,12856045,9810911,11494366,7844520,15576806,8533307,15795044,4337665,16291729,5553712,15684120,6662416,7413802,12308920,13816008,4303699,9366425,10176680,13195875,4295371,6546291,11712675,15708924,1519456,15772530,6568428,6495784,8568297,13007125,7492395,2515356,12632583,14740254,7262584,1535930,13146278,16321966,1853211,294276,13051027,13221564,1051980,4080310,6651434,14088940,4675607],_precompute:function(){var t,e,i=0,s=2
function r(t){return 4294967296*(t-Math.floor(t))|0}function n(t){return 1099511627776*(t-Math.floor(t))&255}for(;i<80;s++){for(e=!0,t=2;t*t<=s;t++)if(s%t==0){e=!1
break}e&&(i<8&&(this._init[2*i]=r(Math.pow(s,.5)),this._init[2*i+1]=n(Math.pow(s,.5))<<24|this._initr[i]),this._key[2*i]=r(Math.pow(s,1/3)),this._key[2*i+1]=n(Math.pow(s,1/3))<<24|this._keyr[i],i++)}},_block:function(t){var e,i,s,r,n=this._h,c=this._key,o=n[0],a=n[1],l=n[2],h=n[3],f=n[4],u=n[5],d=n[6],p=n[7],b=n[8],m=n[9],y=n[10],g=n[11],j=n[12],A=n[13],B=n[14],E=n[15]
if("undefined"!=typeof Uint32Array){r=Array(160)
for(var F=0;F<32;F++)r[F]=t[F]}else r=t
var v=o,C=a,D=l,w=h,_=f,x=u,k=d,L=p,S=b,M=m,R=y,z=g,I=j,O=A,P=B,T=E
for(e=0;e<80;e++){if(e<16)i=r[2*e],s=r[2*e+1]
else{var q=r[2*(e-15)],G=r[2*(e-15)+1],K=(G<<31|q>>>1)^(G<<24|q>>>8)^q>>>7,U=(q<<31|G>>>1)^(q<<24|G>>>8)^(q<<25|G>>>7),N=r[2*(e-2)],V=r[2*(e-2)+1],Y=(V<<13|N>>>19)^(N<<3|V>>>29)^N>>>6,H=(N<<13|V>>>19)^(V<<3|N>>>29)^(N<<26|V>>>6),J=r[2*(e-7)],W=r[2*(e-7)+1],X=r[2*(e-16)],$=r[2*(e-16)+1]
i=K+J+((s=U+W)>>>0<U>>>0?1:0),i+=Y+((s+=H)>>>0<H>>>0?1:0),i+=X+((s+=$)>>>0<$>>>0?1:0)}r[2*e]=i|=0,r[2*e+1]=s|=0
var Q=S&R^~S&I,Z=M&z^~M&O,tt=v&D^v&_^D&_,et=C&w^C&x^w&x,it=(C<<4|v>>>28)^(v<<30|C>>>2)^(v<<25|C>>>7),st=(v<<4|C>>>28)^(C<<30|v>>>2)^(C<<25|v>>>7),rt=(M<<18|S>>>14)^(M<<14|S>>>18)^(S<<23|M>>>9),nt=(S<<18|M>>>14)^(S<<14|M>>>18)^(M<<23|S>>>9),ct=c[2*e],ot=c[2*e+1],at=T+nt,lt=P+rt+(at>>>0<T>>>0?1:0)
lt+=Q+((at+=Z)>>>0<Z>>>0?1:0),lt+=ct+((at+=ot)>>>0<ot>>>0?1:0)
var ht=st+et
P=I,T=O,I=R,O=z,R=S,z=M,S=k+(lt+=i+((at=at+s|0)>>>0<s>>>0?1:0))+((M=L+at|0)>>>0<L>>>0?1:0)|0,k=_,L=x,_=D,x=w,D=v,w=C,v=lt+(it+tt+(ht>>>0<st>>>0?1:0))+((C=at+ht|0)>>>0<at>>>0?1:0)|0}a=n[1]=a+C|0,n[0]=o+v+(a>>>0<C>>>0?1:0)|0,h=n[3]=h+w|0,n[2]=l+D+(h>>>0<w>>>0?1:0)|0,u=n[5]=u+x|0,n[4]=f+_+(u>>>0<x>>>0?1:0)|0,p=n[7]=p+L|0,n[6]=d+k+(p>>>0<L>>>0?1:0)|0,m=n[9]=m+M|0,n[8]=b+S+(m>>>0<M>>>0?1:0)|0,g=n[11]=g+z|0,n[10]=y+R+(g>>>0<z>>>0?1:0)|0,A=n[13]=A+O|0,n[12]=j+I+(A>>>0<O>>>0?1:0)|0,E=n[15]=E+T|0,n[14]=B+P+(E>>>0<T>>>0?1:0)|0}},sjcl.prng=function(t){this._pools=[new sjcl.hash.sha256],this._poolEntropy=[0],this._reseedCount=0,this._robins={},this._eventId=0,this._collectorIds={},this._collectorIdNext=0,this._strength=0,this._poolStrength=0,this._nextReseed=0,this._key=[0,0,0,0,0,0,0,0],this._counter=[0,0,0,0],this._cipher=void 0,this._defaultParanoia=t,this._collectorsStarted=!1,this._callbacks={progress:{},seeded:{}},this._callbackI=0,this._NOT_READY=0,this._READY=1,this._REQUIRES_RESEED=2,this._MAX_WORDS_PER_BURST=65536,this._PARANOIA_LEVELS=[0,48,64,96,128,192,256,384,512,768,1024],this._MILLISECONDS_PER_RESEED=3e4,this._BITS_PER_RESEED=80},sjcl.prng.prototype={randomWords:function(t,e){var i,s,r=[],n=this.isReady(e)
if(n===this._NOT_READY)throw new sjcl.exception.notReady("generator isn't seeded")
for(n&this._REQUIRES_RESEED&&this._reseedFromPools(!(n&this._READY)),i=0;i<t;i+=4)(i+1)%this._MAX_WORDS_PER_BURST==0&&this._gate(),s=this._gen4words(),r.push(s[0],s[1],s[2],s[3])
return this._gate(),r.slice(0,t)},setDefaultParanoia:function(t,e){if(0===t&&"Setting paranoia=0 will ruin your security; use it only for testing"!==e)throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing")
this._defaultParanoia=t},addEntropy:function(t,e,i){i=i||"user"
var s,r,n,c,o=(new Date).valueOf(),a=this._robins[i],l=this.isReady(),h=0
switch(void 0===(s=this._collectorIds[i])&&(s=this._collectorIds[i]=this._collectorIdNext++),void 0===a&&(a=this._robins[i]=0),this._robins[i]=(this._robins[i]+1)%this._pools.length,typeof t){case"number":void 0===e&&(e=1),this._pools[a].update([s,this._eventId++,1,e,o,1,0|t])
break
case"object":if("[object Uint32Array]"===(c=Object.prototype.toString.call(t))){for(n=[],r=0;r<t.length;r++)n.push(t[r])
t=n}else for("[object Array]"!==c&&(h=1),r=0;r<t.length&&!h;r++)"number"!=typeof t[r]&&(h=1)
if(!h){if(void 0===e)for(e=0,r=0;r<t.length;r++)for(n=t[r];n>0;)e++,n>>>=1
this._pools[a].update([s,this._eventId++,2,e,o,t.length].concat(t))}break
case"string":void 0===e&&(e=t.length),this._pools[a].update([s,this._eventId++,3,e,o,t.length]),this._pools[a].update(t)
break
default:h=1}if(h)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string")
this._poolEntropy[a]+=e,this._poolStrength+=e,l===this._NOT_READY&&(this.isReady()!==this._NOT_READY&&this._fireEvent("seeded",Math.max(this._strength,this._poolStrength)),this._fireEvent("progress",this.getProgress()))},isReady:function(t){var e=this._PARANOIA_LEVELS[void 0!==t?t:this._defaultParanoia]
return this._strength&&this._strength>=e?this._poolEntropy[0]>this._BITS_PER_RESEED&&(new Date).valueOf()>this._nextReseed?this._REQUIRES_RESEED|this._READY:this._READY:this._poolStrength>=e?this._REQUIRES_RESEED|this._NOT_READY:this._NOT_READY},getProgress:function(t){var e=this._PARANOIA_LEVELS[t||this._defaultParanoia]
return this._strength>=e||this._poolStrength>e?1:this._poolStrength/e},startCollectors:function(){if(!this._collectorsStarted){if(this._eventListener={loadTimeCollector:this._bind(this._loadTimeCollector),mouseCollector:this._bind(this._mouseCollector),keyboardCollector:this._bind(this._keyboardCollector),accelerometerCollector:this._bind(this._accelerometerCollector),touchCollector:this._bind(this._touchCollector)},window.addEventListener)window.addEventListener("load",this._eventListener.loadTimeCollector,!1),window.addEventListener("mousemove",this._eventListener.mouseCollector,!1),window.addEventListener("keypress",this._eventListener.keyboardCollector,!1),window.addEventListener("devicemotion",this._eventListener.accelerometerCollector,!1),window.addEventListener("touchmove",this._eventListener.touchCollector,!1)
else{if(!document.attachEvent)throw new sjcl.exception.bug("can't attach event")
document.attachEvent("onload",this._eventListener.loadTimeCollector),document.attachEvent("onmousemove",this._eventListener.mouseCollector),document.attachEvent("keypress",this._eventListener.keyboardCollector)}this._collectorsStarted=!0}},stopCollectors:function(){this._collectorsStarted&&(window.removeEventListener?(window.removeEventListener("load",this._eventListener.loadTimeCollector,!1),window.removeEventListener("mousemove",this._eventListener.mouseCollector,!1),window.removeEventListener("keypress",this._eventListener.keyboardCollector,!1),window.removeEventListener("devicemotion",this._eventListener.accelerometerCollector,!1),window.removeEventListener("touchmove",this._eventListener.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this._eventListener.loadTimeCollector),document.detachEvent("onmousemove",this._eventListener.mouseCollector),document.detachEvent("keypress",this._eventListener.keyboardCollector)),this._collectorsStarted=!1)},addEventListener:function(t,e){this._callbacks[t][this._callbackI++]=e},removeEventListener:function(t,e){var i,s,r=this._callbacks[t],n=[]
for(s in r)r.hasOwnProperty(s)&&r[s]===e&&n.push(s)
for(i=0;i<n.length;i++)delete r[s=n[i]]},_bind:function(t){var e=this
return function(){t.apply(e,arguments)}},_gen4words:function(){for(var t=0;t<4&&(this._counter[t]=this._counter[t]+1|0,!this._counter[t]);t++);return this._cipher.encrypt(this._counter)},_gate:function(){this._key=this._gen4words().concat(this._gen4words()),this._cipher=new sjcl.cipher.aes(this._key)},_reseed:function(t){this._key=sjcl.hash.sha256.hash(this._key.concat(t)),this._cipher=new sjcl.cipher.aes(this._key)
for(var e=0;e<4&&(this._counter[e]=this._counter[e]+1|0,!this._counter[e]);e++);},_reseedFromPools:function(t){var e,i=[],s=0
for(this._nextReseed=i[0]=(new Date).valueOf()+this._MILLISECONDS_PER_RESEED,e=0;e<16;e++)i.push(4294967296*Math.random()|0)
for(e=0;e<this._pools.length&&(i=i.concat(this._pools[e].finalize()),s+=this._poolEntropy[e],this._poolEntropy[e]=0,t||!(this._reseedCount&1<<e));e++);this._reseedCount>=1<<this._pools.length&&(this._pools.push(new sjcl.hash.sha256),this._poolEntropy.push(0)),this._poolStrength-=s,s>this._strength&&(this._strength=s),this._reseedCount++,this._reseed(i)},_keyboardCollector:function(){this._addCurrentTimeToEntropy(1)},_mouseCollector:function(t){var e,i
try{e=t.x||t.clientX||t.offsetX||0,i=t.y||t.clientY||t.offsetY||0}catch(s){e=0,i=0}0!=e&&0!=i&&this.addEntropy([e,i],2,"mouse"),this._addCurrentTimeToEntropy(0)},_touchCollector:function(t){var e=t.touches[0]||t.changedTouches[0],i=e.pageX||e.clientX,s=e.pageY||e.clientY
this.addEntropy([i,s],1,"touch"),this._addCurrentTimeToEntropy(0)},_loadTimeCollector:function(){this._addCurrentTimeToEntropy(2)},_addCurrentTimeToEntropy:function(t){"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?this.addEntropy(window.performance.now(),t,"loadtime"):this.addEntropy((new Date).valueOf(),t,"loadtime")},_accelerometerCollector:function(t){var e=t.accelerationIncludingGravity.x||t.accelerationIncludingGravity.y||t.accelerationIncludingGravity.z
if(window.orientation){var i=window.orientation
"number"==typeof i&&this.addEntropy(i,1,"accelerometer")}e&&this.addEntropy(e,2,"accelerometer"),this._addCurrentTimeToEntropy(0)},_fireEvent:function(t,e){var i,s=sjcl.random._callbacks[t],r=[]
for(i in s)s.hasOwnProperty(i)&&r.push(s[i])
for(i=0;i<r.length;i++)r[i](e)}},sjcl.random=new sjcl.prng(6),function(){try{var t,e,i
if("undefined"!=typeof module&&module.exports&&(e=function(){try{return require("crypto")}catch(t){return null}}())&&e.randomBytes)t=e.randomBytes(128),t=new Uint32Array(new Uint8Array(t).buffer),sjcl.random.addEntropy(t,1024,"crypto.randomBytes")
else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){if(i=new Uint32Array(32),window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(i)
else{if(!window.msCrypto||!window.msCrypto.getRandomValues)return
window.msCrypto.getRandomValues(i)}sjcl.random.addEntropy(i,1024,"crypto.getRandomValues")}}catch(s){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(s))}}()
sjcl.keyexchange.srp={makeVerifier:function(t,e,i,s){var r
return r=sjcl.keyexchange.srp.makeX(t,e,i),r=sjcl.bn.fromBits(r),s.g.powermod(r,s.N)},makeX:function(t,e,i){var s=sjcl.hash.sha1.hash(t+":"+e)
return sjcl.hash.sha1.hash(sjcl.bitArray.concat(i,s))},knownGroup:function(t){return"string"!=typeof t&&(t=t.toString()),sjcl.keyexchange.srp._didInitKnownGroups||sjcl.keyexchange.srp._initKnownGroups(),sjcl.keyexchange.srp._knownGroups[t]},_didInitKnownGroups:!1,_initKnownGroups:function(){var t,e,i
for(t=0;t<sjcl.keyexchange.srp._knownGroupSizes.length;t++)e=sjcl.keyexchange.srp._knownGroupSizes[t].toString(),(i=sjcl.keyexchange.srp._knownGroups[e]).N=new sjcl.bn(i.N),i.g=new sjcl.bn(i.g)
sjcl.keyexchange.srp._didInitKnownGroups=!0},_knownGroupSizes:[1024,1536,2048,3072,4096,6144,8192],_knownGroups:{1024:{N:"EEAF0AB9ADB38DD69C33F80AFA8FC5E86072618775FF3C0B9EA2314C9C256576D674DF7496EA81D3383B4813D692C6E0E0D5D8E250B98BE48E495C1D6089DAD15DC7D7B46154D6B6CE8EF4AD69B15D4982559B297BCF1885C529F566660E57EC68EDBC3C05726CC02FD4CBF4976EAA9AFD5138FE8376435B9FC61D2FC0EB06E3",g:2},1536:{N:"9DEF3CAFB939277AB1F12A8617A47BBBDBA51DF499AC4C80BEEEA9614B19CC4D5F4F5F556E27CBDE51C6A94BE4607A291558903BA0D0F84380B655BB9A22E8DCDF028A7CEC67F0D08134B1C8B97989149B609E0BE3BAB63D47548381DBC5B1FC764E3F4B53DD9DA1158BFD3E2B9C8CF56EDF019539349627DB2FD53D24B7C48665772E437D6C7F8CE442734AF7CCB7AE837C264AE3A9BEB87F8A2FE9B8B5292E5A021FFF5E91479E8CE7A28C2442C6F315180F93499A234DCF76E3FED135F9BB",g:2},2048:{N:"AC6BDB41324A9A9BF166DE5E1389582FAF72B6651987EE07FC3192943DB56050A37329CBB4A099ED8193E0757767A13DD52312AB4B03310DCD7F48A9DA04FD50E8083969EDB767B0CF6095179A163AB3661A05FBD5FAAAE82918A9962F0B93B855F97993EC975EEAA80D740ADBF4FF747359D041D5C33EA71D281E446B14773BCA97B43A23FB801676BD207A436C6481F1D2B9078717461A5B9D32E688F87748544523B524B0D57D5EA77A2775D2ECFA032CFBDBF52FB3786160279004E57AE6AF874E7303CE53299CCC041C7BC308D82A5698F3A8D0C38271AE35F8E9DBFBB694B5C803D89F7AE435DE236D525F54759B65E372FCD68EF20FA7111F9E4AFF73",g:2},3072:{N:"FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A93AD2CAFFFFFFFFFFFFFFFF",g:5},4096:{N:"FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A92108011A723C12A787E6D788719A10BDBA5B2699C327186AF4E23C1A946834B6150BDA2583E9CA2AD44CE8DBBBC2DB04DE8EF92E8EFC141FBECAA6287C59474E6BC05D99B2964FA090C3A2233BA186515BE7ED1F612970CEE2D7AFB81BDD762170481CD0069127D5B05AA993B4EA988D8FDDC186FFB7DC90A6C08F4DF435C934063199FFFFFFFFFFFFFFFF",g:5},6144:{N:"FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A92108011A723C12A787E6D788719A10BDBA5B2699C327186AF4E23C1A946834B6150BDA2583E9CA2AD44CE8DBBBC2DB04DE8EF92E8EFC141FBECAA6287C59474E6BC05D99B2964FA090C3A2233BA186515BE7ED1F612970CEE2D7AFB81BDD762170481CD0069127D5B05AA993B4EA988D8FDDC186FFB7DC90A6C08F4DF435C93402849236C3FAB4D27C7026C1D4DCB2602646DEC9751E763DBA37BDF8FF9406AD9E530EE5DB382F413001AEB06A53ED9027D831179727B0865A8918DA3EDBEBCF9B14ED44CE6CBACED4BB1BDB7F1447E6CC254B332051512BD7AF426FB8F401378CD2BF5983CA01C64B92ECF032EA15D1721D03F482D7CE6E74FEF6D55E702F46980C82B5A84031900B1C9E59E7C97FBEC7E8F323A97A7E36CC88BE0F1D45B7FF585AC54BD407B22B4154AACC8F6D7EBF48E1D814CC5ED20F8037E0A79715EEF29BE32806A1D58BB7C5DA76F550AA3D8A1FBFF0EB19CCB1A313D55CDA56C9EC2EF29632387FE8D76E3C0468043E8F663F4860EE12BF2D5B0B7474D6E694F91E6DCC4024FFFFFFFFFFFFFFFF",g:5},8192:{N:"FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A92108011A723C12A787E6D788719A10BDBA5B2699C327186AF4E23C1A946834B6150BDA2583E9CA2AD44CE8DBBBC2DB04DE8EF92E8EFC141FBECAA6287C59474E6BC05D99B2964FA090C3A2233BA186515BE7ED1F612970CEE2D7AFB81BDD762170481CD0069127D5B05AA993B4EA988D8FDDC186FFB7DC90A6C08F4DF435C93402849236C3FAB4D27C7026C1D4DCB2602646DEC9751E763DBA37BDF8FF9406AD9E530EE5DB382F413001AEB06A53ED9027D831179727B0865A8918DA3EDBEBCF9B14ED44CE6CBACED4BB1BDB7F1447E6CC254B332051512BD7AF426FB8F401378CD2BF5983CA01C64B92ECF032EA15D1721D03F482D7CE6E74FEF6D55E702F46980C82B5A84031900B1C9E59E7C97FBEC7E8F323A97A7E36CC88BE0F1D45B7FF585AC54BD407B22B4154AACC8F6D7EBF48E1D814CC5ED20F8037E0A79715EEF29BE32806A1D58BB7C5DA76F550AA3D8A1FBFF0EB19CCB1A313D55CDA56C9EC2EF29632387FE8D76E3C0468043E8F663F4860EE12BF2D5B0B7474D6E694F91E6DBE115974A3926F12FEE5E438777CB6A932DF8CD8BEC4D073B931BA3BC832B68D9DD300741FA7BF8AFC47ED2576F6936BA424663AAB639C5AE4F5683423B4742BF1C978238F16CBE39D652DE3FDB8BEFC848AD922222E04A4037C0713EB57A81A23F0C73473FC646CEA306B4BCBC8862F8385DDFA9D4B7FA2C087E879683303ED5BDD3A062B3CF5B3A278A66D2A13F83F44F82DDF310EE074AB6A364597E899A0255DC164F31CC50846851DF9AB48195DED7EA1B1D510BD7EE74D73FAF36BC31ECFA268359046F4EB879F924009438B481C6CD7889A002ED5EE382BC9190DA6FC026E479558E4475677E9AA9E3050E2765694DFC81F56E880B96E7160C980DD98EDD3DFFFFFFFFFFFFFFFFF",g:19}}}
