const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
// const mongoose = require("mongoose");
// const ApiError = require("../utils/apiError");
const subCategoryModel = require("../models/subCategoryModel");

// @desc Create category
// @route POST /api/v1/categories
// @access private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
