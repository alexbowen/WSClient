/*
global $: false, console : false, s_gi : false
jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true,
undef:true, unused:true,curly:true, browser:true, indent:4, maxerr:50
*/

define('view/ufo', function () {

    var Ufo = function () {
        this.$container = $('#ufoContainer');
    };

    Ufo.prototype = {

        showingSpeech : false,

        speechState : 0,

        ufoready : false,

        auth : false,

        render : function () {

            var container = document.createElement('div');
            container.className = 'throw';
            container.style.position = 'absolute';
            container.width = 255;
            container.height = 140;

            var ufo = document.createElement('div');
            ufo.id = 'ufo';
            ufo.style.backgroundImage = '/static/images/ufo.png';
            ufo.style.position = 'absolute';
            ufo.width = 255;
            ufo.height = 140;
            container.appendChild(ufo);

            var beam = document.createElement('div');
            beam.id = 'beam';
            beam.style.backgroundImage = '/static/images/beam.png';
            beam.style.position = 'absolute';
            beam.style.opacity = 1;
            beam.width = 400;
            beam.height = 450;
            container.appendChild(beam);

            document.body.appendChild(container);
            $(container).append(arguments[1]);
        },

        hide : function () {
            this.$container.css('display', 'none');
        },

        show : function () {
            this.$container.css('display', 'block');
        },

        ufoDraggable : function () {
            if (!this.auth) {
                if (!this.ufoIsDraggable()) {
                    this.$container.draggable({
                        cancel: ".disabled",
                        containment: "#content-wrapper",
                        scroll: false,
                        drag: this.dragUfo,
                        stop: this.snapUfo
                    });
                }
            } else {
                if (this.ufoIsDraggable()) {
                    this.$container.draggable("destroy");
                }
            }
        },

        ufoIsDraggable : function () {
            return !!(this.$container.hasClass("ui-draggable"));
        },

        setAuth : function (auth) {
            this.auth = auth
        },

        hoverUfo : function () {

            if (this.$container.length === 0) {
                return;
            }

            var x1 = this.$container.position().left;
            var x2 = this.$container.position().left + this.getRandom(4);
            var y1 = this.$container.position().top;
            var y2 = this.$container.position().top + this.getRandom(8) + 4;
            new TimelineMax({ repeat: -1, onRepeat: this.checkSpeech, onRepeatScope: this }).add([
                TweenMax.to(this.$container, 0.75, { bezier: [{ left: x1, top: y1 }, { left: x2, top: y2 }], ease: Back.easeIn }),
                TweenMax.to(this.$container, 1, { bezier: [{ left: x2, top: y2 }, { left: x1, top: y1 }], delay: 0.75, ease: Back.easeIn })
            ]);
            
        },

        dragUfo : function () {
            this.killSpeech(0);
            this.killBeam();
        },

        snapUfo : function () {
            this.speechState = 1;
            TweenMax.killTweensOf($("#beam"));
            $("#beam").css('visibility', 'visible');
            TweenMax.to($('#beam'), 1, { css: { opacity: 1 }, delay: 0.5, ease: Power3.easeOut });
            TweenMax.to(this.$container, 1, { css: { left: 710, top: 20 }, ease: Elastic.easeOut, onComplete: hoverUfo });
        },

        flyOn : function () {
            console.log('fly on');
            new TimelineLite().add([
                    TweenMax.to($('#ufoContainer'), 0.5, { css: { opacity: 1 }, delay: 1 }),
                    TweenMax.to($("#ufo"), 1, { css: { backgroundPosition: "-255px 0px" }, ease: SteppedEase.config(1), repeat: 3 }),
                    TweenMax.from($('#ufoContainer'), 2, { css: { scaleX: 0.2, scaleY: 0.2, rotation: 30 }, delay: 1, ease: Power3.easeOut }),
                    TweenMax.to($('#ufoContainer'), 2, { bezier: [{ left: 10, top: 150 }, { left: 400, top: 160 }, { left: 600, top: 80 }, { left: 710, top: 20 }], delay: 1, ease: Power3.easeOut })
            ]).add([
                    TweenMax.to($("#ufo"), 0.3, { css: { backgroundPosition: "-765px 0px" }, delay: -1, ease: SteppedEase.config(1), repeat: 3, onComplete: this.hoverUfo, onCompleteScope: this })
            ]).add([
                    TweenMax.to($('#beam'), 0.5, { css: { opacity: 1 }, delay: 0.2 }),
                    TweenMax.to($("#ufo"), 1, { css: { backgroundPosition: "-510px 0px" }, delay: 0.1, ease: SteppedEase.config(1), repeat: -1 }),
                    TweenMax.to($('#cow'), 0, { css: { opacity: 1 }, delay: 0.5 }),
                    TweenMax.to($('#cow'), 1.5, { css: { scaleX: 0.5, scaleY: 0.5, top: "100px", left: "800px", rotation: -10 }, delay: 0.5, ease: Power1.easeOut, onComplete: this.ufoComplete, onCompleteScope: this })
            ]);
        },

        flyOff : function () {
            //TweenMax.to(mc, 1, { bezierThrough: [{ x: 252, y: 156 }, { x: 331, y: 157 }, { x: 217, y: 118 }, { x: 346, y: 130 }], scaleX: 0.3, scaleY: 0.3, ease: Sine.easeIn });
            $('#ufoContainer').remove();
        },

        checkSpeech : function () {
            if (!this.showingSpeech)
            {
                switch (this.speechState)
                {
                    case 0:
                        $("#speech").html("throw me");
                        break;
                    case 1:
                        $("#speech").html("ow ow ow!!");
                        this.speechState = 2;
                        break;
                    case 2:
                        $("#speech").html("log on to<br/>a different browser");
                        $("#speech").css('margin', "28px 0 0 0");
                        break;
                    case 3:
                        $("#speech").html("now throw me");
                        $("#speech").css('margin', "38px 0");
                        break;
                }
                
                $("#speechBubble").css('visibility', 'visible');
                $("#speechBubble").css('display', 'block');
                this.showingSpeech = true;
                TweenMax.fromTo($("#speechBubble"), 0.4, { css: { opacity: 0 } }, { css: { opacity: 1 }, delay: 2, ease: Sine.easeOut, onComplete: this.killSpeech, onCompleteParams: [2], onCompleteScope: this });
            }
        },

        ufoComplete : function () {

            this.ufoDraggable();
            
            ufoready = true; //??

            $(window).trigger('scene-ready');
        },

        killSpeech : function (delay) {
            var main = this;
            TweenMax.killTweensOf($("#speechBubble"));
            TweenMax.to($("#speechBubble"), 0.4, { css: { opacity: 0 }, delay: delay, ease: Power3.easeOut, onComplete: function () { main.showingSpeech = false; } });
        },

        killBeam : function () {
            TweenMax.killTweensOf(this.$container);
            TweenMax.to($('#beam'), 0.5, {
                css: { opacity: 0 }, delay: 0.1, ease: Power3.easeOut, onComplete: function () { $("#beam").css('visibility', 'hidden'); }
            });
        },

        killTweens : function () {
            TweenMax.killTweensOf(this.$container);
        },

        setSpeechState : function (state) {
            this.speechState = state;
        },

        getRandom : function (max) {
            var multiplier = Math.random() < 0.5 ? -1 : 1;
            return Math.floor((Math.random() * max * multiplier));
        }
    };

    return new Ufo();
});