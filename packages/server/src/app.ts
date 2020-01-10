import express from 'express';
import * as Sentry from '@sentry/node';

import router from './routes';
import env from './config/env';
import './config/database';

const app: express.Application = express();
Sentry.init({ dsn: env.SENTRY_DSN });

app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(Sentry.Handlers.errorHandler());

app.listen(env.PORT, () => {
	console.log(`Server started on port ${env.PORT}`);
});

export default app;
