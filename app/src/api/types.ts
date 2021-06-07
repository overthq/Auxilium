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

interface User {
	_id: string;
	pushToken: string;
	createdAt: Date;
	updatedAt: Date;
}

interface SafeSpot {
	_id: string;
	name: string;
	location: {
		type: 'Point';
		coordinates: [number, number];
	};
}

interface Route {
	longitude: number;
	latitude: number;
}
