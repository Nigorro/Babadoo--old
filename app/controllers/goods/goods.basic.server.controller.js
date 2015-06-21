'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller'),
    mongoose = require('mongoose'),
    Goods = mongoose.model('Goods');


/**
 * Add new Goods
 */

exports.newGoods = function (req, res) {
    var user = req.user;
    console.log(req.query);
    if (user) {
        var goods = new Goods(req.query);
        goods.author = user.id;

        goods.save(function (err){
            if (!err) {
                return res.status(500).send({
                    message: 'New goods added!', 
                    goods: goods
                });
            } else {
                return res.status(400).send({
                    message: err
                });
            }
        });
    } else {
        console.log('Error! User undefined');
        return res.status(400).send();
    }
};


/**
 * Get all goods with pagination
 */
 exports.getGoods = function (req, res) {
    return Goods.find()
        .skip(parseInt(req.query.page))
        .limit(parseInt(req.query.limit))
        .exec( function (err, goods) {
            if (goods) {
                console.log(goods);
                return res.status(500).send({
                    req: req.query.string,
                    goods: goods
                });
            } else {
                return res.status(400).send({
                    message: err
                });
            }
        });
 };

/**
 * Search  goods with pagination
 */
 exports.searchGoods = function (req, res) {
    console.log(req.query.string);
    return Goods.find({$text: {$search: req.query.string}})
        .skip(parseInt(req.query.page))
        .limit(parseInt(req.query.limit))
        .exec( function (err, goods) {
            if (goods) {
                console.log(goods);
                return res.status(500).send({
                    req: req.query.string,
                    goods: goods
                });
            } else {
                return res.status(400).send({
                    message: err
                });
            }
        });
 };
// MyModel.find({$text: {$search: searchString}})
//        .skip(20)
//        .limit(10)
//        .exec(function(err, docs) { ... });
