import { Document } from 'mongoose';
interface EmergencyType extends Document {
	deviceId: string;
	location: {
		coordinates: [number, number];
	};
	description?: string;
	recepients: string[];
}
declare const _default: import('mongoose').Model<EmergencyType, {}>;
export default _default;
