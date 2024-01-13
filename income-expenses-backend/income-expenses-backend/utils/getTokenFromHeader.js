const extractTokenFromRequest = (request) => {
  // Retrieve the token from the request header
  const headerInfo = request.headers;
  const authHeader = headerInfo["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : undefined;

  if (token) {
    return token;
  } else {
    return {
      operationStatus: "failed",
      errorMessage: "No valid token found in the request header",
    };
  }
};

module.exports = extractTokenFromRequest;
