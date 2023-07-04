const express = require("express");
const { User } = require("../model/userSchema");
const { upload } = require("../model/userSchema"); // Assuming you've defined the User schema and upload middleware
const router = express.Router();
const mongoose = require("mongoose");

require("dotenv").config();

// const Grid = require("gridfs-stream");
// const {Grid} = require("mongodb");
const { GridFSBucket, ObjectId } = require("mongodb");

// Create a new connection to the MongoDB database
const conn = mongoose.createConnection(process.env.MONGO_URI);

// Initialize GridFS
let bucket;
conn.once("open", () => {
  // gfs = Grid(conn.db, mongoose.mongo);
  // gfs.collection('uploads'); // Collection name for uploads
  bucket = new GridFSBucket(conn.db, {
    bucketName: "uploads", // Collection name for uploads
  });
});

// Register a new user
router.post("/register", upload.single("image"), async (req, res) => {
  console.log(req.body);
  try {
    // Retrieve the form data
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      company,
      jobTitle,
      country,
      address,
      password,
    } = req.body;

    // Get the uploaded image filename
    const image = req.file.filename;

    // Create a new user document
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      image,
      company,
      jobTitle,
      country,
      address,
      password,
    });

    console.log(user);

    // Save the user to the database
    await user.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
});

// Get all users
router.get("/all", async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // const usersWithData = await Promise.all(
    //   users.map(async (user) => {
    //     const imageData = await bucket.find({ filename: user.image }).toArray();
    //     return { ...user._doc, imageData };
    //   })
    // );

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting users" });
  }
});

router.get("/image/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;

    // Retrieve the image from the database or storage
    // Here, you can use the `filename` to fetch the image data

    // For example, if you're using GridFS:
    // const gfs = gfs// Your GridFS connection or instance
    bucket.openDownloadStreamByName(filename).pipe(res);

    // Set the appropriate content type header based on the image type
    // res.set('Content-Type', 'image/*');

    // Pipe the image data to the response object
    // readStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving image" });
  }
});

// Get a single user
router.post("/profile", upload.none(), async (req, res) => {
  try {
    // Retrieve the user id from the request body
    const { id } = req.body;
    console.log(req.body);
    console.log(id);
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting user" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    // Retrieve the user id from the request params
    const { id } = req.query;
    // convert string to ObjectId
    const _id = new ObjectId(id);
    console.log(req.params);
    console.log(id);
    const user = await User.findById(_id).exec();
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting user" });
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    // Retrieve the user id from the request params
    const { id } = req.params;
    console.log(req.params);
    console.log(id);
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting user" });
  }
});

//login
router.post("/login", upload.none(), async (req, res) => {
  try {
    // Retrieve the user id from the request body
    const { email, password } = req.body;
    console.log(req.body);
    console.log(email);
    console.log(password);
    const user = await User.findOne({
      email: email,
      password: password,
    }).exec();
    if (user) {
      console.log("user", user);
      res.status(200).json({
        user: user,
      });
    } else {
      res.status(500).json({ error: "Error getting user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting user" });
  }
});

module.exports = router;
