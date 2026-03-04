import { Router } from "express";
import { validateRequest } from "../lib/validation";
import { createItem, getItems } from "../controllers/item.controller";
import { ItemSchema } from "../models/item.model";

const router = Router();

router.post("/", validateRequest(ItemSchema, "body"), createItem);
router.get("/", getItems);

export default router;
