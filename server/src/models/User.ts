import { model, Schema, Document } from 'mongoose';

export interface UserType extends Document {
	pushToken: string;
}

const UserSchema = new Schema(
	{
		pushToken: {
			type: String,
			required: true,
			unique: true
		}
	},
	{ timestamps: true }
);

export const User = model<UserType>('User', UserSchema);
