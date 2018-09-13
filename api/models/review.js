const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  link: {
    type: String,
    required: true,
  },
  comments : [{
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  }],
  order: {
    type: Number
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Review', reviewSchema);