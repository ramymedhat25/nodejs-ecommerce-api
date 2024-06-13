const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const categoryModel = require("../models/categoryModel");

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryModel.find({});
  res.status(200).json({ results: categories.length, data: categories });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
