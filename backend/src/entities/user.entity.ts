import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
};
