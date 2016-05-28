controllers.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $location) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
});