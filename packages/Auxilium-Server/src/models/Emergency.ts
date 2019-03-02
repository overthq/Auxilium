import { model, Schema } from "mongoose";

const EmergencySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    location: {
      longitude: {
        type: Number,
        reuqired: true
      },
      latitude: {
        type: Number,
        required: true
      }
    }
  },
  { timestamps: true }
);

export default model("Emergency", EmergencySchema);
