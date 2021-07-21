import { model, Schema } from "mongoose";

const publicMessageSchema = new Schema({
  from: {
    // user _id
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  visibleTo: {
    // group _id
    type: Number,
    required: true,
  },
});

const PublicMessage = model("Public-message", publicMessageSchema);

export default PublicMessage;
