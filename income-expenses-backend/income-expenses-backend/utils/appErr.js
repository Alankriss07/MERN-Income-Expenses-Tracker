class ErrorCustom extends Error {
  constructor(errorMessage, httpStatusCode) {
    super(errorMessage);
    this.httpStatusCode = httpStatusCode;
    this.errorStatus = "unsuccessful";
  }
}

const generateCustomError = (errorMessage, httpStatusCode) => {
  let errorInstance = new Error(errorMessage);
  errorInstance.httpStatusCode = httpStatusCode;
  return errorInstance;
};

module.exports = {
  ErrorCustom,
  generateCustomError,
};
