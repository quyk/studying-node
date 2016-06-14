(function () {
    'use strict';

    angular.module('studying-node')

        .controller('LoginCtrl',['$scope', '$state', 'AuthService', 'dtAlertService', function ($scope, $state, AuthService, dtAlertService) {
            $scope.login_fb = function(){

                AuthService.authenticate()
                    .then(function(response) {
                        $state.go('home',{},{reload: true});
                    })
                    .catch(function(error) {
                        dtAlertService.add('danger',error.message);
                    });
            }

            $scope.login = function(isValid){
                if(isValid) {
                    AuthService.login($scope.user)
                        .then(function () {
                            $state.go('home', {}, {reload: true});
                        })
                        .catch(function (error) {
                            dtAlertService.add('danger',error.message);
                        }
                    );
                } else {
                    dtAlertService.add('danger','Informe usuário e senha');
                }
            };

        }])
        .controller('LogoutCtrl',['$scope', '$state', 'AuthService', function($scope, $state, AuthService){
            AuthService.logout();
            $state.go('home');
        }])
        .controller('SignupCtrl',function ($scope, $state, $auth, AuthService) {

            $scope.signup = function() {
                AuthService.login($scope.user)
                    .then(function(response) {
                        $auth.setToken(response);
                        $state.go('home');
                    })
                    .catch(function(error) {
                        console.log(error);
                    }
                );
            };
        })
        .controller('ResetRPasswordCtrl',['$scope', '$state', 'dtAlertService', 'AuthService', function ($scope, $state, dtAlertService, AuthService) {
            $scope.resetPassword = function(isValid){
                if(isValid === true) {
                    console.log($scope.user.email);
                    AuthService.resetPassword($scope.user.email).then(
                        function (response) {
                            console.log(response);
                            dtAlertService.add('success', response.message);
                        },
                        function (error) {
                            console.log(error);
                            dtAlertService.add('danger', error.statusText);
                        });
                }
            }

        }])

    ;

}());
