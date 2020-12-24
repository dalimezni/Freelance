var mysql = require('mysql');

var con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'database',
  port: 8889
});
 
var client = require("../models/client");

exports.getClient = async function (query, page, limit) {
  try {
    var clients = await client.find(query);
    return clients;
  } catch (e) {
    throw Error("Error while Paginating clients");
  }
};
exports.getClientByid = async function (id) {
  try {
    var content = await client.findById(id);
    return content;
  } catch (e) {
    throw Error("Error while finding");
  }
};
exports.addNewClient = async function (document) {
  try {
    images = [];
    var im ="";
    console.log("im");
    console.log(document.body);
    console.log("im");
    for (const file of document.files) {
      console.log("file.filename");
      console.log(file.filename);
      console.log("file.filename");
      images.push(file.filename);
      im = im + file.filename +" , "
    }
    im = im.slice(0, -2)
    console.log("im");
    console.log(im);
    console.log("im");

    document.body.images = images;
    var content = await client.create(document.body);
    var post_data = document.body;
    var name= post_data.nom;
    var numero= post_data.numTel;
    var subject_position= post_data.ville;
    var subject_state= post_data.metier;
    var message= post_data.commentaire;
    var lon= post_data.longitude;
    var lat= post_data.latitude;


    con.query('INSERT INTO `reclame`(`name`,`numero`, `subject_position`, `subject_state`, `file_name`, `message`,`lon`, `lat`, `upload_time`) VALUES (?,?,?,?,?,?,?,?,NOW())',[name,numero,subject_position,subject_state,im,message,lon,lat],function(err,result,fields){
      con.on('error',function(err){
      console.log('[MySQL ERROR]',err);
    });

    })
    return content;
  } catch (e) {
    throw Error("Error while creating new client");
  }
};
exports.removeClient = async function (id) {
  try {
    var content = await client.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting");
  }
};
/* 

exports.updateFaq = async function (id, data) {
  try {
    var content = await faq.findByIdAndUpdate(id, data);
    return content;
  } catch (e) {
    throw Error("Error while updating");
  }
};
 */
