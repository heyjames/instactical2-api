const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { Cassandraplayers, validate } = require("../models/cassandraplayers");
const authorize = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", [authorize, admin], async (req, res, next) => {
  const result = await Cassandraplayers.find();
  res.send(result);
});

router.delete("/:steamId", [authorize, admin], async (req, res) => {
  const cassandraPlayer = await Cassandraplayers.findOneAndDelete(req.params.steamId);
  if (!cassandraPlayer) return res.status(404).send("The player with the given Steam ID was not found.");

  res.send(cassandraPlayer);
});

router.post("/", [authorize, admin], async (req, res) => {
  // console.log(req.body);
  const { error } = validate(req.body);
  // console.log(`error: ${error}`);
  if (error) return res.status(400).send(error.details[0].message);

  let cassandraPlayer = await Cassandraplayers.findOne({ steamId: req.body.steamId });
  if (cassandraPlayer) return res.status(400).send("Player already added.");

  cassandraPlayer = new Cassandraplayers({
    steamId: req.body.steamId,
    comments: req.body.comments,
    classification: req.body.classification,
    fullBan: req.body.fullBan,
    alias: req.body.alias,
    kicks: req.body.kicks,
    bans: req.body.bans,
  });

  try {
    await cassandraPlayer.save();
  } catch (error) {
    console.log(`error: ${error}`);
  }

  res.send(cassandraPlayer);
});

// router.put("/", [authorize, admin], async (req, res) => {
//   const { error } = validate(req.body)
//   if (error) return res.status(400).send(error.details[0].message);

//   const about = await About.findByIdAndUpdate(
//     req.body._id,
//     {
//       title: req.body.title,
//       content: req.body.content
//     },
//     { new: true }
//   );
//   if (!about) return res.status(404).send(errMsg);

//   res.send(about);
// });

module.exports = router;