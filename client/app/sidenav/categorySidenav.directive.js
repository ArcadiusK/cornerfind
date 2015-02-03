'use strict';

angular.module('cornerfindApp')
    .directive('categorysidenav', function($mdSidenav) {
        return {
            templateUrl: 'app/sidenav/categorySidenav.html',
            restrict: 'EA',
            scope: {selection:'=',
        			onItemClick: "&",
        			buttonText :'@'
        			},
            link: function(scope, element, attrs) {
                  scope.id = scope.sidebarid;
            	  scope.openLeftMenu = function() {
                    $mdSidenav("categories").toggle();
                    
                };


            },
            controller: function($scope) {
              
            }
        }
    });