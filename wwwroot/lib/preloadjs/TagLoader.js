/*
* TagLoader
* Visit http://createjs.com/ for documentation, updates and examples.
*
*
* Copyright (c) 2012 gskinner.com, inc.
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

this.createjs=this.createjs||{},function(){var e=function(e,t){this.init(e,t)},t=e.prototype=new createjs.AbstractLoader;t._loadTimeout=null,t._tagCompleteProxy=null,t._isAudio=!1,t._tag=null,t._jsonResult=null,t.init=function(e,t){this._item=e,this._basePath=t,this._tag=e.tag,this._isAudio=window.HTMLAudioElement&&e.tag instanceof HTMLAudioElement,this._tagCompleteProxy=createjs.proxy(this._handleLoad,this)},t.getResult=function(){return this._item.type==createjs.LoadQueue.JSONP?this._jsonResult:this._tag},t.cancel=function(){this.canceled=!0,this._clean();var e=this.getItem()},t.load=function(){var e=this._item,t=this._tag;clearTimeout(this._loadTimeout),this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),createjs.LoadQueue.LOAD_TIMEOUT),this._isAudio&&(t.src=null,t.preload="auto"),t.onerror=createjs.proxy(this._handleError,this),this._isAudio?(t.onstalled=createjs.proxy(this._handleStalled,this),t.addEventListener("canplaythrough",this._tagCompleteProxy,!1)):(t.onload=createjs.proxy(this._handleLoad,this),t.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this));var n=this.buildPath(e.src,this._basePath,e.values);switch(e.type){case createjs.LoadQueue.CSS:t.href=n;break;case createjs.LoadQueue.SVG:t.data=n;break;default:t.src=n}if(e.type==createjs.LoadQueue.JSONP){if(e.callback==null)throw new Error("callback is required for loading JSONP requests.");if(window[e.callback]!=null)throw new Error('JSONP callback "'+e.callback+'" already exists on window. You need to specify a different callback. Or re-name the current one.');window[e.callback]=createjs.proxy(this._handleJSONPLoad,this)}if(e.type==createjs.LoadQueue.SVG||e.type==createjs.LoadQueue.JSONP||e.type==createjs.LoadQueue.JSON||e.type==createjs.LoadQueue.JAVASCRIPT||e.type==createjs.LoadQueue.CSS)this._startTagVisibility=t.style.visibility,t.style.visibility="hidden",(document.body||document.getElementsByTagName("body")[0]).appendChild(t);t.load!=null&&t.load()},t._handleJSONPLoad=function(e){this._jsonResult=e},t._handleTimeout=function(){this._clean(),this._sendError({reason:"PRELOAD_TIMEOUT"})},t._handleStalled=function(){},t._handleError=function(){this._clean(),this._sendError()},t._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var e=this.getItem().tag;(e.readyState=="loaded"||e.readyState=="complete")&&this._handleLoad()},t._handleLoad=function(e){if(this._isCanceled())return;var t=this.getItem(),n=t.tag;if(this.loaded||this.isAudio&&n.readyState!==4)return;this.loaded=!0;switch(t.type){case createjs.LoadQueue.SVG:case createjs.LoadQueue.JSONP:n.style.visibility=this._startTagVisibility,(document.body||document.getElementsByTagName("body")[0]).removeChild(n);break;default:}this._clean(),this._sendComplete()},t._clean=function(){clearTimeout(this._loadTimeout);var e=this.getItem().tag;e.onload=null,e.removeEventListener&&e.removeEventListener("canplaythrough",this._tagCompleteProxy,!1),e.onstalled=null,e.onprogress=null,e.onerror=null,e.parentNode&&e.parentNode.removeChild(e);var t=this.getItem();t.type==createjs.LoadQueue.JSONP&&(window[t.callback]=null)},t.toString=function(){return"[PreloadJS TagLoader]"},createjs.TagLoader=e}();