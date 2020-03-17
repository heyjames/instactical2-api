// const winston = require("winston"); // Used in middleware/logger.js and middleware/error.js
require("express-async-errors"); // With this, you won't need to encapsulate your await route handlers with a try/catch block. Include "app.use(error);"
var { logger } = require('../middleware/logger');

// const error = require("../middleware/error");


module.exports = function () {

  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  // winston.exceptions.handle(
  //   new winston.transports.Console({ colorize: true, prettyPrint: true }),
  //   new winston.transports.File({ filename: 'exceptions.log' })
  // );
  // logger.exceptions.handle(
  //   new transports.File({ filename: 'exceptions.log' })
  // );

  process.on("uncaughtException", (ex) => {
    // console.log(ex.message);
    logger.error(ex.message);
    process.exit(1);
  }); // This event is raised when we raised and exception in the process but didn't handle it with a try/catch block.
  // throw new Error("Pika pika!"); // Winston doesn't work here because it's outside of Express. How to properly handle unhandled exceptions in a node process--a higher level.

  // let p = Promise.reject(new Error("Rejected!!!"));
  // p.then(() => console.log("Rejected???"));

  process.on("unhandledRejection", (ex) => {
    // console.log("WE GOT AN UNHANDLED REJECTION");
    // logger.error(ex.message);
    // process.exit(1);
    // throw new Error("Ex:::::::::::::::::::::::::::::::::::::::::::::");
    throw ex;
  });
  // app.use(error);
}