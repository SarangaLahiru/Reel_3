const express = require('express');
const router = express.Router();
const Comment = require('../Database/models/posts'); // Adjust the path as needed

// Add a new comment
router.post('/comments', async (req, res) => {
  const { text, author, postId } = req.body;
  const comment = new Comment({ text, author, postId });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
