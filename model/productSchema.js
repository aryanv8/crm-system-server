const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
Grid.mongo = mongoose.mongo;

// Create GridFS storage engine
const storage = new GridFsStorage({
  url: "mongodb://localhost:27017/crm-system",
  file: (req, file) => {
    return {
      bucketName: "uploads",
      filename: `${file.fieldname}-${Date.now()}`,
    };
  },
});

const upload = multer({ storage });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0.0,
  },
  image: {
    type: String, // Store the filename or fileId associated with the image in GridFS
    required: true,
  },
  description: {
    type: String,
    default: "No description available",
  },
  category: {
    type: String,
  }
});

productSchema.methods.getImageUrl = function () {
  return `/uploads/${this.image}`;
}

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, upload };