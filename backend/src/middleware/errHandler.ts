import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import ApiError from "../utils/apiError";
import { constructErrorResponse } from "../utils/responseGenerator";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return constructErrorResponse(res, err.message, err.satusCode);
  }
  logger.error(err);
  return constructErrorResponse(res);
}
