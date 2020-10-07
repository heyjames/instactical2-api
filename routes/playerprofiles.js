const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { Playerprofiles, validate } = require("../models/playerprofiles");
const authorize = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", [authorize], async (req, res, next) => {
  const result = await Playerprofiles.find();
  res.send(result);
});

router.delete("/:steamId", [authorize, admin], async (req, res) => {
  const playerProfile = await Playerprofiles.findOneAndDelete({ steamId: req.params.steamId });
  if (!playerProfile) return res.status(404).send("The player with the given Steam ID was not found.");

  res.send(playerProfile);
});

router.get("/:steamId", [authorize], async (req, res) => {
  const playerProfile = await Playerprofiles.findOne({ steamId: req.params.steamId });
  if (!playerProfile) return res.status(404).send("The player with the given Steam ID was not found.");

  res.send(playerProfile);
});

// router.patch("/:steamId", [authorize, admin], async (req, res) => {
//   // const { error } = validate(req.body);
//   // if (error) return res.status(400).send(error.details[0].message);
//   console.log("1111");
//   const playerProfile = await Playerprofiles.findByIdAndUpdate(
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
//   // console.log(playerProfile);
//   if (!playerProfile) return res.status(404).send("Something went wrong with patching.");

//   res.send(playerProfile);
// });

//////////////////// To be extracted into its own file ////////////////////////
// Updates the kicks array. Requires a lot of rework in 
// playerProfileKickForm.jsx. Status: Aborted.
// router.put("/:steamId/kick", [authorize, admin], async (req, res) => {
//   // const { error } = validate(req.body);
//   // if (error) return res.status(400).send(error.details[0].message);

//   const playerProfile = await Playerprofiles.updateOne(
//     { _id: req.body._id },
//     { $set: { kicks: req.body.kicks } }
//   );

//   const putError = "Something went wrong with patching.";
//   if (!playerProfile) return res.status(404).send(putError);

//   res.send(playerProfile);
// });
///////////////////////////////////////////////////////////////////////////////

router.put("/:steamId", [authorize, admin], async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  // console.log("2222");
  const playerProfile = await Playerprofiles.findByIdAndUpdate(
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
  // console.log(playerProfile);
  if (!playerProfile) return res.status(404).send("Something went wrong with patching.");

  res.send(playerProfile);
});

router.post("/", [authorize, admin], async (req, res) => {
  // console.log(req.body);
  const { error } = validate(req.body);
  // console.log(`error: ${error}`);
  if (error) return res.status(400).send(error.details[0].message);

  let playerProfile = await Playerprofiles.findOne({ steamId: req.body.steamId });
  if (playerProfile) return res.status(400).send("Player already added.");

  playerProfile = new Playerprofiles({
    steamId: req.body.steamId,
    comments: req.body.comments,
    classification: req.body.classification,
    fullBan: req.body.fullBan,
    alias: req.body.alias,
    kicks: req.body.kicks,
    bans: req.body.bans,
  });

  try {
    await playerProfile.save();
  } catch (error) {
    console.log(`error: ${error}`);
  }

  res.send(playerProfile);
});

module.exports = router;