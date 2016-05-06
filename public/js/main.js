angular.module('studying-node',['ui.router','restangular'])

    // Restangular confidurantion
    .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl('/');

        RestangularProvider.setErrorInterceptor(function(response, deferred, responseHandler) {
            if(response.status === 404) {
                console.log("Oopps, page not found!");
                return false; // error handled
            }
            return true; // error not handled
        });

    })
;
