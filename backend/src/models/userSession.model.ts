import mongoose from "mongoose";
import { IUser, IUserSession } from "../entity/user.entity";

const userSessionSchema = new mongoose.Schema<IUserSession>({
  refreshToken: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

export const UserSesion = mongoose.model("UserSession", userSessionSchema);
