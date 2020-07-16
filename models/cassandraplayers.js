const mongoose = require('mongoose');
const Joi = require('joi');

const Cassandraplayers = mongoose.model('Cassandraplayers', new mongoose.Schema({
  steamId: {
    type: String,
    required: true,
    trim: true,
    minlength: 17,
    maxlength: 17
  },
  comments: {
    type: String,
    required: false,
    trim: true,
    maxlength: 500
  },
  classification: String,
  alias: [String],
  fullBan: Boolean,
  kicks: [Object],
  bans: [Object]
}));

function validateCassandraplayers(cassandraPlayers) {
  const schema = {
    _id: Joi.string().min(1).max(50),
    steamId: Joi.string().min(17).max(17).required().label("Steam ID"),
    comments: Joi.string().max(500).allow("").label("Comments"),
    classification: Joi.string().max(20).allow("").label("Classification"),
    alias: Joi.array().label("Alias"),
    fullBan: Joi.boolean().label("Full Ban"),
    kicks: Joi.array().label("Kicks"),
    bans: Joi.array().label("Bans")
  };

  return Joi.validate(cassandraPlayers, schema);
}

exports.Cassandraplayers = Cassandraplayers;
exports.validate = validateCassandraplayers;