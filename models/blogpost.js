const mongoose = require('mongoose');
const Joi = require('joi');

const Blogpost = mongoose.model('Blogposts', new mongoose.Schema({
  "_id": false,
  featured: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  img: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  label: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  }
},
  {
    timestamps: true
  }
));

function validateBlogpost(blogpost) {
  const schema = {
    content: Joi.string().min(1).max(255).required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  };

  return Joi.validate(announcement, schema);
}

exports.Blogpost = Blogpost;
exports.validate = validateBlogpost;