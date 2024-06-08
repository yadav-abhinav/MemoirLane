import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import { CustomJWTPayload, CustomRequest } from "../entities/auth.entity";
import { constructErrorResponse } from "../utils/responseGenerator";

export default function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization") as string;
  const secretKey = process.env["JWT_SECRET_KEY"] as string;
  try {
    const payload = jwt.verify(token, secretKey) as CustomJWTPayload;
    (req as CustomRequest).userId = payload.userId;
    (req as CustomRequest).email = payload.email;
    next();
  } catch (err) {
    constructErrorResponse(res, "Invalid auth token!", HttpStatus.UNAUTHORIZED);
  }
}
