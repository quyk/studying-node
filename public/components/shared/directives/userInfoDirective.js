(function () {
    'use strict';

    angular.module('studying-node')

        .directive('userInfo',['AuthService', 'ProfileService', function (AuthService, ProfileService) {
            return{
                restrict: 'E',
                templateUrl: 'components/shared/directives/user-info-template.html',
                controller: function($scope){
                    $scope.isAuthenticated = AuthService.isAuthenticated();
                    console.log('Controller := ' + AuthService.isAuthenticated());

                    $scope.$watch(AuthService.isAuthenticated(), function () {
                        console.log('Controller Watch := ' + AuthService.isAuthenticated());
                    });
                },
                link: function (scope, element, attrs) {
                    scope.$watch(AuthService.isAuthenticated(), function () {

                        console.log('Link := ' + AuthService.isAuthenticated());

                          if(AuthService.isAuthenticated()) {
                            ProfileService.getProfile()
                                .then( function (response) {
                                    console.log(response);
                                    scope.profile = {
                                        picture: response.data.picture || ""
                                    };
                                })
                        }
                    });
                }
            }
        }])

}());