const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    fliename: String, 
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Owner = mongoose.model("Owner", ownerSchema);
module.exports = Owner;