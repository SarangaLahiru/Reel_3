const Post = require("../Database/models/posts");

const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//CREATE

const uploadsDir = path.join(__dirname, '..', '..', 'public', 'Images', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
 
const upload = multer({ storage: storage });

router.post("/",upload.array('images', 10), async (req, res) => {
    try {
      
      const { title, description , userId} = req.body;
    //const img = req.files.map(file => file.path); // array of image paths

    const img = req.files.map(file => {
      // Replace backslashes with forward slashes
      let imagePath = file.path.replace(/\\/g, '/');
      // Adjust the path to match the expected directory
      imagePath = `./Images/uploads/${path.basename(imagePath)}`;
      return imagePath;
    });


    const newPost = new Post({
      title,
      description,
      img,
      author: userId
    });

    
      // Save the post to the database
      const savedPost = await newPost.save();
    
      // Respond with a success message and the saved post
      res.status(201).json({ message: "Post created successfully", post: savedPost });
    } catch (err) {
      // Handle errors
      console.error("Error creating post:", err);
      if (err.name === 'ValidationError') {
        // Validation error
        res.status(400).json({ error: "Validation error", details: err.message });
      } else {
        // Other types of errors
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

module.exports = router;