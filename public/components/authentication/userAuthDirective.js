angular.module('authentication')
    .directive('cUserAuth',[ function(){
        return {
            scope: {},
            templateUrl: 'components/authentication/views/auth.html',
            replace: true,
            controller: 'AuthCtrl',
            controllerAs: 'ctrl'
        };
    }])