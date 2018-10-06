const mongoose = require('mongoose');
const Faq = require('../models/faq');

// CREATE QUESTION
exports.faq_create = async (req, res) => {
  try {
    const newFaq = new Faq({
      ...req.body,
      _id: new mongoose.Types.ObjectId()
    });
    await newFaq.save();
    res.status(201).json({ message: 'Question created' });
  } catch(err) {
    return res.status(500).json({ error: err });
  }
};

// GET ALL QUESTIONS
exports.faq_get_all = async (req, res) => {
  try {
    const faq = await Faq.find();
    res.status(200).json({ list: faq });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
