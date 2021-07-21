import { verify, Secret } from "jsonwebtoken"

const secret: Secret = <Secret>process.env.JWT_SECRET_KEY;

const verifyJwt = (token: string) => {
  let decodedToken;
  verify(token, secret, (err, decoded) => {
    if (err) {
      return { status: 403, error: "Invalid token" };
    }
    decodedToken = decoded;
    console.log("verify jwt decoded token: ", decodedToken)
  });
  //console.log("decoded token", decodedToken);
  return decodedToken;
};

export default verifyJwt;
