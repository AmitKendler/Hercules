controllers.controller('PlacesCtrl', function($scope) {}).controller('ScannerCtrl', function($scope, $timeout, scannerService,$location) {
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
});