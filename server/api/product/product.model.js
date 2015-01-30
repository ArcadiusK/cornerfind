'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
userId: {type: Schema.Types.ObjectId, ref: 'User'},
category: [{type: String, index: true}], //from categories collection
qty: {type: Number},
name: {type: String},
desc: {type: String},
photoUrls: [{type: String}],
condition: {type: String}, //from conditions collection
available: {type: Boolean},
price: {type: Number},
brand: {type: String},
retailPrice: {type: Number},
likes: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Product', ProductSchema);