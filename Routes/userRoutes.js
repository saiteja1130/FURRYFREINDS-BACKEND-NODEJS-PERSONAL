import express from "express";
import { getProfile, login, signUp } from "../Controllers/User/userController.js";
import { verifyToken } from "../MiddleWares/verifyToken.js";
import { upload } from "../MiddleWares/upload.js";

const UserRoutes = express.Router()

// AUTH ROUTES
UserRoutes.post("/signUp", upload.fields([
    { name: "aadhaarFrontPhoto", maxCount: 1 },
    { name: "aadhaarBackPhoto", maxCount: 1 },
]), signUp)
UserRoutes.post("/login", login)
UserRoutes.get("/getProfile", verifyToken, getProfile)


export default UserRoutes