/*const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Shortfilm = require('../Database/models/shortFilm');
const Portfolio = require('../Database/models/portfolio');

// Ensure the uploads directories exist
const videoUploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads', 'videos');
const imageUploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');

if (!fs.existsSync(videoUploadsDir)) {
  fs.mkdirSync(videoUploadsDir, { recursive: true });
}

if (!fs.existsSync(imageUploadsDir)) {
  fs.mkdirSync(imageUploadsDir, { recursive: true });
}

// Set storage engine for video files
const storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videoUploadsDir); // directory to save video files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // save files with unique names
  }
});

// Set storage engine for cover images
const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadsDir); // directory to save image files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // save files with unique names
  }
});

// Initialize upload for video files
const uploadVideo = multer({
  storage: storageVideo,
  limits: { fileSize: 100000000 }, // Limit file size to 100MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('videoFile');

// Initialize upload for cover images
const uploadImage = multer({
  storage: storageImage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('coverImage');

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|mp4/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and Videos Only!');
  }
}

// Add a new shortfilm
router.post("/", (req, res) => {
  uploadVideo(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    if (!req.file) {
      return res.status(400).json({ msg: 'No video file uploaded' });
    }

    const videoFilePath = req.file.path.replace(/\\/g, '/');
    const videoUrl = `./uploads/videos/${path.basename(videoFilePath)}`;

    uploadImage(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      if (!req.file) {
        return res.status(400).json({ msg: 'No cover image uploaded' });
      }

      const imageFilePath = req.file.path.replace(/\\/g, '/');
      const coverImageUrl = `./uploads/${path.basename(imageFilePath)}`;

      const { title, summary, genre, portfolioId } = req.body;

      try {
        const newShortfilm = new Shortfilm({
          title,
          summary,
          genre,
          videoUrl,
          coverImageUrl,
        });

        await newShortfilm.save();

        // Add the shortfilm to the portfolio
        const portfolio = await Portfolio.findById(portfolioId);
        portfolio.shortfilms.push(newShortfilm._id);
        await portfolio.save();

        res.json(newShortfilm);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
    });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Shortfilm = require('../Database/models/shortFilm');
const Portfolio = require('../Database/models/portfolio');

// Ensure the uploads directories exist
const videoUploadsDir = path.join(__dirname, '..', '..', 'public', 'videos');
const imageUploadsDir = path.join(__dirname, '..', '..', 'public', 'Images', 'uploads');

if (!fs.existsSync(videoUploadsDir)) {
  fs.mkdirSync(videoUploadsDir, { recursive: true });
}

if (!fs.existsSync(imageUploadsDir)) {
  fs.mkdirSync(imageUploadsDir, { recursive: true });
}

// Set storage engine for video files
const storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videoUploadsDir); // directory to save video files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // save files with unique names
  }
});

// Set storage engine for cover images
const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadsDir); // directory to save image files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // save files with unique names
  }
});

// Initialize upload for video files
const uploadVideo = multer({
  storage: storageVideo,
  limits: { fileSize: 100000000 }, // Limit file size to 100MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('videoFile');

// Initialize upload for cover images
const uploadImage = multer({
  storage: storageImage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('coverImage');

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|mp4/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and Videos Only!');
  }
}

// Add a new shortfilm
router.post("/", (req, res) => {
  console.log('--- Incoming Request ---');
  console.log('Request Body:', req.body);

  uploadVideo(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    if (!req.file) {
      return res.status(400).json({ msg: 'No video file uploaded' });
    }

    const videoFilePath = req.file.path.replace(/\\/g, '/');
    const videoUrl = `./videos/${path.basename(videoFilePath)}`;

    uploadImage(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      if (!req.file) {
        return res.status(400).json({ msg: 'No cover image uploaded' });
      }

      const imageFilePath = req.file.path.replace(/\\/g, '/');
      const coverImageUrl = `./Images/uploads/${path.basename(imageFilePath)}`;

      const { title, summary, genre, portfolioId } = req.body;

      try {
        const newShortfilm = new Shortfilm({
          title,
          summary,
          genre,
          videoUrl,
          coverImageUrl,
        });

        await newShortfilm.save();

        // Add the shortfilm to the portfolio
        const portfolio = await Portfolio.findById(portfolioId);
        portfolio.shortfilms.push(newShortfilm._id);
        await portfolio.save();

        res.json(newShortfilm);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
    });
  });
});

module.exports = router; 



const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Shortfilm = require('../Database/models/shortFilm');
const Portfolio = require('../Database/models/portfolio');

// Ensure the uploads directories exist
const videoUploadsDir = path.join(__dirname, '..', '..', 'public', 'videos');
const imageUploadsDir = path.join(__dirname, '..', '..', 'public', 'Images', 'uploads');

if (!fs.existsSync(videoUploadsDir)) {
  fs.mkdirSync(videoUploadsDir, { recursive: true });
}

if (!fs.existsSync(imageUploadsDir)) {
  fs.mkdirSync(imageUploadsDir, { recursive: true });
}

// Set storage engine for files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, imageUploadsDir); // directory to save image files
    } else if (file.mimetype.startsWith('video')) {
      cb(null, videoUploadsDir); // directory to save video files
    } else {
      cb('Invalid file type', false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // save files with unique names
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // Limit file size to 100MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([{ name: 'videoFile', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]);

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|mp4/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and Videos Only!');
  }
}

// Add a new shortfilm
router.post("/", (req, res) => {
  console.log('--- Incoming Request ---');
  console.log('Request Body:', req.body);

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    if (!req.files.videoFile) {
      return res.status(400).json({ msg: 'No video file uploaded' });
    }
    if (!req.files.coverImage) {
      return res.status(400).json({ msg: 'No cover image uploaded' });
    }

    const videoFilePath = req.files.videoFile[0].path.replace(/\\/g, '/');
    const videoUrl = `./videos/${path.basename(videoFilePath)}`;

    const imageFilePath = req.files.coverImage[0].path.replace(/\\/g, '/');
    const coverImageUrl = `./Images/uploads/${path.basename(imageFilePath)}`;

    const { title, summary, genre, portfolioId } = req.body;

    try {
      const newShortfilm = new Shortfilm({
        title,
        summary,
        genre,
        videoUrl,
        coverImageUrl,
      });

      await newShortfilm.save();

      // Add the shortfilm to the portfolio
      const portfolio = await Portfolio.findById(portfolioId);
      portfolio.shortfilms.push(newShortfilm._id);
      await portfolio.save();

      res.json(newShortfilm);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
});

module.exports = router;*/

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Shortfilm = require('../Database/models/shortFilm');
const Portfolio = require('../Database/models/portfolio');

