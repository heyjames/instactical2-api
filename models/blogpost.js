const mongoose = require('mongoose');
const Joi = require('joi');

const Blogpost = mongoose.model('Blogposts', new mongoose.Schema({
  // "_id": false,
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
    _id: Joi.string().min(1).max(50),
    content: Joi.string().min(1).max(2400).required(),
    img: Joi.string().min(1).max(50).required(),
    featured: Joi.string().required(),
    slug: Joi.string().min(1).max(50).required(),
    title: Joi.string().min(1).max(50).required(),
    author: Joi.string().min(1).max(50),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  };

  return Joi.validate(blogpost, schema);
}

exports.Blogpost = Blogpost;
exports.validate = validateBlogpost;