import { CustomJWTPayload } from "../entity/auth.entity";
import { IUser } from "../entity/user.entity";
import jwt from "jsonwebtoken";
import HttpStatus from "http-status-codes";
import { UserSesion } from "../models/userSession.model";
import ApiError from "./apiError";

export function generateAccessAndRefreshTokens({ id, email }: Partial<IUser>) {
  const accessToken = jwt.sign(
    { userId: id, email },
    process.env["ACCESS_TOKEN_SECRET_KEY"]!,
    {
      expiresIn: "10m",
    }
  );

  const refreshToken = jwt.sign(
    { userId: id, email },
    process.env["REFRESH_TOKEN_SECRET_KEY"]!
  );

  return { accessToken, refreshToken };
}

export async function verifyRefreshToken(refreshToken: string) {
  if (!refreshToken) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Unauthorized");
  }
  
  const { userId, email } = jwt.verify(
    refreshToken,
    process.env["REFRESH_TOKEN_SECRET_KEY"]!
  ) as CustomJWTPayload;
  const prevSession = await UserSesion.findOne({ refreshToken });

  if (!prevSession || prevSession.userId !== userId) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "Unauthorized");
  }

  return { userId, email };
}
