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
        const matchPassWord = await bcrypt.compare(password, checkUser.password)
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

export const getAdminProfile=async()


