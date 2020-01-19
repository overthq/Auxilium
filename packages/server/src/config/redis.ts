import redis from 'redis';

const client = redis.createClient({ url: process.env.REDIS_URL });

client.on('error', error => {
	throw new Error(error);
});

export default client;
