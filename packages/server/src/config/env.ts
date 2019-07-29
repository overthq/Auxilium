import dotenv from 'dotenv';

dotenv.config();

interface EnvTypes {
	PORT: number | any;
	DB_URI: string;
	SENTRY_DSN: string;
	MAPBOX_ACCESS_TOKEN: string;
}

const { PORT, DB_URI, SENTRY_DSN, MAPBOX_ACCESS_TOKEN } = process.env as {
	[key: string]: string;
};

const env: EnvTypes = { PORT, DB_URI, SENTRY_DSN, MAPBOX_ACCESS_TOKEN };

export default env;
