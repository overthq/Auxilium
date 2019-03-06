import { Constants } from 'expo';

const ENV = {
	dev: {
		apiUrl: 'https://auxilium-staging.herokuapp.com/'
	},
	staging: {
		apiUrl: 'https://auxilium-staging.herokuapp.com/'
	},
	prod: {
		apiUrl: 'https://auxilium-staging.herokuapp.com/'
	}
};

const getEnvVars = (env: string = '') => {
	if (env.includes('dev')) return ENV.dev;
	if (env.includes('staging')) return ENV.staging;
	if (env.includes('prod')) return ENV.prod;
	return ENV.dev;
};

export default getEnvVars(Constants.manifest.releaseChannel);
