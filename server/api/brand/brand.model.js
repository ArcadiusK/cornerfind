'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: String
});

BrandSchema.index({name: 'text'});

module.exports = mongoose.model('Brand', BrandSchema);