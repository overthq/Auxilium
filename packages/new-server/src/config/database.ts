import mongoose from 'mongoose';

const { DB_URI } = process.env;

mongoose.connect(DB_URI, {
	useCreateIndex: true,
	useNewUrlParser: true
});

const db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to MongoDB!');
});

db.on('error', (error: Error) => {
	throw error;
});
