const mongoose = require('mongoose');

const instagramSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  recType: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Instagram', instagramSchema);