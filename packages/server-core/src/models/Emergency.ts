import { model, Schema, Document } from 'mongoose';

export interface EmergencyType extends Document {
	deviceId: string;
	location: {
		coordinates: [number, number];
	};
	description?: string;
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

export const Emergency = model<EmergencyType>('Emergency', EmergencySchema);
export default Emergency;
