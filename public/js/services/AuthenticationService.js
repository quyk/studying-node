angular.module('studying-node')

    .factory('AuthService', function($rootScope, $http, $q, Restangular, Auth, AUTH_EVENTS){

        var LOCAL_TOKEN_KEY = 'millysfabrielle@@@12@@#';
        var isAuthenticated = false;
        var authToken;

        function loadUserCredentials() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            if (token) {
                useCredentials(token);
            }
        }

        function storeUserCredentials(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        function useCredentials(token) {
            isAuthenticated = true;
            authToken = token;

            // Set the token as header for your requests!
            $http.defaults.headers.common.Authorization = authToken;
            // $rootScope.$broadcast(AUTH_EVENTS.isAuthenticated);
        }

        function destroyUserCredentials() {
            authToken = undefined;
            isAuthenticated = false;
            $http.defaults.headers.common.Authorization = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
            // $rootScope.$broadcast(AUTH_EVENTS.isAuthenticated);
        }

        // call function
        loadUserCredentials();

        return {
            register: function(user){
                return $q(function(resolve, reject) {
                    Restangular.service('auth/signup').post(user).then(
                        function(response){
                            resolve(response);
                        },
                        function(error){
                            reject(error);
                        }
                    );
                });
            },
            login: function(user) {
                return $q(function(resolve, reject) {
                    Restangular.service('auth/login').post(user).then(
                        function(response){
                            storeUserCredentials(response.token);
                            resolve();
                        },
                        function(error){
                            reject(error);
                        }
                    );
                });
            },
            logout: function() {

                /*
                Destroy token credential for local login
                */
                destroyUserCredentials();

                /*
                Implementado para a session do facebook, pois no momento apenas o local session está utilizando
                Token para autenticação
                */
                return $q(function(resolve, reject) {
                    Auth.one('/logout').get().then(
                        function(response){
                            resolve();
                        },
                        function(error){
                            reject(error);
                        }
                    );
                });


            },
            isAuthenticated: function(){
                return isAuthenticated;
            }
        }

    })

    .factory('Auth', function(Restangular) {
        return Restangular.service('auth');
    })