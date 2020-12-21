var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema({
  nom: String,
  numTel: String,
  metier: String,
  ville: String,
  commentaire: String,
  images: [String] ,
  longitude: Number,
  latitude: Number,
},{timestamps : true});
module.exports = mongoose.model("Client", clientSchema);
