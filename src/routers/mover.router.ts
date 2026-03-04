import { Router } from "express";
import { validateRequest } from "../lib/validation";
import { MoverSchema } from "../models/mover.model";
import { createMover, getMovers } from "../controllers/mover.controller";

const router = Router();

router.post("/", validateRequest(MoverSchema, "body"), createMover);
router.get("/", getMovers);

export default router;
