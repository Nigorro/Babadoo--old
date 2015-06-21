'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
    // User Routes
    var goods = require('../../app/controllers/goods.server.controller');

    // Setting up the users profile api
    app.route('/goods/').get(goods.getGoods);
    app.route('/goods/').post(goods.newGoods);
    app.route('/goods/search').get(goods.searchGoods);
};