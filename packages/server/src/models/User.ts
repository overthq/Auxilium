import { model, Schema, Document } from 'mongoose';

interface UserType extends Document {
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

export default model<UserType>('User', UserSchema);
