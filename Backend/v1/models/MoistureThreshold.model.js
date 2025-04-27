const mongoose = require("mongoose");

const moistureThresholdSchema = new mongoose.Schema({
    min: {
        type: Number,
        required: true,
    },
    max: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const MoistureThreshold = mongoose.model("MoistureThreshold", moistureThresholdSchema, "moisture-thresholds");

module.exports = MoistureThreshold;
