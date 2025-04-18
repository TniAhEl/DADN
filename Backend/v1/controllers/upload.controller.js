const multer = require("multer");
const path = require("path");

// Đường dẫn lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

module.exports.uploadMiddleware = upload.single("image");

module.exports.uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
};
