import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../src/app';

chai.use(chaiHttp);
chai.should();

describe('Emergencies', () => {
	const coordinates = { longitude: 0, latitude: 0 };
	it('should be able to create a new emergency', async () => {
		const deviceId = '';
		try {
			const res = await chai
				.request(app)
				.post('/emergencies/create')
				.send({ deviceId, coordinates });
			res.should.have.status(201);
		} catch (error) {
			console.log(error);
		}
	});
	it('should be able to get nearby emergencies', async () => {
		try {
			const res = await chai
				.request(app)
				.post('/emergencies/get')
				.send({ coordinates });
			res.should.have.status(200);
		} catch (error) {
			console.log(error);
		}
	});
});
