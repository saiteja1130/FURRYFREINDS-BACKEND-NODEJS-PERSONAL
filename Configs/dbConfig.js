import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("PetCare Database connected");
    });
    mongoose.connection.on("error", (err) => {
      console.log("PetCare Database connection error", err);
    });
    await mongoose.connect(`${process.env.MONGODB_URI}PetCare`);
  } catch (error) {
    console.log(error);
  }
};
