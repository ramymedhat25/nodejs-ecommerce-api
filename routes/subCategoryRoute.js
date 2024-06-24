const express = require("express");

const { createSubCategory } = require("../services/subCategoryService");

const router = express.Router();

router.route("/").post(createSubCategory);

module.exports = router;