// Ensure the uploads directories exist
const videoUploadsDir = path.join(__dirname, '..', '..', 'public', 'videos');
const imageUploadsDir = path.join(__dirname, '..', '..', 'public', 'Images', 'uploads');

if (!fs.existsSync(videoUploadsDir)) {
  fs.mkdirSync(videoUploadsDir, { recursive: true });
}

if (!fs.existsSync(imageUploadsDir)) {
  fs.mkdirSync(imageUploadsDir, { recursive: true });
}

// Set storage engine for files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, imageUploadsDir); // directory to save image files
    } else if (file.mimetype.startsWith('video')) {
      cb(null, videoUploadsDir); // directory to save video files
    } else {
      cb('Invalid file type', false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // save files with unique names
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // Limit file size to 100MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([{ name: 'videoFile', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]);

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|mp4/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and Videos Only!');
  }
}

// Add a new shortfilm
router.post("/shortFilm", (req, res) => {
  console.log('--- Incoming Request ---');
  console.log('Request Body:', req.body);

  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer err', err);
      return res.status(400).json({ msg: err });
    }
    if (!req.files.videoFile) {
      console.log('No video file');
      return res.status(400).json({ msg: 'No video file uploaded' });
    }
    if (!req.files.coverImage) {
      console.log('No cover Image');
      return res.status(400).json({ msg: 'No cover image uploaded' });
    }

    const videoFilePath = req.files.videoFile[0].path.replace(/\\/g, '/');
    const videoUrl = `./videos/${path.basename(videoFilePath)}`;

    const imageFilePath = req.files.coverImage[0].path.replace(/\\/g, '/');
    const coverImageUrl = `./Images/uploads/${path.basename(imageFilePath)}`;

    const { title, summary, genre, portfolioId } = req.body;
    console.log('Request Body:', {title, summary, genre, portfolioId});

    try {
      const newShortfilm = new Shortfilm({
        title,
        summary,
        genre,
        videoUrl,
        coverImageUrl,
      });

      await newShortfilm.save();

      // Add the shortfilm to the portfolio
      //const portfolio = await Portfolio.findById(portfolioId);
      const portfolio = await Portfolio.findById(portfolioId);
      if (!portfolio) {
        console.error('Portfolio not found');
        return res.status(404).json({ msg: 'Portfolio not found' });
      }
      portfolio.shortfilms.push(newShortfilm._id);
      await portfolio.save();

      res.json(newShortfilm);
    } catch (error) {
      console.error('Server err:',error.message);
      res.status(500).send('Server Error');
    }
  });
});

module.exports = router;

