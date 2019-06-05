import * as WebSocket from 'ws';
import { PORT } from './config/env';
import './config/database';

const ws = new WebSocket.Server({ port: Number(PORT) });

ws.once('listening', () => {
	console.log('Notifications server started.');
});

ws.on('connection', () => {
	ws.emit('I think you are connected to me. Weird right?');
});

ws.on('message', data => {
	console.log(data);
});
