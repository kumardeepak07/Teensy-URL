const crypto = require("crypto");

module.exports = function generateShortCode() {
  return crypto.randomBytes(4).toString("base64url");
};
