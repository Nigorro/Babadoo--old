'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller'),
    http = require('http'),
    path = require('path'),
    aws = require('aws-sdk');

var AWS_ACCESS_KEY = 'AKIAIIF6YSQYMXPYPUZA';
var AWS_SECRET_KEY = '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';
var S3_BUCKET = 'babadoo';

exports.upload = function(req, res){
    var user = req.user;

    if (user) {
        aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
        var s3 = new aws.S3();
        console.log(req.query);
        var s3_params = {
            Bucket: S3_BUCKET,
            Key: req.query.file_name,
            Expires: 60,
            ContentType: req.query.file_type,
            ACL: 'public-read'
        };
        s3.getSignedUrl('putObject', s3_params, function (err, data) {
            if(err){
                console.log(err);
            }
            else{
                var return_data = {
                    signed_request: data,
                    url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
                };
                res.write(JSON.stringify(return_data));
                res.end();
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

// exports.upload = function (req, res) {
//     var form = new multiparty.Form();
//     var filesArr = [];
 
//     form.parse(req, function(err, fields, files) {
//         if (err) {
//             res.writeHead(400, {'content-type': 'text/plain'});
//             res.end('invalid request: ' + err.message);
//             return;
//         } else {
//             var imagesPromises = _.values(files).map(function(file) {
//                 var promiseObject =  easyimage.resize({
//                     src: file[0].path, 
//                     dst: file[0].path, 
//                     width:640, height:480
//                 }).then(function(images) {      
//                     return Promise.fromNode(function(callback) {
//                     client.putFile(file[0].path, random + '/' + file[0].originalFilename, {'Content-Type': 'image/jpeg'}, callback);
//                     });
//                 });
                
//                 return promiseObject;
//             });

//             Promise.all(imagesPromises).then(function(images) {
//               // Here goes the images
//               console.log(images.map(function(image) {
//                 return image.req.url;
//               }));
//             });
//         }
//     });
// };

