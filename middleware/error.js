// This module is used by npm i express-async-errors found in startup/logging.js. Handles errors in the routes.
// It's placed in the route/routes.js file specifically at the end of the routes
// Test this module by putting this line in routes/about.js:
// throw new Error("Could not get the genres...");

// var { logger } = require('./logger');

module.exports = function (err, req, res, next) {
  // logger.info(err.message);
  res.status(500).send("Something failed.");
};