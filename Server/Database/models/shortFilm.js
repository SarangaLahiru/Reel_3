const mongoose = require('mongoose');

const ShortfilmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Shortfilm', ShortfilmSchema);
