const express = require('express');
const router = express.Router();
const Portfolio = require('../Database/models/portfolio');

// Add a new portfolio project
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newPortfolio = new Portfolio({ title, description });
    await newPortfolio.save();
    res.json(newPortfolio);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
