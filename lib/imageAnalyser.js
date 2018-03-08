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

    return new Promise((resolve, reject) => {
      s3.listObjectsV2(s3Params, function (error, s3Data) {
        if (error) {
          return reject(new Error(error));
        }
        else {
          if (s3Data.length == 0) {
            return reject(new Error("There are no items in the s3 bucket"));
          }
          var labelData = [];
          var counter = 0;
          for (let object of s3Data.Contents) {
            const rekParams = {
              Image: {
                S3Object: {
                  Bucket: s3Params.Bucket,
                  Name: object.Key
                }
              },
              MinConfidence: 50
            }
            rek.detectLabels(rekParams, function(error, rekData) {
              if (error) {
                return reject(new Error(error));
              }
              else {
                labelData.push({[object.Key]: rekData.Labels});
                // Needed to have this check here because detectLabels() is
                // an async function, and returning outside this for loop
                // will return an empty array
                if (counter === s3Data.KeyCount - 1) {
                  return resolve(labelData);
                }
                counter++;
              }
            });
          }
        }
      });
    });
  }
}

module.exports = ImageAnalyser;