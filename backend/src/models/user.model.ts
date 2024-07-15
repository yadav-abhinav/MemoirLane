import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../entity/user.entity";

const userSchema = new mongoose.Schema<IUser>({
  id: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Media",
    },
  ],
});

export const User = mongoose.model("User", userSchema);
