// This module is used by npm i express-async-errors found in startup/logging.js. Handles errors in the routes.
var { logger } = require('./logger');

module.exports = function (err, req, res, next) {
  logger.info('Test error log');
  res.status(500).send("Something failed 003...");
};