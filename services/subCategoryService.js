const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subCategoryModel");

// @desc Create SubCategory
// @route POST /api/v1/subcategories
// @access private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// @desc GET List of Subcategories
// @route GET /api/v1/subcategories
// @access public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;

  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  const subcategories = await SubCategory.find(filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ results: subcategories.length, page, data: subcategories });
});

// @desc GET specific SubCategory by id
// @route GET /api/v1/subcategories/:id
// @access public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!subCategory) {
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Update Specific SubCategory
// @route PUT /api/v1/subcategories/:id
// @access private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subCategory) {
    return next(new ApiError(`No SubCategory found for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Delete Specific SubCategory
// @route DELETE /api/v1/subcategories/:id
// @access private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No SubCategory found for this id ${id}`, 404));
  }
  res.status(204).send();
});
