angular.module('studying-node')
    .factory('httpErrorResponseInterceptor', function($injector, $q){
        return {
            response : function(responseData) {
                return responseData;
             },
            responseError : function error(response) {

                var $state = $injector.get('$state');

                switch (response.status) {
                    case 401:
                        $state.go('auth', {}, { reload: true });
                        break;
                }
                return $q.reject(response);
            }
        };
        return {};
    })