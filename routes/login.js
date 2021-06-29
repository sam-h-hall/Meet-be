const router = require("express").Router();
const genJwt = require("../utils/gen-jwt");
const User = require("../database/db-schema/user");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {

    const [match] = await User.find({ username });

    if (!match) {
      res.status(400).send("Username not found");
    } else {
      comparePwdHash = bcrypt.compareSync(password, match.password);

      if (comparePwdHash) {
        const token = genJwt(match);
        res.status(200).json({
          msg: "Login successful",
          user: {
            username,
            email: match.email,
          },
          token,
        });
      } else {
        res.status(400).json({
          err: "Incorrect password",
        });
      }
    }
  } catch {
    res.status(500).send("Server error");
  }
});

module.exports = router;
