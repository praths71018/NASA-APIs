const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  rover: String,
  sol: Number,
  earth_date: String,
  camera: String,
  photo_id: Number,
  img_src: String,
  page: Number,
  saved_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Photo', photoSchema);
