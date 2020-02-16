const express = require("express");
const app = express();
const Joi = require('joi');
const cors = require('cors');
const mongoose = require('mongoose');
const { Announcement } = require("./models/announcement");
const { Blogpost } = require("./models/blogpost");
const bodyParser = require('body-parser')

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

app.put("/api/blogposts/:slug", async (req, res) => {
  const blogPost = await Blogpost.findOneAndUpdate(
    req.params.slug,
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
    content: req.body.content
  });
  await blogPost.save();
  res.send(blogPost);
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