import { Router } from 'express';
import * as safeSpotsController from '../controllers/safe-spots';

const router = Router();

router.post('/add', safeSpotsController.addSafeSpot);
router.get('/get', safeSpotsController.getSafeSpots);
router.get('/delete', safeSpotsController.deleteSafeSpot);

export default router;
