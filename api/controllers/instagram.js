const request = require('request');

// GET LATEST POSTS
exports.get_posts = async (req, res) => {
  const userId = '1248861449';
  const token = process.env.INSTAGRAM_TOKEN;
  const url = `https://api.instagram.com/v1/users/${userId}/media/recent?access_token=${token}&count=9`;

  request(url, function (error, response, body) {
    if (error) return res.status(500).json({ error });
    res.status(201).json(response);
  });
};