const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");

module.exports = function (app) {
  // Configuration (npm i config)
  if (!config.get("jwtPrivateKey")) {

    // console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    // process.exit(1); // Anything but 0 means failure.

    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
    // throw "FATAL ERRO..." Bad practice: This will not output a stack trace, so throw the Error object.;
  }
  // process.env.NODE_ENV // not set? = undefined
  startupDebugger(`NODE_ENV: ${process.env.NODE_ENV}`);
  startupDebugger(`app: ${app.get("env")}`);
  startupDebugger("Application Name: " + config.get("name"));
  startupDebugger("Mail Server: " + config.get("mail.host"));
  // startupDebugger("Mail Password: " + config.get("mail.password"));
  dbDebugger("Connected to the database...");
  if (app.get("env") === "development") {
    app.use(morgan("tiny")); // Every time you send a request to the server, you get "POST /api/users 400 48 - 4.670 ms". Mostly used for dev environments.
    startupDebugger("Morgan enabled...");
  }
}