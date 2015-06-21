'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var CitySchema = new Schema({
    countryId: {
        type: Number,
        required: true
    },
    regionId: {
        type: Number,
        required: true
    },
    cityId: {
        type: Number,
        required: true
    }
});

mongoose.model('City', CitySchema);