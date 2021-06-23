const express = require("express");
const cors = require("cors");
const app = express();
const login = require("./routes/login");

app.use(cors());
app.use(express.json());

app.use("/login", login);

app.get("/", (req, res) => {
  console.log(req);
  res.send("server up and running");
});

module.exports = app;
