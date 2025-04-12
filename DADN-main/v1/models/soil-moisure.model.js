const mongoose = require("mongoose");

const soilMoisureShema = new mongoose.Schema({
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

const soilMoisure = mongoose.model("soilMoisure", soilMoisureShema, "soil-moisures");

module.exports = soilMoisure;