import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB ERROR:", error.message);
    // ❌ REMOVE THIS LINE TEMPORARILY FOR DEBUG
    // process.exit(1);
  }
};

export default connectDB;