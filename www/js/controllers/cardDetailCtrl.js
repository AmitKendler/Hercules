controllers.controller('CardDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
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
    }
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
    }
    $scope.initializeUI();
    $scope.initializeLogic();
});