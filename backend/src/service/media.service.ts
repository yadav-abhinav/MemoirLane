import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse, v2 } from "cloudinary";
import ApiError from "../utils/apiError";
import { Media } from "../models/media.model";
import { v4 as uuidv4 } from "uuid";
import { constructSucessResponse } from "../utils/responseGenerator";
import { StatusCodes } from "http-status-codes";
import mongoose, { Document } from "mongoose";
import { User } from "../models/user.model";
import { IMedia } from "../entity/media.entity";
import { IUser } from "../entity/user.entity";

const uploadToCloud = (
  file: Express.Multer.File,
  userId: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: `${userId}/${uuidv4()}`,
          folder: "media",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!);
        }
      )
      .end(file.buffer);
  });
};

const saveMediaToUser = async (
  res: Response,
  user: (mongoose.Document<unknown, {}, IUser> & IUser) | null,
  media: IMedia
) => {
  if (!user) {
    res.redirect("/logout");
    throw new ApiError(StatusCodes.NOT_FOUND, "User Not found");
  }
  const uploadedMedia = new Media(media);
  user.images.push(uploadedMedia);
  return uploadedMedia.save();
};

export async function uploadMediaLocal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as Express.Multer.File[];
    const user = await User.findOne({ id: req.userId });
    if (!files?.length)
      throw new ApiError(StatusCodes.BAD_REQUEST, "No files uploaded");

    const promiseList: Promise<Document>[] = [];
    for (const file of files) {
      const { url, display_name } = await uploadToCloud(file, req.userId!);

      await saveMediaToUser(res, user, {
        id: display_name,
        src: url,
        fileName: file.originalname,
      });
    }

    await Promise.all(promiseList);
    await user!.save();
    constructSucessResponse(res);
    next();
  } catch (err) {
    next(err);
  }
}

export async function uploadMediaLink(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const mediaId = uuidv4();
    const { src }: { src: string } = req.body;
    const user = await User.findOne({ id: req.userId });
    if (!src) throw new ApiError(StatusCodes.BAD_REQUEST, "Invaild media link");

    const { url } = await v2.uploader.upload(src, {
      public_id: `${req.userId}/${mediaId}`,
      folder: "media",
    });
    const fileName = src.match(/.*\/(.*)$/)?.[0] ?? "untitled";

    await saveMediaToUser(res, user, {
      id: mediaId,
      src: url,
      fileName: fileName,
    });
    await user!.save();
    constructSucessResponse(res, { id: mediaId, src: url });
    next();
  } catch (err) {
    next(err);
  }
}
