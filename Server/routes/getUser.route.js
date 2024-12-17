const router = require("express").Router();
const User = require("../Database/models/users"); 
const mongoose = require('mongoose');

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;
