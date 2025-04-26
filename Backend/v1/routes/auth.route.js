const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const {
  authMiddleware,
  isAdmin,
  isCustomer,
} = require("../middleware/auth.middleware");
// Admin routes
router.post("/admin/login", controller.login);
router.get("/admin/:username", controller.getUserByUsername);
// User routes
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/user/:username", authMiddleware, controller.getUserByUsername);
router.put("/user/:username", authMiddleware, controller.updateUser);
router.get("/user", authMiddleware, controller.getAllUsers);
router.delete(
  "/user/:username",
  (req, res, next) => {
    next();
  },
  authMiddleware,
  controller.deleteUser
);

module.exports = router;
