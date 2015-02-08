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

    //     var howManyAtSymbols = (req.body.newChat.textLine.match(new RegExp("@", "g")) || []).length;


    //     for (var ai = 0; ai < howManyAtSymbols; ai++) {

    // var first

    // var usernameFromString = req.body.newChat.textLine(req.body.newChat.textLine.indexOf('@'),)
    var arrayOfUsernameFirstCharacters = [];
    var arrayOfUsernameLastCharacters = [];
    var insideUsernameString = false;

    for (var ai = 0; ai < req.body.newChat.textLine.length; ai++) {
        if (req.body.newChat.textLine.substring(ai, 1) === "@") {
            arrayOfUsernameFirstCharacters.push(ai + 1);
            insideUsernameString = true;
        }
        if (insideUsernameString) {
            if ((req.body.newChat.textLine.substring(ai, 1) === " ") ||
                (req.body.newChat.textLine.substring(ai, 1) === ",") ||
                (req.body.newChat.textLine.substring(ai, 1) === ".") ||
                (req.body.newChat.textLine.substring(ai, 1) === "?") ||
                (req.body.newChat.textLine.substring(ai, 1) === "!") ||
                (req.body.newChat.textLine.substring(ai, 1) === "'") ||
                (req.body.newChat.textLine.substring(ai, 1) === "/")) {
                arrayOfUsernameLastCharacters.push(ai);
                insideUsernameString = false;
            }
        }
    }

console.log("arrayOfUsernameFirstCharacters: ",arrayOfUsernameFirstCharacters);
console.log("arrayOfUsernameLastCharacters: ",arrayOfUsernameLastCharacters);

    if (arrayOfUsernameFirstCharacters.length === arrayOfUsernameLastCharacters.length) {
        for (var ai2 = 0; ai2 < arrayOfUsernameFirstCharacters.length; ai2++) {


            User.findOne({
                username: req.body.newChat.textLine.substring(arrayOfUsernameFirstCharacters(ai2), arrayOfUsernameLastCharacters(ai2))
            }, function(err, auser) {
                if (err) {
                    return handleError(res, err);
                }
                console.log('found the following user in chat line: ', auser);

                console.log("sending SMS", req.body.newChat);
                client.messages.create({
                    body: "CornerFind.com comment from " + req.body.newChat.username + ": " + req.body.newChat.textLine,
                    to: auser.phoneNumber,
                    from: "+16506845431"
                }, function(err, message) {
                    //process.stdout.write("Message sent, SID: ",message.sid);
                });
            });

        }
    }





    //}
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
