import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (e) {
    console.error("MongoDB connection error:", e);
    process.exit(1);
  } finally {
    console.log("done");
  }
};

export default connectDB;
