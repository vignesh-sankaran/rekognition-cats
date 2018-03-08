'use strict';

const ImageAnalyser = require('./lib/imageAnalyser');

module.exports.imageAnalysis = (event, context, callback) => {
  return ImageAnalyser
    .analyseAllImages()
    .then((data) => {
      const response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify(data),
      };
      callback(null, response);
    })
    .catch((error) => {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: error.message || 'Internal server error',
      });
    });
};