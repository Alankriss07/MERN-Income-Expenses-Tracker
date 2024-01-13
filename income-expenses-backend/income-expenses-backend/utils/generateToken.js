const jsonWebTokenHandler = require("jsonwebtoken");

const generateUserToken = (identity) => {
  return jsonWebTokenHandler.sign({ identity }, "uniqueSecretKey", {
    expiresIn: "2w",
  });
};

module.exports = generateUserToken;
