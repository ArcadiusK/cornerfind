'use strict';

angular.module('cornerfindApp')
    .controller('EditProfileCtrl', function($scope, Auth) {
        // Get logged in user object
        $scope.currentUser = Auth.getCurrentUser();

        // cached used object
        $scope.user = {};

        $scope.buttonText = '';

        $scope.updateUser = function() {

          User.update(currentUser._id,$scope.user,function(res){
              $scope.buttonText = 'User Updated!';
             console.log('Save Callback ', arguments);
                toast('User profile updated!', 4000);
         })


            User.update($scope.user, function() {
                console.log('Save Callback ', arguments)
                toast('User profile updated!', 4000);
            });
        }


        //Run this function when the input is changed
        $scope.upload = function(thing) {
            //Lines 7 and 8 are reliable ways to pull out the file name so it's saved in a friendly manner in the bucket.
            var file_name = angular.element('#file-upload').val().split('\\');
            file_name = file_name[file_name.length - 1];

            console.log('filename', file_name);

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
                        $scope.user.picture(public_url);
                    });

                },
                onError: function(status) {
                    console.log('Upload error: ' + status);
                }
            });
        }


    });