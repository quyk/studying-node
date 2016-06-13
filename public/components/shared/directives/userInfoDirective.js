(function () {
    'use strict';

    angular.module('studying-node')

        .directive('userInfo', function (AuthService) {
            return{
                restrict: 'E',
                templateUrl: 'components/shared/directives/user-info-template.html',
                controller: 'UserInfoCtrl',
                controllerAs: 'ctrl'
            }
        })

        .controller('UserInfoCtrl',['$scope','AuthService', 'ProfileService', function ($scope, AuthService, ProfileService) {

            var isAuthenticated = AuthService.isAuthenticated();

            console.log(isAuthenticated);

            /*$scope.isAuthenticated = isAuthenticated;

            if(isAuthenticated === true){
                ProfileService.getProfile()
                    .then( function (response) {
                        $scope.profile = {
                            picture: response.data.picture || ""
                        };
                    })
            }*/


            /*$scope.logout = function(){
                AuthService.logout().then(
                    function(){
                        $state.go('index',{},{reload: true});
                    })
                    .catch(function(error) {
                        console.log(error);
                    });;*/


        }])

}());