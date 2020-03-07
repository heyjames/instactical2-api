const express = require("express");
const router = express.Router();
const config = require("config");
// const fetch = require("node-fetch");

const jsonString = {
  "name": "Cassandra.Confluvium 4 | Slow Mil-Tactical Squad Play Only",
  "map": "Ministry",
  "password": false,
  "raw": {
    "protocol": 17,
    "folder": "sandstorm",
    "game": "Insurgency: Sandstorm",
    "steamappid": 0,
    "numplayers": 8,
    "numbots": 0,
    "listentype": "d",
    "environment": "l",
    "secure": 1,
    "version": "1.1.0.0",
    "port": 27122,
    "steamid": "85568392923170973",
    "tags": "V:94033,S:523,MatchServer_b:false",
    "gameid": "581320",
    "rules": {
      "Coop_b": "true",
      "GameMode_s": "Checkpoint",
      "MatchServer_b": "false",
      "Mutated_b": "false",
      "OfficialRuleset_b": "false",
      "PlrC_i": "8",
      "PlrM_i": "8",
      "Pwd_b": "false",
      "RankedServer_b": "true",
      "S": "523",
      "Versus_b": "false"
    }
  },
  "maxplayers": 8,
  "players": [
    {
      "name": "LMS fred",
      "score": 440,
      "time": 6626.00244140625
    },
    {
      "name": "Kansas",
      "score": 645,
      "time": 6563.2802734375
    },
    {
      "name": "Piggi",
      "score": 635,
      "time": 4610.0361328125
    },
    {
      "name": "Ahnicks",
      "score": 430,
      "time": 1198.14794921875
    },
    {
      "name": "Gallowglass",
      "score": 70,
      "time": 1000.7109985351562
    },
    {
      "name": "B2asKe",
      "score": 0,
      "time": 916.7628784179688
    },
    {
      "name": "SlevenKlevra",
      "score": 0,
      "time": 738.7224731445312
    },
    {
      "name": "BrotherTancred",
      "score": 0,
      "time": 696.5005493164062
    }
  ],
  "bots": [],
  "query": {
    "host": "45.77.203.74",
    "address": "45.77.203.74",
    "port": 27151,
    "port_query": 27151,
    "type": "insurgency",
    "pretty": "Insurgency"
  }
};

router.get("/", async (req, res) => {
  // fetch(config.get("api_server_info")) // TODO: @default.json, move IP as an env var?
  //   .then(res => res.json())
  //   .then(json => res.json(json))
  //   .catch(error => res.send(error));

  const myJSON = JSON.stringify(jsonString);

  res.json(myJSON);
});

module.exports = router;