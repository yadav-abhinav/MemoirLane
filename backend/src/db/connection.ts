import mongoose from "mongoose";

export default async function connect() {
  try {
    const uri = process.env["MONGODB_URI"] as string;
    await mongoose.connect(uri);
    console.log("Connected to database successfully!");
  } catch (err) {
    console.error("Error connecting to the database!");
    console.log(err);
  }
}
