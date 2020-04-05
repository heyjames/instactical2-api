const mongoose = require("mongoose");
const { logger } = require('../middleware/logger');
// const dbDebugger = require("debug")("app:db");


module.exports = function () {
  const db = "mongodb://localhost/instactical2";

  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    // .then(() => dbDebugger(`Connecting to ${db}...`))
    .then(() => logger.info(`Connecting to ${db}...`))
  // .catch(err => dbDebugger("Could not connect to MongoDB..."));
}