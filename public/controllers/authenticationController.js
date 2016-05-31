angular.module('studying-node')
    
    .config(function($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                views: {
                    'auth@':{
                        templateUrl: 'views/authentication/nav-authentication.html',
                        controller: 'AuthenticationCtrl'
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
            .state('index.teste', {
                url: 'teste',
                views: {
                    'content@':{
                        templateUrl: '',
                        controller: 'TesteCtrl'
                    }
                }
            })
    })

    .controller('AuthenticationCtrl',function ($scope, $state, AuthService) {

        var isAuthenticated = AuthService.isAuthenticated();

        $scope.isAuthenticated = isAuthenticated;
        
        AuthService.getProfile()
            .then(function(response){
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });

        $scope.logout = function(){
            AuthService.logout().then(
                function(){
                    $state.go('index',{},{reload: true});
                })
                .catch(function(error) {
                    console.log(error);
                });;
        }

    })
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
                    console.log('logado com sucesso');
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

;
