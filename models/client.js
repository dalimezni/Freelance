var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema({
  nom: String,
  email: String,
  numTel: String,
  metier: String,
  ville: String,
  images: [String] ,
  location: {
    type: {
        type: String, 
        enum: ['Point']
    },
    coordinates: {
        type: [Number]
    }
}

},{
    timestamps : true
});

module.exports = mongoose.model("Client", clientSchema);
