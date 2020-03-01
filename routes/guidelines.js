const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { Guideline } = require("../models/guideline");

router.get("/", async (req, res) => {
  const result = await Guideline.find();
  // console.log(result);
  res.send(result);
});

router.put("/", async (req, res) => {
  // console.log(req.body._id);
  const result = await Guideline.findByIdAndUpdate(
    req.body._id,
    {
      title: req.body.title,
      content: req.body.content
    },
    { new: true }
  );
  // console.log(result);
  res.send(result);
});

router.post("/", async (req, res) => {
  const result = new Guideline({
    title: req.body.title,
    content: req.body.content
  });
  // console.log(result);
  await result.save();
  res.send(result);
});

module.exports = router;