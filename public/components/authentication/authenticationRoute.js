angular.module('authentication',[])

    .config(function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    'content@':{
                        templateUrl: 'components/authentication/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('signUp', {
                url: '/sign-up',
                views: {
                    'content@':{
                        templateUrl: 'components/authentication/sign-up.html',
                        controller: 'SignupCtrl'
                    }
                }
            })
            .state('resetPassword', {
                url: '/reset-password',
                views: {
                    'content@':{
                        templateUrl: 'components/authentication/recover-password.html',
                        controller: 'ResetRPasswordCtrl'
                    }
                }
            })

    });