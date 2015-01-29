'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LikeSchema = new Schema({
  productId: {{type: Schema.Types.ObjectId, ref: 'Product', index:true}},
  userId: {{type: Schema.Types.ObjectId, ref: 'User', index:true}},
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Like', LikeSchema);