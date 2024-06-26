import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import { CustomJWTPayload, CustomRequest } from "../entity/auth.entity";
import { constructErrorResponse } from "../utils/responseGenerator";

export default function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.header("Authorization")!.split(" ")[1];
    const payload = jwt.verify(
      accessToken,
      process.env["ACCESS_TOKEN_SECRET_KEY"]!
    ) as CustomJWTPayload;
    (req as CustomRequest).userId = payload.userId;
    (req as CustomRequest).email = payload.email;
    next();
  } catch (err) {
    constructErrorResponse(res, "Invalid auth token!", HttpStatus.UNAUTHORIZED);
  }
}
