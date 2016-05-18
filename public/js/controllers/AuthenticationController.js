angular.module('studying-node')

    .config(function($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                views: {
                    'auth@':{
                        templateUrl: 'partials/authentication/nav-authentication.html',
                        controller: 'AuthenticationCtrl'
                    }
                }
            })
            .state('index.login', {
                url: 'login',
                views: {
                    'content@':{
                        templateUrl: 'partials/authentication/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('index.signup', {
                url: 'signup',
                views: {
                    'content@':{
                        templateUrl: 'partials/authentication/signup.html',
                        controller: 'SignupCtrl'
                    }
                }
            })
    })

    .controller('AuthenticationCtrl',function ($scope, Auth, AuthService) {

        $scope.isAuthenticated = false;

        if(AuthService.isAuthenticated()){

            console.log('01');
            $scope.isAuthenticated = true;

            Auth.one('user-info').get().then(
                function(response){
                    $scope.user = {name: response.name};
                    console.log(response);
                }, function(error){
                    //to do
                }
            );
        }


        console.log('AuthenticationCtrl');
    })
    .controller('LoginCtrl',function ($scope, $state, AuthService) {

        $scope.login = function(){
            AuthService.login($scope.usuario).then(
                function(response){
                    $state.go('index.contatos');
                },
                function(error){
                    $scope.mensagem = {texto: 'Login failed'};
                }
            );
        }

    })
    .controller('SignupCtrl',function ($scope) {
        console.log('SignupCtrl');
    })

;
