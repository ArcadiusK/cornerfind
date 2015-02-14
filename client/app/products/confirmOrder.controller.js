'use strict';

angular.module('cornerfindApp')
    .controller('ConfirmOrderCtrl', function($q, $scope, $state, offer, Auth, Address, $cookieStore) {
        $scope.currentUser = Auth.getCurrentUser();
        // $scope.order = offer.getOrder();
        //if get order returns things, add the cookie
        //otherwise pull the cookie that's already there
        $scope.order = $cookieStore.get('order');
        $scope.shippingAddress = $cookieStore.get('shippingAddress');
        $scope.cardInfo = $cookieStore.get('cardInfo')
        $scope.prodId = $scope.order.lineItems[0].productId;
        console.log($scope.shippingAddress)

        $scope.submitOrder = function() {
            $scope.submitted = true;
            var order = $scope.order;
            var orderForCreation = {
                lineItems: order.lineItems,
                sellerId: order.sellerId,
                buyerId: order.buyerId,
                status: 'offer'
            };

            var shipping = $scope.shippingAddress;
            var shippingAddress = {
                userId: $scope.currentUser._id,
                name: shipping.name,
                billing: false,
                street1: shipping.street1,
                street2: shipping.street2,
                city: shipping.city,
                state: shipping.state,
                zip: shipping.zip
            }

            // offer.resource.save(orderForCreation,function(result){
            // 	toast('Successfully Submitted!',4000);
            // 	$cookieStore.remove('order');
            // 	offer.setOrder({});
            // },function(err){
            // 	if(err) {console.log('Error ',err)}
            // })


            var orderDeferral = $q.defer();
            var addressDeferral = $q.defer();

            offer.resource.save(orderForCreation, function(result) {
                orderDeferral.resolve(result);
            }, function(err) {
                if (err) {
                    console.log('Error ', err)
                }
            })

            Address.updateAddress({
                id: $scope.currentUser._id
            }, shippingAddress, null, function(results) {
            	addressDeferral.resolve(results)
            	console.log('APROMISE ',addressDeferral)
            })

            $q.all([orderDeferral.promise, addressDeferral.promise]).then(function(results) {
                $cookieStore.remove('order');
                $cookieStore.remove('cardInfo');
                $cookieStore.remove('shippingAddress');

                toast('Success!',4000)
            }, function(err) {
                console.log("ERROR ", err)
            })
        }

    })