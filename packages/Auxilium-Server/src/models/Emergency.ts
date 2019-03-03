import { model, Schema } from "mongoose";

const EmergencySchema = new Schema(
  {
    deviceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    coordinates: {
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
