const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Certificate = require("../models/certificate.js");
const {
  ownerSchema,
  certificateSchema,
  productSchema,
} = require("../schema.js");
const { isLoggedIn, isOwnerOfCertificate, validateCertificate,  } = require("../middleware.js");
const certificateController = require("../controllers/certificate.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})

router
  .route("/")
  .get(wrapAsync(certificateController.index))
  .post(
    isLoggedIn,
    upload.single('certificate[image]'),
    validateCertificate,
    wrapAsync(certificateController.createCertificate)
  );
  // .post( upload.single('certificate[image]') , (req,res) => {
  //   res.send(req.file);
  // } )

// router.post("/filter",wrapAsync(certificateController.category));
// New Route
router.get("/new", isLoggedIn,
   certificateController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(certificateController.showCertificate))
  .put(
    isLoggedIn,
    isOwnerOfCertificate,
    upload.single('certificate[image]'),
    validateCertificate,
    wrapAsync(certificateController.updateCertificate)
  )
  .delete(
    isLoggedIn,
    isOwnerOfCertificate,
    wrapAsync(certificateController.destroyCertificate)
  );

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwnerOfCertificate,
  wrapAsync(certificateController.renderEditForm)
);


module.exports = router;
