import { Router } from 'express';
import * as emergencies from '../controllers/emergencies';

const router = Router();

router.get('/get', emergencies.getNearbyEmergencies);
router.get('/history', emergencies.getUserEmergencies);
router.get('/notifications', emergencies.backgroundNotifications);

export default router;
