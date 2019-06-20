import {
	NavigationActions,
	NavigationContainerComponent,
	NavigationParams
} from 'react-navigation';

let navigator: NavigationContainerComponent;

const setTopLevelNavigator = (navigatorRef: NavigationContainerComponent) => {
	navigator = navigatorRef;
};

const navigate = (routeName: string, params: NavigationParams) => {
	navigator.dispatch(NavigationActions.navigate({ routeName, params }));
};

export default { navigate, setTopLevelNavigator };
