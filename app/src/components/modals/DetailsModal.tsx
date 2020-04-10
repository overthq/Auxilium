import React from 'react';
import { Modalize } from 'react-native-modalize';
import EmergencyMap from '../EmergencyMap';
import EmergencyDetails from '../EmergencyDetails';

interface DetailsModalProps {
	modalRef: React.RefObject<Modalize>;
	emergency?: Emergency;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ modalRef, emergency }) => {
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
			<EmergencyMap {...{ longitude, latitude }} />
			<EmergencyDetails {...{ description, longitude, latitude, createdAt }} />
		</Modalize>
	);
};

export default DetailsModal;
