import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface CustomRequest extends Request {
  userId: string;
  email: string;
}

export interface CustomJWTPayload extends JwtPayload {
  userId: string;
  email: string
}
