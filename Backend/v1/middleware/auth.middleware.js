const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET; // Lấy JWT_SECRET từ biến môi trường

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Cắt "Bearer <token>"

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token is not valid" });

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }
  next();
};
const isCustomer = (req, res, next) => {
  if (req.user?.role !== "customer") {
    return res.status(403).json({ message: "Access Denied: Customers only" });
  }
  next();
};
module.exports = { authMiddleware, isAdmin, isCustomer };
