const mongoose = require('mongoose');
const Doc = require('../models/document');
const fs = require('fs');

// CREATE DOC
exports.doc_create = async (req, res) => {
  try {
    const newDoc = new Doc({
      ...req.body,
      link: '/uploads/' + req.file.filename,
      _id: new mongoose.Types.ObjectId()
    });
    await newDoc.save();
    res.status(201).json({ message: 'Document created' });
  } catch(err) {
    return res.status(500).json({ error: err });
  }
};

// GET ALL DOCUMENTS
exports.doc_get_all = async (req, res) => {
  try {
    const docs = await Doc.find();
    res.status(200).json({ list: docs });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// DELETE DOCUMENT
exports.doc_delete = async (req, res) => {
  const id = req.params.docId;
  try {
    const foundDoc = await Doc.findById(id);
    await Doc.remove({ _id: id });
    if (foundDoc && foundDoc.link) {
      await fs.unlink('static' + foundDoc.link, (err) => {
        console.log('DELETE DOCUMENT ERROR: ', err);
      });
    }
    return res.status(200).json({ message: 'Document deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};