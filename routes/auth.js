const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User } = require("../models/user");
const bcrypt = require('bcrypt');
const dbDebugger = require("debug")("app:db");
const _ = require("lodash");
// try npm i joi-password-complexity

router.post("/", async (req, res) => {
  const errMsg = "Invalid email or password.";

  // Validate the input for email, password
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find the user attempting to login
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(errMsg);

  // Compare login password with stored email's hashed password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send(errMsg);

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;