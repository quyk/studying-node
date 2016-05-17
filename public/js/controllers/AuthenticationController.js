angular.module('studying-node')

    .config(function($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                views: {
                    'auth':{
                        templateUrl: 'partials/authentication/nav-authentication.html',
                        controller: 'AuthenticationCtrl'
                    }
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    'content':{
                        templateUrl: 'partials/authentication/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
    })

    .controller('AuthenticationCtrl',function ($scope) {
        console.log('AuthenticationCtrl');
    })
    .controller('LoginCtrl',function ($scope) {
        console.log('LoginCtrl');
    })


;
