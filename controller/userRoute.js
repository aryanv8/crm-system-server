const express = require('express')
const { upload } = require("./userSchema"); // Assuming you've defined the User schema and upload middleware
const router = express.Router()

// Register a new user
router.post("/register", upload.single("image"), async (req, res) => {
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
    });
    
    // Save the user to the database
    await user.save();
    
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

module.exports = router