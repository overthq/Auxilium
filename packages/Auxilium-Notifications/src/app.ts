import * as WebSocket from 'ws';
import * as dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

const ws = new WebSocket.Server({ port: Number(PORT) });

ws.on('listening', () => {
	console.log('Notifications server started.');
});

ws.on('connection', () => {
	ws.emit('I think you are connected to me. Weird right?');
});

ws.on('message', data => {
	console.log(data);
});
