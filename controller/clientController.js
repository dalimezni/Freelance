var ClientService = require("../services/clientService");

exports.getClient = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await ClientService.getClient({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Clients Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.addNewClient = async function (req, res, next) {
  console.log(req.body);
  try {
    var content = await ClientService.addNewClient(req);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Client added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
/* 
exports.updateFaq = async function (req, res, next) {
  try {
    var content = await FaqService.updateFaq(req.body.id, req.body.data);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully updated",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.removeFaq = async function (req, res, next) {
  try {
    var content = await FaqService.removeFaq(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully deleted",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getFaqById = async function (req, res, next) {
  try {
    var content = await FaqService.getFaqByid(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
 */
