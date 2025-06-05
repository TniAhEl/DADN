const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
  const {
    username,
    password,
    email,
    name,
    birth,
    phone,
    address,
    role = "customer",
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hash,
      email,
      name,
      birth,
      phone,
      address,
      role, // Mặc định là user
      userType: role === "admin" ? "admin" : "customer", // Mặc định là customer
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Đăng ký lỗi:", error); // 👈 in ra lỗi thật
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message || error });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log("Login attempt for:", username);
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid username or password" });
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" } // Token sống 1 ngày
    );
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Login failed", error });
  }
};
module.exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports.updateUser = async (req, res) => {
  const { username } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: updates },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "Cập nhật thành công", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

module.exports.deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser)
      return res.status(404).json({ message: "Không tìm thấy user để xóa" });

    res.json({ message: "Xóa user thành công", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
