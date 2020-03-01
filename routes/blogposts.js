const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { Blogpost } = require("../models/blogpost");

router.get("/", async (req, res) => {
  const post = await Blogpost.find();
  res.send(post);
});

router.get("/:slug", async (req, res) => {
  const blogPost = await Blogpost.findOne({ slug: req.params.slug });
  res.send(blogPost);
});

router.delete("/:slug", async (req, res) => {
  const blogPost = await Blogpost.findOneAndDelete({ slug: req.params.slug });
  // console.log(blogPost);
  res.send(blogPost);
});

router.put("/:slug", async (req, res) => {
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

router.post("/", async (req, res) => {
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

module.exports = router;