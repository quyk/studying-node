angular.module('studying-node',['ui.router','restangular'])

    // Restangular confidurantion
    .config(function(RestangularProvider, $httpProvider) {
        $httpProvider.interceptors.push('httpErrorResponseInterceptor');
        RestangularProvider.setBaseUrl('/');
    })

    // run to initial state
    .run(function ($state) {
        $state.transitionTo('index');
    })
;
