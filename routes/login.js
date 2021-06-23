const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("login page");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

module.exports = router;
