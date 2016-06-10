angular.module('studying-node')
    
    .controller('AuthenticationCtrl',[ '$scope', '$state', 'AuthService', 'ProfileService',  function ($scope, $state, AuthService, ProfileService) {

        var isAuthenticated = AuthService.isAuthenticated();

        $scope.isAuthenticated = isAuthenticated;

        if(isAuthenticated){
            ProfileService.getProfile()
                .then(function(response){
                    $scope.profile = {
                        picture: response.data.picture || ""
                    }
                })
                .catch(function(error) {
                    //to do
                });
        }

        $scope.logout = function(){
            AuthService.logout().then(
                function(){
                    $state.go('index',{},{reload: true});
                })
                .catch(function(error) {
                    console.log(error);
                });;
        }

    }])
    .controller('LoginCtrl',function ($scope, $state, $auth, AuthService) {

        $scope.login_fb = function(){

            AuthService.authenticate()
                .then(function(response) {
                    console.log(response);
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
