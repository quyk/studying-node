angular.module('authentication',[])

    .config(function($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                views: {
                    'auth@':{
                        templateUrl: 'components/authentication/views/nav-authentication.html',
                        controller: 'AuthenticationCtrl',
                        resolve:{
                            isAuthenticated: 
                        }
                    }
                }
            })
            .state('index.login', {
                url: 'login',
                views: {
                    'content@':{
                        templateUrl: 'views/authentication/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('index.signup', {
                url: 'signup',
                views: {
                    'content@':{
                        templateUrl: 'views/authentication/signup.html',
                        controller: 'SignupCtrl'
                    }
                }
            })
            .state('index.resetPassword', {
                url: 'recover',
                views: {
                    'content@':{
                        templateUrl: 'views/authentication/recover-password.html',
                        controller: 'ResetRPasswordCtrl'
                    }
                }
            })

    });