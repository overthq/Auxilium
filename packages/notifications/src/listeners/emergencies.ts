import { EmergencyType } from '../models';

// This means that the socket connection is continually created every time the location changes. Not cool
export const emergencyListener = (emergency: EmergencyType) => {
	// Get list of all the people in the area when the emergency is posted
	// if () {}
	console.log(emergency);
};
