const express = require('express');
const multer = require('multer');
const fs = require('fs');
const asyncHandler = require('../utils/asyncHandler');
const configureCloudinary = require('../config/cloudinary');
const { protect } = require('../middleware/auth');
const router = express.Router();
const upload = multer({ dest: 'tmp_uploads/', limits: { fileSize: 5 * 1024 * 1024 } });
router.post('/', protect, upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File required' });
  const cloudinary = configureCloudinary();
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'rapidely' });
    fs.unlinkSync(req.file.path);
    return res.json({ url: result.secure_url, public_id: result.public_id });
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, local: true });
}));
module.exports = router;
