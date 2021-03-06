const Member = require('../models/member');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// REGISTER MEMBER
exports.member_register = async (req, res) => {
  const { email } = req.body;
  const foundMember = await Member.findOne({ email: email });

  if (foundMember) return res.status(409).json({
    message: 'Member with this email already exist'
  });

  try {
    const newMember = new Member({
      ...req.body,
      _id: new mongoose.Types.ObjectId()
    });
    await newMember.save();
    res.status(201).json({ message: 'New member registered' });
  } catch(err) {
    return res.status(500).json({ error: err });
  }
};

// FIND MEMBER BY EMAIL
exports.member_by_email = async (req, res) => {
  const { email } = req.body;
  const foundMember = await Member.findOne({ email: email });

  if (foundMember) return res.status(200).json({
    message: 'Discount allowed'
  });

  return res.status(404).json({ error: 'user not found' });
};

// GET MEMBERS LIST
exports.get_members = async (req, res) => {
  try {
    const members = await Member.find().select('_id email firstName lastName phone');
    res.status(200).json({ members: members });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// DELETE MEMBER
exports.member_delete = async (req, res) => {
  try {
    await Member.remove({ _id: req.params.memberId });
    return res.status(200).json({ message: 'Member deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};