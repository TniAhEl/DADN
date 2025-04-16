const fetchData = require("../../helpers/fetchData");
const DhtTemp = require('../models/dht-temp.model');
const LightSensor = require("../models/light-sensor.model");

module.exports.index = async (req, res) => {
    const lightSensors = await LightSensor.find().sort({ created_at: -1 });

    res.json({
        code: 200,
        message: "succsess",
        author: "Cuong & Phat",
        data: lightSensors,
    })
}

module.exports.getLatest = async (req, res) => {
    const lightSensors = await LightSensor.find().sort({ created_at: -1 });
    
    res.json({
        code: 200,
        message: "succsess",
        author: "Cuong & Phat",
        data: lightSensors[0],
    })
}



