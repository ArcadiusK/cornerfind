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
var Address = require('../api/address/address.model');
var Chat = require('../api/chat/chat.model');
var auth = require('../auth/auth.service');

Thing.find({}).remove(function() {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    }, function() {});
});

Brand.find({}).remove(function() {
    Brand.create({
        name: "Gucci"
    }, {
        name: "Juicy Couture"
    }, {
        name: "Gap"
    }, {
        name: "Uniqlo"
    }, {
        name: "Ralph Lauren"
    }, {
        name: "Prada"
    }, {
        name: "Espresso"
    }, {
        name: "CTRCO"
    }, {
        name: "Other"
    });
});

Category.find({}).remove(function() {
    Category.create({
        name: "Shoes"
    }, {
        name: "Clothing"
    }, {
        name: "Toys"
    }, {
        name: "Cribs"
    }, {
        name: "Strollers"
    });
});


Condition.find({}).remove(function() {
    Condition.create({
        name: "New"
    }, {
        name: "Used - Like New"
    }, {
        name: "Very Good"
    }, {
        name: "Good"
    }, {
        name: "Average"
    }, {
        name: "Acceptable"
    });
});


User.find({}).remove(function() {
    User.create({
            name: 'Arcadius Kazimierski',
            username: 'arcadius',
            email: 'arcadiusk@gmail.com',
            password: 'ttt',
            hashedPassword: '',
            role: 'user',
            picture: 'assets/images/photo_arcadius.jpg',
            blog: '',
            description: 'Dad with 2 kids',
            provider: 'local',
            salt: '',
            facebook: {},
            twitter: {},
            google: {},
            github: {},
            listedProducts: [],
            location: 'New York',
            settings: '', //will need to define later. Nice to have.
            following: [],
            followers: [],
            phoneNumber: '+16319883287',
            billing: {}
        },

        {
            name: 'David Chang',
            username: 'davidjchang',
            email: 'david.j.chang@gmail.com',
            password: 'ttt',
            hashedPassword: '',
            role: 'user',
            picture: 'assets/images/photo_david.jpg',
            blog: '',
            description: 'Dad with 3 kids',
            provider: 'local',
            salt: '',
            facebook: {},
            twitter: {},
            google: {},
            github: {},
            listedProducts: [],
            location: 'New Jersey',
            settings: '', //will need to define later. Nice to have.
            following: [],
            followers: [],
            phoneNumber: '+16466444312',
            billing: {}
        }, {
            name: 'Justin Cohen',
            username: 'justincohen',
            email: 'justincoh@gmail.com',
            password: 'ttt',
            hashedPassword: '',
            role: 'user',
            picture: 'assets/images/photo_justin.jpg',
            blog: '',
            description: 'Dad with 4 kids',
            provider: 'local',
            salt: '',
            facebook: {},
            twitter: {},
            google: {},
            github: {},
            listedProducts: [],
            location: 'New York',
            settings: '', //will need to define later. Nice to have.
            following: [],
            followers: [],
            phoneNumber: '+19145890035',
            billing: {}
        }, {
            name: 'Mitsuaki Uchimoto',
            username: 'mitsu',
            email: 'muchimoto@gmail.com',
            password: 'ttt',
            hashedPassword: '',
            role: 'user',
            picture: 'http://cornerfind.s3-website-us-west-2.amazonaws.com/1423956989831photo_mitsu.png',
            blog: '',
            description: 'Dad with 5 kids',
            provider: 'local',
            salt: '',
            facebook: {},
            twitter: {},
            google: {},
            github: {},
            listedProducts: [],
            location: 'New Jersey',
            settings: '', //will need to define later. Nice to have.
            following: [],
            followers: [],
            phoneNumber: '+12016605762',
            billing: {}
        },
        function() {
            var queryUser1 = User.where({
                username: 'arcadius'
            });
            queryUser1.findOne(function(err, user_parameter1) {
                if (err) {
                    console.log("seed.js - could not find user1")
                    return handleError(err);
                }


                var queryUser2 = User.where({
                    username: 'davidjchang'
                });
                queryUser2.findOne(function(err, user_parameter2) {
                    if (err) {
                        console.log("seed.js - could not find user2")
                        return handleError(err);
                    }

                    var queryUser3 = User.where({
                        username: 'justincohen'
                    });
                    queryUser3.findOne(function(err, user_parameter3) {
                        if (err) {
                            console.log("seed.js - could not find user3")
                            return handleError(err);
                        }


                        var queryUser4 = User.where({
                            username: 'mitsu'
                        });
                        queryUser4.findOne(function(err, user_parameter4) {
                            if (err) {
                                console.log("seed.js - could not find user4")
                                return handleError(err);
                            }


                            Product.find({}).remove(function() {
                                Product.create({
                                        userId: user_parameter1._id,
                                        category: ["Clothing"], //from categories collection
                                        gender: "Girl",
                                        qty: 1,
                                        name: "Juicy Couture baby bib, pink",
                                        desc: "Heavily used but clean Juicy Couture baby bib, must have!!!",
                                        photoUrls: ["http://media-cache-ec0.pinimg.com/736x/b8/e3/9c/b8e39c4f517f8c1bb9d6e31b5e5c75dd.jpg",
                                            "http://1.bp.blogspot.com/-Dv6PvxySNIk/UIFzzqkLJaI/AAAAAAAAEeo/F1kWbvrtJ3E/s1600/nomeatathelete.jpg",
                                            "http://1.bp.blogspot.com/-nEumTcQ6EhM/TosdIY4Q1XI/AAAAAAAAAGc/uqnUfA-izeI/s1600/joestanner.bmp",
                                            "http://1.bp.blogspot.com/-9HY46ASFkvA/UhwUGfu559I/AAAAAAAAb9g/nyv0XcXvl_s/s640/082203.jpg"
                                        ],
                                        condition: "Like New", //from conditions collection
                                        available: true,
                                        price: 12.00,
                                        brand: "Juicy Couture",
                                        retailPrice: 30.00
                                    }, {
                                        userId: user_parameter1._id,
                                        category: ["Shoes"], //from categories collection
                                        gender: "Boy",
                                        qty: 1,
                                        name: "Gold Booties",
                                        desc: "Little, cute, barely used Gold Booties!!!",
                                        photoUrls: ["http://4.bp.blogspot.com/-cLTf1VZ9xZo/TeVWh7duydI/AAAAAAAAANw/eRWfc6IUlwY/s1600/Shoes.jpg"],
                                        condition: "Good", //from conditions collection
                                        available: true,
                                        price: 18.00,
                                        brand: "CTRCO",
                                        retailPrice: 42.00
                                    }, {
                                        userId: user_parameter1._id,
                                        category: ["Clothing"], //from categories collection
                                        gender: "Boy",
                                        qty: 1,
                                        name: "Boy Jacket",
                                        desc: "Description of Boy Jacket",
                                        photoUrls: ['http://cornerfind.s3-website-us-west-2.amazonaws.com/1423959302691boy_jack.jpg'],
                                        condition: "Like New", //from conditions collection
                                        available: true,
                                        price: 34.00,
                                        brand: "Prada",
                                        retailPrice: 60.00
                                    }, {
                                        userId: user_parameter1._id,
                                        category: ["Toys"], //from categories collection
                                        gender: "Girl",
                                        qty: 1,
                                        name: "Two Dolls",
                                        desc: "Two Dolls white together",
                                        photoUrls: ["http://babyurprecious.com/wp-content/uploads/2014/06/Baby-UR-Precious-BURP-Doll-portfolio.jpg"],
                                        condition: "Average", //from conditions collection
                                        available: true,
                                        price: 61.00,
                                        brand: "Uniqlo",
                                        retailPrice: 97.00
                                    }, {
                                        userId: user_parameter2._id,
                                        category: ["Cribs"], //from categories collection
                                        gender: "Neutral",
                                        qty: 1,
                                        name: "Crib Sorelle Verona",
                                        desc: "Sorelle Verona 4-in-1 Lifetime Convertible Crib and Changer",
                                        photoUrls: ["http://www.toysrus.com/graphics/product_images/pTRU1-16411896enh-z6.jpg"],
                                        condition: "Acceptable", //from conditions collection
                                        available: true,
                                        price: 45.00,
                                        brand: "Espresso",
                                        retailPrice: 108.00
                                    },
                                    function() {
                                        var queryProduct = Product.where({
                                            name: 'Juicy Couture baby bib, pink'
                                        });
                                        queryProduct.findOne(function(err, product_parameter) {
                                            if (err) {
                                                console.log("seeding error product")
                                                return handleError(err);
                                            }
                                            //console.log("product_parameter: "+product_parameter)

                                            var queryProduct2 = Product.where({
                                                name: 'Gold Booties'
                                            });
                                            queryProduct2.findOne(function(err, product_parameter2) {
                                                if (err) {
                                                    console.log("seeding error product2")
                                                    return handleError(err);
                                                }
                                                //        console.log("product_parameter2: "+product_parameter2)


                                                var queryProduct3 = Product.where({
                                                    name: 'Boy Jacket'
                                                });
                                                queryProduct3.findOne(function(err, product_parameter3) {
                                                    if (err) {
                                                        console.log("seeding error product3")
                                                        return handleError(err);
                                                    }

                                                    var queryProduct4 = Product.where({
                                                        name: 'Two Dolls'
                                                    });
                                                    queryProduct4.findOne(function(err, product_parameter4) {
                                                        if (err) {
                                                            console.log("seeding error product4")
                                                            return handleError(err);
                                                        }


                                                        var queryProduct5 = Product.where({
                                                            name: 'Crib Sorelle Verona'
                                                        });
                                                        queryProduct5.findOne(function(err, product_parameter5) {
                                                            if (err) {
                                                                console.log("seeding error product5")
                                                                return handleError(err);
                                                            }

                                                            User.findOne({
                                                                _id: user_parameter1._id
                                                            }, function(err, user) {
                                                                user.following.push(user_parameter2._id);
                                                                user.followers.push(user_parameter2._id);
                                                                user.listedProducts.push(product_parameter._id);
                                                                user.listedProducts.push(product_parameter2._id);
                                                                user.listedProducts.push(product_parameter3._id);
                                                                user.listedProducts.push(product_parameter4._id);
                                                                user.save();
                                                            })

                                                            User.findOne({
                                                                _id: user_parameter2._id
                                                            }, function(err, user) {
                                                                user.following.push(user_parameter1._id);
                                                                user.followers.push(user_parameter1._id);
                                                                user.listedProducts.push(product_parameter5._id);
                                                                user.save();
                                                            })


                                                            Chat.find({}).remove(function() {
                                                                Chat.create({
                                                                        product: product_parameter._id,
                                                                        textLine: "how old is this?",
                                                                        sender: user_parameter1._id,
                                                                        username: user_parameter1.username
                                                                    }, {
                                                                        product: product_parameter._id,
                                                                        textLine: "how long have used it?",
                                                                        sender: user_parameter1._id,
                                                                        username: user_parameter1.username
                                                                    }, {
                                                                        product: product_parameter._id,
                                                                        textLine: "i'll give you 10 dollars",
                                                                        sender: user_parameter2._id,
                                                                        username: user_parameter2.username
                                                                    }, {
                                                                        product: product_parameter._id,
                                                                        textLine: "can you ship to canada?",
                                                                        sender: user_parameter1._id,
                                                                        username: user_parameter1.username
                                                                    }, {
                                                                        product: product_parameter._id,
                                                                        textLine: "@mitsu are you there?",
                                                                        sender: user_parameter1._id,
                                                                        username: user_parameter1.username
                                                                    }, {
                                                                        product: product_parameter._id,
                                                                        textLine: "@justincohen check this product out",
                                                                        sender: user_parameter2._id,
                                                                        username: user_parameter2.username
                                                                    },
                                                                    function() {
                                                                        // console.log("finished seeding chats")
                                                                    });
                                                            });



                                                            Like.find({}).remove(function() {
                                                                Like.create({
                                                                        productId: product_parameter._id,
                                                                        userId: user_parameter1._id
                                                                    }, {
                                                                        productId: product_parameter2._id,
                                                                        userId: user_parameter2._id
                                                                    }, {
                                                                        productId: product_parameter._id,
                                                                        userId: user_parameter2._id
                                                                    },
                                                                    function() {

                                                                    });
                                                            });





                                                            Address.find({}).remove(function() {
                                                                Address.create({
                                                                        userId: user_parameter1._id,
                                                                        name: 'Arcadius Kazimierski', //added in to make dealing with easypost easier
                                                                        phone: '+16319883287', //added in to make dealing with easypost easier
                                                                        billing: true,
                                                                        street1: '305 W 16th Street Apt 3A',
                                                                        street2: '',
                                                                        city: 'New York',
                                                                        state: 'NY',
                                                                        zip: '10011',
                                                                        country: 'USA',
                                                                        email: 'arcadiusk@gmail.com'
                                                                    }, {
                                                                        userId: user_parameter2._id,
                                                                        name: 'David Chang', //added in to make dealing with easypost easier
                                                                        phone: '+16466444312', //added in to make dealing with easypost easier
                                                                        billing: true,
                                                                        street1: '980 Fox Hill Ln',
                                                                        street2: '',
                                                                        city: 'Scotch Plains',
                                                                        state: 'NJ',
                                                                        zip: '07076',
                                                                        country: 'USA',
                                                                        email: 'arcadiusk@gmail.com'
                                                                    }, {
                                                                        userId: user_parameter3._id,
                                                                        name: 'Justin Cohen',
                                                                        phone: '+19145890035',
                                                                        billing: false,
                                                                        street1: "165 W 91 St",
                                                                        street2: "",
                                                                        city: "New York",
                                                                        state: "NY",
                                                                        zip: "10024",
                                                                        country: "USA",
                                                                        email: 'justincoh@gmail.com'
                                                                    }, {
                                                                        userId: user_parameter4._id,
                                                                        name: 'Mitsuaki Uchimoto', //added in to make dealing with easypost easier
                                                                        phone: '+12016605762', //added in to make dealing with easypost easier
                                                                        billing: true,
                                                                        street1: '60 Crest Drive North',
                                                                        street2: '',
                                                                        city: 'Cresskill',
                                                                        state: 'NJ',
                                                                        zip: '07626',
                                                                        country: 'USA',
                                                                        email: 'muchimoto@gmail.com'
                                                                    },
                                                                    function() {
                                                                        console.log("finished seeding all: addresses")
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
                    });
                });
            });
        });
});
