const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { Guideline, validate } = require("../models/guideline");

const errMsg = "The guideline with the given ID was not found.";

router.get("/", async (req, res) => {
  const guideline = await Guideline.find();

  res.send(guideline);
});

router.put("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const guideline = await Guideline.findByIdAndUpdate(
    req.body._id,
    {
      title: req.body.title,
      content: req.body.content
    },
    { new: true }
  );
  if (!guideline) return res.status(404).send(errMsg);

  res.send(guideline);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const guideline = new Guideline({
    title: req.body.title,
    content: req.body.content
  });
  if (!guideline) return res.status(404).send(errMsg);

  await guideline.save();
  res.send(guideline);
});

module.exports = router;