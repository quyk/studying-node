(function () {
    'use strict';

    angular.module('studying-node')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('home.service',{
                    url: 'service',
                    abstract: true
                })
                .state('home.service.create',{
                    url: '/create',
                    views: {
                        'content@':{
                            templateUrl: 'components/service/service-create-view.html',
                            controller: 'ServiceCreateCtrl'
                        }
                    }
                })
        }])

})();