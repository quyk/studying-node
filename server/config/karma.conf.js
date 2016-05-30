// Karma configuration
// Generated on Thu May 12 2016 09:52:25 GMT-0300 (E. South America Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],

    //chai config
    client: {
        chai: {
            includeStack: true
        }
    },

    // list of files / patterns to load in the browser
    files: [
        '../public/bower_components/jquery/dist/jquery.min.js',
        '../public/bower_components/angular/angular.min.js',
        '../public/bower_components/angular-bootstrap/ui-bootstrap.min.js',
        '../public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        '../public/bower_components/lodash/dist/lodash.min.js',
        '../public/bower_components/restangular/dist/restangular.min.js',
        '../public/bower_components/angular-mocks/angular-mocks.js',
        '../public/js/main.js',
        '../public/js/controllers/**/*.js',
        '../test/spec/**/**Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '../public/js/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
