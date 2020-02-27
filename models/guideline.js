const mongoose = require('mongoose');

const Guideline = new mongoose.model('Guideline', new mongoose.Schema({
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

exports.Guideline = Guideline;