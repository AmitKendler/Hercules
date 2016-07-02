// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.directives', 'ionic-material', 'ImgCache']).constant('API_END_POINT', {
    url: 'http://localhost:8100/api'
}).constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
}).constant('USER_ROLES', {
    admin: 'admin_role',
    normal: 'normal_role',
    master: 'master_role'
}).run(function($ionicPlatform, $rootScope, authService,$state, $cordovaSQLite, ImgCache) {
    $ionicPlatform.ready(function() {
        ImgCache.$init();
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {
            if ('data' in next && 'authorizedRoles' in next.data) {
                var authorizedRoles = next.data.authorizedRoles;
                if (!authService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    $state.go($state.current, {}, {
                        reload: true
                    });
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                }
            }
            if (!authService.isAuthenticated()) {
                if (next.name !== 'tab.login') {
                    event.preventDefault();
                    $state.go('tab.login');
                }
            }
        });
        //  db = $cordovaSQLite.openDB("hercules.db");
        //  $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    });
}).config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        // Each tab has its own nav history stack:
        .state('tab.places', {
            url: '/places',
            views: {
                'menuContent': {
                    templateUrl: 'templates/places.html',
                    controller: 'PlacesCtrl'
                },
                'fabContent': {
                    template: '<button id="fab-activity" ng-click="scanBarcode()" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-qr-scanner"></i></button>',
                    controller: 'ScannerCtrl'
                }
            }
        }).state('tab.cards', {
            url: '/cards',
            views: {
                'menuContent': {
                    templateUrl: 'templates/cards.html',
                    controller: 'CardsCtrl'
                },
                'fabContent': {
                    template: '<button id="fab-activity" ng-click="scanBarcode()" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-qr-scanner"></i></button>',
                    controller: 'ScannerCtrl'
                }
            }
        }).state('tab.card-detail', {
            url: '/cards/:cardId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/card-detail.html',
                    controller: 'CardDetailCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        }).state('tab.settings', {
            url: '/settings',
            views: {
                'menuContent': {
                    templateUrl: 'templates/settings.html',
                    controller: 'SettingsCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        }).state('tab.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/login');
});