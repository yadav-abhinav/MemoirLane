import { JwtPayload } from "jsonwebtoken";

export interface CustomJWTPayload extends JwtPayload {
  userId: string;
  email: string;
  name: string;
}
