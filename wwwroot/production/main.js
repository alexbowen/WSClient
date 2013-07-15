function titleComplete(){$("#content-wrapper").css("display","block"),TweenMax.to($("#content-wrapper"),.75,{css:{opacity:1},ease:Quad.easeOut}),$("#ufoContainer").css("display","block"),$("#cow").css("display","block"),$("#beam").css("display","block"),TweenMax.to($("#bg"),2,{css:{opacity:1},ease:Quad.easeOut}),application.client.getData().state===1?(flyOn(),TweenMax.to($(".farmlights"),0,{css:{visibility:"visible",display:"block"},delay:6}),getPage(0)):($("#cow").remove(),flyOff(),transitionBackground(1,-1,-1))}function ufoDraggable(e){e?ufoIsDraggable()&&$("#ufoContainer").draggable("destroy"):ufoIsDraggable()||$("#ufoContainer").draggable({cancel:".disabled",containment:"#content-wrapper",scroll:!1,drag:dragUfo,stop:snapUfo})}function ufoIsDraggable(){return!!$("#ufoContainer").hasClass("ui-draggable")}function ufoComplete(){ufoDraggable(auth),ufoready=!0,pageRetrieved&&($("#typewriterText").css("visibility","visible"),TweenMax.from($("#typewriterText"),.5,{css:{opacity:0,left:"155px"},delay:.25})),$("#cow").css({display:"none",opacity:0}),$("#cow").remove(),$("#menu li").each(function(e){$(this).css("display","inline-block");var t=Math.floor(Math.random())+.5,n=getRandom(20);TweenMax.from($(this),t,{css:{margin:n+"px",opacity:0},ease:Back.easeInOut,delay:.2})}),$("#menu").on("click","li.enabled",function(e){e.preventDefault();var t=parseInt($(this).attr("id").substring(4))-1,n=parseInt($("#menu li.selected").attr("id").substring(4))-1,r=n-t,i=n<t?-1:1;$("#menu li.selected").addClass("enabled"),$("#menu li.selected").removeClass("selected"),$(this).addClass("selected"),$(this).removeClass("enabled"),TweenMax.killTweensOf($("#ufoContainer")),hideText(n),transitionBackground(t,i,r)})}function transitionBackground(e,t,n){(new TimelineLite).add([TweenMax.to($("#beam"),.5,{css:{opacity:0},delay:.2}),TweenMax.to($("#ufoContainer"),1.5,{css:{scaleX:.5,scaleY:.5,rotation:-1*t*20},ease:Power3.easeOut}),TweenMax.to($("#ufoContainer"),1.5,{bezier:[{left:$("#ufoContainer").css("left"),top:$("#ufoContainer").css("top")},{left:730,top:160},{left:780,top:20}],ease:Power3.easeOut}),TweenMax.to($("#hills"),1.5,{css:{backgroundPosition:-100*e+"px 390px"},ease:Power3.easeOut}),TweenMax.to($("#treeline"),1.5,{css:{backgroundPosition:-300*e+"px 400px"},ease:Power3.easeOut}),TweenMax.to($("#fence"),1.5,{css:{backgroundPosition:-700*e+"px 430px"},ease:Power3.easeOut}),TweenMax.to($("#trees"),1.5,{css:{left:parseInt($("#trees").css("left"))+n*700+"px"},ease:Power3.easeOut}),TweenMax.to($("#foreground"),1.5,{css:{backgroundPosition:-900*e+"px 440px"},ease:Power3.easeOut}),TweenMax.to($("#farm"),1.5,{css:{left:parseInt($("#farm").css("left"))+n*900+"px"},ease:Power3.easeOut,onComplete:showPage,onCompleteParams:[e]})]).add([TweenMax.to($("#ufoContainer"),1,{css:{scaleX:1,scaleY:1,rotation:0},delay:-0.5,ease:Power3.easeOut}),TweenMax.to($("#ufoContainer"),1,{bezier:[{left:780,top:60},{left:720,top:60}],delay:-0.5,ease:Power3.easeOut})]).add([TweenMax.to($("#beam"),1,{css:{opacity:1},delay:.5,ease:Power3.easeOut}),TweenMax.to($("#ufoContainer"),1,{css:{left:720,top:60},delay:.5,ease:Power3.easeOut,onComplete:hoverUfo})])}function hideText(e){TweenMax.to($("#page"+e),.25,{css:{opacity:0,scaleX:.2,scaleY:.2},ease:Power3.easeOut,onComplete:function(){$("#page"+e).css("visibility","hidden")}})}function showPage(e){$("#page"+e).css("visibility","visible"),TweenMax.fromTo($("#page"+e),.4,{css:{opacity:0,scaleX:2,scaleY:2}},{css:{opacity:1,scaleX:1,scaleY:1},ease:Back.easeOut})}function showInstructions(){$("#instructions").css("visibility","visible"),TweenMax.fromTo($("#instructions"),.4,{css:{opacity:0,scaleX:2,scaleY:2}},{css:{opacity:1,scaleX:1,scaleY:1},ease:Back.easeOut})}function getPage(e){pageRetrieved=!0}function hoverUfo(){if($("#ufoContainer").length===0)return;var e=$("#ufoContainer").position().left,t=$("#ufoContainer").position().left+getRandom(4),n=$("#ufoContainer").position().top,r=$("#ufoContainer").position().top+getRandom(8)+4;(new TimelineMax({repeat:-1,onRepeat:checkSpeech})).add([TweenMax.to($("#ufoContainer"),.75,{bezier:[{left:e,top:n},{left:t,top:r}],ease:Back.easeIn}),TweenMax.to($("#ufoContainer"),1,{bezier:[{left:t,top:r},{left:e,top:n}],delay:.75,ease:Back.easeIn})])}function checkSpeech(){if(!showingSpeech){switch(speechState){case 0:$("#speech").html("throw me");break;case 1:$("#speech").html("ow ow ow!!"),speechState=2;break;case 2:$("#speech").html("log on to<br/>a different browser"),$("#speech").css("margin","28px 0 0 0");break;case 3:$("#speech").html("now throw me"),$("#speech").css("margin","38px 0")}$("#speechBubble").css("visibility","visible"),$("#speechBubble").css("display","block"),showingSpeech=!0,TweenMax.fromTo($("#speechBubble"),.4,{css:{opacity:0}},{css:{opacity:1},delay:2,ease:Sine.easeOut,onComplete:killSpeech,onCompleteParams:[2]})}}function killSpeech(e){TweenMax.killTweensOf($("#speechBubble")),TweenMax.to($("#speechBubble"),.4,{css:{opacity:0},delay:e,ease:Power3.easeOut,onComplete:function(){showingSpeech=!1}})}function killBeam(){TweenMax.killTweensOf($("#ufoContainer")),TweenMax.to($("#beam"),.5,{css:{opacity:0},delay:.1,ease:Power3.easeOut,onComplete:function(){$("#beam").css("visibility","hidden")}})}function dragUfo(){killSpeech(0),killBeam()}function snapUfo(){speechState=1,TweenMax.killTweensOf($("#beam")),$("#beam").css("visibility","visible"),TweenMax.to($("#beam"),1,{css:{opacity:1},delay:.5,ease:Power3.easeOut}),TweenMax.to($("#ufoContainer"),1,{css:{left:710,top:20},ease:Elastic.easeOut,onComplete:hoverUfo})}function flyOn(){(new TimelineLite).add([TweenMax.to($("#ufoContainer"),.5,{css:{opacity:1},delay:1}),TweenMax.to($("#ufo"),1,{css:{backgroundPosition:"-255px 0px"},ease:SteppedEase.config(1),repeat:3}),TweenMax.from($("#ufoContainer"),2,{css:{scaleX:.2,scaleY:.2,rotation:30},delay:1,ease:Power3.easeOut}),TweenMax.to($("#ufoContainer"),2,{bezier:[{left:10,top:150},{left:400,top:160},{left:600,top:80},{left:710,top:20}],delay:1,ease:Power3.easeOut})]).add([TweenMax.to($("#ufo"),.3,{css:{backgroundPosition:"-765px 0px"},delay:-1,ease:SteppedEase.config(1),repeat:3,onComplete:hoverUfo})]).add([TweenMax.to($("#beam"),.5,{css:{opacity:1},delay:.2}),TweenMax.to($("#ufo"),1,{css:{backgroundPosition:"-510px 0px"},delay:.1,ease:SteppedEase.config(1),repeat:-1}),TweenMax.to($("#cow"),0,{css:{opacity:1},delay:.5}),TweenMax.to($("#cow"),1.5,{css:{scaleX:.5,scaleY:.5,top:"100px",left:"800px",rotation:-10},delay:.5,ease:Power1.easeOut,onComplete:ufoComplete})])}function flyOff(){$("#ufoContainer").remove()}function getRandom(e){var t=Math.random()<.5?-1:1;return Math.floor(Math.random()*e*t)}var pageRetrieved=!1,ufoready=!1,speechState=0,showingSpeech=!1;$("#loader").css("display","none"),$("#intro").css("visibility","visible"),$("#menu").css("visibility","visible"),$("[id^=page]").css("visibility","hidden"),$("#typewriterText").css("visibility","hidden"),$("#content-wrapper").css("display","none"),$("#ufoContainer").css("display","none"),$("#cow").css("display","none"),$("#beam").css("display","none"),$("#menu li").css("display","none"),$("#title-line1").lettering(),$("#title-line2").lettering(),(new TimelineLite({onComplete:titleComplete})).add([TweenMax.from($("#title-line1 .char1"),.75+Math.random(),{css:{top:"-200px",right:"800px"},ease:Elastic.easeOut}),TweenMax.from($("#title-line1 .char2"),.75+Math.random(),{css:{top:"300px",right:"800px"},ease:Elastic.easeOut}),TweenMax.from($("#title-line1 .char3"),.75+Math.random(),{css:{top:"-400px",right:"800px"},ease:Elastic.easeOut}),TweenMax.from($("#title-line2 .char1"),.75+Math.random(),{css:{top:"200px",right:"800px"},ease:Elastic.easeOut}),TweenMax.from($("#title-line2 .char2"),.75+Math.random(),{css:{top:"100px",right:"800px"},ease:Elastic.easeOut}),TweenMax.from($("#title-line2 .char3"),.75+Math.random(),{css:{top:"-100px",right:"800px"},ease:Elastic.easeOut})]).add([TweenMax.from($("#title-line1"),.35,{css:{fontSize:"140px",left:"100px",top:"285px"},delay:0,ease:Quad.easeOut}),TweenMax.from($("#title-line2"),.35,{css:{fontSize:"140px",left:"400px",top:"28px"},delay:0,ease:Quad.easeOut})]),$(window).on("clients-paired",function(){application.client.getData().state===1&&($("#cow").remove(),flyOff(),transitionBackground(1,-1,-1),speechState=3)}),$(window).on("auth-success",function(){auth=!0,ufoDraggable(auth)}),$(window).on("auth-failiure",function(){auth=!1,ufoDraggable(auth)});