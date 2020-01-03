import { Router } from 'express';
import * as emergencies from '../controllers/emergencies';

const router = Router();

router.get('/get', emergencies.getNearbyEmergencies);
router.post('/report', emergencies.reportEmergency);
router.get('/history', emergencies.getUserEmergencies);
router.get('/notifications', emergencies.backgroundNotifications);

export default router;
