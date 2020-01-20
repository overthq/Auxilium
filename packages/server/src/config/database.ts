import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', error => {
	throw new Error(error);
});

db.once('open', () => {
	console.log('Connected to MongoDB!');
});

export default db;
