import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, require },
});

const User = model("User", userSchema);

export default User;
