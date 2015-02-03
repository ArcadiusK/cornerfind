'use strict';

angular.module('cornerfindApp')
  .controller('AddProductCtrl', function ($scope, brand,category, $q, products,$mdSidenav,Auth) {
   $scope.availableBrands = brand.query();
    //Add a new product
    $scope.newProduct={};

    $scope.selected = function(selected){
        $scope.newProduct[key]=value;
        console.log('Selected ',selected)
    };

    $scope.selectedBrand = function(selected){
        $scope.newProduct["brand"] = selected.name;
        console.log('SELECTED ',selected)
    }















    $scope.addProduct = function() {


        $scope.openLeftMenu = function() {
                    $mdSidenav('left').toggle();
                };

        $scope.currentUser = Auth.getCurrentUser();
        $scope.tagObjects = [];
        $scope.products = [];
        $scope.availableCategories = category.query();
        

        // brand.query();

        if ($scope.name === '') return;
        if ($scope.price === '') return;
        if ($scope.description === '') return;
        
        //CREATING NEW TAG OBJECTS

        //For each tag in scope, call Tags.save and create an array of $q promises.
        var promises = [];

        angular.forEach($scope.tags, function(tag) {
            var promise = Tags.save({
                name: tag
            });
            promises.push(promise.$promise);
        });
        var tagsPromise = $q.all(promises);

        tagsPromise.then(function(tags) {

            $scope.tagObjects = tags.map(function(tag) {
                return tag._id
            });

            //Saving new product in DB
            products.save({
                name: $scope.name,
                desc: $scope.description,
                price: $scope.price,
                category: $scope.category,
                userId: $scope.currentUser._id,
                media: $scope.product_images,
            }, function(err, product) {
                if (err) {
                    // console.log(err)
                };

                $scope.product = product;
            })

        })


    }




     $scope.upload = function(thing) {
             
    }

  });
