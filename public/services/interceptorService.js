angular.module('studying-node')

    .factory('httpErrorResponseInterceptor', function($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError : function error(response) {

                console.log(response.status);

                switch (response.status) {
                    case 401:
                        // $injector.get('$state').go('login', {'status': 401 }, { reload: true });
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        console.log("BROADCAST ENVIADO");
                        break;
                }
                return $q.reject(response);
            }
        };
    })

    .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
            console.log(' RECEBI UM BROADCAST');
            AuthService.logout();
            $state.go('index.login');

        });
    })

;