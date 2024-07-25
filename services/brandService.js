const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ApiError = require("../utils/apiError");
const brandModel = require("../models/brandModel");

// @desc GET List of brands
// @route GET /api/v1/brands
// @access public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const brands = await brandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// @desc GET specific brand by id
// @route GET /api/v1/brands/:id
// @access public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`No Brand found for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Create brand
// @route POST /api/v1/brands
// @access private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc Update Specific brand
// @route PUT /api/v1/brands/:id
// @access private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    return next(new ApiError(`No Brand found for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Delete Specific brand
// @route DELETE /api/v1/brands/:id
// @access private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`No Brand found for this id ${id}`, 404));
  }
  res.status(204).send();
});
