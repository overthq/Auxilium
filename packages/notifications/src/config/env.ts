import * as dotenv from 'dotenv';

dotenv.config();

const { PORT, DB_URI } = process.env as { [key: string]: string };

export { PORT, DB_URI };
