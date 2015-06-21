'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
    // User Routes
    var upload = require('../../app/controllers/upload/upload.basic.server.controller');

    // Setting up the users profile api
    app.route('/upload').post(upload.upload);
};