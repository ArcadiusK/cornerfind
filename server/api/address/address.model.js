'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AddressSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User', index:true},
  billingTrueOrShippingFalse: {type: Boolean},
  streetAddresLine1: {type: String},
  streetAddresLine2: {type: String},
  city: {type: String},
  stateOrRegion: {type: String},
  zipCodeOrPostalCode: {type: String},
  country: {type: String}
});

module.exports = mongoose.model('Address', AddressSchema);