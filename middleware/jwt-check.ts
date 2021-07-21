import verifyJwt from "../utils/verify-jwt";

const jwtCheck = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (token && verifyJwt(token)) {
    next()
  } else {
    res.status(403).json({
      err: "Unauthenticated user",
      suggestion: "redirect to login",
    });
  };
};

export default jwtCheck;
