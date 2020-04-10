import Constants from 'expo-constants';

const ENV = {
	dev: {
		apiUrl: `http://${Constants.manifest.debuggerHost
			?.split(':')
			?.shift()
			?.concat(':4000/')}`
	},
	staging: {
		apiUrl: 'https://auxilium-staging.herokuapp.com/'
	},
	prod: {
		apiUrl: 'https://auxilium-staging.herokuapp.com/'
	}
};

const getEnvVars = (env: keyof typeof ENV) =>
	env ? ENV[env] || ENV.staging : ENV.dev;

export default getEnvVars(Constants.manifest.releaseChannel);
