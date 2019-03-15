interface Emergency {
	id: string;
	deviceId: string;
	location: {
		coordinates: [number, number];
		type?: 'Point';
	};
}
