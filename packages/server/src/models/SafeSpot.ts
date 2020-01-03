import { Schema, model, Document } from 'mongoose';
import { UserType } from './User';

export interface SafeSpotType extends Document {
	user: UserType;
	location: {
		type: 'Point';
		coordinates: [number, number];
	};
}

const SafeSpotSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	location: {
		type: { type: String },
		coordinates: []
	}
});

SafeSpotSchema.index({ location: '2dsphere' });

export const SafeSpot = model<SafeSpotType>('SafeSpot', SafeSpotSchema);
