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

    .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
        $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

            var authorizedResouces = [
                'index',
                'index.login',
                'index.signup'
            ];

            if (!AuthService.isAuthenticated()) {
                if (authorizedResouces.indexOf(next.name) < 0) {
                    event.preventDefault();
                    $state.go('index.login');
                }
            }
        });
    })

    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated',
        isAuthenticated: 'is-authenticated'
    })

;
