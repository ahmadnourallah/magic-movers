import { NextFunction, Request, Response } from "express";
import { ItemSchemaType } from "../models/item.model";
import Container from "typedi";
import ItemService from "../services/item.service";

const itemService = Container.get(ItemService);

async function createItem(req: Request, res: Response, next: NextFunction) {
    const { name, weight }: ItemSchemaType = req.body;

    const item = await itemService.create({
        name,
        weight,
    });

    res.status(200).json({
        status: "success",
        data: { item },
    });
}

export { createItem };
