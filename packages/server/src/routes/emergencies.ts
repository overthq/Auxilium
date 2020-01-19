import { Router } from 'express';
import * as emergencies from '../controllers/emergencies';

const router = Router();

router.get('/get', emergencies.getNearbyEmergencies);
router.post('/report', emergencies.reportEmergency);
router.get('/history', emergencies.getUserEmergencies);
router.post('/cache-location', emergencies.cacheLocation);

export default router;
