const express = require("express");
const router = express.Router();
var ClientController = require("../controller/clientController");
const multer= require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './public/images/');
    },
    filename: (req,file,cb)=>{
        const newFileName = new Date().getTime().toString() + path.extname(file.originalname);
        cb(null,newFileName);
    }
})

const upload = multer({ storage });

router.get("/", ClientController.getClient);
router.route('/add')
.post(upload.any(),ClientController.addNewClient); 
//router.post("/update", FaqController.updateFaq);
//router.delete("/remove/:id", FaqController.removeFaq);
//router.get("/search/:id", FaqController.getFaqById);

module.exports = router;
