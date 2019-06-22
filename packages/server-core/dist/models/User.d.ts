import { Document } from 'mongoose';
interface UserType extends Document {
	deviceId: string;
	pushToken: string;
}
declare const _default: import('mongoose').Model<UserType, {}>;
export default _default;
