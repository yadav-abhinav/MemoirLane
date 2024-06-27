import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export default function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.verbose(`Recieving request: ${req.method} ${req.url}`);
  res.on("finish", function (this: Response) {
    logger.verbose(`Response: ${this.statusCode} ${this.statusMessage}`);
  });
  next();
}
