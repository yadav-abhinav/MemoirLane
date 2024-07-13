export default class ApiError extends Error {
  message: string;

  constructor(message = "Internal server error!") {
    super();
    this.message = message;
  }
}
