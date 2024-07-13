import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function constructErrorResponse(
  res: Response,
  message: string = "An error occured!",
  code: number = StatusCodes.INTERNAL_SERVER_ERROR
) {
  res.status(code).json({
    success: false,
    error: message,
    timeStamp: new Date().toISOString(),
  });
}

export function constructSucessResponse(
  res: Response,
  payload: object = {},
  code: number = StatusCodes.OK
) {
  res.status(code).json({
    success: true,
    payload,
    timeStamp: new Date().toISOString(),
  });
}
