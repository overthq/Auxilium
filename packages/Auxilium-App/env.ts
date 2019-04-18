import { Constants } from 'expo';

const ENV = {
	dev: {
		apiUrl:
			typeof Constants.manifest.packagerOpts === 'object'
				? `http://${Constants.manifest.debuggerHost
						.split(`:`)
						.shift()
						.concat(`:4000/`)}`
				: ''
	},
	staging: {
		apiUrl: 'https://auxilium-staging.herokuapp.com/'
	},
	prod: {
		apiUrl: 'https://auxilium-staging.herokuapp.com/'
	}
};

const getEnvVars = (env: string = 'default') => {
	if (env.includes('dev')) return ENV.dev;
	if (env.includes('staging')) return ENV.staging;
	if (env.includes('prod')) return ENV.prod;
	if (env.includes('default')) return ENV.staging;
	return ENV.dev;
};

export default getEnvVars(Constants.manifest.releaseChannel);
