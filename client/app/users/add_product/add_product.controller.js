'use strict';

angular.module('cornerfindApp')
    .controller('AddProductCtrl', function($scope,brand,condition, category, $q, products, $mdSidenav, Auth) {


        //GET all Brands and Categories
        $scope.availableBrands = brand.query();
        $scope.availableCategories = category.query();
        $scope.availableConditions = condition.query();
        //Add a new product
        $scope.newProduct = {
            category: []
        };

        $scope.newProductDisplay ={
              category: []
        };

        

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



        // $scope.addProduct = function() {



        //     $scope.currentUser = Auth.getCurrentUser();
        //     $scope.tagObjects = [];
        //     $scope.products = [];
        //     $scope.availableCategories = category.query();


        //     // brand.query();

        //     if ($scope.name === '') return;
        //     if ($scope.price === '') return;
        //     if ($scope.description === '') return;

        //     //CREATING NEW TAG OBJECTS

        //     //For each tag in scope, call Tags.save and create an array of $q promises.
        //     var promises = [];

        //     angular.forEach($scope.tags, function(tag) {
        //         var promise = Tags.save({
        //             name: tag
        //         });
        //         promises.push(promise.$promise);
        //     });
        //     var tagsPromise = $q.all(promises);

        //     tagsPromise.then(function(tags) {

        //         $scope.tagObjects = tags.map(function(tag) {
        //             return tag._id
        //         });

        //         //Saving new product in DB
        //         products.save({
        //             name: $scope.name,
        //             desc: $scope.description,
        //             price: $scope.price,
        //             category: $scope.category,
        //             userId: $scope.currentUser._id,
        //             media: $scope.product_images,
        //         }, function(err, product) {
        //             if (err) {
        //                 // console.log(err)
        //             };

        //             $scope.product = product;
        //         })

        //     })


        // }




        $scope.upload = function(thing) {

        }

    });