const router = require("express").Router();
const Bio = require("../Database/models/bio");
//const User = require("../Database/models/users");
//const { authenticate } = require('../middleware/auth');
const mongoose = require('mongoose');

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const bio = await Bio.findOne({ userId });
        if (!bio) {
            return res.status(404).json({ message: 'Bio not found' });
        }

        res.json(bio);
    } catch (error) {
        console.error('Error fetching bio:',  error);
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;