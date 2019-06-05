import dotenv from 'dotenv';

dotenv.config();

type EnvTypes = {
	PORT: number | any;
	DB_URI: string;
	SENTRY_DSN: string;
};

const { PORT, DB_URI, SENTRY_DSN } = process.env as { [key: string]: string };

const env: EnvTypes = { PORT, DB_URI, SENTRY_DSN };

export default env;
