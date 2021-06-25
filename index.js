const express = require("express");
const cors = require("cors");
const app = express();

// route components
const login = require("./routes/login");
const register = require("./routes/register");

app.use(cors());
app.use(express.json());

app.use("/login", login);
app.use("/register", register);

app.get("/", (req, res) => {
  console.log(req);
  res.send("server up and running");
});

module.exports = app;
