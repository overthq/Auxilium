import { model, Schema } from 'mongoose';

const EmergencySchema = new Schema(
	{
		deviceId: {
			type: String,
			required: true
		},
		location: {
			type: { type: String },
			coordinates: []
		},
		description: {
			type: String
		}
	},
	{ timestamps: true }
);

EmergencySchema.index({ location: '2dsphere' });

export default model('Emergency', EmergencySchema);
