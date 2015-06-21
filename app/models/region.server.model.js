'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var RegionSchema = new Schema({
    countryId: {
        type: Number,
        required: true
    },
    regionId: {
        type: Number,
        required: true
    }
});

mongoose.model('Region', RegionSchema);