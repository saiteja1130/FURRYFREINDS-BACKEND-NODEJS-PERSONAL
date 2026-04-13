import express from "express";
import { verifyToken } from "../MiddleWares/verifyToken.js";
import { getAdminProfile, login } from "../Controllers/Admin/adminController.js";

const AdminRoutes = express.Router()

// AUTH ROUTES
AdminRoutes.post("/login", login)
AdminRoutes.get("/getProfile", verifyToken, getAdminProfile)


export default AdminRoutes