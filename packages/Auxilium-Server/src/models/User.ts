import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    deviceId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default model("User", UserSchema);
