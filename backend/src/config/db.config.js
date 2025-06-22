import mongoose from "mongoose";

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("database connected");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

export default connect;