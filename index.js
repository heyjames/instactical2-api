// Do this at startup:
// 1) set NODE_ENV=development
// 2) set inst_jwtPrivateKey=1234 (npm i config)
// 3) (npm i debug)
// "set DEBUG=app:*", 
// "set DEBUG=app:startup", 
// "set DEBUG=", 
// "DEBUG=app:startup,app:db", 
// Shortcut=>"DEBUG=app:startup nodemon index.js" 
// to tell the module to only show us certain types

// const logger = require("./middleware/logger");
// app.use(logger);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const fetch = require("node-fetch");
const users = require("./routes/users");
const auth = require("./routes/auth");
const guidelines = require("./routes/guidelines");
const blogposts = require("./routes/blogposts");
const announcements = require("./routes/announcements");
const about = require("./routes/about");
const serverinfo = require("./routes/serverinfo");

// Middleware ==================================================================
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Returns a middleware function. Reads request. If json object exists in body of request, it will parse body of request into a json object and set req.body property. And this happens at runtime.
app.use(bodyParser.urlencoded({ extended: true })); // extended = arrays, complex objects in the www.instactical.com/api/users key=value&key=value
app.use(express.static("public")); // static assets like css images in this folder.
app.use(helmet());

// Debug information ===========================================================
// Configuration (npm i config)
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1); // Anything but 0 means failure.
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

// Route Handler ===============================================================
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/guidelines", guidelines);
app.use("/api/blogposts", blogposts);
app.use("/api/announcements", announcements);
app.use("/api/about", about);
app.use("/api/server", serverinfo);

// Database connection =========================================================
const db = "mongodb://localhost/instactical2";

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => dbDebugger(`Connected to ${db}...`))
  .catch(err => dbDebugger("Could not connect to MongoDB..."));

const port = 3001;

app.listen(port, function () { dbDebugger(`Listening on port ${port}...`) });