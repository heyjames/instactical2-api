const express = require("express");
const app = express();
const Joi = require('joi');
const cors = require('cors');
const mongoose = require('mongoose');
const { Announcement } = require("./models/announcement");
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.delete("/api/announcements/:id", async (req, res) => {
  const announcement = await Announcement.findByIdAndRemove(req.params.id);
  res.send(announcement);
});

app.put("/api/announcements/:id", async (req, res) => {
  // let ann = await Announcement.findById(req.params.id);
  // if (ann.hasOwnProperty("createdAt")) {
  //   console.log("It exists");
  // } else {
  //   console.log("Nope");
  // }
  // let date = new Date();
  // date = moment(date).format('YYYY-MM-DD hh:mm:ssZ'); // Adjusts time to Pacific
  // make the date here from announcementForm.jsx

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
  const announcement = new Announcement({
    content: req.body.content
  });
  await announcement.save();
  res.send(announcement);
});

const db = "mongodb://localhost/instactical2";
mongoose.set('useFindAndModify', false);
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log(`Connected to ${db}...`));

const port = 3001;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);