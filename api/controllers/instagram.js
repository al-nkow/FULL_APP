const request = require('request');
const Instagram = require('../models/instagram');
const mongoose = require('mongoose');

// GET TOKEN
exports.get_token = async (req, res) => {
  try {
    const tokenObj = await Instagram.findOne({ recType: 'access-token' });
    res.status(200).json({ token: tokenObj.token });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// GET LATEST POSTS
exports.get_posts = async (req, res) => {
  const tokenObj = await Instagram.findOne({ recType: 'access-token' });
  const userId = '1248861449';
  const token = tokenObj.token;
  const url = `https://api.instagram.com/v1/users/${userId}/media/recent?access_token=${token}&count=9`;

  request(url, function (error, response, body) {
    if (error) return res.status(500).json({ error });
    res.status(201).json(response);
  });
};

// SET INSTAGRAM TOKEN
exports.set_token = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(500).json({ error: 'No token is present' });

  const tokenObj = await Instagram.findOne({ recType: 'access-token' });

  if (tokenObj) {
    // if token exist - update
    tokenObj.token = token;
    tokenObj.save();
  } else {
    // create token object
    const newToken = new Instagram({
      _id: new mongoose.Types.ObjectId(),
      recType: 'access-token',
      token: token,
    });
    await newToken.save();
  }

  res.status(200).json({ message: 'token updated' });
}
