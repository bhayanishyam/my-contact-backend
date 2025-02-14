const express = require("express");
const { registerUser, loginUser, logoutUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateUserHandler");
// middleware

const router = express.Router();


router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", validateToken, currentUser)

router.post("/logout", logoutUser)

module.exports = router

