const mongoose = require("mongoose");
const { logger } = require('../middleware/logger');
const config = require('config');
// const dbDebugger = require("debug")("app:db");


module.exports = function () {
  const db = config.get('db');

  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    // .then(() => dbDebugger(`Connecting to ${db}...`))
    .then(() => logger.info(`Connecting to ${db}...`))
    .catch(err => {
      // dbDebugger("Could not connect to MongoDB...");
      console.error("Could not connect to MongoDB...");

      process.exit(1);
    });
}