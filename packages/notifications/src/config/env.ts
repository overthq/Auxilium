import * as dotenv from 'dotenv';

dotenv.config();

const { PORT, DB_URI } = process.env;

export { PORT, DB_URI };
