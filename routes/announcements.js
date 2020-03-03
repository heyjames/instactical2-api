const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { Announcement, validate } = require("../models/announcement");
const authorize = require("../middleware/auth");
const admin = require("../middleware/admin");

const errMsg = "The announcement with the given ID was not found.";

router.delete("/:id", [authorize, admin], async (req, res) => {
  const announcement = await Announcement.findByIdAndRemove(req.params.id);
  if (!announcement) return res.status(404).send(errMsg);

  res.send(announcement);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const announcement = await Announcement.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content },
    { new: true }
  );
  if (!announcement) return res.status(404).send(errMsg);

  res.send(announcement);
});

router.get("/", async (req, res) => {
  const announce = await Announcement.find();
  res.send(announce);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const announcement = new Announcement({
    content: req.body.content
  });
  await announcement.save();
  res.send(announcement);
});

module.exports = router;