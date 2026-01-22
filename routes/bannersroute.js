const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");
const BannerImage = require("./models/BannerImage"); // MongoDB model

const router = express.Router();

// Multer storage config for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "banners",       // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 1200, crop: "limit" }], // optional
  },
});

const upload = multer({ storage });

// Upload new banner image (admin only)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const banner = new BannerImage({ url: req.file.path }); // Cloudinary URL
    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all banner images
router.get("/all", async (req, res) => {
  try {
    const images = await BannerImage.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const banner = await BannerImage.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: "Banner not found" });

    // Delete from Cloudinary
    const publicId = banner.url.split("/").pop().split(".")[0]; // get file name without extension
    await cloudinary.uploader.destroy(`banners/${publicId}`);

    // Delete from MongoDB
    await banner.deleteOne();

    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
