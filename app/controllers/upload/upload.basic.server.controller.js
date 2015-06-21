'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    easyimage = require('easyimage'),
    knox = require('knox'),
    mime = require('mime'),
    mkdirp = require('mkdirp');

var client = knox.createClient({
    key: 'AKIAIIF6YSQYMXPYPUZA',
    secret: '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',
    bucket: 'babadoo'
});
var images = [];
var min = 999,
    max = 999999999999999999;
var random = Math.random() * (max - min) + min;
exports.upload = function (req, res, next) {
    var form = new multiparty.Form();
    var filesArr = [];
 
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.writeHead(400, {'content-type': 'text/plain'});
            res.end('invalid request: ' + err.message);
            return;
        } else {
            for (var file in files) {
                // client.put(files[file][0].path, { 'x-amz-acl': 'public-read' });
                easyimage.resize({
                    src: files[file][0].path, 
                    dst: files[file][0].path, 
                    width:640, height:480
                }).then( function (image) {
                    console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                    client.putFile(files[file][0].path, random + '/' + files[file][0].originalFilename, {'Content-Type': 'image/jpeg'}, function(err, result) {
                        if (!err) { 
                            console.log('Uploaded to mazon S3', result.req.url); 
                            images.push(result.req.url);
                            console.log(images);
                        }
                        else { 
                            console.log('Failed to upload file to Amazon S3', err); 
                        }
                    });
                },
                    function (err) {
                        console.log(err);
                    }
                );
            }
            console.log('images', images);
        }
    });
};
