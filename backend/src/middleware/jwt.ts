import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../entity/auth.entity";
import { verifyRefreshToken } from "../utils/jwt";
import ApiError from "../utils/apiError";

export default async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.header("Authorization")!.split(" ")[1];
    jwt.verify(accessToken, process.env["ACCESS_TOKEN_SECRET_KEY"]!);
    const refreshToken = req.cookies?.token;
    const { userId, email } = await verifyRefreshToken(refreshToken);

    (req as CustomRequest).userId = userId;
    (req as CustomRequest).email = email;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      next(new ApiError(HttpStatus.UNAUTHORIZED, "Unauthorized"));
    else next(err);
  }
}
