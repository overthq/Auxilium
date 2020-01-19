import redis from 'redis';

const client = redis.createClient();

client.on('error', error => {
	throw new Error(error);
});

export default client;
