const express = require("express");
const router = express.Router();

const controller = require("../controllers/get-light-status.controller.js");

router.get("/", controller.getLightValue); // GET /api/v1/get-pump-status

module.exports = router;
