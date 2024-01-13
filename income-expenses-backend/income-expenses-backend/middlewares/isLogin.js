const { AuthError } = require("../utils/authError");
const extractToken = require("../utils/extractToken");
const validateAccessToken = require("../utils/validateAccessToken");

const authenticateUser = (req, res, next) => {
  // Acquire token from the request header
  const authToken = extractToken(req);
  // Verify the token's authenticity
  const decodedUserInfo = validateAccessToken(authToken);
  // Include the user data in the request object
  req.authenticatedUser = decodedUserInfo.id;

  if (!decodedUserInfo) {
    return next(
      new AuthError("Invalid or Expired Token. Please log in again", 401)
    );
  }

  next();
};

module.exports = authenticateUser;
