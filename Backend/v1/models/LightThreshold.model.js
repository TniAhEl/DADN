const mongoose = require("mongoose");

const lightThresholdSchema = new mongoose.Schema({
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

const LightThreshold = mongoose.model("LightThreshold", lightThresholdSchema, "light-thresholds");

module.exports = LightThreshold;
