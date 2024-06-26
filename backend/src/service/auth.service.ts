import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { ZodError } from "zod";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { CreateUserDto, LoginDto } from "../dto/auth.dto";
import {
  constructErrorResponse,
  constructSucessResponse,
} from "../utils/responseGenerator";
import { IUser } from "../entity/user.entity";
import { UserSesion } from "../models/userSession.model";
import { CustomJWTPayload } from "../entity/auth.entity";
import logger from "../utils/logger";

function generateAccessAndRefreshTokens({ id, email }: Partial<IUser>) {
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

export async function createNewUser(req: Request, res: Response) {
  try {
    const userInfo = CreateUserDto.parse(req.body);
    const passwordHash = await bcrypt.hash(userInfo.password, 10);
    const newUser = await User.create({
      id: uuidv4(),
      name: userInfo.name,
      email: userInfo.email,
      password: passwordHash,
    });
    await newUser.save();
    constructSucessResponse(res, { id: newUser.id }, HttpStatus.CREATED);
  } catch (err: any) {
    if (err instanceof ZodError) {
      constructErrorResponse(
        res,
        err.errors[0].message,
        HttpStatus.BAD_REQUEST
      );
    } else if (
      err.name &&
      err.name === "MongoServerError" &&
      err.code === 11000
    ) {
      constructErrorResponse(res, "User already exists!", HttpStatus.CONFLICT);
    } else {
      logger.error(err);
      constructErrorResponse(res);
    }
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const credentials = LoginDto.parse(req.body);
    const user = await User.findOne({ email: credentials.email });

    if (!user) {
      return constructErrorResponse(
        res,
        "User not found!",
        HttpStatus.NOT_FOUND
      );
    }
    const match = await bcrypt.compare(credentials.password, user!.password);

    if (!match) {
      return constructErrorResponse(
        res,
        "Incorrect password!",
        HttpStatus.BAD_REQUEST
      );
    }
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);
    const session = await UserSesion.findOneAndUpdate(
      { userId: user.id },
      { refreshToken, createdAt: new Date() },
      { upsert: true }
    );
    logger.debug(session);
    res.cookie("token", refreshToken, { httpOnly: true, secure: true });
    constructSucessResponse(res, { accessToken });
  } catch (err) {
    if (err instanceof ZodError) {
      constructErrorResponse(
        res,
        err.errors[0].message,
        HttpStatus.BAD_REQUEST
      );
    } else {
      logger.error(err);
      constructErrorResponse(res);
    }
  }
}

export async function refreshAccessToken(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies?.token;
    logger.debug(req.cookies);

    if (!refreshToken) {
      return constructErrorResponse(
        res,
        "Unauthorized",
        HttpStatus.UNAUTHORIZED
      );
    }
    const { userId, email } = jwt.verify(
      refreshToken,
      process.env["REFRESH_TOKEN_SECRET_KEY"]!
    ) as CustomJWTPayload;
    const prevSession = await UserSesion.findOne({ refreshToken });

    if (!prevSession || prevSession.userId !== userId) {
      return constructErrorResponse(
        res,
        "Unauthorized",
        HttpStatus.UNAUTHORIZED
      );
    }
    const { accessToken } = generateAccessAndRefreshTokens({
      id: userId,
      email,
    });
    constructSucessResponse(res, { accessToken });
  } catch (err) {
    logger.warn(err);
    constructErrorResponse(res);
  }
}
