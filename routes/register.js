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
  console.log(`${username}, ${password}, ${email}`)

  try {
    if (!username || !password || !email) {
      res.status(400).json({
        err: "Username, password, and email are required fields",
      });
    } 
    else {
      let usernameTaken = await User.findOne({ username });
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

    console.log("bef gensalt")

    bcrypt.genSalt(10, (err, salt) => {
      if (err) err;
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) err;
        const newUser = await new User({
          username,
          email,
          password: hash,
        }).save();
        return connector.then(() => {
          res.status(201).json({
            success: "New user registered",
            newUser
          });
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
      msg: "Server error fulfilling request",
    });
  }
});

module.exports = router;
