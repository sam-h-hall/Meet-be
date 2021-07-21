import { Router } from "express";
import { genSalt, hash } from "bcryptjs";
import User from "../database/db-schema/user";
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
      let usernameTaken: boolean = await User.findOne({ username });
      let emailTaken: boolean = await User.findOne({ email });

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
      if (err) {
        console.log("register gen salt err: ", err);
        return;
      }
      hash(password, salt, async (err, hash) => {
        if (err) {
          console.log("register hash err: ", err);
          return;
        }
        const newUser = await new User({
          username,
          email,
          password: hash,
        })
          .save()
          .then((res: any) => {
            const { _id, username, email } = newUser;
            return res.status(201).json({
              success: "New user registered",
              user: {
                _id,
                username,
                email,
              },
              token: genJwt(newUser),
            });
          })
          .catch((err: any) => {
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

export default router;
