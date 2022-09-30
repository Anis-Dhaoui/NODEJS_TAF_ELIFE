var express = require('express');
var productRouter = express.Router();
var Products = require('../models/productModel');

var checkAuth = require('../auth');

//$$$$$$$$$$$ /products endpoint $$$$$$$$$$$
productRouter.route('/')
    .get(checkAuth, (req, res, next) => {
        console.log(req.user);
        Products.find()
            .then((products) => {
                if (products !== null) {
                    res.render('products', { data: products });
                } else {
                    err = new Error("products collection is empty or not found");
                    next(err);
                }
            },
                err => next(err))
            .catch(err => next(err))
    })

    .post((req, res, next) => {
        Products.create(req.body)
            .then((addedProduct) => {
                res.redirect('/products');
            },
                err => {
                    // if err.code === 11000 that means there is a duplicate key
                    if (err.code && err.code === 11000) {
                        // res.statusCode = 409;
                        // res.setHeader('Content-Type', 'application/json');
                        res.json({ success: false, message: "Product reference is already exist" });
                    } else
                        next(err);
                })
            .catch(err => next(err));
    })

    .delete((req, res, next) => {
        Dishes.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: false, message: "All products has been deleted" });
            },
                (err) => next(err))
            .catch((err) => next(err))
    });


//$$$$$$$$$$$ /products/productId endpoint $$$$$$$$$$$
productRouter.route('/:productId')
    .get((req, res, next) => {
        Products.findById(req.params.productId)
            .then((product) => {
                if (product !== null) {
                    res.json(product);
                } else {
                    err = new Error("product not found");
                    next(err);
                }
            }, err => next(err))
            .catch(err => next(err))
    })

    .put((req, res, next) => {
        Products.findByIdAndUpdate(req.params.productId, { $set: req.body }, { new: true })
            .then((product) => {
                console.log(req.body);
                if (product !== null) {
                    res.redirect('/products');
                    // res.redirect(`/products/${req.params.productId}/`);
                } else {
                    err = new Error("product not found");
                    next(err);
                }
            },
                err => next(err))
            .catch(err => next(err))
    })

    .delete((req, res, next) => {
        Products.findByIdAndRemove(req.params.productId)
            .then((product) => {
                res.redirect('/products');
            },
                err => next(err))
            .catch(err => next(err))
    });

module.exports = productRouter;