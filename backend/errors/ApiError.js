class APIError extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode || 400;
    this.message = message;
  }
}
export { APIError };
