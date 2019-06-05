import * as WebSocket from 'ws';
import { PORT } from './env';
import './database';

const ws = new WebSocket.Server({ port: Number(PORT) });

export default ws;
