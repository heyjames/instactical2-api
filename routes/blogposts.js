const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { Blogpost, validate } = require("../models/blogpost");
const authorize = require("../middleware/auth");
const admin = require("../middleware/admin");

const errMsgId = "The blog post with the given ID was not found.";
const errMsgSlug = "The blog post with the given slug was not found.";

router.get("/", async (req, res) => {
  const post = await Blogpost.find();
  res.send(post);
});

router.get("/:slug", async (req, res) => {
  const blogPost = await Blogpost.findOne({ slug: req.params.slug });
  if (!blogPost) return res.status(404).send(errMsgSlug);

  res.send(blogPost);
});

router.delete("/:slug", [authorize, admin], async (req, res) => {
  const blogPost = await Blogpost.findOneAndDelete({ slug: req.params.slug });
  if (!blogPost) return res.status(404).send(errMsgSlug);

  res.send(blogPost);
});

router.put("/:slug", [authorize, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const blogPost = await Blogpost.findByIdAndUpdate(
    req.body._id,
    {
      content: req.body.content,
      img: req.body.img,
      featured: req.body.featured,
      slug: req.body.slug,
      title: req.body.title,
    },
    { new: true }
  );
  if (!blogPost) return res.status(404).send(errMsgId);

  res.send(blogPost);
});

router.post("/", [authorize, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const blogPost = new Blogpost({
    content: req.body.content,
    img: req.body.img,
    featured: req.body.featured,
    slug: req.body.slug,
    title: req.body.title,
    author: req.body.author,
  });

  await blogPost.save();
  res.send(blogPost);
});

module.exports = router;