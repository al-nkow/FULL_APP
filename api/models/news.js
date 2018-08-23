const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    // default: Date.now
  }
});

module.exports = mongoose.model('News', newsSchema);