const express = require("express");
const { adminOnly,protect } = require("../middlewares/authMiddleware");
const { getUsers, getUserId } = require("../controllers/userController");

const router = express.Router();

//User Management Routes
router.get("/",protect,adminOnly,getUsers); //Get all users (Admin only)
router.get("/:id",protect,getUserId); //Get user by ID (Protected)

module.exports = router;