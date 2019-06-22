import ws from './config/socket';
// import { emergencyListener } from './listeners/emergencies';

ws.once('listening', () => {
	console.log('Notifications server started.');
});

ws.on('connection', () => {
	ws.emit('I think you are connected to me. Weird right?');
});

ws.on('emergency', () => {
	// Do something with the emergency information.
});
