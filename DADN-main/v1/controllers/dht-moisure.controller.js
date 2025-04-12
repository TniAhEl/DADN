const axios = require('axios');
const fetchData = require("../../helpers/fetchData");
const DhtMoisure = require('../models/dht-moisure.model');

module.exports.index = async (req, res) => {
    const dhtMoisures = await DhtMoisure.find().sort({ created_at: -1 });;
    
    res.json({
        code: 200,
        message: "succsess",
        author: "Cuong & Phat",
        data: dhtMoisures,
    })
}

module.exports.getLatest = async (req, res) => {
    const dhtMoisures = await DhtMoisure.find().sort({ created_at: -1 });
    
    res.json({
        code: 200,
        message: "succsess",
        author: "Cuong & Phat",
        data: dhtMoisures[0],
    })
}



