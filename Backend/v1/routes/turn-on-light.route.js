const express = require("express");
const router = express.Router();

const controller = require("../controllers/turn-on-light.controller.js");

// API POST control Light
router.post("/", controller.controlLight);

module.exports = router;
