const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/admin/login", controller.login);
router.get("/admin/:username", controller.getUserByUsername);

router.get("/user/:username", controller.getUserByUsername);
router.put("/user/:username", controller.updateUser);
router.get("/user", controller.getAllUsers);
router.delete("/user/:username", (req, res, next) => {
    console.log("DELETE user route hit!");
    next();
  }, controller.deleteUser);

module.exports = router;
