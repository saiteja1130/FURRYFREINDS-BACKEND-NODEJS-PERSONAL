import express from "express";
import { verifyToken } from "../MiddleWares/verifyToken.js";
import { getAdminProfile, login } from "../Controllers/Admin/adminController.js";
import { getAllProviders, getAllUsers, getProviderById, getUserById, updateUserStatus } from "../Controllers/Admin/AdminUserController.js";

const AdminRoutes = express.Router()

// AUTH ROUTES
AdminRoutes.post("/login", login)
AdminRoutes.get("/getProfile", verifyToken, getAdminProfile)

// USERS APIS
AdminRoutes.get("/getAllUsers", verifyToken, getAllUsers)
AdminRoutes.get("/getAllProviders", verifyToken, getAllProviders)
AdminRoutes.get("/getUserById/:id", verifyToken, getUserById)
AdminRoutes.get("/getProviderById/:id", verifyToken, getProviderById)
AdminRoutes.put("/updateUserStatus/:id", verifyToken, updateUserStatus)






export default AdminRoutes