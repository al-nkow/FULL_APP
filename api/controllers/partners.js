const mongoose = require('mongoose');
const Partner = require('../models/partner');
const fs = require('fs');

// CREATE PARTNER
exports.partners_create = async (req, res) => {
  try {
    const newPartner = new Partner({
      ...req.body,
      image: '/uploads/' + req.file.filename,
      _id: new mongoose.Types.ObjectId()
    });
    await newPartner.save();
    res.status(201).json({ message: 'Partner created' });
  } catch(err) {
    return res.status(500).json({ error: err });
  }
};

// GET ALL PARTNERS
exports.partners_get_all = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json({ partners: partners });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// DELETE PARTNERS
exports.partners_delete = async (req, res) => {
  const id = req.params.partnerId;
  try {
    const foundPartner = await Partner.findById(id);
    await Partner.remove({ _id: id });
    if (foundPartner && foundPartner.image) {
      await fs.unlink('static' + foundPartner.image, (err) => {
        console.log('DELETE PARTNER IMAGE ERROR: ', err);
      });
    }
    return res.status(200).json({ message: 'Partner deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
