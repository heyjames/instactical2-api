const mongoose = require('mongoose');
const Joi = require('joi');

const About = mongoose.model('About', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  }
}));

function validateAbout(about) {
  const schema = {
    title: Joi.string().min(2).required(),
    content: Joi.string().min(2).required()
  };

  return Joi.validate(about, schema);
}

exports.About = About;
exports.validate = validateAbout;