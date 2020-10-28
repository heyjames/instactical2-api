const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const guidelines = require("../routes/guidelines");
const blogposts = require("../routes/blogposts");
const announcements = require("../routes/announcements");
const about = require("../routes/about");
const notfound = require("../routes/notfound");
const playerprofiles = require("../routes/playerprofiles");
const serverinfo = require("../routes/serverinfo");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const error = require("../middleware/error");

module.exports = function (app) {
  app.use(cors());
  app.use(bodyParser.json()); // returns middleware that only parses json
  app.use(bodyParser.urlencoded({ extended: true })); // extended = arrays, complex objects in the www.instactical.com/api/users key=value&key=value
  app.use(express.static("public")); // static assets like css images in this folder.
  app.use(helmet());
  app.use(express.json()); // Returns a middleware function. Reads request. If json object exists in body of request, it will parse body of request into a json object and set req.body property. And this happens at runtime.
  
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/guidelines", guidelines);
  app.use("/api/blogposts", blogposts);
  app.use("/api/announcements", announcements);
  app.use("/api/about", about);
  app.use("/api/server", serverinfo);
  app.use("/api/playerprofiles", playerprofiles);
  app.use("/api", notfound);
  app.use("/", notfound);
  app.use(error);
}