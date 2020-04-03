const mongoose = require('mongoose');
const Joi = require('joi');

const Announcement = mongoose.model('Announcements', new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  }
},
  {
    timestamps: true
  }));

function validateAnnouncement(announcement) {
  const schema = {
    _id: Joi.string().min(1).max(50),
    content: Joi.string().min(1).max(255).required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  };

  return Joi.validate(announcement, schema);
}

exports.Announcement = Announcement;
exports.validate = validateAnnouncement;