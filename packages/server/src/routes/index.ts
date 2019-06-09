import { Router } from 'express';
import auth from './auth';
import emergencies from './emergencies';
import location from './location';

const router = Router();

router.use('/auth', auth);
router.use('/emergencies', emergencies);
router.use('/location', location);

export default router;
