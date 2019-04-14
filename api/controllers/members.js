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

exports.member_by_email = async (req, res) => {
  const { email } = req.body;
  const foundMember = await Member.findOne({ email: email });

  if (foundMember) return res.status(200).json({
    message: 'Discount allowed'
  });

  return res.status(404).json({ error: 'user not found' });
};