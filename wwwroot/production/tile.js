define("tile",[],function(){var e=function(e){this.config=e};return e.prototype={canMove:null,velocity:null,cache:null,$element:null,config:null,create:function(e,t,n,r,i){var s=this;this.config=e,$(document).unbind(),this.$element=$(this.config.selector),this.$element.css("top",arguments.length<=1?this.config.pageX:n/100*window.innerHeight+"px"),this.$element.css("left",arguments.length<=1?this.config.pageY:t/100*window.innerWidth+"px"),i&&this.animateLoop(r,i),this.setUpEvents()},setUpEvents:function(){var e=this;this.$element.mousedown(function(t){e.startAction()}),$(document).mousemove(function(t){e.moveAction(t.pageX,t.pageY)}),$(document).mouseup(function(t){e.stopAction(t.pageX,t.pageY)}),"ontouchstart"in document.documentElement&&(this.$element.touchstart(function(t){e.startAction()}),$(document).touchmove(function(t){e.moveAction(t.originalEvent.touches[0].pageX,t.originalEvent.touches[0].pageY)}),$(document).touchend(function(t){e.stopAction(t.originalEvent.changedTouches[0].pageX,t.originalEvent.changedTouches[0].pageY)}),document.body.addEventListener("touchmove",function(e){e.preventDefault()},!1))},startAction:function(){tile.config.mousedown&&tile.config.mousedown(),tile.mousedown=!0,tile.mousemove=!1},moveAction:function(e,t){var n=this;n.mousemove=!0,n.mousedown===!0&&(n.cache||(n.cache={offsetX:e-n.$element[0].offsetLeft,offsetY:t-n.$element[0].offsetTop,pageX:e,pageY:t,time:(new Date).getTime()}),n.move(e-n.cache.offsetX,t-n.cache.offsetY))},stopAction:function(e,t){tile.mousedown=!1,tile.animateLoop({pageX:e,pageY:t})},destroy:function(){this.$element.remove()},move:function(e,t){this.$element.css({left:e+"px",top:t+"px"})},atYBound:function(){return this.getPixelsFromBound("top")>window.innerHeight||this.getPixelsFromBound("top")<0},atXBound:function(){return this.getPixelsFromBound("left")>window.innerWidth||this.getPixelsFromBound("left")<0},getPixelsFromBound:function(e,t){var n=arguments.length===1?this.$element:t;return parseInt(n.css(e),10)},animateLoop:function(e,t){var n=this,r,i,s,o,u,a,f,l;if(!n.mousemove)return;this.cache||(this.cache={pageX:0,pageY:0,time:(new Date).getTime()}),e&&(r={pageX:e.pageX-this.cache.pageX,pageY:e.pageY-this.cache.pageY},i={pageX:e.pageX>this.cache.pageX?1:-1,pageY:e.pageY>this.cache.pageY?1:-1}),r.total=Math.sqrt(Math.pow(r.pageX,2)+Math.pow(r.pageY,2)),time=((new Date).getTime()-this.cache.time)/1e3,t?this.velocity=t:this.velocity=r.total/time,s=20,o=setInterval(function(){u=Math.floor(n.velocity*(s/1e3)),n.move(n.getPixelsFromBound("left")+i.pageX*u*(Math.abs(r.pageX)/(Math.abs(r.pageX)+Math.abs(r.pageY))),n.getPixelsFromBound("top")+i.pageY*u*(Math.abs(r.pageY)/(Math.abs(r.pageX)+Math.abs(r.pageY)))),n.atXBound()&&(a=n.getPixelsFromBound("top"),l=n.getPixelsFromBound("left")<=0?100:0,n.config.render=n.config.render.toString(),f="tile.create("+JSON.stringify(n.config)+","+l+",("+a+" / window.innerHeight) * 100,"+JSON.stringify(r)+","+n.velocity+");",n.$element.trigger("dispatch",[{callback:f,render:n.config.render.toString(),html:n.config.html}]),n.destroy(),window.clearInterval(o)),n.atYBound()&&(a=n.getPixelsFromBound("left"),l=n.getPixelsFromBound("top")<=0?100:0,n.config.render=n.config.render.toString(),f="tile.create("+JSON.stringify(n.config)+",("+a+" / window.innerWidth) * 100, "+l+","+JSON.stringify(r)+","+n.velocity+");",n.$element.trigger("dispatch",[{callback:f,render:n.config.render.toString(),html:n.config.html}]),n.destroy(),window.clearInterval(o)),n.velocity=n.velocity/1.05,u<=1&&(n.velocity=0,window.clearInterval(o))},s),this.canMove=!1,this.cache=!1}},e});