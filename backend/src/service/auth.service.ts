import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { ValidationError } from "runtypes";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { CreateUserDto, LoginDto } from "../dto/auth.dto";
import {
  constructErrorResponse,
  constructSucessResponse,
} from "../utils/responseGenerator";

export async function createNewUser(req: Request, res: Response) {
  try {
    const userInfo = CreateUserDto.check(req.body);
    const saltRounds = parseInt(process.env["SALT_ROUNDS"]!) ?? 10;
    const passwordHash = await bcrypt.hash(userInfo.password, saltRounds);
    const newUser = await User.create({
      id: uuidv4(),
      name: userInfo.name,
      email: userInfo.email,
      password: passwordHash,
    });
    await newUser.save();
    constructSucessResponse(res, { id: newUser.id }, HttpStatus.CREATED);
  } catch (err: any) {
    console.log(err);
    if (err instanceof ValidationError) {
      constructErrorResponse(
        res,
        "Invalid user details!",
        HttpStatus.BAD_REQUEST
      );
    } else if (
      err.name &&
      err.name === "MongoServerError" &&
      err.code === 11000
    ) {
      constructErrorResponse(res, "User already exist!", HttpStatus.CONFLICT);
    } else {
      constructErrorResponse(res);
    }
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const credentials = LoginDto.check(req.body);
    const user = await User.findOne({ email: credentials.email });

    if (!user) {
      constructErrorResponse(res, "User not found!", HttpStatus.NOT_FOUND);
    }

    const match = await bcrypt.compare(credentials.password, user!.password);

    if (!match) {
      constructErrorResponse(
        res,
        "Incorrect password!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      const secretKey = process.env["JWT_SECRET_KEY"] as string;
      const token = jwt.sign(
        { userId: user!.id, email: user!.email },
        secretKey,
        {
          expiresIn: "2 days",
        }
      );
      constructSucessResponse(res, { token });
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      constructErrorResponse(
        res,
        "Invalid user details!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      constructErrorResponse(res);
    }
  }
}
