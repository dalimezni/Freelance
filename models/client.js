var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
});

module.exports = mongoose.model("Client", clientSchema);
