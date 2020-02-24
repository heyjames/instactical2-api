const express = require("express");
const app = express();
const Joi = require('joi');
const cors = require('cors');
const mongoose = require('mongoose');
const { Announcement } = require("./models/announcement");
const { Blogpost } = require("./models/blogpost");
const { About } = require("./models/about");
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// ============================================================
// ============================================================
// ============================================================

app.delete("/api/announcements/:id", async (req, res) => {
  const announcement = await Announcement.findByIdAndRemove(req.params.id);
  res.send(announcement);
});

app.put("/api/announcements/:id", async (req, res) => {
  const announcement = await Announcement.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content },
    { new: true }
  );
  res.send(announcement);
});

app.get("/api/announcements", async (req, res) => {
  const announce = await Announcement.find();
  res.send(announce);
});

app.post("/api/announcements", async (req, res) => {
  console.log("req.body: ");
  console.log(req.body);
  const announcement = new Announcement({
    content: req.body.content
  });
  await announcement.save();
  res.send(announcement);
});

// ============================================================
// ============================================================
// ============================================================

app.get("/api/blogposts", async (req, res) => {
  const post = await Blogpost.find();
  res.send(post);
});

app.get("/api/blogposts/:slug", async (req, res) => {
  const blogPost = await Blogpost.findOne({ slug: req.params.slug });
  res.send(blogPost);
});

app.delete("/api/blogposts/:slug", async (req, res) => {
  const blogPost = await Blogpost.findOneAndDelete({ slug: req.params.slug });
  // console.log(blogPost);
  res.send(blogPost);
});

app.put("/api/blogposts/:slug", async (req, res) => {
  const blogPost = await Blogpost.findByIdAndUpdate(
    req.body._id,
    {
      content: req.body.content,
      img: req.body.img,
      featured: req.body.featured,
      slug: req.body.slug,
      label: req.body.label,
      title: req.body.title,

    },
    { new: true }
  );
  // console.log(blogPost);
  res.send(blogPost);
});

app.post("/api/blogposts", async (req, res) => {
  const blogPost = new Blogpost({
    content: req.body.content,
    img: req.body.img,
    featured: req.body.featured,
    slug: req.body.slug,
    label: req.body.label,
    title: req.body.title,
    author: req.body.author,
  });
  await blogPost.save();
  res.send(blogPost);
});

// ============================================================
// ============================================================
// ============================================================



app.get("/api/server", async (req, res) => {
  // fetch('http://insurgency.pro/api/45.77.203.74:27122')
  //   .then(res => res.json())
  //   .then(json => res.json(json))
  //   .catch(error => res.send(error));
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

  var myJSON = JSON.stringify(jsonString);
  // const result = JSON.parse(myJSON);
  // const result = new Promise(resolve => resolve(JSON.parse(jsonString)));
  // console.log(myJSON);
  // console.log(result);
  res.json(myJSON);
  // res.json(result);


});

app.get("/api/about", async (req, res) => {
  const result = await About.find();
  // console.log(result);
  res.send(result);
});

app.put("/api/about", async (req, res) => {
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

// ============================================================
// ============================================================
// ============================================================

const db = "mongodb://localhost/instactical2";
mongoose.set('useFindAndModify', false);
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log(`Connected to ${db}...`));

const port = 3001;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);