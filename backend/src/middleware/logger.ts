import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export default function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { method, url } = req;
  const { statusCode } = res;
  logger.verbose(`Recieving request: ${method} ${url}`);
  res.on("finish", function () {
    logger.verbose(`Response: ${statusCode}`);
  });
  next();
}
