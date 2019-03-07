import * as http from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';
import * as Sentry from '@sentry/node';
import router from './router';
import env from './config/env';
import './config/database';

const app: express.Application = express();

const server = http.createServer(app);
const io = socketIO.listen(server);

Sentry.init({ dsn: env.SENTRY_DSN });

app.use(Sentry.Handlers.requestHandler());
app.set('io', io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);

app.listen(env.PORT, () => console.log(`Server started on port ${env.PORT}`));

export default app;
