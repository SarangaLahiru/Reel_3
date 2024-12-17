const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../Database/models/users');
//const authenticate = require('../Middleware/auth');
const router = express.Router();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '..', '..', 'public', 'Images', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Edit profile route
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { firstname, secondname, email,  userId } = req.body;
    //const userId = req.user._id; // Assume you have user ID from session or JWT
   
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const updateFields = { firstname, secondname, email };
    if (req.file) {
      let imagePath = req.file.path.replace(/\\/g, '/');
      imagePath = `./Images/uploads/${path.basename(imagePath)}`;
      updateFields.profilePicture = imagePath;
    }

    const user = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({
      status: 'failed',
      message: err.message
    });
  }
});

module.exports = router;
 