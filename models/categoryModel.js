const mongoose = require("mongoose");

// 1- Create Schema
const categorySchema = new mongoose.Schema({
  name: String,
});

// 2- Create Model
const categoryModel = mongoose.model("Category", categorySchema);

// 3- Export Model

module.exports = categoryModel;
