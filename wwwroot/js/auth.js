/*
global $: false, console : false, s_gi : false
jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true,
undef:true, unused:true,curly:true, browser:true, indent:4, maxerr:50
*/

define('auth', function () {

    return (function() {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);

        var po2 = document.createElement('script');
        po2.type = 'text/javascript';
        po2.async = true;
        po2.src = 'https://apis.google.com/js/plusone.js';
        s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po2, s);
    })();
});
