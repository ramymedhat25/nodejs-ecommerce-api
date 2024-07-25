const mongoose = require("mongoose");

// 1- Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too Short Brand name"],
      max_length: [32, "Too Long Brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// 2- Create Model
const brandModel = mongoose.model("Brand", brandSchema);

// 3- Export Model

module.exports = brandModel;
