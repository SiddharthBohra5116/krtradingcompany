const Certificate = require("../models/certificate.js");

exports.getSomeCertificates = async () => {
    return await Certificate.find().limit(2); // Adjust limit as needed
};

module.exports.index = async (req, res) => {
  const allCertificates = await Certificate.find({});
  res.render("certificates/index.ejs", { allCertificates });
};

module.exports.renderNewForm = (req, res) => {
  res.render("certificates/new.ejs");
};

module.exports.showCertificate = async (req, res) => {
  let { id } = req.params;
  const certificate = await Certificate.findById(id);
  if (!certificate) {
    req.flash("error", "The certificate you requested doesn't exist.");
    res.redirect("/certificates");
  }
  res.render("certificates/show.ejs", { certificate });
};

module.exports.createCertificate = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newCertificate = new Certificate(req.body.certificate);
  newCertificate.owner = req.user._id;
  newCertificate.image = { url, filename };
  let saveCertificate = await newCertificate.save();
  console.log(saveCertificate);

  req.flash("success", "New certificate is created");
  res.redirect("/certificates");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const certificate = await Certificate.findById(id);
  if (!certificate) {
    req.flash("error", "The certificate you requested doesn't exist.");
    res.redirect("/certificates");
  }
  let orignalImageUrl = certificate.image.url;
  orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/w_250");
  res.render("certificates/edit.ejs", { certificate , orignalImageUrl });
};

module.exports.updateCertificate = async (req, res) => {
  let { id } = req.params;
  let certificate = await Certificate.findByIdAndUpdate(id, {
    ...req.body.certificate,
  });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    certificate.image = { url, filename };
    await certificate.save();
  }
  req.flash("success", "Certificate updated!");
  res.redirect(`/certificates/${id}`);
};

module.exports.destroyCertificate = async (req, res) => {
  let { id } = req.params;
  let deletedCertificate = await Certificate.findByIdAndDelete(id);
  req.flash("success", "Certificate deleted!");
  res.redirect("/certificates");
};
