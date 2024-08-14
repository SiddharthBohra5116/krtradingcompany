const Owner = require("../models/owner.js");

exports.getSomeOwners = async () => {
    return await Owner.find().limit(2); // Adjust limit as needed
};

module.exports.index = async (req, res) => {
  const allOwners = await Owner.find({});
  res.render("owners/index.ejs", { allOwners });
};

module.exports.renderNewForm = (req, res) => {
  res.render("owners/new.ejs");
};

module.exports.showOwner = async (req, res) => {
  let { id } = req.params;
  const owner = await Owner.findById(id);
  if (!owner) {
    req.flash("error", "The owner you requested doesn't exist.");
    res.redirect("/owners");
  }
  res.render("owners/show.ejs", { owner });
};

module.exports.createOwner = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newOwner = new Owner(req.body.owner);
  newOwner.user = req.user._id;
  newOwner.image = { url, filename };
  let saveOwner = await newOwner.save();
  console.log(saveOwner);

  req.flash("success", "New owner is created");
  res.redirect("/owners");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const owner = await Owner.findById(id);
  if (!owner) {
    req.flash("error", "The owner you requested doesn't exist.");
    res.redirect("/owners");
  }
  let orignalImageUrl = owner.image.url;
  orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/w_250");
  res.render("owners/edit.ejs", { owner , orignalImageUrl });
};

module.exports.updateOwner = async (req, res) => {
  let { id } = req.params;
  let owner = await Owner.findByIdAndUpdate(id, { ...req.body.owner });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    owner.image = { url, filename };
    await owner.save();
  }
  req.flash("success", "Owner updated!");
  res.redirect(`/owners/${id}`);
};

module.exports.destroyOwner = async (req, res) => {
  let { id } = req.params;
  let deletedOwner = await Owner.findByIdAndDelete(id);
  req.flash("success", "Owner deleted!");
  res.redirect("/owners");
};
