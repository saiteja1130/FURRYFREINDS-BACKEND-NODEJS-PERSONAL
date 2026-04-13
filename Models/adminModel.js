import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        enum: ["Admin"]
    }
})

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema)

export default Admin

