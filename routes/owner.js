const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Owner = require("../models/owner.js");
const {
  ownerSchema,
  certificateSchema,
  OwnerSchema,
} = require("../schema.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const ownerController = require("../controllers/owner.js");

const { isLoggedIn, isOwnerOfOwner, validateOwner } = require("../middleware.js");

// Route to get all Owners and create a new Owner
router.route("/")
.get(wrapAsync(ownerController.index))
.post(
  isLoggedIn,
  upload.single("owner[image]"), // Adjust field name for file upload
  validateOwner,
  wrapAsync(ownerController.createOwner)
);

// Route to render the form for creating a new Owner
router.get("/new", isLoggedIn, ownerController.renderNewForm);

// Route to show a specific Owner
router
  .route("/:id")
  .get(wrapAsync(ownerController.showOwner))
  .put(
    isLoggedIn,
    isOwnerOfOwner,
    upload.single("owner[image]"),
    validateOwner,
    wrapAsync(ownerController.updateOwner)
  )
  .delete(isLoggedIn, isOwnerOfOwner, wrapAsync(ownerController.destroyOwner));

// Route to render the form for editing a Owner
router.get("/:id/edit", wrapAsync(ownerController.renderEditForm));

module.exports = router;