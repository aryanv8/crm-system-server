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

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  image: {
    type: String, // Store the filename or fileId associated with the image in GridFS
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.methods.getImageUrl = function () {
  return `/uploads/${this.image}`;
};

// Enable the aggregate function for the User schema
userSchema.statics.aggregate = function () {
  return this.model("User").aggregate.apply(this.model("User"), arguments);
};


const User = mongoose.model("User", userSchema);

module.exports = { User, upload};
