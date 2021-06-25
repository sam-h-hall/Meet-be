const bcrypt = require("bcryptjs");
const User = require("../database/db-schema/user");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://sam-h-hall:bfHn3Bcre9AdsrHM@cluster0.avbwg.mongodb.net/Meet-db?retryWrites=true&w=majority";
const connector = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// encrypts password and delivers it to database

module.exports = async (user) => {
  const { username, password, email } = user;
  const userExists = await User.findOne({ username });

  // user not being added if they already exist, but the respose message makes it appear 
  // they are --> change that
  if (userExists) {
    console.log("user exists");
  }

  try {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        err.body;
        res.status(400).json({
          err: err.body,
        });
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        // add db model to add pwd to db, it cannot leave this function
        // add check that user doesn't already exist
        //

        const newUser = new User({
          username,
          email,
          password: hash,
        }).save();
        return connector.then(async (res) => {
          //console.log(res);
          return newUser;
        });
      });
    });
  } catch (err) {
    console.log(err.body);
    res.status(400).json({
      err: err.body,
    });
  }
};
