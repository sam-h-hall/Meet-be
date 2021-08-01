const corsHeader = (req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*", "localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "*", "studo.apollographql.com");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTION, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

export default corsHeader;
