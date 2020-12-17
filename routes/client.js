const express = require("express");
const router = express.Router();
var ClientController = require("../controller/clientController");

router.get("/", ClientController.getClient);
router.post("/add", ClientController.addNewClient);
//router.post("/update", FaqController.updateFaq);
//router.delete("/remove/:id", FaqController.removeFaq);
//router.get("/search/:id", FaqController.getFaqById);

module.exports = router;
