import { Router } from "express";
import { validateRequest } from "../lib/validation";
import { MoverSchema } from "../models/mover.model";
import { createMover } from "../controllers/mover.controller";

const router = Router();

router.post("/", validateRequest(MoverSchema, "body"), createMover);

export default router;
