import User from "./User";
import { compareSync, genSalt, hash } from "bcryptjs";
import genJwt from "../../utils/gen-jwt";

interface loginCredentials {
  username: string;
  password: string;
}

interface registerCredentials extends loginCredentials {
  passwordRpt: string;
  email: string;
}

export const resolvers = {
  Query: {
    hello: () => "hi",
    // userCrednetials should be a User type
  },
  Mutation: {
    register: async (_: any, newUserCredentials: registerCredentials) => {
      const { username, email, password, passwordRpt } = newUserCredentials;
      try {
        if (!username || !email || !password) {
          throw new Error("missing credentials");
        }

        if (password !== passwordRpt) {
          throw new Error("passwords do not match");
        }

        if (await User.findOne({ username })) {
          throw new Error("username already exists");
        }

        if (await User.findOne({ email })) {
          throw new Error("email already in use");
        }

        const salt = await genSalt(10);
        const pwdHash = await hash(password, salt);

        const newUser = new User({
          username,
          email,
          password: pwdHash,
        });

        newUser.save();

        return {
          user: {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
          },
          token: genJwt(newUser),
        };

       
      } catch (err) {
        console.log("err ", err);
      }
    },
    login: async (_: any, userCredentials: loginCredentials) => {
      console.log(userCredentials);
      const { username, password } = userCredentials;
      try {
        const [match] = await User.find({ username });
        console.log(match);
        const approved = compareSync(password, match.password);
        console.log("graphql login resolver ", match);

        if (!approved) {
          throw new Error("Invalid Credentials");
        } else {
          const token = genJwt(match);
          console.log("user: ", {
            user: { _id: match._id, username, email: match.email },
            token,
          });
          return {
            user: {
              _id: match._id,
              username,
              email: match.email,
            },
            token,
          };
        }
      } catch (err) {
        console.log("err");
        console.log(err);
      }
    },
  },
};
