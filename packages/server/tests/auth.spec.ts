import 'mocha';
import chai from 'chai';
import app from '../src/app';

import chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Authentication', () => {
	it('should create a new user with deviceId and pushToken', async () => {
		const payload = {
			deviceId: 'xxxxx-xxxxxx-xxxxxx-xxxxxx',
			pushToken: 'ExponentPushToken[xxxx-xxx-xxxx]'
		};
		try {
			const res = await chai
				.request(app)
				.post('/auth')
				.send(payload);
			res.should.have.status(200);
		} catch (error) {
			console.log(error);
		}
	});
});
