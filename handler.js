'use strict';

module.exports.imageAnalysis = (event, context, callback) => {
  return ImageAnalyser
    .getImageLabels()
    .then((data) => {
      const response = {
        statusCode: 200,
        body: data,
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
