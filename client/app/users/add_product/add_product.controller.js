'use strict';

angular.module('cornerfindApp')
    .controller('AddProductCtrl', function($scope,brand,condition, category, $q, products, $mdSidenav, Auth) {

        //GET all Brands and Categories
        $scope.availableBrands = brand.query();
        $scope.availableCategories = category.query();
        $scope.availableConditions = condition.query();

        //Add a new product
        $scope.newProduct = {category: []};
        $scope.newProductDisplay ={category: []};

        $scope.showBrands = false;
        $scope.showCategories = false;

        $scope.selectedBrand = function(selected) {
            $scope.newProduct.brand = selected._id;
            $scope.newProductDisplay.brand = selected.name;
        }

        $scope.selectedCategory = function(selected) {
            if ($scope.newProduct.category.indexOf(selected._id) !== -1){
                var index =$scope.newProduct.category.indexOf(selected._id);
                $scope.newProduct.category.splice(index,1);
                var displayIndex = $scope.newProductDisplay.category.indexOf(selected.name);
                $scope.newProductDisplay.category.splice(displayIndex,1);
                return;
            }
            $scope.newProduct.category.push(selected._id);
            $scope.newProductDisplay.category.push(selected.name);
        }

        $scope.selectedCondition = function(selected) {
            $scope.newProduct.condition = selected._id;
            $scope.newProductDisplay.condition=selected.name;
        }
     

        $scope.addProduct=function(newProduct){
            products.save(newProduct,function(){
                console.log('Save Callback ',arguments)
            });
        }

        $scope.upload = function(thing) {

        }

    });