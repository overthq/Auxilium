import { NavigationActions } from 'react-navigation';

let navigator: any;

const setTopLevelNavigator = (navigatorRef: any) => {
	navigator = navigatorRef;
};

const navigate = (routeName: any, params: any) => {
	navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params
		})
	);
};

export default {
	navigate,
	setTopLevelNavigator
};
