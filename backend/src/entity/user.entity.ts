import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserSession {
  refreshToken: string;
  userId: string;
  createdAt: Date;
}
