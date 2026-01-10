const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const User = require("../models/User")

const router = express.Router();

//Auth Routes
router.post("/register", registerUser);  //Register User
router.post("/login", loginUser);        //Login User
router.get("/profile", protect, getUserProfile); //Get User Profile
router.put("/profile", protect,updateUserProfile); //Update User Profile

router.post(
  "/upload-image",
  protect,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // save image URL to user in DB
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Image uploaded successfully",
      profileImage: imageUrl,
      user,
    });
  }
);

module.exports = router;
