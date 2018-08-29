const mongoose = require('mongoose');
const News = require('../models/news');
const fs = require('fs');

// CREATE NEWS
exports.news_create = async (req, res, next) => {
  try {
    const newNews = new News({
      ...req.body,
      image: '/uploads/' + req.file.filename,
      _id: new mongoose.Types.ObjectId()
    });
    await newNews.save();
    res.status(201).json({ message: 'News created' });
  } catch(err) {
    return res.status(500).json({ error: err });
  }
};

// GET ALL NEWS
exports.news_get_all = async (req, res) => {
  try {
    const news = await News.find().sort({ 'date': -1 }); // .select('product quantity _id')
    res.status(200).json({ news: news });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// DELETE NEWS
exports.news_delete = async (req, res) => {
  try {
    const foundNews = await News.findById(req.params.newsId);
    await News.remove({ _id: req.params.newsId });
    if (foundNews && foundNews.image) {
      await fs.unlink('static' + foundNews.image);
    }
    return res.status(200).json({ message: 'News deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};





// UPDATE CONTENT
// exports.content_create = async (req, res) => {
//   const content = await Content.findOne({ key: 'main_content' });
//   try {
//     if (content) {
//       // Update one
//       await Content.update({key: 'main_content'}, {$set: req.body});
//       res.status(201).json({ message: 'Content updated' });
//     } else {
//       // Create new if no content found
//       const newContent = new Content({
//         ...req.body,
//         _id: new mongoose.Types.ObjectId(),
//         key: 'main_content',
//       });
//       await newContent.save();
//       res.status(201).json({ message: 'Content created' });
//     }
//   } catch(err) {
//     return res.status(500).json({ error: err });
//   }
// };