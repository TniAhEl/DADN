const fetchData = require("../../helpers/fetchData");
const DhtTemp = require('../models/dht-temp.model');

module.exports.index = async (req, res) => {
    const dhtTemps = await DhtTemp.find().sort({ created_at: -1 });

    res.json({
        code: 200,
        message: "succsess",
        author: "Cuong & Phat",
        data: dhtTemps,
    })
}

module.exports.getLatest = async (req, res) => {
    const dhtTemps = await DhtTemp.find().sort({ created_at: -1 });
    
    res.json({
        code: 200,
        message: "succsess",
        author: "Cuong & Phat",
        data: dhtTemps[0],
    })
}



