const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../database/db-schema/user");
const uri =
  "mongodb+srv://sam-h-hall:bfHn3Bcre9AdsrHM@cluster0.avbwg.mongodb.net/Meet-db?retryWrites=true&w=majority";
const connector = mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => res)
  .catch((err) => err.message);

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password || !email) {
      return res.status(400).send({
        error: "Username, password, and email are required fields",
      });
    } else {
      let usernameTaken = await User.findOne({ username });
      let emailTaken = await User.findOne({ email });

      if (usernameTaken) {
        console.log("username taken")
        return res.status(400).send({
          error: "Username taken",
        });
      }

      if (emailTaken) {
        console.log("email taken")
        return res.status(400).json({
          error: "Email taken",
        });
      }
    }
    // put this in here because we have to save the user to the db inside of the hashing function
    bcrypt.genSalt(10, (err, salt) => {
      console.log("genSalt");
      bcrypt.hash(password, salt, async (err, hash) => {
        console.log("hash");
        const newUser = await new User({
          username,
          email,
          password: hash,
        }).save();
        return connector
          .then(() => {
            return res.status(201).json({
              success: "New user registered",
              newUser,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              err: err.message,
              msg: "Server error",
            });
          });
      });
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      msg: "Server error fulfilling request",
    });
  }
});

module.exports = router;
