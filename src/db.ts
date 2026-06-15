import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is missing in .env");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};