interface Coordinates {
	latitude: number;
	longitude: number;
}

interface Emergency {
	_id: string;
	deviceId: string;
	location: {
		coordinates: [number, number];
		type?: 'Point';
	};
	description?: string;
}
