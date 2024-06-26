import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { constructErrorResponse } from "../utils/responseGenerator";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);
  logger.error(err.stack);
  constructErrorResponse(res);
  next();
}
