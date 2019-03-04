import * as mongoose from 'mongoose';
import env from './env';

mongoose.connect(env.DB_URI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', error => {
	throw new Error(error);
});

db.once('open', () => {
	console.log('Connected to MongoDB!');
});

export default db;
