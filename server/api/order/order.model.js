'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

//need a static to find all of a given users orders with status offer

OrderSchema.statics = {
  getBuyersOffers: function(buyerId){
  return this.find(
      // {buyerId:buyerId, status: 'offer'}
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

module.exports = mongoose.model('Order', OrderSchema);







