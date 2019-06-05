import * as mongoose from 'mongoose';

import { DB_URI } from './env';

mongoose.connect(DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to database!');
});

db.on('error', error => {
	throw new Error(error);
});
