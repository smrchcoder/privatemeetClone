import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connectionString = process.env.MONGODBURL || "";
    console.log({ connectionString });
    const conn = await mongoose.connect(connectionString);
    console.log("Connected to the mongoose", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
