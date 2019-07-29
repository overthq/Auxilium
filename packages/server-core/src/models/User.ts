import { model, Schema, Document } from 'mongoose';

export interface UserType extends Document {
	deviceId: string;
	pushToken: string;
}

const UserSchema = new Schema(
	{
		deviceId: {
			type: String,
			required: true,
			unique: true
		},
		pushToken: {
			type: String,
			required: true,
			unique: true
		}
	},
	{ timestamps: true }
);

export const User = model<UserType>('User', UserSchema);
export default User;
