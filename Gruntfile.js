module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                logo: "http://g-ecx.images-amazon.com/images/G/02/MandS/en_GB/core/common/mands_logo._V135158715_.jpg",
                options: {
                    "linkNatives": "true",
                    "attributesEmit": "true",
                    "paths": [
                        "./wwwroot/js"
                    ],
                    "outdir": "./documentation"
                }
            }
        },
        // mocha: {
        //     all: {
        //         src: ['TestRunner.html'],
        //         options: {
        //             mocha: {
        //                 ignoreLeaks: true
        //             },
        //             reporter: function(runner) {
        //                 new mocha.reporters.Nyan(runner);
        //                 new mocha.reporters.Teamcity(runner);
        //             },
        //             ui : 'bdd',
        //             run: false
        //         }
        //     }
        // },
        jshint: {
            ignores : ['./wwwroot/js/main.js'],
            beforeconcat: ['./wwwroot/js/*.js']/*,
            afterconcat: ['./wwwroot/production/application.js']*/
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "wwwroot/js",
                    dir: "wwwroot/production"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    // grunt.loadNpmTasks('grunt-mocha');

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['yuidoc',/* 'mocha',*/ 'requirejs', 'jshint']);
};
