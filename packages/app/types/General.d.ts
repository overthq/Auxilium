interface EmergencyCoordinates {
	latitude: number;
	longitude: number;
}

interface Emergency {
	_id: string;
	deviceId: string;
	location: {
		type: 'Point';
		coordinates: [number, number];
	};
	address: string;
	description?: string;
}
