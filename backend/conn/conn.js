import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

export const conn = async () => {
  try {
    const mongoURI = process.env.MONGO_URL;
    if (!mongoURI) throw new Error("MONGO_URL not defined in .env");

    await mongoose.connect(mongoURI);
    console.log("Mongoose is connected successfully");
  } catch (error) {
    console.error("Error in connecting to MongoDB", error);
    process.exit(1);
  }
};

