import express from "express";
import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse, v2 } from "cloudinary";
import ApiError from "../utils/apiError";
import { Media } from "../models/media.model";
import { v4 as uuidv4 } from "uuid";
import { constructSucessResponse } from "../utils/responseGenerator";
import { StatusCodes } from "http-status-codes";
import { Document } from "mongoose";
import logger from "../utils/logger";

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

export async function uploadMediaLocal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files?.length)
      throw new ApiError(StatusCodes.BAD_REQUEST, "No files uploaded");

    const promiseList: Promise<Document>[] = [];
    for (const file of files) {
      const { url, display_name } = await uploadToCloud(file, req.userId!);

      const uploadedMedia = new Media({
        id: display_name,
        src: url,
        fileName: file.originalname,
      });
      promiseList.push(uploadedMedia.save());
    }

    await Promise.all(promiseList);
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
    const { src }: { src: string } = req.body;
    if (!src) throw new ApiError(StatusCodes.BAD_REQUEST, "Invaild media link");
    const { url, display_name } = await v2.uploader.upload(src, {
      public_id: `${req.userId}/${uuidv4()}`,
      folder: "media",
    });
    const fileName = src.match(/.*\/(.*)$/)?.[0] ?? "untitled";
    const uploadedMedia = new Media({
      id: display_name,
      src: url,
      fileName,
    });
    await uploadedMedia.save();
    constructSucessResponse(res, { id: uploadedMedia.id, src: url });
    next();
  } catch (err) {
    next(err);
  }
}
