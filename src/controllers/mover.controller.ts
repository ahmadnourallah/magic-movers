import { NextFunction, Request, Response } from "express";
import { MoverSchemaType } from "../models/mover.model";
import Container from "typedi";
import MoverService from "../services/mover.service";

const moverService = Container.get(MoverService);

async function createMover(req: Request, res: Response, next: NextFunction) {
    const { name, weightLimit, questState, items }: MoverSchemaType = req.body;

    const mover = await moverService.create({
        name,
        weightLimit,
        questState,
        items,
    });

    res.status(200).json({
        status: "success",
        data: { mover },
    });
}

async function getMovers(req: Request, res: Response, next: NextFunction) {
    const movers = await moverService.getAll();

    res.status(200).json({
        status: "success",
        data: { movers },
    });
}

export { createMover, getMovers };
