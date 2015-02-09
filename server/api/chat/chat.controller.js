'use strict';

var _ = require('lodash');
var Chat = require('./chat.model');
var ObjectId = require('mongoose').Types.ObjectId;
var Firebase = require("firebase");
var ref = new Firebase('https://cornerfind.firebaseio.com/chats');
var client = require('twilio')();
var User = require('../user/user.model');


// Get list of chats
exports.index = function(req, res) {
    console.log('req.params.product: ', req.params.productid)
    Chat.find({
        product: new ObjectId(req.params.productid)
    }, function(err, chats) {
        if (err) {
            return handleError(res, err);
        }
        console.log('chat results backend', chats, req.params.productid);
        return res.json(201, chats);
    });
};

// Get a single chat
exports.show = function(req, res) {
    Chat.findById(req.params.id, function(err, chat) {
        if (err) {
            return handleError(res, err);
        }
        if (!chat) {
            return res.send(404);
        }
        return res.json(chat);
    });
};

// Creates a new chat in the DB.
exports.create = function(req, res) {
    // Chat.create(req.body, function(err, chat) {
    //   if(err) { return handleError(res, err); }
    //   return res.json(201, chat);
    // });
    var chatRef = ref.child(req.body.productID);
    chatRef.push(req.body.newChat);

    var regexPattern = /\@\w+/gm;
    var arrayOfUsernames = req.body.newChat.textLine.toLowerCase().match(regexPattern);
    console.log("arrayOfUsernames: ", arrayOfUsernames);

    if (arrayOfUsernames) {
        for (var ai2 = 0; ai2 < arrayOfUsernames.length; ai2++) {
            if (arrayOfUsernames.indexOf(arrayOfUsernames[ai2], ai2+1) === -1) {
                console.log("quering username: " + arrayOfUsernames[ai2].substring(1, arrayOfUsernames[ai2].length) + " to find user");
                User.findOne({
                    username: arrayOfUsernames[ai2].substring(1, arrayOfUsernames[ai2].length)
                }, function(err, auser) {
                    if (err) {
                        return handleError(res, err);
                    }


                    if (auser) {
                         console.log('found in database the following user.email from chat line: ', auser.email);
                        console.log("sending SMS to: " + auser.phoneNumber + " with the following: ", req.body.newChat);
                        client.messages.create({
                            body: "CornerFind.com comment from " + req.body.newChat.username + ": " + req.body.newChat.textLine,
                            to: auser.phoneNumber,
                            from: "+16506845431"
                        }, function(err, message) {

                        });
                    }
                });
            } else {
              console.log("found duplicate username in chat text so doing nothing: ", arrayOfUsernames[ai2], " at location "+arrayOfUsernames.indexOf(arrayOfUsernames[ai2], ai2+1));
            }
        }
    }
};

// Updates an existing chat in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Chat.findById(req.params.id, function(err, chat) {
        if (err) {
            return handleError(res, err);
        }
        if (!chat) {
            return res.send(404);
        }
        var updated = _.merge(chat, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, chat);
        });
    });
};

// Deletes a chat from the DB.
exports.destroy = function(req, res) {
    Chat.findById(req.params.id, function(err, chat) {
        if (err) {
            return handleError(res, err);
        }
        if (!chat) {
            return res.send(404);
        }
        chat.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
