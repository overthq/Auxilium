import { Router } from 'express';
import { createEmergency } from '../controllers/emergencies';

const router = Router();

router.post('/create', createEmergency);

export default router;
