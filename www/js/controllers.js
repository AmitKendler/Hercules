angular.module('starter.controllers', []).controller('PlacesCtrl', function($scope) {}).controller('ScannerCtrl', function($scope, $timeout, scannerService, $location) {
    $timeout(function() {
        document.getElementById('fab-activity').classList.toggle('on');
    }, 200);
    $scope.scanBarcode = function() {
        scannerService.scan().then(function(imageData) {
            $location.path('tab/cards/1');
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
}).controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $location, authService, $state, $q, $ionicLoading, $ionicSideMenuDelegate) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.regularLogIn = function() {
        $ionicLoading.show({
            template: 'Logging in...'
        });
        $timeout(function() {
            $ionicLoading.hide();
            $state.go("tab.cards");
        }, 500);
    };
    $scope.facebookLogin = function() {
        authService.facebookSignIn();
    };
    $scope.$root.$on('user-loaded', function() {
        $state.go("tab.cards");
    });
}).controller('CardsCtrl', function($scope, Chats, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {
    $scope.initializeUI = function() {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab('right');
        $timeout(function() {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
            });
        }, 200);
        // Activate ink for controller
        ionicMaterialInk.displayEffect();
        $ionicSideMenuDelegate.canDragContent(true);
    };
    $scope.initializeLogic = function() {};
    $scope.initializeUI();
    $scope.initializeLogic();
}).controller('SettingsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.initializeUI = function() {};
    $scope.initializeLogic = function() {};
    $scope.initializeUI();
    $scope.initializeLogic();
}).controller('CardDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.initializeUI = function() {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);
        // Set Motion 
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);
        // Set Ink
        ionicMaterialInk.displayEffect();
        $scope.currentView = 1;
    };
    $scope.initializeLogic = function() {
        $scope.card = {
            "name": "כרטיסיית ארומה",
            "stamps": [
                [{
                    "index": 1,
                    "isChecked": true
                }, {
                    "index": 2,
                    "isChecked": true
                }],
                [{
                    "index": 3,
                    "isChecked": true
                }, {
                    "index": 4,
                    "isChecked": true
                }],
                [{
                    "index": 5,
                    "isChecked": false
                }, {
                    "index": 6,
                    "isChecked": false
                }],
                [{
                    "index": 7,
                    "isChecked": false
                }, {
                    "index": 8,
                    "isChecked": false
                }],
                [{
                    "index": 9,
                    "isChecked": false
                }, {
                    "index": 10,
                    "isChecked": false
                }]
            ]
        };
    };
    $scope.initializeUI();
    $scope.initializeLogic();
}).controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $ionicPopover, $ionicActionSheet, $ionicLoading, $timeout, authService, $http,AUTH_EVENTS) {
    $scope.initializeLogic = function() {
        // Form data for the login modal
        $scope.loginData = authService.user;
    };
    $scope.initializeUI = function() {
        $scope.isExpanded = false;
        $scope.hasHeaderFabLeft = false;
        $scope.hasHeaderFabRight = false;
        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        }
        ////////////////////////////////////////
        // Layout Methods 
        ////////////////////////////////////////
        $scope.hideNavBar = function() {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        };
        $scope.showNavBar = function() {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        };
        $scope.noHeader = function() {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };
        $scope.setExpanded = function(bool) {
            $scope.isExpanded = bool;
        };
        $scope.setHeaderFab = function(location) {
            var hasHeaderFabLeft = false;
            var hasHeaderFabRight = false;
            switch (location) {
                case 'left':
                    hasHeaderFabLeft = true;
                    break;
                case 'right':
                    hasHeaderFabRight = true;
                    break;
            }
            $scope.hasHeaderFabLeft = hasHeaderFabLeft;
            $scope.hasHeaderFabRight = hasHeaderFabRight;
        };
        $scope.hasHeader = function() {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (!content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };
        $scope.hideHeader = function() {
            $scope.hideNavBar();
            $scope.noHeader();
        };
        $scope.showHeader = function() {
            $scope.showNavBar();
            $scope.hasHeader();
        };
        $scope.clearFabs = function() {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };
        $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
            var alertPopup = $ionicPopup.alert({
                title: 'אין הרשאה',
                template: 'אתה לא רשאיש לגשת לתוכן זה'
            });
        });
        $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
            AuthService.logout();
            $state.go('tab.login');
            var alertPopup = $ionicPopup.alert({
                title: 'החיבור אבד',
                template: 'אנא התחבר מחדש.'
            });
        });
    };
    $scope.showLogOutMenu = function() {
        var hideSheet = $ionicActionSheet.show({
            destructiveText: 'התנתק',
            titleText: "?אתה בטוח שצרתה להתנתק מהאפליקציה המדהימה הזאת",
            cancelText: 'ביטול',
            cancel: function() {},
            buttonClicked: function(index) {
                return true;
            },
            destructiveButtonClicked: function() {
                $ionicLoading.show({
                    template: 'Logging out...'
                });
                authService.logout();
                return true;
            }
        });
    };
    $scope.initializeUI();
    $scope.initializeLogic();
});