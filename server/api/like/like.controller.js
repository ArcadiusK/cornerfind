'use strict';

var _ = require('lodash');
var Like = require('./like.model');

// Get list of likes
exports.index = function(req, res) {
  Like.find(function (err, likes) {
    if(err) { return handleError(res, err); }
    return res.json(200, likes);
  });
};

// Get a single like
exports.show = function(req, res) {
  Like.findById(req.params.id, function (err, like) {
    if(err) { return handleError(res, err); }
    if(!like) { return res.send(404); }
    return res.json(like);
  });
};

// Creates a new like in the DB.
exports.create = function(req, res) {
  Like.create(req.body, function(err, like) {
    if(err) { return handleError(res, err); }
    return res.json(201, like);
  });
};

// Updates an existing like in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Like.findById(req.params.id, function (err, like) {
    if (err) { return handleError(res, err); }
    if(!like) { return res.send(404); }
    var updated = _.merge(like, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, like);
    });
  });
};

// Deletes a like from the DB.
exports.destroy = function(req, res) {
  Like.findById(req.params.id, function (err, like) {
    if(err) { return handleError(res, err); }
    if(!like) { return res.send(404); }
    like.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}