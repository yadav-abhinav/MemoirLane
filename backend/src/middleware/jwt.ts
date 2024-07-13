import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { verifyRefreshToken } from "../utils/jwtUtils";
import ApiError from "../utils/apiError";
import logger from "../utils/logger";
import { error } from "console";

export default async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.header("Authorization")!.split(" ")[1];
    jwt.verify(accessToken, process.env["ACCESS_TOKEN_SECRET_KEY"]!);
    const refreshToken = req.cookies?.rtoken;
    const { userId, email } = await verifyRefreshToken(refreshToken);

    req.userId = userId;
    req.email = email;
    next();
  } catch (err) {
    logger.debug(err);
    next(new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
  }
}
