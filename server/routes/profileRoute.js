var passport = require('passport');

module.exports = function(app){
    var controller = app.controllers.profileController;
    var authService = require('../services/authService');

    app.route('/profile').get(authService().isAuthenticated, controller.getUserInfo);



}