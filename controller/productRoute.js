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

// Add a new product
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    // Retrieve the form data
    const { name, price, description, category } = req.body;

    // Get the uploaded image filename
    const image = req.file.filename;

    // Create a new product document
    const product = new Product({
      name,
      price,
      image,
      description,
      category,
    });

    // Save the product
    await product.save();

    // Send a response
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    // Get all products
    const products = await Product.find();

    // Send a response
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

// Get a single product
router.get("/:id", async (req, res) => {
  try {
    // Get the product id
    const id = req.params.id;

    // Get the product
    const product = await Product.findById(id);

    // Send a response
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

// Update a product
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    // Get the product id
  const id = req.params.id;
  // Retrieve the form data
  const { name, price, description, category } = req.body;

  // Get the uploaded image filename
  const image = req.file.filename;

  // Update the product
  const product = await Product.findByIdAndUpdate(id, {
    name,
    price,
    image,
    description,
    category,
  });

  // Send a response
    res.status(200).json({ message: "Product updated successfully" })
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a product
router.delete("/delete/:id", async (req, res) => {
  try {
    // Get the product id
    const id = req.params.id;

    // Delete the product
    await Product.findByIdAndDelete(id);

    // Send a response
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/image/:filename", async (req, res) => {
  try {
    // Get the filename from the request
    const filename = req.params.filename;

    // Get the image from GridFS
    const image = await bucket.find({ filename }).toArray();

    // Check if image exists
    if (!image[0] || image.length === 0) {
      return res.status(404).json({ error: "Image does not exist" });
    }

    // Check if image is a valid image
    if (
      image[0].contentType === "image/jpeg" ||
      image[0].contentType === "image/png"
    ) {
      // Read output to browser
      const readstream = bucket.openDownloadStreamByName(filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({ error: "Not an image" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})