interface EmergencyCoordinates {
	latitude: number;
	longitude: number;
}

interface Emergency {
	_id: string;
	location: {
		type: 'Point';
		coordinates: [number, number];
	};
	address: string;
	description?: string;
	createdAt: Date | string;
}
