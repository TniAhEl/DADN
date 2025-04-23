const WateringSchedule = require("../models/wateringSchedule.model");

module.exports.index = async (req, res) => {
  const schedules = await WateringSchedule.find();
  res.json({
    code: 200,
    message: "success",
    schedules: schedules,
  });
};

// ✅ Thêm hàm xử lý tạo mới:
module.exports.create = async (req, res) => {
  try {
    const { title, date } = req.body;
    const newSchedule = new WateringSchedule({
      name: title,
      date: new Date(date),
    });

    const saved = await newSchedule.save();

    res.status(201).json({
      message: "Schedule created successfully",
      schedule: saved,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating schedule", error });
  }
};
module.exports.update = async (req, res) => {
  try {
    const schedule = await WateringSchedule.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        date: req.body.date,
      },
      { new: true }
    );

    res.json({
      code: 200,
      message: "Cập nhật thành công",
      schedule,
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Lỗi server", error });
  }
};
module.exports.delete = async (req, res) => {
  try {
    const schedule = await WateringSchedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json({
      code: 200,
      message: "Xoá lịch thành công",
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Lỗi server", error });
  }
};
