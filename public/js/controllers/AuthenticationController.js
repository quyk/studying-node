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

    .controller('AuthenticationCtrl',function ($scope, $state, Auth, AuthService, AUTH_EVENTS) {

        $scope.isAuthenticated = false;

        // $scope.$on(AUTH_EVENTS.isAuthenticated, function(event, args) {
        //     console.log('BROADCAST isAuthenticated');
        //     getUserInfo();
        // });

        function getUserInfo() {
            if(AuthService.isAuthenticated()){
                $scope.isAuthenticated = true;
                Auth.one('user-info').get().then(
                    function(response){
                        $scope.user = {name: response.name};
                    }, function(error){
                        //to do
                    }
                );
            }
        }
        getUserInfo();

        $scope.logout = function(){
            AuthService.logout();
            getUserInfo();
            $state.go('index',{},{reload: true});
        }


        console.log('AuthenticationCtrl');
    })
    .controller('LoginCtrl',function ($scope, $state, AuthService) {

        $scope.login = function(){
            AuthService.login($scope.usuario).then(
                function(response){
                    $state.go('index.contatos',{},{reload: true});
                },
                function(error){
                    $scope.mensagem = {texto: 'Login failed'};
                }
            );
        }

    })
    .controller('SignupCtrl',function ($scope, $state, AuthService) {

        $scope.signup = function() {
            AuthService.register($scope.usuario).then(
                function(response) {
                    $state.go('index.login');
                    // do some alert
                    console.log('Cadastro realizado com sucesso' + response);
                }, function(error) {
                    console.log('Cadastro falhou!');
                    console.log(error);
                }
            );
        };


    })

;
