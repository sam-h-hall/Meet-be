import { model, Schema } from "mongoose";

const publicMessageSchema = new Schema({
  from_id: {
    // sender id
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  //visibleTo: {
  // group _id
  //type: Number,
  //required: true,
  //},
});

const PublicMessage = model("Public-message", publicMessageSchema);

export default PublicMessage;
