import React from 'react';
import { Modalize } from 'react-native-modalize';
import DetailsModal from '../components/modals/DetailsModal';

interface EmergencyContextValue {
	openEmergency(emergency: Emergency): void;
}

export const EmergencyContext = React.createContext<EmergencyContextValue>({
	openEmergency: () => {}
});

export const EmergencyProvider: React.FC = ({ children }) => {
	const [emergency, setEmergency] = React.useState<Emergency | undefined>(
		undefined
	);
	const modalRef = React.useRef<Modalize>(null);

	const openEmergency = (emergency: Emergency) => {
		setEmergency(emergency);
	};

	React.useEffect(() => {
		modalRef.current?.open();
	}, [emergency]);

	return (
		<EmergencyContext.Provider value={{ openEmergency }}>
			{children}
			<DetailsModal {...{ modalRef, emergency }} />
		</EmergencyContext.Provider>
	);
};
