import HttpStatus from "http-status-codes";

export default class ApiError extends Error {
  satusCode: number;
  message: string;

  constructor(
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    message = "Internal server error!"
  ) {
    super();
    this.satusCode = statusCode;
    this.message = message;
  }
}
