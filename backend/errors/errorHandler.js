const errorHandler = async (promise) => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    const message = error.message || "Unknown error";
    const stack = error.stack || "No stack trace available";
    return [null, { message, stack }];
  }
};

export { errorHandler };
