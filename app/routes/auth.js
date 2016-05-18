var passport = require('passport');

module.exports = function(app){
    var controller = app.controllers.auth;

    // Local Authentication
    app.route('/auth/signup').post(controller.signUp);
    app.route('/auth/login').post(controller.logIn);
    app.route('/auth/user-info').get(controller.getUserInfo);

    // GitHub Authentication
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback',
        passport.authenticate(
            'github',
            {successRedirect: '/'}
        )
    );

}