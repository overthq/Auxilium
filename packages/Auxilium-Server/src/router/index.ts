import { Router } from "express";
import auth from "./auth";
import emergencies from "./emergencies";

const router = Router();

router.use("/auth", auth);
router.use("/emergencies", emergencies);

export default router;
