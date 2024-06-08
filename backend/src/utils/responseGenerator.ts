import { Response } from "express";
import HttpStatus from "http-status-codes";

export function constructErrorResponse(
  res: Response,
  message: string = "An error occured!",
  code: number = HttpStatus.INTERNAL_SERVER_ERROR,
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
  code: number = HttpStatus.OK
) {
  res.status(code).json({
    success: true,
    payload,
    timeStamp: new Date().toISOString(),
  });
}
