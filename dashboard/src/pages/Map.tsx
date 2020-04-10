import React from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGL from 'react-mapbox-gl';

const MapContainer = ReactMapboxGL({
	accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string
});

const initialMapState = { lng: 1, lat: 24, zoom: 8 };

const Map = () => {
	const [state, setState] = React.useReducer<
		React.Reducer<typeof initialMapState, typeof initialMapState>
	>((prev, next) => ({ ...prev, ...next }), initialMapState);
	const { lng: longitude, lat: latitude } = state;

	const onMapLoad = (map: mapboxgl.Map) => {
		map.on('move', () => {
			const { lng, lat } = map.getCenter();
			setState({
				lng: Number(lng.toFixed(4)),
				lat: Number(lat.toFixed(4)),
				zoom: Number(map.getZoom().toFixed(2))
			});
		});

		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			})
		);
	};

	return (
		<div>
			<MapContainer
				containerStyle={{ width: '100vw', height: '100vh' }}
				onStyleLoad={onMapLoad}
				style='mapbox://styles/mapbox/dark-v9'
				center={[longitude, latitude]}
				zoom={[1.5]}
			/>
		</div>
	);
};

export default Map;
