import { Router } from 'express';
import {
	createEmergency,
	getNearbyEmergencies
} from '../controllers/emergencies';

const router = Router();

router.post('/create', createEmergency);
router.post('/get', getNearbyEmergencies);

export default router;
