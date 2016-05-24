angular.module('studying-node')

    .config(function($authProvider) {
        $authProvider.httpInterceptor = function() { return true; },
        $authProvider.withCredentials = true;
        //$authProvider.tokenRoot = null;
        $authProvider.baseUrl = '/';
        //$authProvider.loginUrl = '/auth/login';
        //$authProvider.signupUrl = '/auth/signup';
        //$authProvider.unlinkUrl = '/auth/unlink/';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer';
        $authProvider.authHeader = 'Authorization';
        $authProvider.authToken = 'Bearer';
        $authProvider.storageType = 'localStorage';

        // Facebook
        $authProvider.facebook({
            clientId: '282319505440877',
            name: 'facebook',
            url: '/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: window.location.origin + '/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 580, height: 400 }
        });
    })


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

    .controller('AuthenticationCtrl',function ($scope, $state, Auth, AuthService, AUTH_EVENTS) {

        $scope.isAuthenticated = false;

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
            AuthService.logout().then(
                function(response){
                    getUserInfo();
                    $state.go('index',{},{reload: true});
                },
                function(error){
                    $scope.mensagem = {texto: 'Logout failed: '+ error};
                }
            );
        }

    })
    .controller('LoginCtrl',function ($scope, $state, $auth, AuthService) {

        $scope.login_fb = function(){
            $auth.authenticate('facebook')
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(response) {
                    console.log(response);
                });
        }

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

    .factory('Facebook', ["$q", "$window", "$rootScope", function ($q, $window, $rootScope) {

        // since we are resolving a thirdparty response,
        // we need to do so in $apply
        var resolve = function (errval, retval, deferred) {
            $rootScope.$apply(function () {
                if (errval) {
                    deferred.reject(errval);
                } else {
                    retval.connected = true;
                    deferred.resolve(retval);
                }
            });
        }

        var _login = function () {
            var deferred = $q.defer();
            //first check if we already have logged in
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    // the user is logged in and has authenticated your
                    // app
                    console.log("fb user already logged in");
                    deferred.resolve(response);
                } else {
                    // the user is logged in to Facebook,
                    // but has not authenticated your app
                    FB.login(function (response) {
                        if (response.authResponse) {
                            console.log("fb user logged in");
                            resolve(null, response, deferred);
                        } else {
                            console.log("fb user could not log in");
                            resolve(response.error, null, deferred);
                        }
                    });
                }
            });

            return deferred.promise;
        }

        return {
            login: _login
        };
    }])

;
