const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificatesSchema = new Schema({
  image: {
    url: String,
    fliename: String, 
  },// store image file ID or URL
  name: {
    type: String,
    require: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Certificate = mongoose.model("Certificate", certificatesSchema);
module.exports = Certificate;
