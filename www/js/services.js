angular.module('starter.services', []).service('userService', function() {
    var user;
    // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
    var setUser = function(user_data) {
        user = user_data;
       // window.localStorage.starter_facebook_user = JSON.stringify(user_data);
    };
    var getUser = function() {
        return user;
       // return JSON.parse(window.localStorage.starter_facebook_user || '{}');
    };
    return {
        getUser: getUser,
        setUser: setUser,

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