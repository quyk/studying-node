angular.module('studying-node')

    .factory('ProfileService', function($rootScope, $http, $q, $auth, User, Restangular, Auth){

        return {
            getProfile: function(){
                return User.one('profile').get();
            },
        }

    })

    .factory('User', function(Restangular) {
        return Restangular.service('user');
    })