const express = require("express");
const router = express.Router();
const controller = require("../controllers/moisture-threshold.controller.js");

router.get("/", controller.index); // Lấy danh sách tất cả
router.get("/latest", controller.getLatest); // Lấy bản ghi mới nhất
router.post("/", controller.create); // Tạo mới

module.exports = router;
