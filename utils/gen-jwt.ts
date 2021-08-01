import { sign, Secret } from "jsonwebtoken";

const genJwt = (user: any) => {
  const { _id, username, email } = user;

  const options = {
    expiresIn: "1d",
  };

  return sign(
    { _id, username, email },
    <Secret>process.env.JWT_SECRET_KEY,
    options
  );
};

export default genJwt;
