var passport = require('passport');

module.exports = function(app){
    var controller = app.controllers.auth;
    var authService = require('../services/authService');

    // Local Authentication
    app.route('/auth/signup').post(controller.signUp);
    app.route('/auth/login').post(controller.logIn);

    // Facebook Authentication
    app.route('/auth/facebook')
        .get(passport.authenticate('facebook',
            {
                session: false,
                scope: 'email'
            }
        )
    );

    app.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook',
            {
                session: false,
                failureRedirect : '/'
            }),
            controller.facebookLogIn
        );


    /*app.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook',
            {
            // session: false,
            successRedirect : '/',
            failureRedirect : '/'
            }
        )
    );*/


    app.route('/auth/user-info').get(authService().isAuthenticated, controller.getUserInfo);

    app.route('/auth/logout').get(authService().isAuthenticated, controller.logout);


}