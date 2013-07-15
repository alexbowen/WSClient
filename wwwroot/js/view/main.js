/*
global $: false, console : false, s_gi : false
jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true,
undef:true, unused:true,curly:true, browser:true, indent:4, maxerr:50
*/

define('view/main', [
    'view/ufo'
], function (ufo) {

    var Main = function () {

        this.ufo = ufo;

        this.setUpEvents();

        $('#loader').css('display', 'none');
        $('#intro').css('visibility', 'visible');
        $('#menu').css('visibility', 'visible');
        $("[id^=page]").css('visibility', 'hidden');
        $('#typewriterText').css('visibility', 'hidden');

        // hide content until after title animation
        $('#content-wrapper').css('display', 'none');
        this.ufo.hide();
        $('#cow').css('display', 'none');
        $('#beam').css('display', 'none');
        $('#menu li').css('display', 'none');

        // lettering.js to split up letters for animation
        $('#title-line1').lettering();
        $('#title-line2').lettering();

        (new TimelineLite({ onComplete: this.titleComplete, onCompleteScope: this }))
            .add([
                TweenMax.from($('#title-line1 .char1'), .75 + Math.random(), { css: { top: '-200px', right: '800px' }, ease: Elastic.easeOut }),
                TweenMax.from($('#title-line1 .char2'), .75 + Math.random(), { css: { top: '300px', right: '800px' }, ease: Elastic.easeOut }),
                TweenMax.from($('#title-line1 .char3'), .75 + Math.random(), { css: { top: '-400px', right: '800px' }, ease: Elastic.easeOut }),
                TweenMax.from($('#title-line2 .char1'), .75 + Math.random(), { css: { top: '200px', right: '800px' }, ease: Elastic.easeOut }),
                TweenMax.from($('#title-line2 .char2'), .75 + Math.random(), { css: { top: '100px', right: '800px' }, ease: Elastic.easeOut }),
                TweenMax.from($('#title-line2 .char3'), .75 + Math.random(), { css: { top: '-100px', right: '800px' }, ease: Elastic.easeOut })
            ])
            .add([
                
                TweenMax.from($('#title-line1'), .35, { css: { fontSize: '140px', left: '100px', top: '285px' }, delay: 0, ease: Quad.easeOut }),
                TweenMax.from($('#title-line2'), .35, { css: { fontSize: '140px', left: '400px', top: '28px' }, delay: 0, ease: Quad.easeOut })
            ]);
    };

    Main.prototype = {

        pageRetrieved : false,

        setUpEvents : function () {

            var main = this;

            $(window).on('clients-paired', function () {
                console.log('application.client.getData().state', application.client.getData());
                if (application.client.getData().state === 2) { 
                    $('#cow').remove();
                    main.ufo.flyOff();
                    main.transitionBackground(1, -1, -1);
                    main.ufo.setSpeechState(3);
                }
            });

            $(window).on('auth-success', function () {
                auth = true;
                main.ufo.setAuth(true);
                main.ufo.ufoDraggable(auth);
            });

            $(window).on('auth-failiure', function () {
                auth = false;
                main.ufo.setAuth(false);
                main.ufo.ufoDraggable(auth);
            });

            $(window).on('scene-ready', function () {
                main.sceneReady();
            });
        },

        sceneReady : function () {

            if (this.pageRetrieved) {
                $("#typewriterText").css('visibility', 'visible');
                TweenMax.from($('#typewriterText'), 0.5, { css: { opacity: 0, left: "155px" }, delay: 0.25 });
            }

            $('#cow').css({ display: 'none', opacity: 0 });
            $('#cow').remove();

            $('#menu li').each(function (index) {
                $(this).css('display', 'inline-block');
                var rnd = Math.floor(Math.random()) + 0.5;
                var randomMargin = getRandom(20);
                TweenMax.from($(this), rnd, { css: { margin: randomMargin + 'px', opacity: 0 }, ease: Back.easeInOut, delay: 0.2 });
            });

            $("#menu").on("click", "li.enabled", (function (e)
            {
                e.preventDefault();
                var currentId = parseInt($(this).attr('id').substring(4)) - 1;
                var previous = parseInt($("#menu li.selected").attr('id').substring(4)) - 1;
                var dx = previous - currentId;
                var direction = previous < currentId ? -1 : 1;
                $("#menu li.selected").addClass("enabled");
                $("#menu li.selected").removeClass("selected");
                $(this).addClass("selected");
                $(this).removeClass("enabled");
                main.ufo.killTweens();
                main.hideText(previous);
                main.transitionBackground(currentId, direction, dx);
            }));
        },

        titleComplete : function () {

            $('#content-wrapper').css('display', 'block');
            TweenMax.to($('#content-wrapper'), .75, { css: { opacity: 1 }, ease: Quad.easeOut });

            this.ufo.show();
            $('#cow').css('display', 'block');
            $('#beam').css('display', 'block');

            TweenMax.to($('#bg'), 2, { css: { opacity: 1 }, ease: Quad.easeOut });

            if (application.client.getData().state === 1) { 
                this.ufo.flyOn();
                TweenMax.to($('.farmlights'), 0, { css: { visibility: "visible", display: "block" }, delay: 6 });
                this.getPage(0);
            } else {
                $('#cow').remove();
                this.ufo.flyOff();
                this.transitionBackground(1, -1, -1);
            }
        },

        transitionBackground : function (n, direction, diff) {
            new TimelineLite()
                .add
                ([
                   TweenMax.to($('#beam'), 0.5, { css: { opacity: 0 }, delay: 0.2 }),
                   TweenMax.to($('#ufoContainer'), 1.5, { css: { scaleX: 0.5, scaleY: 0.5, rotation: (-1 * direction) * 20 }, ease: Power3.easeOut }),
                   TweenMax.to($('#ufoContainer'), 1.5, { bezier: [{ left: $('#ufoContainer').css('left'), top: $('#ufoContainer').css('top') }, { left: 730, top: 160 }, { left: 780, top: 20 }], ease: Power3.easeOut }),
                   TweenMax.to($('#hills'), 1.5, { css: { backgroundPosition: -100 * n + "px 390px" }, ease: Power3.easeOut }),
                   TweenMax.to($('#treeline'), 1.5, { css: { backgroundPosition: -300 * n + "px 400px" }, ease: Power3.easeOut }),
                   TweenMax.to($('#fence'), 1.5, { css: { backgroundPosition: -700 * n + "px 430px" }, ease: Power3.easeOut }),
                   TweenMax.to($('#trees'), 1.5, { css: { left: (parseInt($('#trees').css('left')) + (diff * 700)) + "px" }, ease: Power3.easeOut }),
                   TweenMax.to($('#foreground'), 1.5, { css: { backgroundPosition: -900 * n + "px 440px" }, ease: Power3.easeOut }),
                   TweenMax.to($('#farm'), 1.5, { css: { left: (parseInt($('#farm').css('left')) + (diff * 900)) + "px" }, ease: Power3.easeOut, onComplete: this.showPage, onCompleteParams: [n], onCompleteScope: this })
                ])
                .add
                ([
                    TweenMax.to($('#ufoContainer'), 1, { css: { scaleX: 1, scaleY: 1, rotation: 0 }, delay: -0.5, ease: Power3.easeOut }),
                    TweenMax.to($('#ufoContainer'), 1, { bezier: [{ left: 780, top: 60 }, { left: 720, top: 60 }], delay: -0.5, ease: Power3.easeOut })
                ])
                .add
                ([
                    TweenMax.to($('#beam'), 1, { css: { opacity: 1 }, delay: 0.5, ease: Power3.easeOut }),
                    TweenMax.to($('#ufoContainer'), 1, { css: { left: 720, top: 60 }, delay: 0.5, ease: Power3.easeOut, onComplete: this.hoverUfo, onCompleteScope: this })
                ]);
        },

        hideText : function (pageId) {
            TweenMax.to($("#page" + pageId), 0.25, {
                css: { opacity: 0, scaleX: 0.2, scaleY: 0.2 }, ease: Power3.easeOut, onComplete: function () {
                    $("#page" + pageId).css('visibility', 'hidden');
                }
            });
        },

        showPage : function showPage(pageId) {
            $("#page" + pageId).css('visibility', 'visible');
            TweenMax.fromTo($("#page" + pageId), 0.4, { css: { opacity: 0, scaleX: 2, scaleY: 2 } }, { css: { opacity: 1, scaleX: 1, scaleY: 1 }, ease: Back.easeOut });
        },

        showInstructions : function () {
            $("#instructions").css('visibility', 'visible');
            TweenMax.fromTo($("#instructions"), 0.4, { css: { opacity: 0, scaleX: 2, scaleY: 2 } }, { css: { opacity: 1, scaleX: 1, scaleY: 1 }, ease: Back.easeOut });
        },

        getPage : function (pageId) {
            this.pageRetrieved = true;
        }
    };

    return new Main();
});