/*
* EventDispatcher
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

this.createjs=this.createjs||{},function(){var e=function(){this.initialize()},t=e.prototype;e.initialize=function(e){e.addEventListener=t.addEventListener,e.removeEventListener=t.removeEventListener,e.removeAllEventListeners=t.removeAllEventListeners,e.hasEventListener=t.hasEventListener,e.dispatchEvent=t.dispatchEvent},t._listeners=null,t.initialize=function(){},t.addEventListener=function(e,t){var n=this._listeners;n?this.removeEventListener(e,t):n=this._listeners={};var r=n[e];return r||(r=n[e]=[]),r.push(t),t},t.removeEventListener=function(e,t){var n=this._listeners;if(!n)return;var r=n[e];if(!r)return;for(var i=0,s=r.length;i<s;i++)if(r[i]==t){s==1?delete n[e]:r.splice(i,1);break}},t.removeAllEventListeners=function(e){e?this._listeners&&delete this._listeners[e]:this._listeners=null},t.dispatchEvent=function(e,t){var n=!1,r=this._listeners;if(e&&r){typeof e=="string"&&(e={type:e});var i=r[e.type];if(!i)return n;e.target=t||this,i=i.slice();for(var s=0,o=i.length;s<o;s++){var u=i[s];u.handleEvent?n=n||u.handleEvent(e):n=n||u(e)}}return!!n},t.hasEventListener=function(e){var t=this._listeners;return!!t&&!!t[e]},t.toString=function(){return"[EventDispatcher]"},createjs.EventDispatcher=e}();