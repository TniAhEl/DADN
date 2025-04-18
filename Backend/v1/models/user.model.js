const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email:    { type: String, required: true, unique: true },

  // ✅ Thêm các trường bổ sung
  name:       { type: String, default: null },
  phone:      { type: String, default: null },
  role:       { type: String, default: null },
  address:    { type: String, default: null },
  department: { type: String, default: null },
  joinDate:   { type: String, default: null },
  lastLogin:  { type: String, default: null },
  accountStatus: { type: String, default: "Active" },
  profileImage:  { type: String, default: "https://via.placeholder.com/150" },
  permissions:   { type: [String], default: ["Dashboard"] },
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
