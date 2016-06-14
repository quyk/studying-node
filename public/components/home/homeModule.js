(function () {
    'use strict'

    angular.module('studying-node')

        .config(function ($stateProvider) {
            $stateProvider
                .state('home',{
                    url: '/',
                    views: {
                        'user-info@':{
                            templateUrl: 'components/home/user-info-view.html',
                            controller: 'UserInfoCtrl'
                        },
                        'content@':{
                            templateUrl: 'components/home/home-view.html'
                        }
                    }
                })
        })
        .controller('UserInfoCtrl',['$scope', 'AuthService', 'ProfileService', function($scope, AuthService, ProfileService){
            if(AuthService.isAuthenticated()) {
                ProfileService.getProfile()
                    .then(function (response) {
                        $scope.profile = {
                            picture: response.data.picture || ""
                        };
                    })
            }
        }])

})();