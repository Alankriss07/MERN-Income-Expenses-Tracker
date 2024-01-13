const jsonWebTokenHandler = require("jsonwebtoken");

const validateAndDecodeToken = (userToken) => {
  return jsonWebTokenHandler.verify(
    userToken,
    "secretKey",
    (error, decodedData) => {
      if (error) {
        return null;
      } else {
        return decodedData;
      }
    }
  );
};

module.exports = validateAndDecodeToken;
