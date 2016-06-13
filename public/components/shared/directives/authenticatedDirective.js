(function () {
    'use strict';

    angular.module('studying-node')
        .directive('authenticated',function(AuthService){
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var authenticated = attrs.authenticated;
                    scope.$watch(function () {
                        if( (authenticated === 'true' && !AuthService.isAuthenticated())|| (authenticated === 'false' && AuthService.isAuthenticated())) {
                            element.addClass('hidden');
                        } else {
                            element.removeClass('hidden');
                        }
                    });
                }
            };
        })
    
}());