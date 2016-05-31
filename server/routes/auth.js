var passport = require('passport');

module.exports = function(app){
    var controller = app.controllers.auth;
    var authService = require('../services/authService');

    // Local Authentication
    app.route('/auth/login').post(controller.logIn);

    // Email and Password signup
    app.route('/auth/signup').post(controller.signUp);


    // Facebook Authentication
    app.route('/auth/facebook')
        .post(controller.facebookLogIn);

}