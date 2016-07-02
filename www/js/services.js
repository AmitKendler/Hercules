angular.module('starter.services', []).service('authService', function($q, $http, $rootScope, $state, USER_ROLES, $ionicLoading) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var user = {};
    var isAuthenticated = false;
    var role = '';
    var authToken;

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }

    function useCredentials(token) {
        username = token.split('.')[0];
        isAuthenticated = true;
        role = USER_ROLES.normal
            // Set the token as header for your requests!
        $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        isAuthenticated = false;
        $http.defaults.headers.common['X-Auth-Token'] = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }
    var logout = function() {
        destroyUserCredentials();
        // Facebook logout
        facebookConnectPlugin.logout(function() {
            $ionicLoading.hide();
            $state.go('tab.login');
        }, function(fail) {
            $ionicLoading.hide();
        });
    };
    var isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };
    // This is the success callback from the login method
    var fbLoginSuccess = function(response) {
        if (!response.authResponse) {
            fbLoginError("Cannot find the authResponse");
            return;
        }
        var authResponse = response.authResponse;
        getFacebookProfileInfo(authResponse).then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            user = {
                authResponse: authResponse,
                userID: profileInfo.id,
                name: profileInfo.name,
                email: profileInfo.email
            };
            $ionicLoading.hide();
            storeUserCredentials(user.name + "." + user.authResponse.accessToken);
            $rootScope.$broadcast('user-loaded');
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
    var facebookSignIn = function() {
        facebookConnectPlugin.getLoginStatus(function(success) {
            if (success.status === 'connected') {
                // The user is logged in and has authenticated your app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed request, and the time the access token
                // and signed request each expire
                console.log('getLoginStatus', success.status);
                // Check if we have our user saved
                if (!isAuthenticated) {
                    getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
                        // For the purpose of this example I will store user data on local storage
                        user = {
                            authResponse: success.authResponse,
                            userID: profileInfo.id,
                            name: profileInfo.name,
                            email: profileInfo.email
                        };
                        storeUserCredentials(user.name + "." + user.authResponse.accessToken);
                        $rootScope.$broadcast('user-loaded');
                    }, function(fail) {
                        // Fail get profile info
                        console.log('profile info fail', fail);
                    });
                } else {
                    $rootScope.$broadcast('user-loaded');
                }
            } else {
                // If (success.status === 'not_authorized') the user is logged in to Facebook,
                // but has not authenticated your app
                // Else the person is not logged into Facebook,
                // so we're not sure if they are logged into this app or not.
                $ionicLoading.show({
                    template: 'Logging in...'
                });
                // Ask the permissions you need. You can learn more about
                // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
            }
        });
    };
    loadUserCredentials();
    return {
        facebookSignIn: facebookSignIn,
        logout: logout,
        isAuthorized: isAuthorized,
        isAuthenticated: function() {
            return isAuthenticated;
        },
        user: function() {
            return user;
        },
        role: function() {
            return role;
        }
    };
}).factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function(response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized
            }[response.status], response);
            return $q.reject(response);
        }
    };
}).factory('scannerService', function($cordovaBarcodeScanner) {
    return {
        scan: function() {
            console.log("opening scanner..");
            return $cordovaBarcodeScanner.scan();
        }
    };
}).factory('cardsService', function() {
    return {
        getCardByBarcodeId: function(cardId) {
            // random 
            return {
                "id": 1,
                "totalStamps:": 10,
                "currentStamps": 4,
                "finishedStamp": false,
                "isFirstTime": false,
                "placeId": 12
            };
        }
    };
}).factory('api', function($http, API_END_POINT) {
    var addStamp = function(stampCode) {};
    var getAllCards = function() {};
    var getAllGifts = function() {};
    return {
        addStamp: addStamp,
        getAllCards: getAllCards,
        getAllGifts: getAllGifts
    };
}).factory('placesService', function() {
    return {
        getPlaceById: function(cardId) {
            // random 
            return {
                "id": 1,
                "totalStamps:": 10,
                "currentStamps": 4,
                "finishedStamp": false,
                "isFirstTime": false,
                "placeId": 12
            };
        }
    };
}).factory('Chats', function() {
    // Might use a resource here that returns a JSON array
    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];
    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});