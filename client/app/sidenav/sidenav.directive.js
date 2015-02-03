'use strict';

angular.module('cornerfindApp')
    .directive('sidenav', function($mdSidenav) {
        return {
            templateUrl: 'app/sidenav/sidenav.html',
            restrict: 'EA',
            scope: {selection:'=',
        			onItemClick: "&",
        			buttonText :'@',
                    sidebarid: '@'
        			},
            link: function(scope, element, attrs) {
                  scope.id = scope.sidebarid;
            	  scope.openLeftMenu = function() {
                   console.log('AAAA',scope.sidebarid);
                     console.log($mdSidenav())
                    $mdSidenav(scope.sidebarid).toggle();
                    
                };


            },
            controller: function($scope) {
              
            }
        }
    });