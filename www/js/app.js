// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.directives', 'ionic-material', 'ImgCache']).run(function($ionicPlatform, $cordovaSQLite, ImgCache) {
    $ionicPlatform.ready(function() {
        ImgCache.$init();
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
        if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        //  db = $cordovaSQLite.openDB("hercules.db");
        //  $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    });
}).config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
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
        })
        .state('tab.settings', {
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
        })

        .state('tab.login', {
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