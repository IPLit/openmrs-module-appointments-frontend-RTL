'use strict';

angular.module('bahmni.appointments')
    .controller('AllAppointmentServicesController', ['$scope', '$state', '$location', 'spinner',
        'appointmentsServiceService', 'appService', 'ngDialog',
        function ($scope, $state, $location, spinner, appointmentsServiceService, appService, ngDialog) {
            $scope.enableSpecialities = appService.getAppDescriptor().getConfigValue('enableSpecialities');
            $scope.createService = function () {
                $state.go('home.admin.service.edit', {uuid: 'new'});
            };

            $scope.editService = function (uuid) {
                $state.go('home.admin.service.edit', {uuid: uuid});
            };

            $scope.deleteAppointmentService = function (service) {
                service.name = appointmentsServiceService.decodeDecompress(service.name);
                ngDialog.open({
                    plain: true,
                    template: require('../../views/admin/deleteAppointmentService.html'),
                    className: 'ngdialog-theme-default',
                    data: {service: service},
                    controller: 'deleteAppointmentServiceController'
                });
            };

            var init = function () {
                return appointmentsServiceService.getAllServices().then(function (response) {
                    $scope.appointmentServices = response.data;
                });
            };

            $scope.decode = function (text) {
                return appointmentsServiceService.decodeDecompress(text || '');
            };

            return spinner.forPromise(init());
        }]);
