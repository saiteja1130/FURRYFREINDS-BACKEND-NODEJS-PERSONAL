import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "./Models/adminModel.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI + "PetCare");
    console.log("MongoDB Connected ✅");

    const existingAdmin = await Admin.findOne({
      email: "saiteja@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await Admin.create({
      name: "Sai Teja",
      email: "saiteja@gmail.com",
      password: hashedPassword,
      role: "Admin",
    });

    console.log("Admin created successfully ✅");
    console.log(admin);

    process.exit();
  } catch (error) {
    console.log("Seed Error:", error);
    process.exit(1);
  }
};

seedAdmin();