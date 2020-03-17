const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { About, validate } = require("../models/about");
const authorize = require("../middleware/auth");

const errMsg = "The About post with the given ID was not found.";

router.get("/", async (req, res, next) => {
  const result = await About.find();
  res.send(result);
});

router.put("/", authorize, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const about = await About.findByIdAndUpdate(
    req.body._id,
    {
      title: req.body.title,
      content: req.body.content
    },
    { new: true }
  );
  if (!about) return res.status(404).send(errMsg);

  res.send(about);
});

module.exports = router;