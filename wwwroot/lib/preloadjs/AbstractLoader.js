/*
* AbstractLoader
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

this.createjs=this.createjs||{},function(){var e=function(){this.init()};e.prototype={};var t=e.prototype,n=e;n.FILE_PATTERN=/^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/,t.loaded=!1,t.canceled=!1,t.progress=0,t._item=null,t._basePath=null,t.onProgress=null,t.onLoadStart=null,t.onComplete=null,t.onError=null,t.addEventListener=null,t.removeEventListener=null,t.removeAllEventListeners=null,t.dispatchEvent=null,t.hasEventListener=null,t._listeners=null,createjs.EventDispatcher.initialize(t),t.getItem=function(){return this._item},t.init=function(){},t.load=function(){},t.close=function(){},t._sendLoadStart=function(){if(this._isCanceled())return;this.onLoadStart&&this.onLoadStart({target:this}),this.dispatchEvent("loadStart"),this.dispatchEvent("loadstart")},t._sendProgress=function(e){if(this._isCanceled())return;var t=null;if(typeof e=="number")this.progress=e,t={loaded:this.progress,total:1};else{t=e,this.progress=e.loaded/e.total;if(isNaN(this.progress)||this.progress==Infinity)this.progress=0}t.target=this,t.type="progress",t.progress=this.progress,this.onProgress&&this.onProgress(t),this.dispatchEvent(t)},t._sendComplete=function(){if(this._isCanceled())return;this.onComplete&&this.onComplete({target:this}),this.dispatchEvent("complete")},t._sendError=function(e){if(this._isCanceled())return;e==null&&(e={}),e.target=this,e.type="error",this.onError&&this.onError(e),this.dispatchEvent(e)},t._isCanceled=function(){return window.createjs==null||this.canceled?!0:!1},t._parseURI=function(e){return e?e.match(n.FILE_PATTERN):null},t._formatQueryString=function(e,t){if(e==null)throw new Error("You must specify data.");var n=[];for(var r in e)n.push(r+"="+escape(e[r]));return t&&(n=n.concat(t)),n.join("&")},t.buildPath=function(e,t,n){if(t!=null){var r=this._parseURI(e);if(r[1]==null||r[1]=="")e=t+e}if(n==null)return e;var i=[],s=e.indexOf("?");if(s!=-1){var o=e.slice(s+1);i=i.concat(o.split("&"))}return s!=-1?e.slice(0,s)+"?"+this._formatQueryString(n,i):e+"?"+this._formatQueryString(n,i)},t.toString=function(){return"[PreloadJS AbstractLoader]"},createjs.AbstractLoader=e}();