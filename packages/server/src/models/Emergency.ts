import { model, Schema, Document } from 'mongoose';
import { UserType } from './User';

export interface EmergencyType extends Document {
	user: UserType;
	location: {
		type: 'Point';
		coordinates: [number, number];
	};
	description?: string;
	recepients: string[];
}

const EmergencySchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
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

EmergencySchema.index({ location: '2dsphere' }, { expires: '7d' });

export const Emergency = model<EmergencyType>('Emergency', EmergencySchema);
