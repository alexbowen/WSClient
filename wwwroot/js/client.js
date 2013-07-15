/*
global $: false, console : false, s_gi : false
jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true,
undef:true, unused:true,curly:true, browser:true, indent:4, maxerr:50
*/

define('client', function () {

    var Client = function (options) {

        var client = this;

        this.options = options;

        if (localStorage.clientId) {
            this.options.id = localStorage.clientId;
        } else {
            this.options.id = this.createUUID();
            localStorage.clientId = this.options.id;
        }

        this.connect();

        this.connection.on('flushing', function () {
            client.connection.emit('acknowledge', client.getData());
        });
    };

    Client.prototype = {

        /**
         * @method connect
         * @description  connect to server
         * @return {void}
         */
        connect : function () {
            this.connection = io.connect('http://0.0.0.0:5000'); 
            //this.connection = io.connect('http://goserver.cloudapp.net:5000');
        },

        /**
         * @method login
         * @description  supply client credentials to the server
         * @param  {Function} callback
         * @return {void}
         */
        login : function (callback) {

            var client = this;

            if (this.connection) this.connection.socket.reconnect();
            this.online = true;

            this.connection.emit('connect', client.getData(), callback);
        },

        /**
         * @method  logout
         * @param {Function} callback
         * @return {void}
         */
        logout : function (callback) {

            this.connection.disconnect();
            this.online = false;
            
            if (callback) callback();
        },

        /**
         * @method  response
         * @param  {Function} callback
         * @return {void}
         */
        response : function (callback) {
            this.connection.on('server-response', callback);
        },

        /**
         * @method  request
         * @param  {Function} callback
         * @return {void}
         */
        request : function (callback) {
            this.connection.on('server-request', callback);
        },

        pairRequest : function () {

            var client = this;

            this.connection.emit('client-pair-request', this.getData());

            //pairing events
            this.connection.on('clients-pair-request', function () {
                if (arguments[0] && client.canPair(arguments[0].client)) {
                    console.log('im a diff client and on google');
                    client.connection.emit('client-pair-response', client.getData());
                }
            });

            this.connection.on('clients-pair-response', function () {
                if (arguments[0] && client.canPair(arguments[0].client)) {

                    var state = arguments[0].client.state === 2 ? 1 : 2;
                    client.setState(state);
                    client.connection.emit('client-update', client.getData());

                    $(window).trigger('clients-paired');

                    console.log(client.getData(), ' paired with ', arguments[0].client);
                }
            });
        },

        canPair : function (client) {

            if (this.getData().id !== client.id && this.getData().auth.etag === client.auth.etag) {
                return true;
            }

            return false;
        },

        getData : function () {
            return this.options;
        },

        setData : function (data) {
            this.options = data;
        },

        /**
         * @method createUUID
         * @return {string}
         */
        createUUID : function () {

            var s = [];
            var hexDigits = "0123456789abcdef";

            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }

            s[14] = "4";
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");

            return uuid;
        },

        setState : function (state) {
            this.options.state = state;
        },

        setAuth : function (auth) {
            this.options.auth = auth;
        }
    };

    return Client;
});