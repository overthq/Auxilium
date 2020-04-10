import 'mocha';
import chai from 'chai';
import app from '../src/app';

import chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Authentication', () => {
	it('should create a new user with pushToken', async () => {
		try {
			const res = await chai
				.request(app)
				.post('/auth')
				.send({
					pushToken: 'ExponentPushToken[xxxx-xxx-xxxx]'
				});
			res.should.have.status(200);
		} catch (error) {
			console.log(error);
		}
	});
	it('should return appropriate error if pushToken is not supplied', async () => {
		try {
			const res = await chai
				.request(app)
				.post('/auth')
				.send({
					pushToken: null
				});
			res.should.have.status(400);
		} catch (error) {
			console.log(error);
		}
	});
});
