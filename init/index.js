const mongoose = require("mongoose");
const initData = require("./database");
const Owner = require("../models/owner.js");
const Certificate = require("../models/certificate.js");
const Product = require("../models/product.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/KR";

main()
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    await Owner.deleteMany({});
    await Owner.insertMany(initData.data);
    console.log("Done Owners");

    await Certificate.deleteMany({});
    await Certificate.insertMany(initData.dataCertificates);
    console.log("Done Certificates");

    await Product.deleteMany({});
    await Product.insertMany(initData.dataProducts);
    console.log("Done Products");
}

initDB();