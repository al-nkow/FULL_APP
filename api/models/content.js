const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  key: String,
  season: String,
  main: {
    info: String,
    sub: String,
    sliderLeft: String,
    sliderRight: String,
  },
  about: {
    info: String
  },
  programs: {
    start: String,
    program1: {
      name: String,
      price: String,
      points: [String]
    },
    program2: {
      name: String,
      price: String,
      points: [String]
    },
    program3: {
      name: String,
      price: String,
      points: [String]
    }
  },
  benefits: {
    ben1: {
      name: String,
      body: String
    },
    ben2: {
      name: String,
      body: String
    },
    ben3: {
      name: String,
      body: String
    },
    ben4: {
      name: String,
      body: String
    },
    ben5: {
      name: String,
      body: String
    },
    ben6: {
      name: String,
      body: String
    }
  },
  prizes: {
    title: String,
    subtitle: String,
    prize1: String,
    prize2: String,
    prize3: String,
    prize4: String,
    prize5: String,
  },
  teachers: {
    teacher1: {
      name: String,
      paragraph1: String,
      paragraph2: String,
      email: String,
      vkontakte: String,
      instagram: String,
      whatsup: String
    }
  },
  contacts: {
    inn: String,
    ogrn: String,
    address: String,
    mobile: String,
    phone: String,
    email: String
  }
});

module.exports = mongoose.model('Content', contentSchema);