const mongoose = require("mongoose");

// 1- Create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too Short Category name"],
      max_length: [32, "Too Long Category name"],
    },
    //A and B => shopping.com/a-and-b
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
const categoryModel = mongoose.model("Category", categorySchema);

// 3- Export Model

module.exports = categoryModel;
