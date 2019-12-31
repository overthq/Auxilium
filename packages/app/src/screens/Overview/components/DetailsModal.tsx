import React from 'react';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';
import EmergencyMap from './EmergencyMap';
import EmergencyDetails from './EmergencyDetails';

interface EmergencyDetailsState {
	location: {
		coordinates: EmergencyCoordinates;
	};
}

interface DetailsModalProps {
	modalRef: React.RefObject<Modalize>;
	emergency?: Emergency;
}

const stateMapper = ({ location }: EmergencyDetailsState) => ({
	coordinates: location.coordinates
});

const DetailsModal = ({ modalRef, emergency }: DetailsModalProps) => {
	const { coordinates } = useSelector(stateMapper);
	if (!emergency) return null;

	const {
		description,
		address,
		location: {
			coordinates: [longitude, latitude]
		},
		createdAt
	} = emergency;

	return (
		<Modalize ref={modalRef} adjustToContentHeight>
			<EmergencyMap {...{ coordinates, longitude, latitude }} />
			<EmergencyDetails
				{...{ description, address, longitude, latitude, createdAt }}
			/>
		</Modalize>
	);
};

export default DetailsModal;
