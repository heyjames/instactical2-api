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

function validateGuideline(guideline) {
  const schema = {
    content: Joi.string().min(1).required()
  };

  return Joi.validate(guideline, schema);
}

exports.Guideline = Guideline;
exports.validate = validateGuideline;