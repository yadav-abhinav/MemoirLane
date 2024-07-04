import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IMedia } from "../entity/media.entity";

const mediaSchema = new mongoose.Schema<IMedia>({
  id: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4(),
  },
  src: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  caption: String,
  uploadedAt: {
    type: Date,
    default: new Date(),
  },
});

export const Media = mongoose.model("Media", mediaSchema);
