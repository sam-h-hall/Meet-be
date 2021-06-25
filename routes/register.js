const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../database/db-schema/user");
const uri =
  "mongodb+srv://sam-h-hall:bfHn3Bcre9AdsrHM@cluster0.avbwg.mongodb.net/Meet-db?retryWrites=true&w=majority";
const connector = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password || !email) {
      res.status(400).json({
        err: "Username, password, and email are required fields",
      });
    } else {
      let usernameTaken = await user.findOne({ username });
      let emailTaken = await User.findOne({ email });

      if (usernameTaken) {
        res.status(400).json({
          err: "Username taken",
        });
      }

      if (emailTaken) {
        res.status(400).json({
          err: "Email taken",
        });
      }
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const newUser = await new User({
          username,
          email,
          password: hash,
        }).save();
        return connector.then(() => {
          res.status(201).json({
            success: "New user registered",
            newUser,
          });
        });
      });
    });

    //res.status(201).json({
    //success: "new user created",
    //});
  } catch (err) {
    res.status(500).json({
      err: err.message,
      msg: "Server error fulfilling request",
    });
  }
});

module.exports = router;
