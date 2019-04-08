import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../src/app';

chai.use(chaiHttp);
chai.should();

describe('Emergencies', () => {
	it('should be able to get nearby emergencies', async () => {
		const coordinates = {
			longitude: 0,
			latitude: 0
		};
		try {
			const res = await chai
				.request(app)
				.post('/emergencies/get')
				.send({ coordinates });
			res.should.have.status(200);
		} catch (error) {
			console.log(error);
		}
	})
});