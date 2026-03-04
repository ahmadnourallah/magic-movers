import { Router } from "express";
import { validateRequest } from "../lib/validation";
import { endMission, startMission } from "../controllers/mission.controller";
import z from "zod";

const router = Router();

router.post(
    "/",
    validateRequest(
        z.object({ moverId: z.string("Mover's id must be a valid string") }),
        "body",
    ),
    startMission,
);

router.delete(
    "/",
    validateRequest(
        z.object({ moverId: z.string("Mover's id must be a valid string") }),
        "body",
    ),
    endMission,
);

export default router;
