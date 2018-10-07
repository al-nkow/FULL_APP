const mongoose = require('mongoose');
const Review = require('../models/review');
const fs = require('fs');
const request = require('request');

// UPDATE REVIEW
exports.review_update = async (req, res) => {
  const id = req.params.reviewId;
  // delete old image if there is a new one
  if (req.file && req.file.filename) {
    const foundReview = await Review.findById(id);
    if (foundReview && foundReview.image) {
      await fs.unlink('static' + foundReview.image);
    }
  }
  try {
    const review = {};
    if (req.file && req.file.filename) review.image = '/uploads/' + req.file.filename;
    if (req.body.comments) review.comments = JSON.parse(req.body.comments);
    review.link = req.body.link;
    review.order = req.body.order;

    await Review.findByIdAndUpdate(id, review);
    res.status(200).json({ message: 'Review updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// CREATE REVIEW
exports.review_create = async (req, res) => {
  const fileName = new Date().toISOString() + 'review.jpg';
  if (req.body.imageLink) {
    request(req.body.imageLink)
      .on('error', (err) => { console.log('ERROR: ', err) })
      .pipe(fs.createWriteStream(`./static/uploads/${fileName}`));
  }

  try {
    const review = {};
    if (req.body.imageLink) review.image = '/uploads/' + fileName;
    if (req.file) review.image = '/uploads/' + req.file.filename;
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

// GET ALL REVIEWS
exports.reviews_get_all = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ 'order': -1 }); //.sort({ 'date': -1 }); // .select('title _id')
    res.status(200).json({ reviews: reviews });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// DELETE REVIEW ITEM
exports.review_delete = async (req, res) => {
  try {
    const foundReview = await Review.findById(req.params.reviewId);
    await Review.remove({ _id: req.params.reviewId });
    if (foundReview && foundReview.image) {
      await fs.unlink('static' + foundReview.image, (err) => {
        console.log('DELETE REVIEW IMAGE ERROR: ', err);
      });
    }
    return res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
