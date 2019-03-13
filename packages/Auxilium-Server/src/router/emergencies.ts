import { Router } from 'express';
import * as emergencies from '../controllers/emergencies';

const router = Router();

router.post('/get', emergencies.getNearbyEmergencies);
router.get('/history', emergencies.getUserEmergencies);

export default router;
