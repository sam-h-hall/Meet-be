const router = require("express").Router();
//const pwdEncrypt = require("../middleware/pwd-encrypt");
//const pwdVerify = require("../middleware/pwd-verify");

router.get("/", (req, res) => {
  res.send("login page");
});

router.post("/", async (req, res) => {

  const hash = await pwdEncrypt(req.body.password);
  console.log("login: ", hash);

  res.status(200).json({hash: hash});
  //res.status(200).json(req.body);
});


module.exports = router;
