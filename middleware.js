const Owner = require("./models/owner");
const Certificate = require("./models/certificate");
const Product = require("./models/product");

const { ownerSchema, certificateSchema, productSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

// Ensure the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to perform this action!");
    return res.redirect("/admin/login");
  }
  res.locals.currUser = req.user;
  next();
};

// Save the URL the user was trying to access before being redirected to login
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.validateOwner = (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    let { error } = ownerSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };
// Middleware to validate product
module.exports.validateProduct = (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    const { error } = productSchema.validate(req.body);
    if (error) {
      const errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };

  module.exports.validateCertificate = (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    let { error } = certificateSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };


module.exports.isOwnerOfProduct = async (req, res, next) => {
    let { id } = req.params;
    let product = await Product.findById(id);
    if (process.env.OWNER_ID!=(res.locals.currUser._id)) {
      req.flash("error", "You are not the owner of this product");
      return res.redirect(`/products/${id}`);
    }
    next();
  };

  module.exports.isOwnerOfCertificate = async (req, res, next) => {
    let { id } = req.params;
    let certificate = await Certificate.findById(id);
    if (process.env.OWNER_ID!=(res.locals.currUser._id)) {
      req.flash("error", "You are not the owner of this certificate");
      return res.redirect(`/certificates/${id}`);
    }
    next();
  };

  module.exports.isOwnerOfOwner = async (req, res, next) => {
    let { id } = req.params;
    let owner = await Owner.findById(id);
    if (process.env.OWNER_ID!=(res.locals.currUser._id)) {
      req.flash("error", "You are not the owner of this owner");
      return res.redirect(`/owners/${id}`);
    }
    next();
  };