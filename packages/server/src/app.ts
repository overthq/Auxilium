import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import * as Sentry from '@sentry/node';

import router from './router';
import env from './config/env';
import './config/database';
import { Emergency } from './models';

const app: express.Application = express();
const server = http.createServer(app);
const io = socketIO.listen(server);
Sentry.init({ dsn: env.SENTRY_DSN });

server.listen(env.PORT);

io.on('connection', socket => {
	socket.on('emergency', async emergency => {
		await new Emergency(emergency).save();
		socket.emit('emergency', emergency);
	});
});

app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

// app.listen(env.PORT, () => console.log(`Server started on port ${env.PORT}`));

export default app;
