import bcrypt from "bcrypt";
import { ZodError } from "zod";
import HttpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { constructSucessResponse } from "../utils/responseGenerator";
import {
  verifyRefreshToken,
  generateAccessAndRefreshTokens,
} from "../utils/jwt";
import { User } from "../models/user.model";
import { UserSesion } from "../models/userSession.model";
import { CreateUserDto, LoginDto } from "../dto/auth.dto";
import { CustomRequest } from "../entity/auth.entity";
import ApiError from "../utils/apiError";

export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userInfo = CreateUserDto.parse(req.body);
    const passwordHash = await bcrypt.hash(userInfo.password, 10);
    const newUser = await User.create({
      name: userInfo.name,
      email: userInfo.email,
      password: passwordHash,
    });

    await newUser.save();
    constructSucessResponse(res, { id: newUser.id }, HttpStatus.CREATED);
  } catch (err: any) {
    if (err instanceof ZodError) {
      next(new ApiError(HttpStatus.BAD_REQUEST, err.errors[0].message));
    } else if (
      err.name &&
      err.name === "MongoServerError" &&
      err.code === 11000
    ) {
      next(new ApiError(HttpStatus.CONFLICT, "User already exists"));
    } else next(err);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const credentials = LoginDto.parse(req.body);
    const user = await User.findOne({ email: credentials.email });

    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
    }
    const match = await bcrypt.compare(credentials.password, user!.password);

    if (!match) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Incorrect password");
    }
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);
    await UserSesion.findOneAndUpdate(
      { userId: user.id },
      { refreshToken },
      { upsert: true }
    );

    res.cookie("token", refreshToken, { httpOnly: true, secure: true });
    constructSucessResponse(res, { accessToken });
  } catch (err) {
    if (err instanceof ZodError) {
      next(new ApiError(HttpStatus.BAD_REQUEST, err.errors[0].message));
    } else next(err);
  }
}

export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req as CustomRequest;
    await UserSesion.findOneAndDelete({ userId });
    res.clearCookie("token", { httpOnly: true, secure: true });
    constructSucessResponse(res);
  } catch (err) {
    next(err);
  }
}

export async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = req.cookies?.token;
  try {
    const { userId, email } = await verifyRefreshToken(refreshToken);
    const { accessToken } = generateAccessAndRefreshTokens({
      id: userId,
      email,
    });
    constructSucessResponse(res, { accessToken });
  } catch (err) {
    next(err);
  }
}
