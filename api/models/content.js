const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  key: String,
  main: {
    info: String,
    sub: String,
  },
  about: {
    info: String
  },
  programs: {
    start: String
  }
});

module.exports = mongoose.model('Content', contentSchema);