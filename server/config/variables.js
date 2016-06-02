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
        clientId: '121797490859-bp69hqvq8bvk3tcp70n07tmg4vse696o.apps.googleusercontent.com',
        clientSecret: 'W7CVNAM0zNrwmcu6zHNZUIDK',
        refreshToken: '1/DVMHxDGD-d969Tv5AnZvbeAozZsQTPUXg4YCwQ3GQlw',
        accessToken: 'ya29.Ci_1AotJhSuaSuhKPYuvvqwUG62N9WxYCcgRcmxR7wvvgsKrpdoLsDyZ5ucnOAitcQ' // optional
    }

};