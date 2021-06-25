const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: {type: String, required: true}
});

// define schema above, the following creates a 'users' collection in our Meet-db where we 
// can store all of our user data
// when we add methods on our models, like User.find(), we are able to search our collection
const User = mongoose.model("User", userSchema);

module.exports = User;
