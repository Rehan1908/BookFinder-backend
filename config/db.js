import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("MongoDB is Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

