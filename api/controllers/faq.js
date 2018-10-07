const mongoose = require('mongoose');
const Faq = require('../models/faq');

// CREATE QUESTION
exports.faq_create = async (req, res) => {
  try {
    const newFaq = new Faq({
      ...req.body,
      createdAt: new Date(),
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
    const faq = await Faq.find().sort({ 'createdAt': -1 });
    res.status(200).json({ list: faq });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// DELETE QUESTION
exports.faq_delete = async (req, res) => {
  try {
    await Faq.remove({ _id: req.params.faqId });
    return res.status(200).json({ message: 'Question deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// UPDATE QUESTION
exports.faq_update = async (req, res) => {
  const id = req.params.faqId;
  try {
    await Faq.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: 'Question updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
