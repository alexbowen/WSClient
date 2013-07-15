/*
global $: false, console : false, s_gi : false
jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true,
undef:true, unused:true,curly:true, browser:true, indent:4, maxerr:50
*/

define('tile', function () {

    var Tile = function (config) {
        this.config = config;
    };

    Tile.prototype = {

        canMove : null, 

        velocity : null,

        cache : null,

        $element : null,

        config : null,

        /**
         * @method create
         * @param  {object} config (mandatory)
         * @param  {integer} px (optional)
         * @param  {integer} py (optional)
         * @param  {object} dm (optional)
         * @param  {velocity} v (optional)
         * @return {void}
         */
        create : function (config, px, py, dm, v) {

            var tile = this;

            this.config = config;

            $(document).unbind();

            this.$element = $(this.config.selector);

            this.$element.css('top', arguments.length <= 1 ? this.config.pageX : (py / 100) * window.innerHeight + 'px');
            this.$element.css('left', arguments.length <= 1 ? this.config.pageY : (px / 100) * window.innerWidth + 'px');

            if (v) this.animateLoop(dm, v);

            this.setUpEvents();
        },

        setUpEvents : function () {

            var tile = this;

            this.$element.mousedown(function (e) {
                tile.startAction();
            });

            $(document).mousemove(function (e) {
                tile.moveAction(e.pageX, e.pageY);
            });

            $(document).mouseup(function (e) {
                tile.stopAction(e.pageX, e.pageY);
            });

            if ('ontouchstart' in document.documentElement) {
                this.$element.touchstart(function (e) {
                    tile.startAction();
                });

                $(document).touchmove(function (e) {
                    tile.moveAction(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
                });

                $(document).touchend(function (e) {
                    tile.stopAction(e.originalEvent.changedTouches[0].pageX, e.originalEvent.changedTouches[0].pageY);
                });

                document.body.addEventListener('touchmove', function(event) {
                  event.preventDefault();
                }, false); 
            }
        },

        startAction : function () {

            if (tile.config.mousedown) {
                tile.config.mousedown();
            }

            tile.mousedown = true;
            tile.mousemove = false;
        },

        moveAction : function (x, y) {

            var tile = this;

            tile.mousemove = true;

            if (tile.mousedown === true) {

                if (!tile.cache) {
                    tile.cache = {
                        'offsetX'   : x - tile.$element[0].offsetLeft,
                        'offsetY'   : y - tile.$element[0].offsetTop,
                        'pageX'     : x,
                        'pageY'     : y,
                        'time'      : new Date().getTime()
                    };
                }
            
                tile.move(x - tile.cache.offsetX, y - tile.cache.offsetY);
            }
        },

        stopAction : function (x, y) {
            tile.mousedown = false;
            tile.animateLoop({
                'pageX' : x,
                'pageY' : y
            });
        },

        destroy : function () {
            this.$element.remove();
        },

        move : function (x, y) {
            this.$element.css({
                'left'  : x + "px",
                'top'   : y + "px"
            });
        },

        atYBound : function () {
            return !!(this.getPixelsFromBound('top') > (window.innerHeight) || this.getPixelsFromBound('top') < 0);
        },

        atXBound : function () {
            return !!(this.getPixelsFromBound('left') > (window.innerWidth) || this.getPixelsFromBound('left') < 0);
        },

        getPixelsFromBound : function (bound, el) {
            var element = arguments.length === 1 ? this.$element : el;

            return parseInt(element.css(bound), 10);
        },

        animateLoop : function (positionObj, velocity) {

            var tile = this,
                distanceMoved,
                direction,
                decelerateInterval,
                ease,
                distance,
                position,
                callbackStr,
                percentage;

            if (!tile.mousemove) {
                return;
            }

            if (!this.cache) {
                this.cache = {
                    'pageX' : 0,
                    'pageY' : 0,
                    'time' : new Date().getTime()
                };
            }

            if (positionObj) {
                distanceMoved = {
                    pageX : positionObj.pageX - this.cache.pageX,
                    pageY : positionObj.pageY - this.cache.pageY
                };
                
                direction = {
                    pageX : positionObj.pageX > this.cache.pageX ? 1 : -1,
                    pageY : positionObj.pageY > this.cache.pageY ? 1 : -1
                };
            }

            distanceMoved.total = Math.sqrt((Math.pow(distanceMoved.pageX, 2)) + (Math.pow(distanceMoved.pageY, 2)));

            time = (new Date().getTime() - this.cache.time) / 1000;

            if (!velocity) {               
                this.velocity = distanceMoved.total / time;
            } else {
                this.velocity = velocity;
            }

            decelerateInterval = 20;
            
            ease = setInterval(function () {
                
                distance = Math.floor(tile.velocity * (decelerateInterval / 1000));
                
                tile.move(
                    (tile.getPixelsFromBound('left') + (direction.pageX * distance) * (Math.abs(distanceMoved.pageX) / (Math.abs(distanceMoved.pageX) + Math.abs(distanceMoved.pageY)))),
                    (tile.getPixelsFromBound('top') + (direction.pageY * distance) * (Math.abs(distanceMoved.pageY) / (Math.abs(distanceMoved.pageX) + Math.abs(distanceMoved.pageY))))
                );

                //TODO these ifs should be combined
                if (tile.atXBound()) {
                    position = tile.getPixelsFromBound('top');
                    percentage = tile.getPixelsFromBound('left') <= 0 ? 100 : 0;

                    tile.config.render = tile.config.render.toString();

                    callbackStr = 'tile.create(' +
                        JSON.stringify(tile.config) + ',' +
                        percentage +',(' +
                        position + ' / window.innerHeight) * 100,' +
                        JSON.stringify(distanceMoved) + ',' +
                        tile.velocity + ');';

                    tile.$element.trigger('dispatch', [{
                        'callback'  : callbackStr,
                        'render'    : tile.config.render.toString(),
                        'html'      : tile.config.html
                    }]);

                    tile.destroy();

                    window.clearInterval(ease);
                }

                if (tile.atYBound()) {
                    position = tile.getPixelsFromBound('left');
                    percentage = tile.getPixelsFromBound('top') <= 0 ? 100 : 0;

                    tile.config.render = tile.config.render.toString();

                    callbackStr = 'tile.create(' +
                        JSON.stringify(tile.config) +',(' +
                        position + ' / window.innerWidth) * 100, ' +
                        percentage + ',' +
                        JSON.stringify(distanceMoved) + ',' +
                        tile.velocity + ');';

                    tile.$element.trigger('dispatch', [{
                        'callback'  : callbackStr,
                        'render'    : tile.config.render.toString(),
                        'html'      : tile.config.html
                    }]);

                    tile.destroy();

                    window.clearInterval(ease);
                }
                
                tile.velocity = tile.velocity / 1.05;
                
                if (distance <= 1) {
                    tile.velocity = 0;
                    window.clearInterval(ease);   
                }

            }, decelerateInterval);
            
            this.canMove = false;
            this.cache = false;
        }
    };

    return Tile;
});