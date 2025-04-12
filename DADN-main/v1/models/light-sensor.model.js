const mongoose = require("mongoose");

const lightSensorShema = new mongoose.Schema({
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

const LightSensor = mongoose.model("LightSensor", lightSensorShema, "light-sensors");

module.exports = LightSensor;