const express = require("express");
const router = express.Router();


const controller = require("../controllers/light-sensor.controller.js");


router.get("/", controller.index) 

router.get("/latest", controller.getLatest) 


module.exports = router;