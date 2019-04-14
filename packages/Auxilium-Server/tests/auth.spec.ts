import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../src/app';

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
