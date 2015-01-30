'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Product = require('../product/product.model')
var Review = require('../review/review.model');

var validationError = function(res, err) {
    return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) return res.send(500, err);
        res.json(200, users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) return validationError(res, err);
        if (user) return res.json(422, err);
        if (!user) {
            var newUser = new User(req.body);

            newUser.provider = 'local';
            newUser.role = 'user';
            newUser.save(function(err, user) {
                if (err) return validationError(res, err);
                var token = jwt.sign({
                    _id: user._id
                }, config.secrets.session, {
                    expiresInMinutes: 60 * 5
                });
                res.json({
                    token: token
                });
            });
        }
    })
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};



/**
 * Admin change a user's password
 */
exports.adminChangePassword = function(req, res, next) {
    var userIDToUpdate = req.params.id;
    User.findById(userIDToUpdate, function(err, user) {
        user.password = req.body.newPassword;
        user.save(function(err, user) {
            if (err) console.log(err);
            if (!user) res.send(401);
            res.send(200);
        })
    });
};

/**
 * change User Email
 */

 exports.changeProfilePic = function(req, res, next) {
        var newPic = req.body.profilePic;
        var userId = req.user._id;
        User.findById(userId, function(err, user) {
            user.profilePic = newPic;
            user.save(function(err, user) {
                if (err) console.log(err);
                if (!user) res.send(401);
                res.send(200);
            })
        })
    }

exports.changeEmail = function(req, res, next) {
        var newEmail = req.body.newEmail;
        var userId = req.user._id;
        User.findById(userId, function(err, user) {
            user.email = newEmail;
            user.save(function(err, user) {
                if (err) console.log(err);
                if (!user) res.send(401);
                res.send(200);
            })
        })
    }
    /**
     * Gets user info by name
     */
exports.getUserByName = function(req, res, next) {
    var username = req.params.username;
    User.findOne({
            name: username
        }, '-salt -hashedPassword -email -contact -cart -orders')
        .populate('favorites', '-inventory')
        .populate('comments')
        .exec(function(err, user) {
            Comment.populate(user,{path: 'comments.product', model: 'Product'}, function(err, user) {
                if (err) return next(err);
                if (!user) return res.json(401);
                res.json(user);
            })
        });
}

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

exports.updateCart = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.send(404);
        }
        if (req.body.action) {
            if (req.body.action === "remove") {
              var id = req.body._id.toString();

              var cart = user.cart;

              user.cart.some(function(product,index){
                if(product == id){
                  cart.splice(index,1);
                  return true;
                }
              })
              user.cart = cart;
            }
            else if(req.body.action === "update"){
              user.cart = req.body.cart;
            }
        }
        else {
          if (user.cart) user.cart.push(req.body._id);
        }

        user.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(user);
        });
    });
};

//Populate products in user cart
exports.populate = function(req, res) {
    User.findById(req.params.id).populate(path: 'listedProducts', model:'Product')
        .exec(function(err, user) {
            if (err) {
                console.log('error')
                return handleError(res, err);
            }
            if (!user) {
                console.log('no user')
                return res.send(404);
            }
            return res.json(user);
        })
}
