import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB is Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // In production, retry connection rather than exiting
    if (process.env.NODE_ENV === 'production') {
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectDB, 5000);
    } else {
      process.exit(1);
    }
  }
}

