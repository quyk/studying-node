var nodemailer = require('nodemailer');
var config = require('../config/variables');

var nodemailer = require('nodemailer');
var generator = require('xoauth2').createXOAuth2Generator(config.smtpConfig);
var transporter = nodemailer.createTransport(({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
}));

module.exports = function (app) {

    var functions = {};

    /*
    * mailOptions = {
    * from:
    * to:
    * subject:
    * generateTextFromHTML : true | false
    * html
    * }
    */
    functions.sendEmail = function(mailOptions, callback){
        transporter.sendMail(mailOptions, function(error, response) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, response);
            }
        })
    }

    return functions;

}