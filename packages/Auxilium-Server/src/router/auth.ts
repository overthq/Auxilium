import { Router } from "express";
import { logIn, register } from "../controllers/auth";

const router = Router();

router.use("/login", logIn);
router.use("/login", register);

export default router;
