const verifyJwt = require("../utils/verify-jwt");

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (token && verifyJwt(token)) {
    next()
  } else {
    res.status(403).json({
      err: "Unauthenticated user",
      suggestion: "redirect to login"
    })
  }
}
