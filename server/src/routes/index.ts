import { Router } from 'express';
import auth from './auth';
import emergencies from './emergencies';
import location from './location';
import safeSpots from './safe-spots';

const router = Router();

router.use('/auth', auth);
router.use('/emergencies', emergencies);
router.use('/location', location);
router.use('/safe-spots', safeSpots);

export default router;
