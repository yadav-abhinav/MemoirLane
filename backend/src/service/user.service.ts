import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import ApiError from "../utils/apiError";
import { StatusCodes } from "http-status-codes";
import { constructSucessResponse } from "../utils/responseGenerator";
import { IMedia } from "../entity/media.entity";

export async function getUserMedia(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { page = "1" } = req.query;
    const skip = 20 * (parseInt(page.toString()) - 1);
    const user = await User.findOne({ id: req.userId }).populate({
      path: "images",
      options: { skip, limit: 20 },
      select: { id: 1, src: 1, fileName: 1, favourite: 1, uploadedAt: 1 },
    });

    if (!user) {
      res.redirect("/logout");
      throw new ApiError(StatusCodes.NOT_FOUND, "User Not found");
    }
    constructSucessResponse(res, { images: user.images as IMedia[] });
  } catch (err) {
    next(err);
  }
}
