/*
global $: false, console : false, s_gi : false
jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true,
undef:true, unused:true,curly:true, browser:true, indent:4, maxerr:50
*/

define('application', [
    'client',
    'request',
    'tile'
], function (Client, Request, Tile, ufo) {

    var Application = function (el) {

        var application = this;

        this.init();

        $(window).on('auth-success', function (e, data) {
            console.log('auth success');
            application.client.setAuth(arguments[1]);
            application.client.connection.emit('client-update', application.client.getData());
            application.initTile(el);

            application.client.pairRequest();

            application.client.login(function (data) {
                application.client.setData(data);
                console.log('setting client from server registry', data);
            });
        });
    };

    Application.prototype = {

        init : function () {

            var application = this;

            var clientOptions = {
                'auth'      : null,
                'location'  : 'A',
                'floor'     : '2',
                'state'     : 1
            };

            this.setClient(new Client(clientOptions));

            //not used yet
            this.client.response(function (requestData) {
                console.log('server-response', requestData);
            });

            this.client.request(function (requestData) {
                //TODO split this into 'in google' method and 'sameClient' method
                if (requestData.sender.id !== application.client.options.id && application.client.options.auth.etag === requestData.sender.auth.etag) {

                    (new Function(
                        application.getFunctionBody(requestData.render)
                    ))(requestData.content, requestData.html);

                    (new Function(requestData.callback))();
                }
            });

            this.setRequest(new Request());

            this.request.init({'sender' : this.client.getData()});
        },

        initTile : function (el) {

            var application = this; 

            $('.throw').unbind();

            var config = {
                'html' : (function () {
                    return el.html();
                })(),
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

                    $('.throw').on('dispatch', function (e, data) {
                        var request = arguments[1];
                        application.request.setCallback(request.callback);
                        application.request.setRender(request.render);
                        application.request.setHtml(request.html);
                        application.client.connection.emit('client-request-update', application.request.get(), function () {
                            console.log('request sent', application.request.get());
                        });
                    });
                },
                mousedown : function () {
                    TweenMax.killTweensOf(el);
                },
                'selector'    : '.throw',
                'pageX'       : 200,
                'pageY'       : 200
            };

            tile = new Tile();
            tile.create(config);

            $('.throw').on('dispatch', function () {
                var request = arguments[1];
                application.request.setCallback(request.callback);
                application.request.setRender(request.render);
                application.request.setHtml(request.html);
                application.client.connection.emit('client-request-update', application.request.get(), function () {
                    console.log('request sent', application.request.get());
                });
            });
        },

        setRequest : function (request) {
            this.request = request;
        },

        setClient : function (client) {
            this.client = client;
        },

        getFunctionBody : function (fn) {
            return fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
        }
    };

    return Application;
});