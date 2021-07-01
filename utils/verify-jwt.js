const jwt = require("jsonwebtoken");

module.exports = (token) => {
  let decodedToken;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return { status: 403, error: "Invalid token" };
    }
    decodedToken = decoded;
  });
  return decodedToken
};
