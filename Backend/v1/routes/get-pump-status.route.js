const express = require("express");
const router = express.Router();

const controller = require("../controllers/get-pump-status.controller.js");

router.get("/", controller.getPumpValue); // GET /api/v1/get-pump-status

module.exports = router;
