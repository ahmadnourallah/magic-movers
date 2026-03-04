import { Router } from "express";
import { validateRequest } from "../lib/validation";
import { createItem } from "../controllers/item.controller";
import { ItemSchema } from "../models/item.model";

const router = Router();

router.post("/", validateRequest(ItemSchema, "body"), createItem);

export default router;
