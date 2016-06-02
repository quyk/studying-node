module.exports = {
    'secret': 'millysfabrielle@@@12@@#',
    'database': 'mongodb://localhost/node-rest-auth',
    'facebookAuth' : {
        'clientID' 		: '282319505440877', // your App ID
        'clientSecret' 	: 'b4175ae486f6a4e4aa7369b37d327eb0', // your App Secret
        'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
    },
    'smtpConfig': {
        user: 'numap.app@gmail.com',
        clientId: '596791586222-m9to0do35n5j18d1k85es2cl7rl0kej5.apps.googleusercontent.com',
        clientSecret: 'ZYEl9xlY04j7PaDeJn7A8tmV',
        refreshToken: '1/YWzBCndTYzFJX_yMb83TXH_RbQIg0M92ZnYWseSdRPI',
        accessToken: 'ya29.CjHzAhPGlJwSIBJXrdS9pfFUGM3_hgeqsX5FkArTEMTecfpr8fvydi9aXaYEYxVD8Aop' // optional
    }

};