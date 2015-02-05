'use strict';

var _ = require('lodash');
var Easypost = require('./easypost.model');
var apiKey = 'GENUIa8BDratncdUb5NmJg';
var easypost = require('node-easypost')(apiKey);

// Get list of easyposts
exports.index = function(req, res) {
  Easypost.find(function (err, easyposts) {
    if(err) { return handleError(res, err); }
    return res.json(200, easyposts);
  });
};

// Get a single easypost
exports.show = function(req, res) {
  Easypost.findById(req.params.id, function (err, easypost) {
    if(err) { return handleError(res, err); }
    if(!easypost) { return res.send(404); }
    return res.json(easypost);
  });
};

// Creates a new easypost in the DB.
exports.verify = function(req, res) {

    var fromAddress = {
    name: "EasyPost",
      street1: "164 Townsend St",
    street2: "#1",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    phone: "415-123-4567"
  };

// verify address
  easypost.Address.create(fromAddress, function(err, fromAddress) {
    
    fromAddress.verify(function(err, response) {
      if (err) {
        console.log('Address is invalid.');
        var verifiedAddress = 'Address is invalid'
      } else if (response.message !== undefined && response.message !== null) {
        console.log('Address is valid but has an issue: ', response.message);
        var verifiedAddress = response.address;
      } else {
        var verifiedAddress = response;
      }
      console.log(verifiedAddress.address);
      return res.send(verifiedAddress);
    })   
});

  // Easypost.create(req.body, function(err, easypost) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(201, easypost);
  // });
};

// Updates an existing easypost in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Easypost.findById(req.params.id, function (err, easypost) {
    if (err) { return handleError(res, err); }
    if(!easypost) { return res.send(404); }
    var updated = _.merge(easypost, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, easypost);
    });
  });
};

// Deletes a easypost from the DB.
exports.destroy = function(req, res) {
  Easypost.findById(req.params.id, function (err, easypost) {
    if(err) { return handleError(res, err); }
    if(!easypost) { return res.send(404); }
    easypost.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}