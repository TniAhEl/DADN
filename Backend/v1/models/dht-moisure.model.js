const mongoose = require("mongoose");

const dhtMoisurecShema = new mongoose.Schema({
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

const DhtMoisure = mongoose.model("DhtMoisure", dhtMoisurecShema, "dht-moisures");

module.exports = DhtMoisure;