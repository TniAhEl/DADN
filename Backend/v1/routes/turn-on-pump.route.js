const express = require("express");
const router = express.Router();

const controller = require("../controllers/turn-on-pump.controller.js");

router.post("/", controller.controlPump); // POST /api/v1/turn-on-pump

module.exports = router;
