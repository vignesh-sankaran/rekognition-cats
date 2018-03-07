'use strict';

const AWS = require('aws-sdk');

const rek = new AWS.Rekognition();
const s3 = new AWS.S3();

// Tasks of class:
// - Gather all the images in the specified S3 bucket
// - Run an image analysis via rekognition 
// - Return the result via an API call

class ImageAnalyser {
  // Set the name of the bucket
  // Create enumeration of all bucket items
  static analyseAllImages() {
    const s3Params = {
      Bucket: "slnswcatpics"
    }

    s3.listObjectsV2(s3Params, function(error, data) {
      if (error) {
        return reject(new Error(error));
      }
      else {
        var keys = [];
        for (let object of data.Contents) {
          keys.push(object.Key);
        }
        console.log(keys);
        return resolve(data);
      }
    });

  }
}

module.exports = ImageAnalyser;