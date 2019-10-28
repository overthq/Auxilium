const Emergency = `
	type Location {
		type: String
		coordinates: [Int]
	}

	type Emergency {
		deviceId: String
		location: Location
		address: String
		description: String
		recepients: [String]
	}

	input EmergencyInput {
		deviceId: string
		description: string
		coordinates: [Int]
	}

	extend type Mutation {
		reportEmergency: (input: EmergencyInput): Emergency
	}

	extend type Query {
		nearbyEmergencies(
			longitude: Int
			latitude: Int
		): Emergency[]
	}

	extend type Subscription {}
`;

export default Emergency;
