import { Router } from 'express';
import * as emergencies from '../controllers/emergencies';

const router = Router();

router.post('/create', emergencies.createEmergency);
router.post('/get', emergencies.getNearbyEmergencies);
router.get('/getUser', emergencies.getUserEmergencies);

export default router;
