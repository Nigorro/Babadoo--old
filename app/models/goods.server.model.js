'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    searchPlugin = require('mongoose-search-plugin'),
    crypto = require('crypto');

var GoodsSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 55 
    },
    slutTitle: {
        type: String,
        // required: true,
        minlength: 5, 
        maxlength: 55
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: String,
        default: 0
    },
    photos: [],
    age: {
        min: { type: Number },
        max: { type: Number } 
    },
    //all: all, boy: boy, girl: gitl,
    // gender: {
    //     type: boy,
    //     title: Мальчик,
    // }
    gender: {
        type: { type: String },
        title: { type: String }
    },
    //winter: winter, summer: summer, off-season: all
    // season: {
    //     type: winter,
    //     title: Зима,
    // }
    season: { 
        type: { type: String },
        title: { type: String }
    },
    isGift: {
        type: Boolean,
        default: false
    },
    adress: {
        city: {  
            id: { type: Number },
            name: { type: String }
        },
        metro: { 
            id: { type: Number },
            name: { type: String }
        },
        phone: { 
            type: String, 
            require: true 
        }
    },
    tags: [],
    views: [],
});

GoodsSchema.index({title: 'text', description: 'text'});

mongoose.model('Goods', GoodsSchema);