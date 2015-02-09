'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    stripe = require('stripe')('sk_test_kbZLZCeD7MoHX28rIB9Uoavi'),
    Q = require('q');

var OrderSchema = new Schema({
  lineItems: [
    { productId: {type: Schema.Types.ObjectId, ref: 'Product'},
      name: {type: String},
      purchasePrice: {type: Number, required: true,min: 0},
      qty: {type: Number, min: 1, default:1},
      shippingHandling: {type: Number, default:499}}
    ],
    
  sellerId: {type: Schema.Types.ObjectId, ref: 'User'},
  buyerId: {type: Schema.Types.ObjectId, ref: 'User'},
  orderShippingHandling: {type: Number},
  orderTotal: {type: Number, min: 0},
  status: {type:String, enum: ['offer','accepted','shipped','received','issues']}
});



OrderSchema.pre('save',function(next){
  var total=0;
  this.lineItems.forEach(function(item){  //Async here?     question
    total+= item.purchasePrice*item.qty
  });
  this.orderTotal = total;
  next();
});

//need a setter for the status enum

OrderSchema.statics = {
  getBuyersOffers: function(buyerId){
  return this.find(
      {$and:[{buyerId:buyerId},
            {
              status: {
                $in: ["offer","accepted","shipped"]
              }
          } 
      ]}
      ).populate('sellerId').populate('lineItems.productId').exec();
  }
};

// OrderSchema.statics.createStripeCharge = function(info, res) {
//   var deferral = Q.defer();
//   var charge = stripe.charges.create({
//       amount: info.total*100,
//       currency: 'usd',
//       card: info.billing.stripeToken,
//       description: info.billing.email,
//       capture: false
//     }, function(err,charge) {
//           if(err && err.type === 'StripeCardError') {
//             return res.send(500, err)
//           }
//           deferral.resolve(charge);
//     });
//     return deferral.promise;
// };


// OrderSchema.statics.captureStripeCharge = function(chargeId) {
//   stripe.charges.capture(chargeId, function(err,charge) {
//         console.log(charge);
//           if(err && err.type === 'StripeCardError') {
//             return res.send(500, err)
//           }
//     });
// }


module.exports = mongoose.model('Order', OrderSchema);







