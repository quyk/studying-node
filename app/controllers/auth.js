
module.exports = function (app) {

    var jwt = require('jwt-simple');
    var Usuario = app.models.usuario;
    var config = require('../../config/variables');
    var authService = require('../services/authService')();

    var controller = {
        getUserInfo: function(req, res){
            var decodedToken =  authService.restoreToken(req.headers);
            if (decodedToken) {

                // .select('-_id email name')
                Usuario.findOne({'email': decodedToken.email}).exec().then(
                    function(response){
                        if (!response) {
                            return res.status(404).send('User Info failed. User not found.');
                        } else {
                            return res.json(response);
                        }
                    },
                    function(error){
                        res.status(500).json(error);
                    }
                );
            } else {
                return res.status(403).send('No token provided.');
            }
        },
        signUp: function(req, res){

            console.log(req.body);

            if (!req.body.name || !req.body.password) {
                res.status(500).json({success: false, msg: 'Please pass name and password.'});
            } else {

                var user = new Usuario();
                user.email = req.body.email;
                user.name = req.body.name;
                user.local.password = req.body.password;

                // save the user
                Usuario.create(user).then(
                    function(response) {
                        // 201 means that post was created
                        res.status(201).json(response);
                    },
                    function(error) {
                        //user already exist
                        res.status(500).json(error);
                    }
                );
            }
        },
        logIn: function(req, res){
            Usuario.findOne({'email': req.body.email}).then(
                function(response){
                    if(!response){
                        res.status(500).json('Authentication failed. User not found.');
                    } else {

                        // check if password matches
                        response.comparePassword(req.body.password, function(error, isMatch){
                            if( isMatch && !error){

                                var user = {
                                    _id: response._id,
                                    name: response.name,
                                    email: response.email
                                };

                                // if user is found and password is right create a token
                                var token = jwt.encode(user, config.secret);
                                // return the information including token as JSON
                                res.json({token: 'JWT ' + token});
                            } else {
                                res.status(500).json('Authentication failed. Wrong password.');
                            }
                        })
                    }
                },
                function(error){
                    res.status(500).json(error);
                }
            );
        },
        logout: function(req, res){
            req.logout();
            // 204 means no content
            res.status(200).end();
        },
        facebookLogIn: function (req, res) {

            var user = {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email
            };

            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            // res.json({token: 'JWT ' + token});
            res.redirect('/#/teste/'+token);

        }
    };
    return controller;
}