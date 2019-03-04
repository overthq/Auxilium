import { Router } from 'express';
import { auth } from '../controllers/auth';

const router = Router();

router.use('/', auth);

export default router;
