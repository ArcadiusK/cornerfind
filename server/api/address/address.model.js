'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AddressSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User', index:true},
  name: String, //added in to make dealing with easypost easier
  phone: String, //added in to make dealing with easypost easier
  billingTrueOrShippingFalse: {type: Boolean},
  street1: {type: String},
  street2: {type: String},
  city: {type: String},
  state: {type: String},
  zip: {type: String},
  country: {type: String},
  email: {type: String}
});

module.exports = mongoose.model('Address', AddressSchema);