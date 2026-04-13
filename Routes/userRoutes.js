import express from "express";
import { getProfile, login, signUp } from "../Controllers/userController.js";
import { verifyToken } from "../MiddleWares/verifyToken.js";

const UserRoutes = express.Router()

// AUTH ROUTES
UserRoutes.post("/signUp", signUp)
UserRoutes.post("/login", login)
UserRoutes.get("/getProfile", verifyToken, getProfile)


export default UserRoutes