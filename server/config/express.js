var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    config = require('./variables');;

module.exports = function () {
    var app = express();

    app.set('port', 3000);

    // Enable compression on bower_components
    app.use('/bower_components', express.static(__dirname + '/../../bower_components'));

    app.use(express.static(__dirname+'/../../public'));
    app.set('view engine', 'ejs');
    app.set('views','./server/views');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // session and passport configuration
    app.use(cookieParser());
    app.use(session(
        {
            secret: 'teste',
            resave: true,
            saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    load('models', {cwd: 'server'})
        .then('controllers')
        .then('routes')
        .into(app);


    return app;
}