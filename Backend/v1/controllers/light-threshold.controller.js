const LightThreshold = require("../models/LightThreshold.model");

module.exports.index = async (req, res) => {
  const thresholds = await LightThreshold.find().sort({ createdAt: -1 });

  res.json({
    code: 200,
    message: "success",
    author: "Cuong & Phat",
    data: thresholds,
  });
};

module.exports.getLatest = async (req, res) => {
  const thresholds = await LightThreshold.find().sort({ createdAt: -1 });

  res.json({
    code: 200,
    message: "success",
    author: "Cuong & Phat",
    data: thresholds[0],
  });
};

module.exports.create = async (req, res) => {
  try {
    const { min, max } = req.body;

    const newThreshold = new LightThreshold({ min, max });
    await newThreshold.save();

    res.json({
      code: 201,
      message: "Created light threshold",
      author: "Cuong & Phat",
      data: newThreshold,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error creating light threshold",
      error: error.message,
    });
  }
};
