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
}).controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $location, userService, $state, $q, $ionicLoading, $ionicSideMenuDelegate) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $ionicSideMenuDelegate.canDragContent(false);
    // This is the success callback from the login method
    var fbLoginSuccess = function(response) {
        if (!response.authResponse) {
            fbLoginError("Cannot find the authResponse");
            return;
        }
        var authResponse = response.authResponse;
        getFacebookProfileInfo(authResponse).then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            userService.setUser({
                authResponse: authResponse,
                userID: profileInfo.id,
                name: profileInfo.name,
                email: profileInfo.email,
                picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?redirect=false&type=large"
            });
            $ionicLoading.hide();
            $scope.$root.$broadcast('user-loaded');
            $state.go("tab.cards");
        }, function(fail) {
            // Fail get profile info
            console.log('profile info fail', fail);
        });
    };
    // This is the fail callback from the login method
    var fbLoginError = function(error) {
        console.log('fbLoginError', error);
        $ionicLoading.hide();
    };
    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function(authResponse) {
        var info = $q.defer();
        facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null, function(response) {
            console.log(response);
            info.resolve(response);
        }, function(response) {
            console.log(response);
            info.reject(response);
        });
        return info.promise;
    };
    $scope.regularLogIn = function() {
        $ionicLoading.show({
            template: 'Logging in...'
        });
        $timeout(function() {
            $ionicLoading.hide();
            $state.go("tab.cards");
        }, 500);
    };
    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function() {
        facebookConnectPlugin.getLoginStatus(function(success) {
            if (success.status === 'connected') {
                // The user is logged in and has authenticated your app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed request, and the time the access token
                // and signed request each expire
                console.log('getLoginStatus', success.status);
                // Check if we have our user saved
                var user = {}; //userService.getUser('facebook');
                if (!user.userID) {
                    getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
                        // For the purpose of this example I will store user data on local storage
                        userService.setUser({
                            authResponse: success.authResponse,
                            userID: profileInfo.id,
                            name: profileInfo.name,
                            email: profileInfo.email,
                            picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?redirect=false&type=large"
                        });
                        $scope.$root.$broadcast('user-loaded');
                        $state.go("tab.cards");
                    }, function(fail) {
                        // Fail get profile info
                        console.log('profile info fail', fail);
                    });
                } else {
                    $scope.$root.$broadcast('user-loaded');
                    $state.go("tab.cards");
                }
            } else {
                // If (success.status === 'not_authorized') the user is logged in to Facebook,
                // but has not authenticated your app
                // Else the person is not logged into Facebook,
                // so we're not sure if they are logged into this app or not.
                console.log('getLoginStatus', success.status);
                $ionicLoading.show({
                    template: 'Logging in...'
                });
                // Ask the permissions you need. You can learn more about
                // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
            }
        });
    };
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
})
.controller('SettingsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.initializeUI = function() {

    };
    $scope.initializeLogic = function() {};

    $scope.initializeUI();
    $scope.initializeLogic();
})
.controller('CardDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
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
}).controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $ionicPopover, $ionicActionSheet, $ionicLoading, $timeout, userService, $http) {
    $scope.initializeLogic = function() {
        // Form data for the login modal
        $scope.loginData = userService.getUser;
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
                // Facebook logout
                facebookConnectPlugin.logout(function() {
                    $ionicLoading.hide();
                    $state.go('tab.login');
                }, function(fail) {
                    $ionicLoading.hide();
                });
            }
        });
    };
    $scope.initializeUI();
    $scope.initializeLogic();
});