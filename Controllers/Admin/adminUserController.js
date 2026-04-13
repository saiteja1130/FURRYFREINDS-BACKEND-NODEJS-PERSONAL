import User from "../../Models/userModel.js"

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({ role: "user" }).select("-password -servicesOffered -adminVerified").lean();
        if (allUsers.length === 0) {
            return res.send({
                message: "No Users Found",
                status: false
            })
        }

        return res.send({
            message: " Users Fetched SuccessFully",
            status: true,
            users: allUsers
        })
    } catch (error) {
        console.log("GET ALL USERS ADMIN API ERROR", error)
        return res.send({
            message: error.message || "No Users Found",
            status: false,
        })
    }
}

export const getAllProviders = async (req, res) => {
    try {
        const allUsers = await User.find({ role: "provider" }).select("-password -servicesOffered -adminVerified").lean();
        if (allUsers.length === 0) {
            return res.send({
                message: "No Users Found",
                status: false
            })
        }

        return res.send({
            message: " Users Fetched SuccessFully",
            status: true,
            users: allUsers
        })
    } catch (error) {
        console.log("GET ALL PROVIDER ADMIN API ERROR", error)
        return res.send({
            message: error.message || "No Users Found",
            status: false,
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const checkUser = await User.findOne({ $and:[{_id:id},{role:"user"}] }).select("-password -servicesOffered -adminVerified")
        if (!checkUser) {
            return res.send({
                message: "User Not Found",
                status: false
            })
        }
        return res.send({
            message: " User Fetched SuccessFully",
            status: true,
            users: checkUser
        })
    } catch (error) {
        console.log("GET USERS BY ID ADMIN API ERROR", error)
        return res.send({
            message: error.message || "No Users Found",
            status: false,
        })
    }
}

export const getProviderById = async (req, res) => {
    try {
        const { id } = req.params
        const checkUser = await User.findOne({ $and:[{_id:id},{role:"provider"}] }).select("-password")
        if (!checkUser) {
            return res.send({
                message: "Provider Not Found",
                status: false
            })
        }
        return res.send({
            message: " Provider Fetched SuccessFully",
            status: true,
            users: checkUser
        })
    } catch (error) {
        console.log("GET PROVIDER BY ID ADMIN API ERROR", error)
        return res.send({
            message: error.message || "No Provider Found",
            status: false,
        })
    }
}