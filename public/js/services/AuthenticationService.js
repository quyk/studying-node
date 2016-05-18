angular.module('studying-node')

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    })

    .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })

    .factory('AuthService', function($http, $q, Restangular, Auth){

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
        }

        function destroyUserCredentials() {
            authToken = undefined;
            isAuthenticated = false;
            $http.defaults.headers.common.Authorization = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        }

        // call function
        loadUserCredentials();

        return {
            register: function(user){
                return $q(function(resolve, reject) {
                    Auth.one('/signup').post(user).then(
                        function(response){
                            resolve(response.data.msg);
                        },
                        function(error){
                            reject(error.data);
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
                destroyUserCredentials();
            },
            isAuthenticated: function(){
                return isAuthenticated;
            }
        }

    })

    .factory('Auth', function(Restangular) {
        return Restangular.service('auth');
    })