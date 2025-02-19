'use strict';

angular
    .module('bahmni.appointments')
    .config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$bahmniTranslateProvider', '$compileProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider, $bahmniTranslateProvider, $compileProvider) {
            $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = true;
            $urlRouterProvider.otherwise('/home/manage/summary');
            $urlRouterProvider.when('/home/manage', '/home/manage/summary');
        // @if DEBUG='production'
            $compileProvider.debugInfoEnabled(false);
        // @endif

        // @if DEBUG='development'
            $compileProvider.debugInfoEnabled(true);
        // @endif
            $stateProvider
            .state('home', {
                url: '/home',
                abstract: true,
                views: {
                    'additional-header': {
                        template: require('./views/appointmentsHeader.html'),
                        controller: 'AppointmentsHeaderController'
                    },
                    'mainContent': {
                        template: '<div class="opd-wrapper appointments-page-wrapper">' +
                        '<div ui-view="content" class="opd-content-wrapper appointments-content-wrapper"></div>' +
                        '</div>'
                    }
                },
                data: {
                    backLinks: []
                },
                resolve: {
                    initializeConfig: ['initialization', '$stateParams', function (initialization, $stateParams) {
                            return initialization($stateParams.appName);
                        }
                    ]}
            }).state('home.manage', {
                url: '/manage',
                views: {
                    'content': {
                        template: require('./views/manage/appointmentsManage.html'),
                        controller: 'AppointmentsManageController'
                    }
                }
            }).state('home.manage.summary', {
                url: '/summary',
                tabName: 'summary',
                params: {
                    viewDate: null
                },
                views: {
                    'content@manage': {
                        template: require('./views/manage/appointmentsSummary.html'),
                        controller: 'AppointmentsSummaryController'
                    }
                }
            }).state('home.manage.appointments', {
                url: '/appointments',
                params: {
                    filterParams: {},
                    isFilterOpen: true,
                    isSearchEnabled: false
                },
                views: {
                    'filter': {
                        template: require('./views/manage/appointmentFilter.html'),
                        controller: 'AppointmentsFilterController'
                    },
                    'content@manage': {
                        template: require('./views/manage/allAppointments.html'),
                        controller: 'AllAppointmentsController'
                    }

                }
            }).state('home.manage.appointments.calendar', {
                url: '/calendar',
                tabName: 'calendar',
                params: {
                    viewDate: null,
                    doFetchAppointmentsData: true,
                    appointmentsData: null,
                    weekView: false
                },
                views: {
                    'content@viewAppointments': {
                        template: require('./views/manage/calendar/calendarView.html'),
                        controller: 'AppointmentsCalendarViewController'
                    }
                }
            }).state('home.manage.appointments.calendar.new', {
                url: '/new',
                params: {
                    appointment: null
                },
                views: {
                    'content@appointment': {
                        template: '<react-add-appointment-wrapper />'
                    }
                },
                resolve: {
                    appointmentContext: ['appointmentInitialization', '$stateParams', function (appointmentInitialization, $stateParams) {
                        return appointmentInitialization($stateParams);
                    }],
                    appointmentCreateConfig: ['initializeConfig', 'appointmentConfigInitialization', 'appointmentContext', function (initializeConfig, appointmentConfigInitialization, appointmentContext) {
                        return appointmentConfigInitialization(appointmentContext);
                    }]
                }
            }).state('home.manage.appointments.calendar.edit', {
                url: '/:uuid?isRecurring',
                params: {
                    isRecurring: null
                },
                views: {
                    'content@appointment': {
                        template: '<react-add-appointment-wrapper />'
                    }
                }
            }).state('home.manage.appointments.list', {
                url: '/list',
                tabName: 'list',
                params: {
                    viewDate: null,
                    patient: null,
                    doFetchAppointmentsData: true,
                    appointmentsData: null
                },
                views: {
                    'content@viewAppointments': {
                        template: require('./views/manage/list/listView.html'),
                        controller: 'AppointmentsListViewController'
                    }
                }
            }).state('home.manage.appointments.list.new', {
                url: '/new',
                views: {
                    'content@appointment': {
                        template: '<react-add-appointment-wrapper />'
                    }
                },
                resolve: {
                    appointmentContext: ['appointmentInitialization', '$stateParams', function (appointmentInitialization, $stateParams) {
                        return appointmentInitialization($stateParams);
                    }],
                    appointmentCreateConfig: ['initializeConfig', 'appointmentConfigInitialization', 'appointmentContext', function (initializeConfig, appointmentConfigInitialization, appointmentContext) {
                        return appointmentConfigInitialization(appointmentContext);
                    }]
                }
            }).state('home.manage.appointments.list.edit', {
                url: '/:uuid?isRecurring',
                params: {
                    isRecurring: null
                },
                views: {
                    'content@appointment': {
                        template: '<react-add-appointment-wrapper />'
                    }
                }
            }).state('home.admin', {
                url: '/admin',
                abstract: true,
                views: {
                    'content': {
                        template: require('./views/admin/appointmentsAdmin.html')
                    }
                }
            }).state('home.admin.service', {
                url: '/service',
                views: {
                    'content@admin': {
                        template: require('./views/admin/allAppointmentServices.html'),
                        controller: 'AllAppointmentServicesController'
                    }
                }
            }).state('home.admin.service.edit', {
                url: '/:uuid',
                views: {
                    'content@admin': {
                        template: require('./views/admin/appointmentService.html'),
                        controller: 'AppointmentServiceController'
                    }
                },
                resolve: {
                    appointmentServiceContext: ['appointmentServiceInitialization', '$stateParams', function (appointmentServiceInitialization, $stateParams) {
                        return appointmentServiceInitialization($stateParams.uuid);
                    }
                    ]                }
            });

            $bahmniTranslateProvider.init({app: 'appointments', shouldMerge: true});
        }]).run(['$window', '$rootScope', function ($window, $rootScope) {
            // moment.locale($window.localStorage["NG_TRANSLATE_LANG_KEY"] || "en");

			$rootScope.userLanguageDirRtl = false;
            $rootScope.languageUser = $window.localStorage["NG_TRANSLATE_LANG_KEY"] || "en";
            if ($window.localStorage["NG_TRANSLATE_LANG_KEY"] === 'ar') {
                $rootScope.userLanguageDirRtl = true;
            }

        }]);
