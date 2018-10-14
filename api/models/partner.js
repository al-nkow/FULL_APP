const mongoose = require('mongoose');

const partnerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Partner', partnerSchema);