const Product = require("../models/product");

exports.getSomeProducts = async () => {
  return await Product.find().limit(2); // Adjust limit as needed
};

module.exports.index = async (req, res) => {
  const allProducts = await Product.find({});
  res.render("products/index.ejs", { allProducts });
};

module.exports.renderNewForm = (req, res) => {
  res.render("products/new.ejs");
};

module.exports.showProduct = async (req, res) => {
  let { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    req.flash("error", "The product you requested doesn't exist.");
    res.redirect("/products");
  }
  res.render("products/show.ejs", { product });
};

module.exports.createProduct = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newProduct = new Product(req.body.product);
  newProduct.owner = req.user._id;
  newProduct.image = { url, filename };
  let saveProduct = await newProduct.save();
  console.log(saveProduct);

  req.flash("success", "New product is created");
  res.redirect("/products");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    req.flash("error", "The product you requested doesn't exist.");
    res.redirect("/products");
  }
  let orignalImageUrl = product.image.url;
  orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/w_250");
  res.render("products/edit.ejs", { product , orignalImageUrl });
};

module.exports.updateProduct = async (req, res) => {
  let { id } = req.params;
  let product = await Product.findByIdAndUpdate(id, {...req.body.product });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    product.image = { url, filename };
    await product.save();
  }
  req.flash("success", "Product updated!");
  res.redirect(`/products/${id}`);
};

module.exports.destroyProduct = async (req, res) => {
  let { id } = req.params;
  let deletedProduct = await Product.findByIdAndDelete(id);
  req.flash("success", "Product deleted!");
  res.redirect("/products");
};