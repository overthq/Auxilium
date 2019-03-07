import { model, Schema } from 'mongoose';

const EmergencySchema = new Schema(
	{
		deviceId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		location: {
			type: { type: String },
			coordinates: []
		}
	},
	{ timestamps: true }
);

EmergencySchema.index({ location: '2dsphere' });

export default model('Emergency', EmergencySchema);
