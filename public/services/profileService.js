angular.module('studying-node')

    .factory('ProfileService', function($rootScope, $http, $q, $auth, Profile, Restangular, Auth){

        return {
            getProfile: function(){
                return Profile.one().get();
            }
        }

    })

    .factory('Profile', function(Restangular) {
        return Restangular.service('profile');
    })