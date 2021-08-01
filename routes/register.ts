import { Router } from "express";
import { genSalt, hash } from "bcryptjs";
import User from "../database/models/User";
import genJwt from "../utils/gen-jwt";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password || !email) {
      return res.status(400).send({
        error: "Username, password, and email are required fields",
      });
    } else {
      let usernameTaken: {} = await User.findOne({ username });
      console.log("username taken", usernameTaken);
      let emailTaken: {} = await User.findOne({ email });

      if (usernameTaken) {
        return res.status(400).send({
          error: "Username taken",
        });
      }

      if (emailTaken) {
        return res.status(400).send({
          error: "Email taken",
        });
      }
    }
    genSalt(10, (err, salt) => {
      console.log("hit salt");
      if (err) {
        throw "salt err";
        //console.log("register gen salt err: ", err);
        //return;
      }
      hash(password, salt, async (err, hash) => {
        console.log("hit hash");
        if (err) {
          throw "hash err";
        }
        const newUser = new User({
          username,
          email,
          password: hash,
        })
          .save()
          .then((newUserInfo: any) => {
            const { _id, username, email } = newUserInfo;
            const token = genJwt(newUserInfo);

            res.status(201).json({
              success: "New user registered",
              user: {
                _id,
                username,
                email,
              },
              token,
            });
          })
          .catch((err: any) => {
            console.log("catch1: ", err);
            res.status(500).json({
              err,
              msg: "Server error",
            });
          });
      });
    });
  } catch (err) {
    console.log("catch2");
    res.status(500).json({
      err,
      msg: "Server error fulfilling request",
    });
  }
});

export default router;
