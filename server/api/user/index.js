'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

router.put('/:id', auth.hasRole('admin'), controller.adminChangePassword);
router.put('/:id/email', auth.isAuthenticated(),controller.changeEmail);
router.get('/:username/profile',controller.getUserByName);

router.put('/:id/picture',auth.isAuthenticated(),controller.changeProfilePic);

router.put('/:id/cart',auth.isAuthenticated(),controller.updateCart);

//Populate products in cart
router.get('/:id/populate',auth.isAuthenticated(),controller.populate);