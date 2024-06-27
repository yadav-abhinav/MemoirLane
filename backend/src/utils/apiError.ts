export default class ApiError extends Error {
  satusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.satusCode = statusCode;
    this.message = message;
  }
}
