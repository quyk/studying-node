(function () {
    'use strict';

    angular.module('dt.alert',[])

        .directive('dtAlert', function (dtAlertService) {
            return{
                restrict: 'AE',
                template: '<uib-alert ng-repeat="alert in ctrl.alerts" type="{{alert.type}}" close="ctrl.closeAlert($index)">{{alert.msg}}</uib-alert>',
                controller: function(){
                    this.dtAlertService = dtAlertService;

                    this.alerts = this.dtAlertService .alerts;

                    this.closeAlert = function (index) {
                        this.dtAlertService.closeAlert(index);
                    }
                },
                controllerAs: 'ctrl'
            }
        })

        .factory('dtAlertService', function () {
            var alertService = {};

            // create an array of alerts
            alertService.alerts = [];

            alertService.add = function (type, msg) {
                alertService.alerts.push({ 'type': type, 'msg': msg });
            };

            alertService.closeAlert = function (index) {
                alertService.alerts.splice(index, 1);
            };

            return alertService;
        })
}());