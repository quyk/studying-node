(function () {
    'use strict'

    angular.module('studying-node')

        .config(function ($stateProvider) {
            $stateProvider
                .state('home',{
                    url: '/',
                    views: {
                        'content@':{
                            templateUrl: 'components/home/home-view.html'
                        }
                    }
                })

        })

})();