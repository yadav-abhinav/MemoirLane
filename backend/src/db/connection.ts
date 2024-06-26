import mongoose from "mongoose";
import logger from "../utils/logger";

export default async function connect() {
  try {
    const uri = process.env["MONGODB_URI"] as string;
    await mongoose.connect(uri);
    logger.verbose("Connected to database successfully!");
  } catch (err) {
    logger.error(err);
  }
}
