const express = require("express");

const {
  getCategories,
  getCategory,
  createCategory,
} = require("../services/categoryService");

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router.route("/:id").get(getCategory);

module.exports = router;
