(function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).WebStreamsPolyfill={})})(this,(function(e){var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?Symbol:function(e){return"Symbol("+e+")"}
function t(){}var o="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:void 0
function n(e){return"object"==typeof e&&null!==e||"function"==typeof e}var i=t,a=Promise,u=Promise.prototype.then,l=Promise.resolve.bind(a),s=Promise.reject.bind(a)
function c(e){return new a(e)}function d(e){return l(e)}function f(e){return s(e)}function b(e,r,t){return u.call(e,r,t)}function p(e,r,t){b(b(e,r,t),void 0,i)}function _(e,r){p(e,r)}function h(e,r){p(e,void 0,r)}function v(e,r,t){return b(e,r,t)}function y(e){b(e,void 0,i)}var m=function(){var e=o&&o.queueMicrotask
if("function"==typeof e)return e
var r=d(void 0)
return function(e){return b(r,e)}}()
function g(e,r,t){if("function"!=typeof e)throw new TypeError("Argument is not a function")
return Function.prototype.apply.call(e,r,t)}function w(e,r,t){try{return d(g(e,r,t))}catch(o){return f(o)}}var S=function(){function e(){this._cursor=0,this._size=0,this._front={_elements:[],_next:void 0},this._back=this._front,this._cursor=0,this._size=0}return Object.defineProperty(e.prototype,"length",{get:function(){return this._size},enumerable:!1,configurable:!0}),e.prototype.push=function(e){var r=this._back,t=r
16383===r._elements.length&&(t={_elements:[],_next:void 0}),r._elements.push(e),t!==r&&(this._back=t,r._next=t),++this._size},e.prototype.shift=function(){var e=this._front,r=e,t=this._cursor,o=t+1,n=e._elements,i=n[t]
return 16384===o&&(r=e._next,o=0),--this._size,this._cursor=o,e!==r&&(this._front=r),n[t]=void 0,i},e.prototype.forEach=function(e){for(var r=this._cursor,t=this._front,o=t._elements;!(r===o.length&&void 0===t._next||r===o.length&&(r=0,0===(o=(t=t._next)._elements).length));)e(o[r]),++r},e.prototype.peek=function(){var e=this._front,r=this._cursor
return e._elements[r]},e}()
function R(e,r){e._ownerReadableStream=r,r._reader=e,"readable"===r._state?C(e):"closed"===r._state?function(e){C(e),j(e)}(e):E(e,r._storedError)}function T(e,r){return St(e._ownerReadableStream,r)}function P(e){"readable"===e._ownerReadableStream._state?O(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")):function(e,r){E(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness"))}(e),e._ownerReadableStream._reader=void 0,e._ownerReadableStream=void 0}function q(e){return new TypeError("Cannot "+e+" a stream using a released reader")}function C(e){e._closedPromise=c((function(r,t){e._closedPromise_resolve=r,e._closedPromise_reject=t}))}function E(e,r){C(e),O(e,r)}function O(e,r){void 0!==e._closedPromise_reject&&(y(e._closedPromise),e._closedPromise_reject(r),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0)}function j(e){void 0!==e._closedPromise_resolve&&(e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0)}var k=r("[[AbortSteps]]"),W=r("[[ErrorSteps]]"),A=r("[[CancelSteps]]"),z=r("[[PullSteps]]"),B=Number.isFinite||function(e){return"number"==typeof e&&isFinite(e)},I=Math.trunc||function(e){return e<0?Math.ceil(e):Math.floor(e)}
function F(e,r){if(void 0!==e&&"object"!=typeof(t=e)&&"function"!=typeof t)throw new TypeError(r+" is not an object.")
var t}function L(e,r){if("function"!=typeof e)throw new TypeError(r+" is not a function.")}function M(e,r){if(!function(e){return"object"==typeof e&&null!==e||"function"==typeof e}(e))throw new TypeError(r+" is not an object.")}function D(e,r,t){if(void 0===e)throw new TypeError("Parameter "+r+" is required in '"+t+"'.")}function x(e,r,t){if(void 0===e)throw new TypeError(r+" is required in '"+t+"'.")}function N(e){return Number(e)}function Q(e){return 0===e?0:e}function Y(e,r){var t=Number.MAX_SAFE_INTEGER,o=Number(e)
if(o=Q(o),!B(o))throw new TypeError(r+" is not a finite number")
if((o=function(e){return Q(I(e))}(o))<0||o>t)throw new TypeError(r+" is outside the accepted range of 0 to "+t+", inclusive")
return B(o)&&0!==o?o:0}function H(e,r){if(!gt(e))throw new TypeError(r+" is not a ReadableStream.")}function V(e){return new $(e)}function U(e,r){e._reader._readRequests.push(r)}function G(e,r,t){var o=e._reader._readRequests.shift()
t?o._closeSteps():o._chunkSteps(r)}function X(e){return e._reader._readRequests.length}function J(e){var r=e._reader
return void 0!==r&&!!ee(r)}var K,Z,$=function(){function e(e){if(D(e,1,"ReadableStreamDefaultReader"),H(e,"First parameter"),wt(e))throw new TypeError("This stream has already been locked for exclusive reading by another reader")
R(this,e),this._readRequests=new S}return Object.defineProperty(e.prototype,"closed",{get:function(){return ee(this)?this._closedPromise:f(te("closed"))},enumerable:!1,configurable:!0}),e.prototype.cancel=function(e){return void 0===e&&(e=void 0),ee(this)?void 0===this._ownerReadableStream?f(q("cancel")):T(this,e):f(te("cancel"))},e.prototype.read=function(){if(!ee(this))return f(te("read"))
if(void 0===this._ownerReadableStream)return f(q("read from"))
var e,r,t=c((function(t,o){e=t,r=o}))
return re(this,{_chunkSteps:function(r){return e({value:r,done:!1})},_closeSteps:function(){return e({value:void 0,done:!0})},_errorSteps:function(e){return r(e)}}),t},e.prototype.releaseLock=function(){if(!ee(this))throw te("releaseLock")
if(void 0!==this._ownerReadableStream){if(this._readRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled")
P(this)}},e}()
function ee(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_readRequests")&&e instanceof $}function re(e,r){var t=e._ownerReadableStream
t._disturbed=!0,"closed"===t._state?r._closeSteps():"errored"===t._state?r._errorSteps(t._storedError):t._readableStreamController[z](r)}function te(e){return new TypeError("ReadableStreamDefaultReader.prototype."+e+" can only be used on a ReadableStreamDefaultReader")}Object.defineProperties($.prototype,{cancel:{enumerable:!0},read:{enumerable:!0},releaseLock:{enumerable:!0},closed:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty($.prototype,r.toStringTag,{value:"ReadableStreamDefaultReader",configurable:!0}),"symbol"==typeof r.asyncIterator&&((K={})[r.asyncIterator]=function(){return this},Z=K,Object.defineProperty(Z,r.asyncIterator,{enumerable:!1}))
var oe=function(){function e(e,r){this._ongoingPromise=void 0,this._isFinished=!1,this._reader=e,this._preventCancel=r}return e.prototype.next=function(){var e=this,r=function(){return e._nextSteps()}
return this._ongoingPromise=this._ongoingPromise?v(this._ongoingPromise,r,r):r(),this._ongoingPromise},e.prototype.return=function(e){var r=this,t=function(){return r._returnSteps(e)}
return this._ongoingPromise?v(this._ongoingPromise,t,t):t()},e.prototype._nextSteps=function(){var e=this
if(this._isFinished)return Promise.resolve({value:void 0,done:!0})
var r,t,o=this._reader
if(void 0===o._ownerReadableStream)return f(q("iterate"))
var n=c((function(e,o){r=e,t=o}))
return re(o,{_chunkSteps:function(t){e._ongoingPromise=void 0,m((function(){return r({value:t,done:!1})}))},_closeSteps:function(){e._ongoingPromise=void 0,e._isFinished=!0,P(o),r({value:void 0,done:!0})},_errorSteps:function(r){e._ongoingPromise=void 0,e._isFinished=!0,P(o),t(r)}}),n},e.prototype._returnSteps=function(e){if(this._isFinished)return Promise.resolve({value:e,done:!0})
this._isFinished=!0
var r=this._reader
if(void 0===r._ownerReadableStream)return f(q("finish iterating"))
if(!this._preventCancel){var t=T(r,e)
return P(r),v(t,(function(){return{value:e,done:!0}}))}return P(r),d({value:e,done:!0})},e}(),ne={next:function(){return ie(this)?this._asyncIteratorImpl.next():f(ae("next"))},return:function(e){return ie(this)?this._asyncIteratorImpl.return(e):f(ae("return"))}}
function ie(e){if(!n(e))return!1
if(!Object.prototype.hasOwnProperty.call(e,"_asyncIteratorImpl"))return!1
try{return e._asyncIteratorImpl instanceof oe}catch(K){return!1}}function ae(e){return new TypeError("ReadableStreamAsyncIterator."+e+" can only be used on a ReadableSteamAsyncIterator")}void 0!==Z&&Object.setPrototypeOf(ne,Z)
var ue=Number.isNaN||function(e){return e!=e}
function le(e){return e.slice()}function se(e,r,t,o,n){new Uint8Array(e).set(new Uint8Array(t,o,n),r)}function ce(e,r,t){if(e.slice)return e.slice(r,t)
var o=t-r,n=new ArrayBuffer(o)
return se(n,0,e,r,o),n}function de(e){var r=ce(e.buffer,e.byteOffset,e.byteOffset+e.byteLength)
return new Uint8Array(r)}function fe(e){var r=e._queue.shift()
return e._queueTotalSize-=r.size,e._queueTotalSize<0&&(e._queueTotalSize=0),r.value}function be(e,r,t){if("number"!=typeof(o=t)||ue(o)||o<0||t===1/0)throw new RangeError("Size must be a finite, non-NaN, non-negative number.")
var o
e._queue.push({value:r,size:t}),e._queueTotalSize+=t}function pe(e){e._queue=new S,e._queueTotalSize=0}var _e=function(){function e(){throw new TypeError("Illegal constructor")}return Object.defineProperty(e.prototype,"view",{get:function(){if(!ye(this))throw De("view")
return this._view},enumerable:!1,configurable:!0}),e.prototype.respond=function(e){if(!ye(this))throw De("respond")
if(D(e,1,"respond"),e=Y(e,"First parameter"),void 0===this._associatedReadableByteStreamController)throw new TypeError("This BYOB request has been invalidated")
this._view.buffer,Fe(this._associatedReadableByteStreamController,e)},e.prototype.respondWithNewView=function(e){if(!ye(this))throw De("respondWithNewView")
if(D(e,1,"respondWithNewView"),!ArrayBuffer.isView(e))throw new TypeError("You can only respond with array buffer views")
if(void 0===this._associatedReadableByteStreamController)throw new TypeError("This BYOB request has been invalidated")
e.buffer,Le(this._associatedReadableByteStreamController,e)},e}()
Object.defineProperties(_e.prototype,{respond:{enumerable:!0},respondWithNewView:{enumerable:!0},view:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(_e.prototype,r.toStringTag,{value:"ReadableStreamBYOBRequest",configurable:!0})
var he=function(){function e(){throw new TypeError("Illegal constructor")}return Object.defineProperty(e.prototype,"byobRequest",{get:function(){if(!ve(this))throw xe("byobRequest")
return Be(this)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"desiredSize",{get:function(){if(!ve(this))throw xe("desiredSize")
return Ie(this)},enumerable:!1,configurable:!0}),e.prototype.close=function(){if(!ve(this))throw xe("close")
if(this._closeRequested)throw new TypeError("The stream has already been closed; do not close it again!")
var e=this._controlledReadableByteStream._state
if("readable"!==e)throw new TypeError("The stream (in "+e+" state) is not in the readable state and cannot be closed")
We(this)},e.prototype.enqueue=function(e){if(!ve(this))throw xe("enqueue")
if(D(e,1,"enqueue"),!ArrayBuffer.isView(e))throw new TypeError("chunk must be an array buffer view")
if(0===e.byteLength)throw new TypeError("chunk must have non-zero byteLength")
if(0===e.buffer.byteLength)throw new TypeError("chunk's buffer must have non-zero byteLength")
if(this._closeRequested)throw new TypeError("stream is closed or draining")
var r=this._controlledReadableByteStream._state
if("readable"!==r)throw new TypeError("The stream (in "+r+" state) is not in the readable state and cannot be enqueued to")
Ae(this,e)},e.prototype.error=function(e){if(void 0===e&&(e=void 0),!ve(this))throw xe("error")
ze(this,e)},e.prototype[A]=function(e){ge(this),pe(this)
var r=this._cancelAlgorithm(e)
return ke(this),r},e.prototype[z]=function(e){var r=this._controlledReadableByteStream
if(this._queueTotalSize>0){var t=this._queue.shift()
this._queueTotalSize-=t.byteLength,qe(this)
var o=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)
e._chunkSteps(o)}else{var n=this._autoAllocateChunkSize
if(void 0!==n){var i=void 0
try{i=new ArrayBuffer(n)}catch(u){return void e._errorSteps(u)}var a={buffer:i,bufferByteLength:n,byteOffset:0,byteLength:n,bytesFilled:0,elementSize:1,viewConstructor:Uint8Array,readerType:"default"}
this._pendingPullIntos.push(a)}U(r,e),me(this)}},e}()
function ve(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_controlledReadableByteStream")&&e instanceof he}function ye(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_associatedReadableByteStreamController")&&e instanceof _e}function me(e){(function(e){var r=e._controlledReadableByteStream
return"readable"===r._state&&(!e._closeRequested&&(!!e._started&&(!!(J(r)&&X(r)>0)||(!!(He(r)&&Ye(r)>0)||Ie(e)>0))))})(e)&&(e._pulling?e._pullAgain=!0:(e._pulling=!0,p(e._pullAlgorithm(),(function(){e._pulling=!1,e._pullAgain&&(e._pullAgain=!1,me(e))}),(function(r){ze(e,r)}))))}function ge(e){Ce(e),e._pendingPullIntos=new S}function we(e,r){var t=!1
"closed"===e._state&&(t=!0)
var o=Se(r)
"default"===r.readerType?G(e,o,t):function(e,r,t){var o=e._reader._readIntoRequests.shift()
t?o._closeSteps(r):o._chunkSteps(r)}(e,o,t)}function Se(e){var r=e.bytesFilled,t=e.elementSize
return new e.viewConstructor(e.buffer,e.byteOffset,r/t)}function Re(e,r,t,o){e._queue.push({buffer:r,byteOffset:t,byteLength:o}),e._queueTotalSize+=o}function Te(e,r){var t=r.elementSize,o=r.bytesFilled-r.bytesFilled%t,n=Math.min(e._queueTotalSize,r.byteLength-r.bytesFilled),i=r.bytesFilled+n,a=i-i%t,u=n,l=!1
a>o&&(u=a-r.bytesFilled,l=!0)
for(var s=e._queue;u>0;){var c=s.peek(),d=Math.min(u,c.byteLength),f=r.byteOffset+r.bytesFilled
se(r.buffer,f,c.buffer,c.byteOffset,d),c.byteLength===d?s.shift():(c.byteOffset+=d,c.byteLength-=d),e._queueTotalSize-=d,Pe(e,d,r),u-=d}return l}function Pe(e,r,t){t.bytesFilled+=r}function qe(e){0===e._queueTotalSize&&e._closeRequested?(ke(e),Rt(e._controlledReadableByteStream)):me(e)}function Ce(e){null!==e._byobRequest&&(e._byobRequest._associatedReadableByteStreamController=void 0,e._byobRequest._view=null,e._byobRequest=null)}function Ee(e){for(;e._pendingPullIntos.length>0;){if(0===e._queueTotalSize)return
var r=e._pendingPullIntos.peek()
Te(e,r)&&(je(e),we(e._controlledReadableByteStream,r))}}function Oe(e,r){var t=e._pendingPullIntos.peek()
Ce(e),"closed"===e._controlledReadableByteStream._state?function(e,r){var t=e._controlledReadableByteStream
if(He(t))for(;Ye(t)>0;)we(t,je(e))}(e):function(e,r,t){if(Pe(0,r,t),!(t.bytesFilled<t.elementSize)){je(e)
var o=t.bytesFilled%t.elementSize
if(o>0){var n=t.byteOffset+t.bytesFilled,i=ce(t.buffer,n-o,n)
Re(e,i,0,i.byteLength)}t.bytesFilled-=o,we(e._controlledReadableByteStream,t),Ee(e)}}(e,r,t),me(e)}function je(e){return e._pendingPullIntos.shift()}function ke(e){e._pullAlgorithm=void 0,e._cancelAlgorithm=void 0}function We(e){var r=e._controlledReadableByteStream
if(!e._closeRequested&&"readable"===r._state)if(e._queueTotalSize>0)e._closeRequested=!0
else{if(e._pendingPullIntos.length>0&&e._pendingPullIntos.peek().bytesFilled>0){var t=new TypeError("Insufficient bytes to fill elements in the given buffer")
throw ze(e,t),t}ke(e),Rt(r)}}function Ae(e,r){var t=e._controlledReadableByteStream
if(!e._closeRequested&&"readable"===t._state){var o=r.buffer,n=r.byteOffset,i=r.byteLength,a=o
if(e._pendingPullIntos.length>0){var u=e._pendingPullIntos.peek()
u.buffer,u.buffer=u.buffer}Ce(e),J(t)?0===X(t)?Re(e,a,n,i):(e._pendingPullIntos.length>0&&je(e),G(t,new Uint8Array(a,n,i),!1)):He(t)?(Re(e,a,n,i),Ee(e)):Re(e,a,n,i),me(e)}}function ze(e,r){var t=e._controlledReadableByteStream
"readable"===t._state&&(ge(e),pe(e),ke(e),Tt(t,r))}function Be(e){if(null===e._byobRequest&&e._pendingPullIntos.length>0){var r=e._pendingPullIntos.peek(),t=new Uint8Array(r.buffer,r.byteOffset+r.bytesFilled,r.byteLength-r.bytesFilled),o=Object.create(_e.prototype);(function(e,r,t){e._associatedReadableByteStreamController=r,e._view=t})(o,e,t),e._byobRequest=o}return e._byobRequest}function Ie(e){var r=e._controlledReadableByteStream._state
return"errored"===r?null:"closed"===r?0:e._strategyHWM-e._queueTotalSize}function Fe(e,r){var t=e._pendingPullIntos.peek()
if("closed"===e._controlledReadableByteStream._state){if(0!==r)throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream")}else{if(0===r)throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream")
if(t.bytesFilled+r>t.byteLength)throw new RangeError("bytesWritten out of range")}t.buffer=t.buffer,Oe(e,r)}function Le(e,r){var t=e._pendingPullIntos.peek()
if("closed"===e._controlledReadableByteStream._state){if(0!==r.byteLength)throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream")}else if(0===r.byteLength)throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream")
if(t.byteOffset+t.bytesFilled!==r.byteOffset)throw new RangeError("The region specified by view does not match byobRequest")
if(t.bufferByteLength!==r.buffer.byteLength)throw new RangeError("The buffer of view has different capacity than byobRequest")
if(t.bytesFilled+r.byteLength>t.byteLength)throw new RangeError("The region specified by view is larger than byobRequest")
var o=r.byteLength
t.buffer=r.buffer,Oe(e,o)}function Me(e,r,t,o,n,i,a){r._controlledReadableByteStream=e,r._pullAgain=!1,r._pulling=!1,r._byobRequest=null,r._queue=r._queueTotalSize=void 0,pe(r),r._closeRequested=!1,r._started=!1,r._strategyHWM=i,r._pullAlgorithm=o,r._cancelAlgorithm=n,r._autoAllocateChunkSize=a,r._pendingPullIntos=new S,e._readableStreamController=r,p(d(t()),(function(){r._started=!0,me(r)}),(function(e){ze(r,e)}))}function De(e){return new TypeError("ReadableStreamBYOBRequest.prototype."+e+" can only be used on a ReadableStreamBYOBRequest")}function xe(e){return new TypeError("ReadableByteStreamController.prototype."+e+" can only be used on a ReadableByteStreamController")}function Ne(e){return new Ve(e)}function Qe(e,r){e._reader._readIntoRequests.push(r)}function Ye(e){return e._reader._readIntoRequests.length}function He(e){var r=e._reader
return void 0!==r&&!!Ue(r)}Object.defineProperties(he.prototype,{close:{enumerable:!0},enqueue:{enumerable:!0},error:{enumerable:!0},byobRequest:{enumerable:!0},desiredSize:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(he.prototype,r.toStringTag,{value:"ReadableByteStreamController",configurable:!0})
var Ve=function(){function e(e){if(D(e,1,"ReadableStreamBYOBReader"),H(e,"First parameter"),wt(e))throw new TypeError("This stream has already been locked for exclusive reading by another reader")
if(!ve(e._readableStreamController))throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source")
R(this,e),this._readIntoRequests=new S}return Object.defineProperty(e.prototype,"closed",{get:function(){return Ue(this)?this._closedPromise:f(Xe("closed"))},enumerable:!1,configurable:!0}),e.prototype.cancel=function(e){return void 0===e&&(e=void 0),Ue(this)?void 0===this._ownerReadableStream?f(q("cancel")):T(this,e):f(Xe("cancel"))},e.prototype.read=function(e){if(!Ue(this))return f(Xe("read"))
if(!ArrayBuffer.isView(e))return f(new TypeError("view must be an array buffer view"))
if(0===e.byteLength)return f(new TypeError("view must have non-zero byteLength"))
if(0===e.buffer.byteLength)return f(new TypeError("view's buffer must have non-zero byteLength"))
if(e.buffer,void 0===this._ownerReadableStream)return f(q("read from"))
var r,t,o=c((function(e,o){r=e,t=o}))
return Ge(this,e,{_chunkSteps:function(e){return r({value:e,done:!1})},_closeSteps:function(e){return r({value:e,done:!0})},_errorSteps:function(e){return t(e)}}),o},e.prototype.releaseLock=function(){if(!Ue(this))throw Xe("releaseLock")
if(void 0!==this._ownerReadableStream){if(this._readIntoRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled")
P(this)}},e}()
function Ue(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_readIntoRequests")&&e instanceof Ve}function Ge(e,r,t){var o=e._ownerReadableStream
o._disturbed=!0,"errored"===o._state?t._errorSteps(o._storedError):function(e,r,t){var o=e._controlledReadableByteStream,n=1
r.constructor!==DataView&&(n=r.constructor.BYTES_PER_ELEMENT)
var i=r.constructor,a=r.buffer,u={buffer:a,bufferByteLength:a.byteLength,byteOffset:r.byteOffset,byteLength:r.byteLength,bytesFilled:0,elementSize:n,viewConstructor:i,readerType:"byob"}
if(e._pendingPullIntos.length>0)return e._pendingPullIntos.push(u),void Qe(o,t)
if("closed"!==o._state){if(e._queueTotalSize>0){if(Te(e,u)){var l=Se(u)
return qe(e),void t._chunkSteps(l)}if(e._closeRequested){var s=new TypeError("Insufficient bytes to fill elements in the given buffer")
return ze(e,s),void t._errorSteps(s)}}e._pendingPullIntos.push(u),Qe(o,t),me(e)}else{var c=new i(u.buffer,u.byteOffset,0)
t._closeSteps(c)}}(o._readableStreamController,r,t)}function Xe(e){return new TypeError("ReadableStreamBYOBReader.prototype."+e+" can only be used on a ReadableStreamBYOBReader")}function Je(e,r){var t=e.highWaterMark
if(void 0===t)return r
if(ue(t)||t<0)throw new RangeError("Invalid highWaterMark")
return t}function Ke(e){return e.size||function(){return 1}}function Ze(e,r){F(e,r)
var t=null==e?void 0:e.highWaterMark,o=null==e?void 0:e.size
return{highWaterMark:void 0===t?void 0:N(t),size:void 0===o?void 0:$e(o,r+" has member 'size' that")}}function $e(e,r){return L(e,r),function(r){return N(e(r))}}function er(e,r,t){return L(e,t),function(t){return w(e,r,[t])}}function rr(e,r,t){return L(e,t),function(){return w(e,r,[])}}function tr(e,r,t){return L(e,t),function(t){return g(e,r,[t])}}function or(e,r,t){return L(e,t),function(t,o){return w(e,r,[t,o])}}function nr(e,r){if(!sr(e))throw new TypeError(r+" is not a WritableStream.")}Object.defineProperties(Ve.prototype,{cancel:{enumerable:!0},read:{enumerable:!0},releaseLock:{enumerable:!0},closed:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(Ve.prototype,r.toStringTag,{value:"ReadableStreamBYOBReader",configurable:!0})
var ir="function"==typeof AbortController,ar=function(){function e(e,r){void 0===e&&(e={}),void 0===r&&(r={}),void 0===e?e=null:M(e,"First parameter")
var t=Ze(r,"Second parameter"),o=function(e,r){F(e,r)
var t=null==e?void 0:e.abort,o=null==e?void 0:e.close,n=null==e?void 0:e.start,i=null==e?void 0:e.type,a=null==e?void 0:e.write
return{abort:void 0===t?void 0:er(t,e,r+" has member 'abort' that"),close:void 0===o?void 0:rr(o,e,r+" has member 'close' that"),start:void 0===n?void 0:tr(n,e,r+" has member 'start' that"),write:void 0===a?void 0:or(a,e,r+" has member 'write' that"),type:i}}(e,"First parameter")
if(lr(this),void 0!==o.type)throw new RangeError("Invalid type is specified")
var n=Ke(t);(function(e,r,t,o){var n=Object.create(qr.prototype),i=function(){},a=function(){return d(void 0)},u=function(){return d(void 0)},l=function(){return d(void 0)}
void 0!==r.start&&(i=function(){return r.start(n)}),void 0!==r.write&&(a=function(e){return r.write(e,n)}),void 0!==r.close&&(u=function(){return r.close()}),void 0!==r.abort&&(l=function(e){return r.abort(e)}),Er(e,n,i,a,u,l,t,o)})(this,o,Je(t,1),n)}return Object.defineProperty(e.prototype,"locked",{get:function(){if(!sr(this))throw Br("locked")
return cr(this)},enumerable:!1,configurable:!0}),e.prototype.abort=function(e){return void 0===e&&(e=void 0),sr(this)?cr(this)?f(new TypeError("Cannot abort a stream that already has a writer")):dr(this,e):f(Br("abort"))},e.prototype.close=function(){return sr(this)?cr(this)?f(new TypeError("Cannot close a stream that already has a writer")):hr(this)?f(new TypeError("Cannot close an already-closing stream")):fr(this):f(Br("close"))},e.prototype.getWriter=function(){if(!sr(this))throw Br("getWriter")
return ur(this)},e}()
function ur(e){return new mr(e)}function lr(e){e._state="writable",e._storedError=void 0,e._writer=void 0,e._writableStreamController=void 0,e._writeRequests=new S,e._inFlightWriteRequest=void 0,e._closeRequest=void 0,e._inFlightCloseRequest=void 0,e._pendingAbortRequest=void 0,e._backpressure=!1}function sr(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_writableStreamController")&&e instanceof ar}function cr(e){return void 0!==e._writer}function dr(e,r){var t
if("closed"===e._state||"errored"===e._state)return d(void 0)
e._writableStreamController._abortReason=r,null===(t=e._writableStreamController._abortController)||void 0===t||t.abort()
var o=e._state
if("closed"===o||"errored"===o)return d(void 0)
if(void 0!==e._pendingAbortRequest)return e._pendingAbortRequest._promise
var n=!1
"erroring"===o&&(n=!0,r=void 0)
var i=c((function(t,o){e._pendingAbortRequest={_promise:void 0,_resolve:t,_reject:o,_reason:r,_wasAlreadyErroring:n}}))
return e._pendingAbortRequest._promise=i,n||pr(e,r),i}function fr(e){var r=e._state
if("closed"===r||"errored"===r)return f(new TypeError("The stream (in "+r+" state) is not in the writable state and cannot be closed"))
var t,o=c((function(r,t){var o={_resolve:r,_reject:t}
e._closeRequest=o})),n=e._writer
return void 0!==n&&e._backpressure&&"writable"===r&&Ur(n),be(t=e._writableStreamController,Pr,0),kr(t),o}function br(e,r){"writable"!==e._state?_r(e):pr(e,r)}function pr(e,r){var t=e._writableStreamController
e._state="erroring",e._storedError=r
var o=e._writer
void 0!==o&&Sr(o,r),!function(e){return void 0!==e._inFlightWriteRequest||void 0!==e._inFlightCloseRequest}(e)&&t._started&&_r(e)}function _r(e){e._state="errored",e._writableStreamController[W]()
var r=e._storedError
if(e._writeRequests.forEach((function(e){e._reject(r)})),e._writeRequests=new S,void 0!==e._pendingAbortRequest){var t=e._pendingAbortRequest
if(e._pendingAbortRequest=void 0,t._wasAlreadyErroring)return t._reject(r),void vr(e)
p(e._writableStreamController[k](t._reason),(function(){t._resolve(),vr(e)}),(function(r){t._reject(r),vr(e)}))}else vr(e)}function hr(e){return void 0!==e._closeRequest||void 0!==e._inFlightCloseRequest}function vr(e){void 0!==e._closeRequest&&(e._closeRequest._reject(e._storedError),e._closeRequest=void 0)
var r=e._writer
void 0!==r&&xr(r,e._storedError)}function yr(e,r){var t=e._writer
void 0!==t&&r!==e._backpressure&&(r?function(e){Qr(e)}(t):Ur(t)),e._backpressure=r}Object.defineProperties(ar.prototype,{abort:{enumerable:!0},close:{enumerable:!0},getWriter:{enumerable:!0},locked:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(ar.prototype,r.toStringTag,{value:"WritableStream",configurable:!0})
var mr=function(){function e(e){if(D(e,1,"WritableStreamDefaultWriter"),nr(e,"First parameter"),cr(e))throw new TypeError("This stream has already been locked for exclusive writing by another writer")
this._ownerWritableStream=e,e._writer=this
var r=e._state
if("writable"===r)!hr(e)&&e._backpressure?Qr(this):Hr(this),Mr(this)
else if("erroring"===r)Yr(this,e._storedError),Mr(this)
else if("closed"===r)Hr(this),Mr(this),Nr(this)
else{var t=e._storedError
Yr(this,t),Dr(this,t)}}return Object.defineProperty(e.prototype,"closed",{get:function(){return gr(this)?this._closedPromise:f(Fr("closed"))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"desiredSize",{get:function(){if(!gr(this))throw Fr("desiredSize")
if(void 0===this._ownerWritableStream)throw Lr("desiredSize")
return function(e){var r=e._ownerWritableStream,t=r._state
return"errored"===t||"erroring"===t?null:"closed"===t?0:jr(r._writableStreamController)}(this)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"ready",{get:function(){return gr(this)?this._readyPromise:f(Fr("ready"))},enumerable:!1,configurable:!0}),e.prototype.abort=function(e){return void 0===e&&(e=void 0),gr(this)?void 0===this._ownerWritableStream?f(Lr("abort")):function(e,r){return dr(e._ownerWritableStream,r)}(this,e):f(Fr("abort"))},e.prototype.close=function(){if(!gr(this))return f(Fr("close"))
var e=this._ownerWritableStream
return void 0===e?f(Lr("close")):hr(e)?f(new TypeError("Cannot close an already-closing stream")):wr(this)},e.prototype.releaseLock=function(){if(!gr(this))throw Fr("releaseLock")
void 0!==this._ownerWritableStream&&Rr(this)},e.prototype.write=function(e){return void 0===e&&(e=void 0),gr(this)?void 0===this._ownerWritableStream?f(Lr("write to")):Tr(this,e):f(Fr("write"))},e}()
function gr(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_ownerWritableStream")&&e instanceof mr}function wr(e){return fr(e._ownerWritableStream)}function Sr(e,r){"pending"===e._readyPromiseState?Vr(e,r):function(e,r){Yr(e,r)}(e,r)}function Rr(e){var r=e._ownerWritableStream,t=new TypeError("Writer was released and can no longer be used to monitor the stream's closedness")
Sr(e,t),function(e,r){"pending"===e._closedPromiseState?xr(e,r):function(e,r){Dr(e,r)}(e,r)}(e,t),r._writer=void 0,e._ownerWritableStream=void 0}function Tr(e,r){var t=e._ownerWritableStream,o=t._writableStreamController,n=function(e,r){try{return e._strategySizeAlgorithm(r)}catch(t){return Wr(e,t),1}}(o,r)
if(t!==e._ownerWritableStream)return f(Lr("write to"))
var i=t._state
if("errored"===i)return f(t._storedError)
if(hr(t)||"closed"===i)return f(new TypeError("The stream is closing or closed and cannot be written to"))
if("erroring"===i)return f(t._storedError)
var a=function(e){return c((function(r,t){var o={_resolve:r,_reject:t}
e._writeRequests.push(o)}))}(t)
return function(e,r,t){try{be(e,r,t)}catch(n){return void Wr(e,n)}var o=e._controlledWritableStream
hr(o)||"writable"!==o._state||yr(o,Ar(e)),kr(e)}(o,r,n),a}Object.defineProperties(mr.prototype,{abort:{enumerable:!0},close:{enumerable:!0},releaseLock:{enumerable:!0},write:{enumerable:!0},closed:{enumerable:!0},desiredSize:{enumerable:!0},ready:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(mr.prototype,r.toStringTag,{value:"WritableStreamDefaultWriter",configurable:!0})
var Pr={},qr=function(){function e(){throw new TypeError("Illegal constructor")}return Object.defineProperty(e.prototype,"abortReason",{get:function(){if(!Cr(this))throw Ir("abortReason")
return this._abortReason},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"signal",{get:function(){if(!Cr(this))throw Ir("signal")
if(void 0===this._abortController)throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported")
return this._abortController.signal},enumerable:!1,configurable:!0}),e.prototype.error=function(e){if(void 0===e&&(e=void 0),!Cr(this))throw Ir("error")
"writable"===this._controlledWritableStream._state&&zr(this,e)},e.prototype[k]=function(e){var r=this._abortAlgorithm(e)
return Or(this),r},e.prototype[W]=function(){pe(this)},e}()
function Cr(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_controlledWritableStream")&&e instanceof qr}function Er(e,r,t,o,n,i,a,u){r._controlledWritableStream=e,e._writableStreamController=r,r._queue=void 0,r._queueTotalSize=void 0,pe(r),r._abortReason=void 0,r._abortController=function(){if(ir)return new AbortController}(),r._started=!1,r._strategySizeAlgorithm=u,r._strategyHWM=a,r._writeAlgorithm=o,r._closeAlgorithm=n,r._abortAlgorithm=i
var l=Ar(r)
yr(e,l),p(d(t()),(function(){r._started=!0,kr(r)}),(function(t){r._started=!0,br(e,t)}))}function Or(e){e._writeAlgorithm=void 0,e._closeAlgorithm=void 0,e._abortAlgorithm=void 0,e._strategySizeAlgorithm=void 0}function jr(e){return e._strategyHWM-e._queueTotalSize}function kr(e){var r=e._controlledWritableStream
if(e._started&&void 0===r._inFlightWriteRequest)if("erroring"!==r._state){if(0!==e._queue.length){var t=e._queue.peek().value
t===Pr?function(e){var r=e._controlledWritableStream;(function(e){e._inFlightCloseRequest=e._closeRequest,e._closeRequest=void 0})(r),fe(e)
var t=e._closeAlgorithm()
Or(e),p(t,(function(){(function(e){e._inFlightCloseRequest._resolve(void 0),e._inFlightCloseRequest=void 0,"erroring"===e._state&&(e._storedError=void 0,void 0!==e._pendingAbortRequest&&(e._pendingAbortRequest._resolve(),e._pendingAbortRequest=void 0)),e._state="closed"
var r=e._writer
void 0!==r&&Nr(r)})(r)}),(function(e){(function(e,r){e._inFlightCloseRequest._reject(r),e._inFlightCloseRequest=void 0,void 0!==e._pendingAbortRequest&&(e._pendingAbortRequest._reject(r),e._pendingAbortRequest=void 0),br(e,r)})(r,e)}))}(e):function(e,r){var t=e._controlledWritableStream;(function(e){e._inFlightWriteRequest=e._writeRequests.shift()})(t),p(e._writeAlgorithm(r),(function(){(function(e){e._inFlightWriteRequest._resolve(void 0),e._inFlightWriteRequest=void 0})(t)
var r=t._state
if(fe(e),!hr(t)&&"writable"===r){var o=Ar(e)
yr(t,o)}kr(e)}),(function(r){"writable"===t._state&&Or(e),function(e,r){e._inFlightWriteRequest._reject(r),e._inFlightWriteRequest=void 0,br(e,r)}(t,r)}))}(e,t)}}else _r(r)}function Wr(e,r){"writable"===e._controlledWritableStream._state&&zr(e,r)}function Ar(e){return jr(e)<=0}function zr(e,r){var t=e._controlledWritableStream
Or(e),pr(t,r)}function Br(e){return new TypeError("WritableStream.prototype."+e+" can only be used on a WritableStream")}function Ir(e){return new TypeError("WritableStreamDefaultController.prototype."+e+" can only be used on a WritableStreamDefaultController")}function Fr(e){return new TypeError("WritableStreamDefaultWriter.prototype."+e+" can only be used on a WritableStreamDefaultWriter")}function Lr(e){return new TypeError("Cannot "+e+" a stream using a released writer")}function Mr(e){e._closedPromise=c((function(r,t){e._closedPromise_resolve=r,e._closedPromise_reject=t,e._closedPromiseState="pending"}))}function Dr(e,r){Mr(e),xr(e,r)}function xr(e,r){void 0!==e._closedPromise_reject&&(y(e._closedPromise),e._closedPromise_reject(r),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="rejected")}function Nr(e){void 0!==e._closedPromise_resolve&&(e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="resolved")}function Qr(e){e._readyPromise=c((function(r,t){e._readyPromise_resolve=r,e._readyPromise_reject=t})),e._readyPromiseState="pending"}function Yr(e,r){Qr(e),Vr(e,r)}function Hr(e){Qr(e),Ur(e)}function Vr(e,r){void 0!==e._readyPromise_reject&&(y(e._readyPromise),e._readyPromise_reject(r),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="rejected")}function Ur(e){void 0!==e._readyPromise_resolve&&(e._readyPromise_resolve(void 0),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="fulfilled")}Object.defineProperties(qr.prototype,{abortReason:{enumerable:!0},signal:{enumerable:!0},error:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(qr.prototype,r.toStringTag,{value:"WritableStreamDefaultController",configurable:!0})
var Gr,Xr="undefined"!=typeof DOMException?DOMException:void 0,Jr=function(e){if("function"!=typeof e&&"object"!=typeof e)return!1
try{return new e,!0}catch(K){return!1}}(Xr)?Xr:((Gr=function(e,r){this.message=e||"",this.name=r||"Error",Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}).prototype=Object.create(Error.prototype),Object.defineProperty(Gr.prototype,"constructor",{value:Gr,writable:!0,configurable:!0}),Gr)
function Kr(e,r,o,n,i,a){var u=V(e),l=ur(r)
e._disturbed=!0
var s=!1,v=d(void 0)
return c((function(m,g){var w,S,R,T
if(void 0!==a){if(w=function(){var t=new Jr("Aborted","AbortError"),o=[]
n||o.push((function(){return"writable"===r._state?dr(r,t):d(void 0)})),i||o.push((function(){return"readable"===e._state?St(e,t):d(void 0)})),O((function(){return Promise.all(o.map((function(e){return e()})))}),!0,t)},a.aborted)return void w()
a.addEventListener("abort",w)}if(E(e,u._closedPromise,(function(e){n?j(!0,e):O((function(){return dr(r,e)}),!0,e)})),E(r,l._closedPromise,(function(r){i?j(!0,r):O((function(){return St(e,r)}),!0,r)})),S=e,R=u._closedPromise,T=function(){o?j():O((function(){return function(e){var r=e._ownerWritableStream,t=r._state
return hr(r)||"closed"===t?d(void 0):"errored"===t?f(r._storedError):wr(e)}(l)}))},"closed"===S._state?T():_(R,T),hr(r)||"closed"===r._state){var q=new TypeError("the destination writable stream closed before all data could be piped to it")
i?j(!0,q):O((function(){return St(e,q)}),!0,q)}function C(){var e=v
return b(v,(function(){return e!==v?C():void 0}))}function E(e,r,t){"errored"===e._state?t(e._storedError):h(r,t)}function O(e,t,o){function n(){p(e(),(function(){return k(t,o)}),(function(e){return k(!0,e)}))}s||(s=!0,"writable"!==r._state||hr(r)?n():_(C(),n))}function j(e,t){s||(s=!0,"writable"!==r._state||hr(r)?k(e,t):_(C(),(function(){return k(e,t)})))}function k(e,r){Rr(l),P(u),void 0!==a&&a.removeEventListener("abort",w),e?g(r):m(void 0)}y(c((function(e,r){(function o(n){n?e():b(s?d(!0):b(l._readyPromise,(function(){return c((function(e,r){re(u,{_chunkSteps:function(r){v=b(Tr(l,r),void 0,t),e(!1)},_closeSteps:function(){return e(!0)},_errorSteps:r})}))})),o,r)})(!1)})))}))}var Zr=function(){function e(){throw new TypeError("Illegal constructor")}return Object.defineProperty(e.prototype,"desiredSize",{get:function(){if(!$r(this))throw st("desiredSize")
return at(this)},enumerable:!1,configurable:!0}),e.prototype.close=function(){if(!$r(this))throw st("close")
if(!ut(this))throw new TypeError("The stream is not in a state that permits close")
ot(this)},e.prototype.enqueue=function(e){if(void 0===e&&(e=void 0),!$r(this))throw st("enqueue")
if(!ut(this))throw new TypeError("The stream is not in a state that permits enqueue")
return nt(this,e)},e.prototype.error=function(e){if(void 0===e&&(e=void 0),!$r(this))throw st("error")
it(this,e)},e.prototype[A]=function(e){pe(this)
var r=this._cancelAlgorithm(e)
return tt(this),r},e.prototype[z]=function(e){var r=this._controlledReadableStream
if(this._queue.length>0){var t=fe(this)
this._closeRequested&&0===this._queue.length?(tt(this),Rt(r)):et(this),e._chunkSteps(t)}else U(r,e),et(this)},e}()
function $r(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_controlledReadableStream")&&e instanceof Zr}function et(e){rt(e)&&(e._pulling?e._pullAgain=!0:(e._pulling=!0,p(e._pullAlgorithm(),(function(){e._pulling=!1,e._pullAgain&&(e._pullAgain=!1,et(e))}),(function(r){it(e,r)}))))}function rt(e){var r=e._controlledReadableStream
return!!ut(e)&&!!e._started&&(!!(wt(r)&&X(r)>0)||at(e)>0)}function tt(e){e._pullAlgorithm=void 0,e._cancelAlgorithm=void 0,e._strategySizeAlgorithm=void 0}function ot(e){if(ut(e)){var r=e._controlledReadableStream
e._closeRequested=!0,0===e._queue.length&&(tt(e),Rt(r))}}function nt(e,r){if(ut(e)){var t=e._controlledReadableStream
if(wt(t)&&X(t)>0)G(t,r,!1)
else{var o=void 0
try{o=e._strategySizeAlgorithm(r)}catch(n){throw it(e,n),n}try{be(e,r,o)}catch(i){throw it(e,i),i}}et(e)}}function it(e,r){var t=e._controlledReadableStream
"readable"===t._state&&(pe(e),tt(e),Tt(t,r))}function at(e){var r=e._controlledReadableStream._state
return"errored"===r?null:"closed"===r?0:e._strategyHWM-e._queueTotalSize}function ut(e){var r=e._controlledReadableStream._state
return!e._closeRequested&&"readable"===r}function lt(e,r,t,o,n,i,a){r._controlledReadableStream=e,r._queue=void 0,r._queueTotalSize=void 0,pe(r),r._started=!1,r._closeRequested=!1,r._pullAgain=!1,r._pulling=!1,r._strategySizeAlgorithm=a,r._strategyHWM=i,r._pullAlgorithm=o,r._cancelAlgorithm=n,e._readableStreamController=r,p(d(t()),(function(){r._started=!0,et(r)}),(function(e){it(r,e)}))}function st(e){return new TypeError("ReadableStreamDefaultController.prototype."+e+" can only be used on a ReadableStreamDefaultController")}function ct(e,r,t){return L(e,t),function(t){return w(e,r,[t])}}function dt(e,r,t){return L(e,t),function(t){return w(e,r,[t])}}function ft(e,r,t){return L(e,t),function(t){return g(e,r,[t])}}function bt(e,r){if("bytes"!=(e=""+e))throw new TypeError(r+" '"+e+"' is not a valid enumeration value for ReadableStreamType")
return e}function pt(e,r){if("byob"!=(e=""+e))throw new TypeError(r+" '"+e+"' is not a valid enumeration value for ReadableStreamReaderMode")
return e}function _t(e,r){F(e,r)
var t=null==e?void 0:e.preventAbort,o=null==e?void 0:e.preventCancel,n=null==e?void 0:e.preventClose,i=null==e?void 0:e.signal
return void 0!==i&&function(e,r){if(!function(e){if("object"!=typeof e||null===e)return!1
try{return"boolean"==typeof e.aborted}catch(K){return!1}}(e))throw new TypeError(r+" is not an AbortSignal.")}(i,r+" has member 'signal' that"),{preventAbort:Boolean(t),preventCancel:Boolean(o),preventClose:Boolean(n),signal:i}}Object.defineProperties(Zr.prototype,{close:{enumerable:!0},enqueue:{enumerable:!0},error:{enumerable:!0},desiredSize:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(Zr.prototype,r.toStringTag,{value:"ReadableStreamDefaultController",configurable:!0})
var ht=function(){function e(e,r){void 0===e&&(e={}),void 0===r&&(r={}),void 0===e?e=null:M(e,"First parameter")
var t=Ze(r,"Second parameter"),o=function(e,r){F(e,r)
var t=e,o=null==t?void 0:t.autoAllocateChunkSize,n=null==t?void 0:t.cancel,i=null==t?void 0:t.pull,a=null==t?void 0:t.start,u=null==t?void 0:t.type
return{autoAllocateChunkSize:void 0===o?void 0:Y(o,r+" has member 'autoAllocateChunkSize' that"),cancel:void 0===n?void 0:ct(n,t,r+" has member 'cancel' that"),pull:void 0===i?void 0:dt(i,t,r+" has member 'pull' that"),start:void 0===a?void 0:ft(a,t,r+" has member 'start' that"),type:void 0===u?void 0:bt(u,r+" has member 'type' that")}}(e,"First parameter")
if(mt(this),"bytes"===o.type){if(void 0!==t.size)throw new RangeError("The strategy for a byte stream cannot have a size function");(function(e,r,t){var o=Object.create(he.prototype),n=function(){},i=function(){return d(void 0)},a=function(){return d(void 0)}
void 0!==r.start&&(n=function(){return r.start(o)}),void 0!==r.pull&&(i=function(){return r.pull(o)}),void 0!==r.cancel&&(a=function(e){return r.cancel(e)})
var u=r.autoAllocateChunkSize
if(0===u)throw new TypeError("autoAllocateChunkSize must be greater than 0")
Me(e,o,n,i,a,t,u)})(this,o,Je(t,0))}else{var n=Ke(t);(function(e,r,t,o){var n=Object.create(Zr.prototype),i=function(){},a=function(){return d(void 0)},u=function(){return d(void 0)}
void 0!==r.start&&(i=function(){return r.start(n)}),void 0!==r.pull&&(a=function(){return r.pull(n)}),void 0!==r.cancel&&(u=function(e){return r.cancel(e)}),lt(e,n,i,a,u,t,o)})(this,o,Je(t,1),n)}}return Object.defineProperty(e.prototype,"locked",{get:function(){if(!gt(this))throw Pt("locked")
return wt(this)},enumerable:!1,configurable:!0}),e.prototype.cancel=function(e){return void 0===e&&(e=void 0),gt(this)?wt(this)?f(new TypeError("Cannot cancel a stream that already has a reader")):St(this,e):f(Pt("cancel"))},e.prototype.getReader=function(e){if(void 0===e&&(e=void 0),!gt(this))throw Pt("getReader")
return void 0===function(e,r){F(e,r)
var t=null==e?void 0:e.mode
return{mode:void 0===t?void 0:pt(t,r+" has member 'mode' that")}}(e,"First parameter").mode?V(this):Ne(this)},e.prototype.pipeThrough=function(e,r){if(void 0===r&&(r={}),!gt(this))throw Pt("pipeThrough")
D(e,1,"pipeThrough")
var t=function(e,r){F(e,r)
var t=null==e?void 0:e.readable
x(t,"readable","ReadableWritablePair"),H(t,r+" has member 'readable' that")
var o=null==e?void 0:e.writable
return x(o,"writable","ReadableWritablePair"),nr(o,r+" has member 'writable' that"),{readable:t,writable:o}}(e,"First parameter"),o=_t(r,"Second parameter")
if(wt(this))throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream")
if(cr(t.writable))throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream")
return y(Kr(this,t.writable,o.preventClose,o.preventAbort,o.preventCancel,o.signal)),t.readable},e.prototype.pipeTo=function(e,r){if(void 0===r&&(r={}),!gt(this))return f(Pt("pipeTo"))
if(void 0===e)return f("Parameter 1 is required in 'pipeTo'.")
if(!sr(e))return f(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"))
var t
try{t=_t(r,"Second parameter")}catch(o){return f(o)}return wt(this)?f(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")):cr(e)?f(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")):Kr(this,e,t.preventClose,t.preventAbort,t.preventCancel,t.signal)},e.prototype.tee=function(){if(!gt(this))throw Pt("tee")
return le(function(e,r){return ve(e._readableStreamController)?function(e){var r,t,o,n,i,a=V(e),u=!1,l=!1,s=!1,f=!1,b=!1,p=c((function(e){i=e}))
function _(e){h(e._closedPromise,(function(r){e===a&&(ze(o._readableStreamController,r),ze(n._readableStreamController,r),f&&b||i(void 0))}))}function v(){Ue(a)&&(P(a),_(a=V(e))),re(a,{_chunkSteps:function(r){m((function(){l=!1,s=!1
var t=r,a=r
if(!f&&!b)try{a=de(r)}catch(c){return ze(o._readableStreamController,c),ze(n._readableStreamController,c),void i(St(e,c))}f||Ae(o._readableStreamController,t),b||Ae(n._readableStreamController,a),u=!1,l?g():s&&w()}))},_closeSteps:function(){u=!1,f||We(o._readableStreamController),b||We(n._readableStreamController),o._readableStreamController._pendingPullIntos.length>0&&Fe(o._readableStreamController,0),n._readableStreamController._pendingPullIntos.length>0&&Fe(n._readableStreamController,0),f&&b||i(void 0)},_errorSteps:function(){u=!1}})}function y(r,t){ee(a)&&(P(a),_(a=Ne(e)))
var c=t?n:o,d=t?o:n
Ge(a,r,{_chunkSteps:function(r){m((function(){l=!1,s=!1
var o=t?b:f
if(t?f:b)o||Le(c._readableStreamController,r)
else{var n=void 0
try{n=de(r)}catch(a){return ze(c._readableStreamController,a),ze(d._readableStreamController,a),void i(St(e,a))}o||Le(c._readableStreamController,r),Ae(d._readableStreamController,n)}u=!1,l?g():s&&w()}))},_closeSteps:function(e){u=!1
var r=t?b:f,o=t?f:b
r||We(c._readableStreamController),o||We(d._readableStreamController),void 0!==e&&(r||Le(c._readableStreamController,e),!o&&d._readableStreamController._pendingPullIntos.length>0&&Fe(d._readableStreamController,0)),r&&o||i(void 0)},_errorSteps:function(){u=!1}})}function g(){if(u)return l=!0,d(void 0)
u=!0
var e=Be(o._readableStreamController)
return null===e?v():y(e._view,!1),d(void 0)}function w(){if(u)return s=!0,d(void 0)
u=!0
var e=Be(n._readableStreamController)
return null===e?v():y(e._view,!0),d(void 0)}function S(){}return o=yt(S,g,(function(o){if(f=!0,r=o,b){var n=le([r,t]),a=St(e,n)
i(a)}return p})),n=yt(S,w,(function(o){if(b=!0,t=o,f){var n=le([r,t]),a=St(e,n)
i(a)}return p})),_(a),[o,n]}(e):function(e,r){var t,o,n,i,a,u=V(e),l=!1,s=!1,f=!1,b=!1,p=c((function(e){a=e}))
function _(){return l?(s=!0,d(void 0)):(l=!0,re(u,{_chunkSteps:function(e){m((function(){s=!1
var r=e,t=e
f||nt(n._readableStreamController,r),b||nt(i._readableStreamController,t),l=!1,s&&_()}))},_closeSteps:function(){l=!1,f||ot(n._readableStreamController),b||ot(i._readableStreamController),f&&b||a(void 0)},_errorSteps:function(){l=!1}}),d(void 0))}function v(){}return n=vt(v,_,(function(r){if(f=!0,t=r,b){var n=le([t,o]),i=St(e,n)
a(i)}return p})),i=vt(v,_,(function(r){if(b=!0,o=r,f){var n=le([t,o]),i=St(e,n)
a(i)}return p})),h(u._closedPromise,(function(e){it(n._readableStreamController,e),it(i._readableStreamController,e),f&&b||a(void 0)})),[n,i]}(e)}(this))},e.prototype.values=function(e){if(void 0===e&&(e=void 0),!gt(this))throw Pt("values")
var r,t,o,n
return this,r=function(e,r){F(e,"First parameter")
var t=null==e?void 0:e.preventCancel
return{preventCancel:Boolean(t)}}(e).preventCancel,t=V(this),o=new oe(t,r),(n=Object.create(ne))._asyncIteratorImpl=o,n},e}()
function vt(e,r,t,o,n){void 0===o&&(o=1),void 0===n&&(n=function(){return 1})
var i=Object.create(ht.prototype)
return mt(i),lt(i,Object.create(Zr.prototype),e,r,t,o,n),i}function yt(e,r,t){var o=Object.create(ht.prototype)
return mt(o),Me(o,Object.create(he.prototype),e,r,t,0,void 0),o}function mt(e){e._state="readable",e._reader=void 0,e._storedError=void 0,e._disturbed=!1}function gt(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_readableStreamController")&&e instanceof ht}function wt(e){return void 0!==e._reader}function St(e,r){if(e._disturbed=!0,"closed"===e._state)return d(void 0)
if("errored"===e._state)return f(e._storedError)
Rt(e)
var o=e._reader
return void 0!==o&&Ue(o)&&(o._readIntoRequests.forEach((function(e){e._closeSteps(void 0)})),o._readIntoRequests=new S),v(e._readableStreamController[A](r),t)}function Rt(e){e._state="closed"
var r=e._reader
void 0!==r&&(j(r),ee(r)&&(r._readRequests.forEach((function(e){e._closeSteps()})),r._readRequests=new S))}function Tt(e,r){e._state="errored",e._storedError=r
var t=e._reader
void 0!==t&&(O(t,r),ee(t)?(t._readRequests.forEach((function(e){e._errorSteps(r)})),t._readRequests=new S):(t._readIntoRequests.forEach((function(e){e._errorSteps(r)})),t._readIntoRequests=new S))}function Pt(e){return new TypeError("ReadableStream.prototype."+e+" can only be used on a ReadableStream")}function qt(e,r){F(e,r)
var t=null==e?void 0:e.highWaterMark
return x(t,"highWaterMark","QueuingStrategyInit"),{highWaterMark:N(t)}}Object.defineProperties(ht.prototype,{cancel:{enumerable:!0},getReader:{enumerable:!0},pipeThrough:{enumerable:!0},pipeTo:{enumerable:!0},tee:{enumerable:!0},values:{enumerable:!0},locked:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(ht.prototype,r.toStringTag,{value:"ReadableStream",configurable:!0}),"symbol"==typeof r.asyncIterator&&Object.defineProperty(ht.prototype,r.asyncIterator,{value:ht.prototype.values,writable:!0,configurable:!0})
var Ct=function(e){return e.byteLength}
try{Object.defineProperty(Ct,"name",{value:"size",configurable:!0})}catch(K){}var Et=function(){function e(e){D(e,1,"ByteLengthQueuingStrategy"),e=qt(e,"First parameter"),this._byteLengthQueuingStrategyHighWaterMark=e.highWaterMark}return Object.defineProperty(e.prototype,"highWaterMark",{get:function(){if(!jt(this))throw Ot("highWaterMark")
return this._byteLengthQueuingStrategyHighWaterMark},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){if(!jt(this))throw Ot("size")
return Ct},enumerable:!1,configurable:!0}),e}()
function Ot(e){return new TypeError("ByteLengthQueuingStrategy.prototype."+e+" can only be used on a ByteLengthQueuingStrategy")}function jt(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_byteLengthQueuingStrategyHighWaterMark")&&e instanceof Et}Object.defineProperties(Et.prototype,{highWaterMark:{enumerable:!0},size:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(Et.prototype,r.toStringTag,{value:"ByteLengthQueuingStrategy",configurable:!0})
var kt=function(){return 1}
try{Object.defineProperty(kt,"name",{value:"size",configurable:!0})}catch(K){}var Wt=function(){function e(e){D(e,1,"CountQueuingStrategy"),e=qt(e,"First parameter"),this._countQueuingStrategyHighWaterMark=e.highWaterMark}return Object.defineProperty(e.prototype,"highWaterMark",{get:function(){if(!zt(this))throw At("highWaterMark")
return this._countQueuingStrategyHighWaterMark},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){if(!zt(this))throw At("size")
return kt},enumerable:!1,configurable:!0}),e}()
function At(e){return new TypeError("CountQueuingStrategy.prototype."+e+" can only be used on a CountQueuingStrategy")}function zt(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_countQueuingStrategyHighWaterMark")&&e instanceof Wt}function Bt(e,r,t){return L(e,t),function(t){return w(e,r,[t])}}function It(e,r,t){return L(e,t),function(t){return g(e,r,[t])}}function Ft(e,r,t){return L(e,t),function(t,o){return w(e,r,[t,o])}}Object.defineProperties(Wt.prototype,{highWaterMark:{enumerable:!0},size:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(Wt.prototype,r.toStringTag,{value:"CountQueuingStrategy",configurable:!0})
var Lt=function(){function e(e,r,t){void 0===e&&(e={}),void 0===r&&(r={}),void 0===t&&(t={}),void 0===e&&(e=null)
var o=Ze(r,"Second parameter"),n=Ze(t,"Third parameter"),i=function(e,r){F(e,r)
var t=null==e?void 0:e.flush,o=null==e?void 0:e.readableType,n=null==e?void 0:e.start,i=null==e?void 0:e.transform,a=null==e?void 0:e.writableType
return{flush:void 0===t?void 0:Bt(t,e,r+" has member 'flush' that"),readableType:o,start:void 0===n?void 0:It(n,e,r+" has member 'start' that"),transform:void 0===i?void 0:Ft(i,e,r+" has member 'transform' that"),writableType:a}}(e,"First parameter")
if(void 0!==i.readableType)throw new RangeError("Invalid readableType specified")
if(void 0!==i.writableType)throw new RangeError("Invalid writableType specified")
var a,u=Je(n,0),l=Ke(n),s=Je(o,1),b=Ke(o);(function(e,r,t,o,n,i){function a(){return r}e._writable=function(e,r,t,o,n,i){void 0===n&&(n=1),void 0===i&&(i=function(){return 1})
var a=Object.create(ar.prototype)
return lr(a),Er(a,Object.create(qr.prototype),e,r,t,o,n,i),a}(a,(function(r){return function(e,r){var t=e._transformStreamController
return e._backpressure?v(e._backpressureChangePromise,(function(){var o=e._writable
if("erroring"===o._state)throw o._storedError
return Ut(t,r)})):Ut(t,r)}(e,r)}),(function(){return function(e){var r=e._readable,t=e._transformStreamController,o=t._flushAlgorithm()
return Ht(t),v(o,(function(){if("errored"===r._state)throw r._storedError
ot(r._readableStreamController)}),(function(t){throw Dt(e,t),r._storedError}))}(e)}),(function(r){return function(e,r){return Dt(e,r),d(void 0)}(e,r)}),t,o),e._readable=vt(a,(function(){return function(e){return Nt(e,!1),e._backpressureChangePromise}(e)}),(function(r){return xt(e,r),d(void 0)}),n,i),e._backpressure=void 0,e._backpressureChangePromise=void 0,e._backpressureChangePromise_resolve=void 0,Nt(e,!0),e._transformStreamController=void 0})(this,c((function(e){a=e})),s,b,u,l),function(e,r){var t=Object.create(Qt.prototype),o=function(e){try{return Vt(t,e),d(void 0)}catch(r){return f(r)}},n=function(){return d(void 0)}
void 0!==r.transform&&(o=function(e){return r.transform(e,t)}),void 0!==r.flush&&(n=function(){return r.flush(t)}),function(e,r,t,o){r._controlledTransformStream=e,e._transformStreamController=r,r._transformAlgorithm=t,r._flushAlgorithm=o}(e,t,o,n)}(this,i),void 0!==i.start?a(i.start(this._transformStreamController)):a(void 0)}return Object.defineProperty(e.prototype,"readable",{get:function(){if(!Mt(this))throw Xt("readable")
return this._readable},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"writable",{get:function(){if(!Mt(this))throw Xt("writable")
return this._writable},enumerable:!1,configurable:!0}),e}()
function Mt(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_transformStreamController")&&e instanceof Lt}function Dt(e,r){it(e._readable._readableStreamController,r),xt(e,r)}function xt(e,r){Ht(e._transformStreamController),Wr(e._writable._writableStreamController,r),e._backpressure&&Nt(e,!1)}function Nt(e,r){void 0!==e._backpressureChangePromise&&e._backpressureChangePromise_resolve(),e._backpressureChangePromise=c((function(r){e._backpressureChangePromise_resolve=r})),e._backpressure=r}Object.defineProperties(Lt.prototype,{readable:{enumerable:!0},writable:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(Lt.prototype,r.toStringTag,{value:"TransformStream",configurable:!0})
var Qt=function(){function e(){throw new TypeError("Illegal constructor")}return Object.defineProperty(e.prototype,"desiredSize",{get:function(){if(!Yt(this))throw Gt("desiredSize")
return at(this._controlledTransformStream._readable._readableStreamController)},enumerable:!1,configurable:!0}),e.prototype.enqueue=function(e){if(void 0===e&&(e=void 0),!Yt(this))throw Gt("enqueue")
Vt(this,e)},e.prototype.error=function(e){if(void 0===e&&(e=void 0),!Yt(this))throw Gt("error")
var r
r=e,Dt(this._controlledTransformStream,r)},e.prototype.terminate=function(){if(!Yt(this))throw Gt("terminate");(function(e){var r=e._controlledTransformStream
ot(r._readable._readableStreamController),xt(r,new TypeError("TransformStream terminated"))})(this)},e}()
function Yt(e){return!!n(e)&&!!Object.prototype.hasOwnProperty.call(e,"_controlledTransformStream")&&e instanceof Qt}function Ht(e){e._transformAlgorithm=void 0,e._flushAlgorithm=void 0}function Vt(e,r){var t=e._controlledTransformStream,o=t._readable._readableStreamController
if(!ut(o))throw new TypeError("Readable side is not in a state that permits enqueue")
try{nt(o,r)}catch(i){throw xt(t,i),t._readable._storedError}(function(e){return!rt(e)})(o)!==t._backpressure&&Nt(t,!0)}function Ut(e,r){return v(e._transformAlgorithm(r),void 0,(function(r){throw Dt(e._controlledTransformStream,r),r}))}function Gt(e){return new TypeError("TransformStreamDefaultController.prototype."+e+" can only be used on a TransformStreamDefaultController")}function Xt(e){return new TypeError("TransformStream.prototype."+e+" can only be used on a TransformStream")}Object.defineProperties(Qt.prototype,{enqueue:{enumerable:!0},error:{enumerable:!0},terminate:{enumerable:!0},desiredSize:{enumerable:!0}}),"symbol"==typeof r.toStringTag&&Object.defineProperty(Qt.prototype,r.toStringTag,{value:"TransformStreamDefaultController",configurable:!0}),e.ByteLengthQueuingStrategy=Et,e.CountQueuingStrategy=Wt,e.ReadableByteStreamController=he,e.ReadableStream=ht,e.ReadableStreamBYOBReader=Ve,e.ReadableStreamBYOBRequest=_e,e.ReadableStreamDefaultController=Zr,e.ReadableStreamDefaultReader=$,e.TransformStream=Lt,e.TransformStreamDefaultController=Qt,e.WritableStream=ar,e.WritableStreamDefaultController=qr,e.WritableStreamDefaultWriter=mr,Object.defineProperty(e,"__esModule",{value:!0})}))
