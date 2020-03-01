const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User, validate } = require("../models/user");
const bcrypt = require('bcrypt');
const dbDebugger = require("debug")("app:db");
const _ = require("lodash");
// try npm i joi-password-complexity

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // const user = await User.findById("1234");
  // if (!user) return res.status(400).send('Invalid customer.');

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    // await user.validate();
    await user.save();
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;