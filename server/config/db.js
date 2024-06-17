import mongoose from "mongoose";
import { DB_NAME } from "../const.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`
    );
    // console.log(process.env.GMAIL_APP_PASSWORD);
  } catch (error) {
    console.log("MongoDB CONNECTION FAILED: ", error);
    process.exit(1); // its a method of node
  }
};

export default connectDB;
