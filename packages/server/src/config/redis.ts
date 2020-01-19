import redis from 'redis';

const { REDIS_PORT, REDIS_HOST } = process.env;
const client = redis.createClient(Number(REDIS_PORT), REDIS_HOST);

client.on('error', error => {
	throw new Error(error);
});

export default client;
