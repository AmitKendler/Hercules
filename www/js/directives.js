angular.module('starter.directives', []).
directive('backImg', function() {
    return {
        scope: {
            backImg: '='
        },
        link: function(scope, element, attrs) {
            var url = scope.backImg;
            element.css({
                'background-image': 'url(' + url + ')',
                'background-size': 'cover'
            });
        }
    }
});