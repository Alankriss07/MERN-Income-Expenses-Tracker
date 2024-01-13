const customErrorHandler = (
  customError,
  incomingRequest,
  serverResponse,
  nextMiddleware
) => {
  // errorText
  // errorStatus
  // errorCode
  // errorTrace

  const errorCode = (customError.errorCode = customError.errorCode || 500);
  const errorStatus = (customError.errorStatus =
    customError.errorStatus || "error");
  const errorText = customError.errorText;
  const errorTrace = customError.errorTrace;

  serverResponse.status(errorCode).json({
    errorStatus,
    errorText,
    errorTrace,
  });
};

module.exports = customErrorHandler;
