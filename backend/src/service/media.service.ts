import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse, v2 } from "cloudinary";
import ApiError from "../utils/apiError";
import { Media } from "../models/media.model";
import { v4 as uuidv4, validate } from "uuid";
import { constructSucessResponse } from "../utils/responseGenerator";
import { StatusCodes } from "http-status-codes";
import mongoose, { Document } from "mongoose";
import { User } from "../models/user.model";
import { IUser } from "../entity/user.entity";
import logger from "../utils/logger";
import { UploadImageUrlDto } from "../dto/media.dto";
import { ZodError } from "zod";

const uploadToCloud = (
  file: Express.Multer.File,
  userId: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: uuidv4(),
          folder: `media/${userId}`,
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
  mediaInfo: UploadApiResponse
) => {
  if (!user) {
    res.redirect("/logout");
    throw new ApiError(StatusCodes.NOT_FOUND, "User Not found");
  }
  const { url, display_name, height, width, bytes, format, original_filename } =
    mediaInfo;
  const uploadedMedia = new Media({
    id: display_name,
    src: url,
    fileName: original_filename,
    size: bytes,
    format,
    height,
    width,
  });
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
      const uploadResponse = await uploadToCloud(file, req.userId!);
      await saveMediaToUser(res, user, uploadResponse);
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
    const { src } = UploadImageUrlDto.parse(req.body);
    const user = await User.findOne({ id: req.userId });

    const uploadResponse = await v2.uploader.upload(src, {
      public_id: mediaId,
      folder: `media/${req.userId}`,
    });

    await saveMediaToUser(res, user, uploadResponse);
    await user!.save();
    constructSucessResponse(res, { id: mediaId, src: uploadResponse.url });
    next();
  } catch (err) {
    if (err instanceof ZodError)
      next(new ApiError(StatusCodes.BAD_REQUEST, "Invaild media link"));
    next(err);
  }
}

export async function getMediaInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    if (!validate(id))
      new ApiError(StatusCodes.BAD_REQUEST, "Invaild media link");

    const media = await Media.findOne({ id });
    if (!media) throw new ApiError(StatusCodes.NOT_FOUND, "Media not found");

    constructSucessResponse(res, media!.toObject({ versionKey: false }));
    next();
  } catch (err) {
    next(err);
  }
}

export async function toggleFavouriteMedia(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    if (!validate(id))
      new ApiError(StatusCodes.BAD_REQUEST, "Invaild media link");

    const media = await Media.findOne({ id });
    if (!media) throw new ApiError(StatusCodes.NOT_FOUND, "Media not found");

    media!.favourite = !media?.favourite;
    await media!.save();

    constructSucessResponse(res);
    next();
  } catch (err) {
    next(err);
  }
}

export async function deleteMedia(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    const id = req.params.id;
    if (!validate(id))
      new ApiError(StatusCodes.BAD_REQUEST, "Invaild media link");

    const public_id = `media/${userId}/${id}`;
    const response = await cloudinary.api.delete_resources([public_id]);

    if (response["deleted"][public_id] != "deleted")
      throw new ApiError(StatusCodes.NOT_FOUND, "Media not found");

    const media = await Media.findOneAndDelete({ id });
    if (!media) throw new ApiError(StatusCodes.NOT_FOUND, "Media not found");

    await User.updateOne(
      { id: userId },
      {
        $pull: {
          images: media!._id,
        },
      }
    );
    constructSucessResponse(res);
    next();
  } catch (err) {
    next(err);
  }
}
