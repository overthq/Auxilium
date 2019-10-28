import { makeExecutableSchema } from 'graphql-tools';

import User from './users/types';
import userMutation from './users/mutation';
import userQuery from './users/query';

import Emergency from './emergencies/types';
import emergencyMutation from './emergencies/mutation';
import emergencyQuery from './emergencies/query';

const RootType = `
	type Query {
		default: String
	}
	type Mutation {
		default: String
	}
`;

const typeDefs = [RootType, User, Emergency];

const resolvers = {
	Mutation: { ...userMutation, ...emergencyMutation },
	Query: { ...userQuery, ...emergencyQuery }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
