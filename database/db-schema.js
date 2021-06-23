const { Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = userSchema;
