import mongoose from "mongoose";
import { IUser } from "../entities/user.entity";

const userSchema = new mongoose.Schema<IUser>({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

export const User = mongoose.model("User", userSchema);