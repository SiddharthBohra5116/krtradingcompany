const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const { productSchema } = require("../schema.js");
const Product = require("../models/product.js");
const {
  isLoggedIn,
  isOwnerOfProduct,
  validateProduct,
} = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const ExpressError = require("../utils/ExpressError.js");

const productController = require("../controllers/product.js");

// Route to get all products and create a new product
router
.route("/")
.get(wrapAsync(productController.index))
.post(
  isLoggedIn,
  upload.single("product[image]"), // Adjust field name for file upload
  validateProduct,
  wrapAsync(productController.createProduct)
);

// Route to render the form for creating a new product
router.get("/new", isLoggedIn, productController.renderNewForm);

// Route to show a specific product
router
  .route("/:id")
  .get(wrapAsync(productController.showProduct))
  .put(
    isLoggedIn,
    isOwnerOfProduct,
    upload.single("product[image]"),
    validateProduct,
    wrapAsync(productController.updateProduct)
  )
  .delete(
    isLoggedIn,
    isOwnerOfProduct,
    wrapAsync(productController.destroyProduct)
  );

// Route to render the form for editing a product
router.get("/:id/edit", wrapAsync(productController.renderEditForm));

module.exports = router;
