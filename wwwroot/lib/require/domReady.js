/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */

(function(e){e(["require","exports","module"],function(e,t,n){function l(e){var t;for(t=0;t<e.length;t+=1)e[t](a)}function c(){var e=f;u&&e.length&&(f=[],l(e))}function h(){u||(u=!0,s&&clearInterval(s),c())}function d(e){return u?e(a):f.push(e),d}var r,i,s,o=typeof window!="undefined"&&window.document,u=!o,a=o?document:null,f=[];if(o){if(document.addEventListener)document.addEventListener("DOMContentLoaded",h,!1),window.addEventListener("load",h,!1);else if(window.attachEvent){window.attachEvent("onload",h),i=document.createElement("div");try{r=window.frameElement===null}catch(p){}i.doScroll&&r&&window.external&&(s=setInterval(function(){try{i.doScroll(),h()}catch(e){}},30))}document.readyState==="complete"&&h()}return d.version="2.0.1",d.load=function(e,t,n,r){r.isBuild?n(null):d(n)},d})})(typeof define=="function"?define:function(e){e(require,exports,module)});