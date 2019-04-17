import fetch from 'node-fetch';

const sendNotification = async (pushToken: string) => {
	const response = await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			host: 'exp.host',
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			to: pushToken,
			sound: 'default',
			body: 'There may be an emergency at/around your current location.'
		})
	});
	const data = response.json();
	return data;
};

export default sendNotification;
