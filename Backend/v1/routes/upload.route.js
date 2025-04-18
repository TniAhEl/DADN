const express = require("express");
const router = express.Router();
const uploadCtrl = require("../controllers/upload.controller");

router.post("/image", uploadCtrl.uploadMiddleware, uploadCtrl.uploadImage);

module.exports = router;
