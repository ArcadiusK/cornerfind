'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    stripe = require('stripe')('sk_test_kbZLZCeD7MoHX28rIB9Uoavi'),
    Q = require('q'),

    Product = require('../product/product.model');

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

  billing: {},

  status: {type:String, enum: ['declined','offer','accepted','shipped','received','issues']}

});



OrderSchema.pre('save',function(next){
  var total=0;
  var self = this;
  this.lineItems.forEach(function(item){  //Async here?     question
    total+= item.purchasePrice*item.qty;
    console.log('ITEM',item)
    Product.findByIdAndUpdate(item.productId,
      {$addToSet: {offers: self._id}},function(){
        //Not sure why this isn't working without the empty callback?  
      })
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
  },
  
  declineUnacceptedOrders: function(orderId){
    //Callback Magic
    var self = this;
    this.findById(orderId).select('lineItems').exec(function(err,order){
      order.lineItems.forEach(function(item){
        Product.findById(item.productId).select('offers').exec(function(err,orders){
          orders.offers.forEach(function(offerId){
            if(offerId.toString() !== orderId){
              self.findByIdAndUpdate(offerId,{$set:{status:'declined'}},function(){
              })
            }
          })
        })
        
      })
    })
    
  }
};

//Stripe stuff
// OrderSchema.methods.createDate = function() {
//   this.date = new Date();
// }

// OrderSchema.methods.setChargeId = function(chargeId) {
//   this.billing.chargeId = chargeId;
//   this.markModified('billing');
// }

OrderSchema.statics.createStripeCharge = function(item, res) {
  console.log('createStripeCharge method in model, item is -->..', item)
  var deferral = Q.defer();
  var charge = stripe.charges.create({
      amount: parseInt(item.orderTotal)*100,
      currency: 'usd',
      card: item.stripeToken,
      capture: true,
      description: 'Charge from Cornerfind.com!'
    }, function(err,charge) {
          if(err && err.type === 'StripeCardError') {
            return res.send(500, err)
          }
          console.log('Stripe charged! ..', charge)
          deferral.resolve(charge);
          // res.json(200,charge);
    });
    return deferral.promise;
};


module.exports = mongoose.model('Order', OrderSchema);







