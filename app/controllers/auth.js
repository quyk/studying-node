
module.exports = function (app) {

    var jwt = require('jwt-simple');
    var Usuario = app.models.usuario;
    var config = require('../../config/variables');

    var getToken = function(headers) {
        if (headers && headers.authorization) {
            var parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    var controller = {
        getUserInfo: function(req, res){
            var token = getToken(req.headers);
            if (token) {
                var decoded = jwt.decode(token, config.secret);

                Usuario.findOne({login: decoded.login}).select('-_id login name').exec().then(
                    function(response){
                        if (!response) {
                            return res.status(403).send('Authentication failed. User not found.');
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
            if (!req.body.name || !req.body.password) {
                res.status(500).json({success: false, msg: 'Please pass name and password.'});
            } else {
                // save the user
                Usuario.create(req.body).then(
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
            Usuario.findOne({login: req.body.login}).then(
                function(response){
                    if(!response){
                        res.status(500).json('Authentication failed. User not found.');
                    } else {

                        // check if password matches
                        response.comparePassword(req.body.password, function(error, isMatch){
                            if( isMatch && !error){
                                // if user is found and password is right create a token
                                var token = jwt.encode(response, config.secret);
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
        }
    };
    return controller;
}