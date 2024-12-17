const express = require('express');
const router = express.Router();
const Comment = require('../Database/models/posts'); // Adjust the path as needed

// Fetch comments for a specific post
router.get('/comments/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate('author');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
