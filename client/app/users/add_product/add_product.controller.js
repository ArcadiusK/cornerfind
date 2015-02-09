'use strict';

angular.module('cornerfindApp')
    .controller('AddProductCtrl', function($scope,brand,condition, category, $q, products, $mdSidenav, Auth) {

        //GET all Brands and Categories
        $scope.availableBrands = brand.query();
        $scope.availableCategories = category.query();
        $scope.availableConditions = condition.query();
        $scope.userId = Auth.getCurrentUser()._id;


        //Add a new product
        $scope.newProduct = {userId: $scope.userId, category: [], photoUrls: []};
        $scope.newProductDisplay ={category: []};

        $scope.showBrands = false;
        $scope.showCategories = false;

        $scope.selectedBrand = function(selected) {
            $scope.newProduct.brand = selected.name;
            $scope.newProductDisplay.brand = selected.name;
        }

        $scope.selectedCategory = function(selected) {
            if ($scope.newProduct.category.indexOf(selected.name) !== -1){
                var index =$scope.newProduct.category.indexOf(selected.name);
                $scope.newProduct.category.splice(index,1);
                var displayIndex = $scope.newProductDisplay.category.indexOf(selected.name);
                $scope.newProductDisplay.category.splice(displayIndex,1);
                return;
            }
            $scope.newProduct.category.push(selected.name);
            $scope.newProductDisplay.category.push(selected.name);
        }

        $scope.selectedCondition = function(selected) {
            $scope.newProduct.condition = selected.name;
            $scope.newProductDisplay.condition=selected.name;
        }
     

        $scope.addProduct=function(newProduct){
            products.resource.save(newProduct,function(){
                console.log('Save Callback ',arguments)
            });
        }

        //Run this function when the input is changed
        $scope.upload = function(thing){
            //Lines 7 and 8 are reliable ways to pull out the file name so it's saved in a friendly manner in the bucket.
            var file_name = angular.element('#file-upload').val().split('\\');
                file_name = file_name[file_name.length-1];

            console.log(file_name);

            //S3 Upload is a separate client side library I'll attach
              var s3upload = new S3Upload({
                //The file input
                file_dom_selector: 'file-upload',
                //The name from above
                s3_object_name: new Date().getTime() + file_name,
                //The route that will receive the upload and send to S3
                //See below
                s3_sign_put_url: 'api/products/sign_s3',
                //Use this hook for a nice progress bar!
                onProgress: function(percent, message) {
                    console.log('Upload progress: ' + percent + '% ' + message);
                },
                onFinishS3Put: function(public_url) {
                    console.log('Upload completed. Uploaded to: ' + public_url)
                    $scope.$apply(function() {
                        $scope.newProduct.photoUrls.push(public_url);
                    });

                },
                onError: function(status) {
                    console.log('Upload error: ' + status);
                }
            });
        }
    });