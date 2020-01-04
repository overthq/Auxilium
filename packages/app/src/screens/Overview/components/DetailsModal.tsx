import React from 'react';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';
import EmergencyMap from './EmergencyMap';
import EmergencyDetails from './EmergencyDetails';
import { RootState } from '../../../../store';

interface DetailsModalProps {
	modalRef: React.RefObject<Modalize>;
	emergency?: Emergency;
}

const stateMapper = ({ location }: RootState) => ({
	coordinates: location.coordinates
});

const DetailsModal: React.FC<DetailsModalProps> = ({ modalRef, emergency }) => {
	const { coordinates } = useSelector(stateMapper);
	if (!emergency) return null;

	const {
		description,
		location: {
			coordinates: [longitude, latitude]
		},
		createdAt
	} = emergency;

	return (
		<Modalize ref={modalRef} adjustToContentHeight>
			<EmergencyMap {...{ coordinates, longitude, latitude }} />
			<EmergencyDetails {...{ description, longitude, latitude, createdAt }} />
		</Modalize>
	);
};

export default DetailsModal;
