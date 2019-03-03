import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
	{
		deviceId: {
			type: String,
			required: true,
			unique: true
		}
	},
	{ timestamps: true }
);

export default model('User', UserSchema);
