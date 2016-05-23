module.exports = function (app) {

    var jwt = require('jwt-simple'),
        mongoose = require('mongoose');
    var config = require('../../config/variables');
    var Usuario = mongoose.model('Usuario');

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

    var functions = {}

    functions.restoreToken = function (headers) {
        var token = getToken(headers);
        return jwt.decode(token, config.secret);
    }

    functions.isAuthenticated = function (req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            Usuario.findOne({email: decoded.email}).select('-_id email name').exec().then(
                function(response){
                    if (!response) {
                        // console.log('Status 403 Authentication failed. User not found.');
                        res.status(403).send('Authentication failed. User not found.');
                    } else {
                        // console.log('Authenticated');
                        return next();
                        // return res.json(response);
                    }
                },
                function(error){
                    // console.log('Status 500 '+error);
                    res.status(500).json(error);
                }
            );
        } else {
            // console.log('No token provided.');
            res.status(403).send('No token provided.');
        }
    }



    return functions;

}