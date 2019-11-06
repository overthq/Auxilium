const User = `
	type User {
		_id: String!
		deviceId: String!
		pushToken: String!
	}

	input AuthInput {
		deviceId: String
		pushToken: String
	}

	extend type Mutation {
		authenticate(input: AuthInput!): User!
	}
`;

export default User;
