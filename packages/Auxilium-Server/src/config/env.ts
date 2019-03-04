import * as dotenv from 'dotenv';
dotenv.load();

const { PORT, DB_URI } = process.env;

const env = { PORT, DB_URI };

export default env;
