import express from 'express';
import * as Sentry from '@sentry/node';
import router from './routes';
import './config/database';

const app: express.Application = express();
Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(Sentry.Handlers.errorHandler());

const { PORT } = process.env;

app.listen(Number(PORT), () => {
	console.log(`Server started on port ${PORT}`);
});

export default app;
