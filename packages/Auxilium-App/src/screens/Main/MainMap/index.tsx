import React from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import { connect } from 'react-redux';
import { CustomMarker } from './components';
import locate from '../../../redux/actions/Location';
import getEmergencies from '../../../redux/actions/Emergencies';

Mapbox.setAccessToken(
	'pk.eyJ1Ijoia29yZWRlMzYwIiwiYSI6ImNqZno1MGN2YjBhOTgyd2xlbWFhMGQ3dmwifQ.1AbAu_Ga4bu4iQCnOgBfog'
);

interface MainMapProps {
	location: {
		coords: {
			longitude: number;
			latitude: number;
		};
	};
	emergencies: any;
}

const MainMap = (props: MainMapProps) => {
	const {
		location: { coords },
		emergencies
	} = props;
	return (
		<Mapbox.MapView
			styleURL={Mapbox.StyleURL.Dark}
			animated
			style={{ flex: 1 }}
			showUserLocation
			centerCoordinate={[coords.longitude, coords.latitude]}
		>
			{emergencies &&
				emergencies.emergencies.map((emergency: any, index: number) => {
					return (
						<Mapbox.PointAnnotation key={index} coordinate={emergency.location}>
							<CustomMarker size={10} />
						</Mapbox.PointAnnotation>
					);
				})}
		</Mapbox.MapView>
	);
};

const mapStateToProps = ({
	location,
	emergencies
}: {
	location: any;
	emergencies: any;
}) => ({ location, emergencies });
const mapDispatchToProps = { locate, getEmergencies };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainMap);
