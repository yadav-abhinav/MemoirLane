import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import ApiError from "../utils/apiError";
import { Media } from "../models/media.model";
import { v4 as uuidv4 } from "uuid";
import { constructSucessResponse } from "../utils/responseGenerator";
import logger from "../utils/logger";
import { CustomRequest } from "../entity/auth.entity";

const uploadToCloud = (req: CustomRequest): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: `${req.userId}/${uuidv4()}`,
          folder: "media",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!);
        }
      )
      .end(req.file!.buffer);
  });
};

export async function uploadMedia(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.file) throw new ApiError();
  const { url, display_name } = await uploadToCloud(req as CustomRequest);

  const uploadedMedia = new Media({
    id: display_name,
    src: url,
    fileName: req.file?.originalname,
  });
  uploadedMedia.save();
  constructSucessResponse(res, { id: uploadedMedia.id, src: url });
  next();
}
