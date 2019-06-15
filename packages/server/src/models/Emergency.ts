import { model, Schema, Document } from 'mongoose';

interface EmergencyType extends Document {
	deviceId: string;
	location: {
		type: 'Point';
		coordinates: [number, number];
	};
	address: string;
	description: string;
	recepients: string[];
}

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
		address: {
			type: String
		},
		description: {
			type: String
		},
		recepients: {
			type: [String],
			default: []
		}
	},
	{ timestamps: true }
);

EmergencySchema.index({ location: '2dsphere' });

export default model<EmergencyType>('Emergency', EmergencySchema);
