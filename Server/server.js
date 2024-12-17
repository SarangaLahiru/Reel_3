const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./Database/connect");

// Route imports
const register = require("./routes/register.route");
const login = require("./routes/login.route");
const createPost = require("./routes/createPost.route");
const getPosts = require("./routes/getPosts.route");
const createJob = require("./routes/createJob.route");
const getJobs = require("./routes/getJob.route");
const editBio = require("./routes/editBio.route");
const getBio = require("./routes/getBio.route");
const getUser = require("./routes/getUser.route");
const editProfile = require("./routes/editProfile.route");
const userFilter = require("./routes/userFilter.route");
const addPortfolio = require("./routes/addToPortfolio.route");
const shortFilm = require("./routes/shortFilm.route");

// Initialize dotenv and Express app
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const PORT = 5000;

// Database connection
connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Static files for images
app.use("/Images", express.static(path.join(__dirname, "public", "Images")));

// Routes
app.use("/reg", register);
app.use("/login", login);
app.use("/create", createPost);
app.use("/getPosts", getPosts);
app.use("/createJob", createJob);
app.use("/getJob", getJobs);
app.use("/editBio", editBio);
app.use("/getBio", getBio);
app.use("/getUser", getUser);
app.use("/editProfile", editProfile);
app.use("/userFilter", userFilter);
app.use("/addPortfolio", addPortfolio);
app.use("/shortfilm", shortFilm);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Server is up and running!" });
});


// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
