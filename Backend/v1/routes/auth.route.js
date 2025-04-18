const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/user/:username", controller.getUserByUsername);
router.put("/user/:username", controller.updateUser);

module.exports = router;
