import { JWTtoken } from "../../Helpers/JWTtoken.js";
import Admin from "../../Models/adminModel.js"
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkAdmin = await Admin.findOne({ email })
        if (!checkAdmin) {
            return res.send({
                status: false,
                message: "Email and Password are required"
            });
        }
        const matchPassWord = await bcrypt.compare(password, checkAdmin.password)
        if (!matchPassWord) {
            return res.send({
                status: false,
                message: 'Incorrect Credentials',
            });
        }
        const token = await JWTtoken(checkAdmin._id)
        return res.send({
            status: true,
            message: "Logged In SuccessFully",
            token: token
        });
    } catch (error) {
        console.log("USER LOGIN CONTROLLER ERROR", error)
        return res.send({
            status: false,
            message: error.message,
        })
    }
}

export const getAdminProfile = async (req, res) => {
    try {
        const adminId = req.userId;
        const admin = await Admin.findById(adminId).select("-password");
        if (!admin) {
            return res.send({
                status: false,
                message: "Admin not found",
            });
        }
        return res.send({
            status: true,
            message: "Admin profile fetched successfully",
            data: admin,
        });
    } catch (error) {
        console.log("GET ADMIN PROFILE ERROR", error);
        return res.send({
            status: false,
            message: error.message,
        });
    }
};


