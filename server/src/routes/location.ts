import { Router } from 'express';
import { getRoute } from '../controllers/location';

const router = Router();

router.get('/get-route', getRoute);

export default router;
