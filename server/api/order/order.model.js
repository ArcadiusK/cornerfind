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
  status: {type:String, enum: ['offer','accepted','shipped','received','issues']},
  billing: {}
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

//Stripe stuff
OrderSchema.methods.createDate = function() {
  this.date = new Date();
}

OrderSchema.methods.setChargeId = function(chargeId) {
  this.billing.chargeId = chargeId;
  this.markModified('billing');
}

OrderSchema.statics.createStripeCharge = function(item, res) {
  console.log('createStripeCharge method in model, item is -->..', item)
  var deferral = Q.defer();
  var charge = stripe.charges.create({
      amount: item.orderTotal,
      currency: 'usd',
      card: item.billing.stripeToken,
      capture: true
    }, function(err,charge) {
          if(err && err.type === 'StripeCardError') {
            return res.send(500, err)
          }
          deferral.resolve(charge);
    });
    return deferral.promise;
};


module.exports = mongoose.model('Order', OrderSchema);







