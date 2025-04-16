const fetchData = require("../../helpers/fetchData");
const DhtTemp = require('../models/dht-temp.model');
const LightSensor = require("../models/light-sensor.model");
const soilMoisure = require("../models/soil-moisure.model");

module.exports.index = async (req, res) => {
    const soilMoisures = await soilMoisure.find().sort({ created_at: -1 });
    res.json({
        code: 200,
        message: "succsess",
        author: "Cuong & Phat",
        data: soilMoisures,
    })
}

module.exports.getLatest = async (req, res) => {
    const soilMoisures = await LightSensor.find().sort({ created_at: -1 });
    
    res.json({
        code: 200,
        message: "succsess",
        author: "Cuong & Phat",
        data: soilMoisures[0],
    })
}



