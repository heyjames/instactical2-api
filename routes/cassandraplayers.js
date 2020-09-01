const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { Cassandraplayers, validate } = require("../models/cassandraplayers");
const authorize = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", [authorize], async (req, res, next) => {
  const result = await Cassandraplayers.find();
  res.send(result);
});

router.delete("/:steamId", [authorize, admin], async (req, res) => {
  const cassandraPlayer = await Cassandraplayers.findOneAndDelete({ steamId: req.params.steamId });
  if (!cassandraPlayer) return res.status(404).send("The player with the given Steam ID was not found.");

  res.send(cassandraPlayer);
});

router.get("/:steamId", [authorize], async (req, res) => {
  const cassandraPlayer = await Cassandraplayers.findOne({ steamId: req.params.steamId });
  if (!cassandraPlayer) return res.status(404).send("The player with the given Steam ID was not found.");

  res.send(cassandraPlayer);
});

// router.patch("/:steamId", [authorize, admin], async (req, res) => {
//   // const { error } = validate(req.body);
//   // if (error) return res.status(400).send(error.details[0].message);
//   console.log("1111");
//   const cassandraPlayer = await Cassandraplayers.findByIdAndUpdate(
//     { _id: req.body._id },
//     {
//       steamId: req.body.steamId,
//       comments: req.body.comments,
//       classification: req.body.classification,
//       fullBan: req.body.fullBan,
//       alias: req.body.alias,
//       kicks: req.body.kicks,
//       bans: req.body.bans
//     },
//     { new: true }
//   );
//   // console.log(cassandraPlayer);
//   if (!cassandraPlayer) return res.status(404).send("Something went wrong with patching.");

//   res.send(cassandraPlayer);
// });

//////////////////// To be extracted into its own file ////////////////////////
// Updates the kicks array. Requires a lot of rework in 
// cassandraPlayerKickForm.jsx. Status: Aborted.
// router.put("/:steamId/kick", [authorize, admin], async (req, res) => {
//   // const { error } = validate(req.body);
//   // if (error) return res.status(400).send(error.details[0].message);

//   const cassandraPlayer = await Cassandraplayers.updateOne(
//     { _id: req.body._id },
//     { $set: { kicks: req.body.kicks } }
//   );

//   const putError = "Something went wrong with patching.";
//   if (!cassandraPlayer) return res.status(404).send(putError);

//   res.send(cassandraPlayer);
// });
///////////////////////////////////////////////////////////////////////////////

router.put("/:steamId", [authorize, admin], async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  // console.log("2222");
  const cassandraPlayer = await Cassandraplayers.findByIdAndUpdate(
    { _id: req.body._id },
    {
      steamId: req.body.steamId,
      comments: req.body.comments,
      classification: req.body.classification,
      fullBan: req.body.fullBan,
      alias: req.body.alias,
      kicks: req.body.kicks,
      bans: req.body.bans
    },
    { new: true }
  );
  // console.log(cassandraPlayer);
  if (!cassandraPlayer) return res.status(404).send("Something went wrong with patching.");

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

module.exports = router;