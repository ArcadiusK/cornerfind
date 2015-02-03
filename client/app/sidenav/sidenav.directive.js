'use strict';

angular.module('cornerfindApp')
    .directive('sidenav', function($mdSidenav) {
        return {
            templateUrl: 'app/sidenav/sidenav.html',
            restrict: 'EA',
            scope: {brands:'=',
        			onItemClick: "&"
        			},
            link: function(scope, element, attrs) {
            	  scope.openLeftMenu = function() {
                    $mdSidenav('left').toggle();
                    
                };


            },
            controller: function($scope) {
              
            }
        }
    });