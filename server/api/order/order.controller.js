'use strict';

var _ = require('lodash'),
  Order = require('./order.model'),
  expiredOffersCheck = require('./cronJob.js');


// Get list of orders
exports.index = function(req, res) {
  Order.find(function (err, orders) {
    if(err) { return handleError(res, err); }
    return res.json(200, orders);
  });
};

// Get a single order
exports.show = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    return res.json(order);
  });
};

// Creates a new order in the DB.
exports.create = function(req, res) {
  Order.create(req.body, function(err, order) {
    if(err) console.log(err)
    return res.json(201, order);
  });
};
exports.charge = function(req, res) {
  var newCharge = Order.createStripeCharge(req.body);
  return res.json(newCharge);
};


// Updates an existing order in the DB.
exports.update = function(req, res) {
  console.log('REQ BODY ',req.body)
  if(req.body._id) { delete req.body._id; }
  Order.findById(req.params.id, function (err, order) {
    if (err) { console.log('FIND ERR ',err); return handleError(res, err); }
    if(!order) { return res.send(404); }
    var updated = _.merge(order, req.body);
    updated.save(function (err) {
      if (err) { console.log("SAVE ERR" ,err) ; return handleError(res, err); }
      return res.json(200, order);
    });
  });
};

// Deletes a order from the DB.
exports.destroy = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    order.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

//Get all of a user's orders
exports.getOffers = function(req,res){
  Order.getBuyersOffers(req.params.userId).then(function(offers){

    offers.forEach(function(offer){
      if(offer.status === 'offer'){
        offer.checkTimeStamp()
      }
    }) //forEach is blocking, right? question
    res.json(offers);
  }).then(null,function(err){
    console.log('Error ',err)
  })
}


//Get all user's accepted offer 
exports.getAccepted = function(req,res){
  Order.getBuyersOffers(req.params.userId).then(function(offers){
    offers.forEach( function (offer) {
      if (offer.status === 'accepted')
      {
        res.json(offer);
      } 
    })    
  }).then(null,function(err){
    console.log('Error ',err)
  })
}

exports.manageOffers = function(req,res){
  Order.find(
    {$and:[{sellerId:req.params.userId},
      {
          status:{
            $in: ["offer","accepted","shipped"]
          }
      }
    ]}
  ).populate('buyerId').populate('sellerId').populate('productId').exec(function(err,offers){
    if(err){return handleError(res,err);}
    res.json(offers)
  })
}

exports.acceptOffer = function(req, res) {

  Order.findByIdAndUpdate(req.params.orderId, {
      $set: {
          status: "accepted"
      }
  }, function(err, doc) {
      if (err) {
          return handleError(res, err);
      }
      
  }).then(function(secondErr,secondRes){ 
    Order.declineUnacceptedOrders(req.params.orderId);
      res.json(doc)
  })
}




function handleError(res, err) {
  return res.send(500, err);
}