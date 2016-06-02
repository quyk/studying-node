var nodemailer = require("nodemailer");

module.exports = {

    smt :  nodemailer.createTransport("SMTP",{
        service: "Gmail",
        debug: true,
        auth: {
            xoauth2: {
                // Not @developer.gserviceaccount.com
                user: "numap.app@gmail.com", // Your gmail address.
                clientId: "596791586222-m9to0do35n5j18d1k85es2cl7rl0kej5.apps.googleusercontent.com",
                clientSecret: "ZYEl9xlY04j7PaDeJn7A8tmV",
                "access_token": "ya29.CjHzAhPGlJwSIBJXrdS9pfFUGM3_hgeqsX5FkArTEMTecfpr8fvydi9aXaYEYxVD8Aop",
                refreshToken: "1/YWzBCndTYzFJX_yMb83TXH_RbQIg0M92ZnYWseSdRPI"
            }
        }
    })

};