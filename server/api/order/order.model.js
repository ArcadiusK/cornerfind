'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  lineItems: [{ productId: {type: Schema.Types.ObjectId, ref: 'Product'},
                name: {type: String},
                purchasePrice: {type: Number, min: 0},
                qty: {type: Number, min: 1},
                shippingHandling: {type: Number}
             }],
  sellerId: {type: Schema.Types.ObjectId, ref: 'User'},
  buyerId: {type: Schema.Types.ObjectId, ref: 'User'},
  price: {type: Number, min: 0},
  status: {type:String, enum: ['offer','accepted','shipped','received','issues']}
});

module.exports = mongoose.model('Order', OrderSchema);
