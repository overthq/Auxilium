import React from 'react';
import { Modalize } from 'react-native-modalize';
import AddSafeSpotModal from '../components/modals/AddSafeSpotModal';
import ReportModal from '../components/modals/ReportModal';

type Modals = Record<
	'Add Safe Spot' | 'Report Emergency',
	React.RefObject<Modalize>
>;

interface ModalsContextValue {
	openModal(modalName: keyof Modals): void;
	closeModal(modalName: keyof Modals): void;
}

export const ModalsContext = React.createContext<ModalsContextValue>({
	openModal: () => {},
	closeModal: () => {}
});

export const ModalsProvider: React.FC = ({ children }) => {
	const addSafeSpotModalRef = React.useRef<Modalize>(null);
	const reportEmergencyModalRef = React.useRef<Modalize>(null);

	const modals: Modals = {
		'Add Safe Spot': addSafeSpotModalRef,
		'Report Emergency': reportEmergencyModalRef
	};

	const openModal = (modalName: keyof Modals) => {
		modals[modalName].current?.open();
	};

	const closeModal = (modalName: keyof Modals) => {
		modals[modalName].current?.close();
	};

	return (
		<ModalsContext.Provider value={{ openModal, closeModal }}>
			{children}
			<AddSafeSpotModal modalRef={addSafeSpotModalRef} />
			<ReportModal modalRef={reportEmergencyModalRef} />
		</ModalsContext.Provider>
	);
};
