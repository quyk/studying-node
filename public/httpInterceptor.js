angular.module('studying-node')

    .factory('httpErrorResponseInterceptor', function($rootScope, $q) {
        return {
            responseError : function error(response) {

                switch (response.status) {
                    case 401:
                        console.log('401');
                        // AuthService.logout();
                        // $state.go('index');
                        break;
                    case 403:
                        console.log('403');
                        // AuthService.logout();
                        // $state.go('index');
                        break;
                    case 404:
                        console.log('404');
                        // AuthService.logout();
                        // $state.go('index');
                        break;
                }
                return $q.reject(response);
            }
        };
    })
;