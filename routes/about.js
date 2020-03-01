const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { About } = require("../models/about");
const authorize = require("../middleware/auth");

router.get("/", async (req, res) => {
  const result = await About.find();
  // console.log(result);
  res.send(result);
});

router.put("/", authorize, async (req, res) => {
  const about = await About.findByIdAndUpdate(
    req.body._id,
    {
      title: req.body.title,
      content: req.body.content
    },
    { new: true }
  );

  res.send(about);
});

module.exports = router;