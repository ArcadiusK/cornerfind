/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 'use strict';

 var Thing = require('../api/thing/thing.model');
 var User = require('../api/user/user.model');
 var Product = require('../api/product/product.model');
 var Brand = require('../api/brand/brand.model');
 var Category = require('../api/category/category.model');
 var Condition = require('../api/condition/condition.model');
 var Like = require('../api/like/like.model');


 Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  }, function() {
    // console.log('finished seeding things');
  });
});

Brand.find({}).remove(function() {
 Brand.create(
   {name: "Gucci"}, 
   {name: "Juicy Coulture"},
   {name: "Gap"}, 
   {name: "Uniqlo"}, 
   {name: "Ralph Lauren"},
   {name: "Prada"},
   {name: "Espresso"},
   {name: "Other"}
   );
});

Category.find({}).remove(function() {
 Category.create(
   {name: "Shoes"},
   {name: "Clothing"},
   {name: "Toys"},
   {name: "Cribs"},
   {name: "Strollers"}
   );
});


Condition.find({}).remove(function() {
 Condition.create(
  {name: "New"}, 
  {name: "Used - Like New"}, 
  {name: "Very Good"},
  {name: "Good"},
  {name: "Average"},
  {name: "Acceptable"}
  );
});


User.find({}).remove(function() {
  User.create({
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    role: {
      type: String,
      default: 'user'
    },
    hashedPassword: '',
    provider: 'local',
    salt: String,
    facebook: {},
    twitter: {},
    google: {},
    github: {},
    listedProducts: [],
    location: 'New York',
    username: 'test username',
    shipAddy: 'shipping address',
    billAddy: 'billing address',
  settings: {}, //will need to define later. Nice to have. 
  following: []
}, {
  name: 'Admin Arcadius',
  email: 'admin@admin.com',
  password: 'admin',
  role: {
    type: String,
    default: 'admin'
  },
  hashedPassword: '',
  provider: 'local',
  salt: String,
  facebook: {},
  twitter: {},
  google: {},
  github: {},
  listedProducts: [],
  location: 'New York',
  username: 'Arcadius Kazimierski',
  shipAddy: 'shipping address',
  billAddy: 'billing address',
  settings: {}, //will need to define later. Nice to have. 
  following: []
}, function() {
  // console.log('finished seeding users');




  var queryUser  = User.where({ name: 'Test User' });
  queryUser.findOne(function (err, user_parameter) {
    if (err) {
      console.log("seed.js - could not find user1")
      return handleError(err);
    }
    // console.log("user_parameter: "+user_parameter)

    var queryUser2  = User.where({ name: 'Admin Arcadius' });
    queryUser2.findOne(function (err, user_parameter2) {
      if (err) {
        console.log("seed.js - could not find user2")
        return handleError(err);
      }
      // console.log("user_parameter2: "+user_parameter2)

      Product.find({}).remove(function() {
        Product.create({
          userId: user_parameter._id,
    category: ["Clothing"], //from categories collection
    qty: 1,
    name: "Juicy Couture baby bib, pink",
    desc: "Heavily used but clean Juicy Couture baby bib, must have!!!",
    photoUrls: ["http://media-cache-ec0.pinimg.com/736x/b8/e3/9c/b8e39c4f517f8c1bb9d6e31b5e5c75dd.jpg"],
    condition: "Like New", //from conditions collection
    available: true,
    price: 12.00,
    brand: "Juicy Couture",
    retailPrice: 30.00,
    likes: [user_parameter._id]
  },
  {
    userId: user_parameter._id,
    category: ["Shoes"], //from categories collection
    qty: 1,
    name: "Gold Booties",
    desc: "Little, cute, barely used Gold Booties!!!",
    photoUrls: ["http://4.bp.blogspot.com/-cLTf1VZ9xZo/TeVWh7duydI/AAAAAAAAANw/eRWfc6IUlwY/s1600/Shoes.jpg"],
    condition: "Good", //from conditions collection
    available: true,
    price: 18.00,
    brand: "CTRCO",
    retailPrice: 42.00,
    likes: [user_parameter._id]
  },
  {
    userId: user_parameter._id,
    category: ["Clothing"], //from categories collection
    qty: 1,
    name: "Boy Jacket",
    desc: "Description of Boy Jacket",
    photoUrls: ["http://childrensfashionup.com/wp-content/uploads/2014/04/baby-boy-clothes-newborn-boutique-fashion-clothes-for-boys.jpg"],
    condition: "Like New", //from conditions collection
    available: true,
    price: 34.00,
    brand: "Prada",
    retailPrice: 60.00,
    likes: [user_parameter._id]
  },
  {
    userId: user_parameter2._id,
    category: ["Toys"], //from categories collection
    qty: 1,
    name: "Two Dolls",
    desc: "Two Dolls white together",
    photoUrls: ["http://babyurprecious.com/wp-content/uploads/2014/06/Baby-UR-Precious-BURP-Doll-portfolio.jpg"],
    condition: "Average", //from conditions collection
    available: true,
    price: 61.00,
    brand: "Uniqlo",
    retailPrice: 97.00,
    likes: [user_parameter2._id]
  },
  {
    userId: user_parameter2._id,
    category: ["Cribs"], //from categories collection
    qty: 1,
    name: "Crib Sorelle Verona",
    desc: "Sorelle Verona 4-in-1 Lifetime Convertible Crib and Changer",
    photoUrls: ["http://www.toysrus.com/graphics/product_images/pTRU1-16411896enh-z6.jpg"],
    condition: "Acceptable", //from conditions collection
    available: true,
    price: 45.00,
    brand: "Espresso",
    retailPrice: 108.00,
    likes: [user_parameter2._id]
  },
  function() {
    // console.log('finished seeding products');


    var queryProduct  = User.where({ desc: 'Juicy Couture baby bib, pink' });
    queryUser.findOne(function (err, product_parameter) {
      if (err) {
        console.log("seeding error product")
        return handleError(err);
      }
      // console.log("product_parameter: "+user_parameter)

      var queryProduct2  = User.where({ desc: 'Gold Booties' });
      queryUser2.findOne(function (err, product_parameter2) {
        if (err) {
          console.log("seeding error product2")
          return handleError(err);
        }
        // console.log("product_parameter2: "+user_parameter2)


        Like.find({}).remove(function() {
          Like.create({
           productId: product_parameter._id,
           userId: user_parameter._id
         }, 
         {
           productId: product_parameter2._id,
           userId: user_parameter2._id
         }, function() {
           // console.log('finished seeding likes');
         });
        });
      });



    });
  });
});
});
});
});
});