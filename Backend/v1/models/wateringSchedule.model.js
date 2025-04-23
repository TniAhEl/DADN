const mongoose = require("mongoose");

const wateringScheduleShema = new mongoose.Schema(
  {
    date: Date,
    name: String,
    time: Date,
    note: String,
  },
  {
    timestamps: true,
  }
);

const WateringSchedule = mongoose.model(
  "WateringSchedule",
  wateringScheduleShema,
  "watering-schedules"
);

module.exports = WateringSchedule;
