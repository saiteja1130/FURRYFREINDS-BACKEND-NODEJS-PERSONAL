import bcrypt from "bcrypt";


export const hashPassWord = async (password) => {
    try {
        const saltKey =await bcrypt.genSalt(10)
        const hash =await bcrypt.hash(password, saltKey)
        if (!hash) {
            return {
                status: false
            }
        }
        return {
            status: true,
            hashed: hash
        }
    } catch (error) {
        console.log("Hashed Error", error)
        return {
            status: false
        }
    }
}