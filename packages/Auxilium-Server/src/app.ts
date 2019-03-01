import * as express from 'express';
import graphqlHttp from 'express-graphql';
import schema from './schema';

const app: express.Application = express();
const port: number = 4000;

app.use('/graphql', graphqlHttp({
	schema,
	graphiql: true
}));

app.listen(port, () => `Server started on port ${port}`);
