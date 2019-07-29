import { Router } from 'express';
import { getRoute, getAddress } from '../controllers/location';

const router = Router();

router.get('/get-route', getRoute);
router.get('/get-address', getAddress);

export default router;
