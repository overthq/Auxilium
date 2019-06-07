import { Router } from 'express';
import * as emergencies from '../controllers/emergencies';

const router = Router();

router.get('/get', emergencies.getNearbyEmergencies);
router.post('/get', emergencies.createEmergency);
router.get('/history', emergencies.getUserEmergencies);
router.get('/notifications', emergencies.backgroundNotifications);

export default router;
