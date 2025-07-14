import express from "express";
import { registerUser, loginUser, logoutUser, currentUser } from "../controllers/userController.js";
import validateToken from "../middleware/validateUserHandler.js";
// middleware

const router = express.Router();


router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", validateToken, currentUser)

router.post("/logout", logoutUser)

export default router
