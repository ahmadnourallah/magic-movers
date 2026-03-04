import { Router } from "express";
import { validateRequest } from "../lib/validation";
import { MoverSchema } from "../models/mover.model";
import {
    createMover,
    getMovers,
    updateMoverItems,
} from "../controllers/mover.controller";
import z from "zod";

const router = Router();

router.post("/", validateRequest(MoverSchema, "body"), createMover);
router.put(
    "/:id/items",
    validateRequest(z.object({ items: z.array(z.string()) }), "body"),
    updateMoverItems,
);
router.get("/", getMovers);

export default router;
