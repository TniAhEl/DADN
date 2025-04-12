const mongoose = require("mongoose");

const devicecShema = new mongoose.Schema({
   code: String,
   name: String,
   description: String,
   status: String,
   threshold: Number,
}, {
    timestamps: true         
});

const Device = mongoose.model("Device", jobSchema, "devices");

module.exports = Device;