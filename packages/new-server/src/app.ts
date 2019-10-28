import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import schema from './schema';
import './config/database';

const { PORT } = process.env;
const app = express();
const ws = createServer(app);

app.use(express.json());
app.use(cors());
app.use(
	'/',
	graphqlHTTP({
		schema,
		graphiql: true,
		customFormatErrorFn: ({ message, stack }) => {
			console.log('message', message);
			console.log('stack', stack);
		}
	})
);

ws.listen(Number(PORT), () => {
	console.log(`Server started on port ${PORT}`);
	new SubscriptionServer(
		{ execute, subscribe, schema },
		{ server: ws, path: '/subscriptions' }
	);
});
