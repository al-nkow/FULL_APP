const mongoose = require('mongoose');
const Review = require('../models/review');
const fs = require('fs');
const request = require('request');

// CREATE REVIEW
exports.review_create = async (req, res) => {

  console.log('===================');
  console.log('===================');
  console.log(req.body);
  console.log('===================');
  console.log('===================');


  const fileName = new Date().toISOString() + 'review.jpg';
  if (req.body.imageLink) {
    request(req.body.imageLink)
      // .on('error', (err) => { console.log(err)})
      // .on('response', (response) => { console.log('>>>>>>>>>', response.body)})
      .pipe(fs.createWriteStream(`./static/uploads/${fileName}`));
  }

  try {
    const review = {};
    if (req.body.imageLink) review.image = '/uploads/' + fileName;
    if (req.body.comments) review.comments = JSON.parse(req.body.comments);
    review.link = req.body.link;
    review.order = req.body.order;

    const newReview = new Review({
      ...review,
      _id: new mongoose.Types.ObjectId()
    });

    await newReview.save();
    res.status(201).json({ message: 'Review created' });
  } catch(err) {
    return res.status(500).json({ error: err });
  }
};
