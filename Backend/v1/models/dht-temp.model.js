const mongoose = require("mongoose");

const dhtTempShema = new mongoose.Schema({
    id: String,
    value: String,
    feed_id: String,
    feed_key: String,
    created_at: Date,
    created_epoch: String,
    expiration: Date,
}, {
    timestamps: true
});

const DhtTemp = mongoose.model("DhtTemp", dhtTempShema, "dht-temps");

module.exports = DhtTemp;