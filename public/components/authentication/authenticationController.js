angular.module('studying-node')

    .controller('LoginCtrl',function ($scope, $state, $auth, AuthService, AlertService) {

        $scope.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.login_fb = function(){

            AuthService.authenticate()
                .then(function(response) {
                    $state.go('index',{},{reload: true});
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        $scope.login = function(){
            AuthService.login($scope.user)
                .then(function() {
                    $state.go('index',{},{reload: true});
                })
                .catch(function(error) {
                    console.log(error);
                }
            );
        }

    })
    .controller('SignupCtrl',function ($scope, $state, $auth, AuthService) {

        $scope.signup = function() {
            AuthService.login($scope.user)
                .then(function(response) {
                    $auth.setToken(response);
                    $state.go('index');
                })
                .catch(function(error) {
                    console.log(error);
                }
            );
        };
    })
    .controller('ResetRPasswordCtrl',function ($scope, $state, $auth, AuthService) {

        $scope.resetPassword = function(){

            AuthService.resetPassword($scope.user.email)
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

    })

;
