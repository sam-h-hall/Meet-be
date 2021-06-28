const jwt = require("jsonwebtoken");

module.exports = (user) => {
  const { _id, username, email } = user;

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign({_id, username, email}, process.env.JWT_SECRET_KEY, options);
}
