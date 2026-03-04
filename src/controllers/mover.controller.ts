import { NextFunction, Request, Response } from "express";
import { MoverSchemaType } from "../models/mover.model";
import Container from "typedi";
import MoverService, {
    MoverServiceItemNotFound,
    MoverServiceMoverOnMission,
    MoverServiceNotFound,
    MoverServiceWeightExceeded,
} from "../services/mover.service";
import { ClientError } from "../middleware/error.middleware";

const moverService = Container.get(MoverService);

async function createMover(req: Request, res: Response, next: NextFunction) {
    const { name, weightLimit, questState }: MoverSchemaType = req.body;

    const mover = await moverService.create({
        name,
        weightLimit,
        questState,
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

async function updateMoverItems(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { id } = req.params;
    const { items } = req.body;

    try {
        const updateMover = await moverService.updateItems({
            id: id as string,
            itemIds: items,
        });

        res.status(200).json({
            status: "success",
            data: { mover: updateMover },
        });
    } catch (err) {
        if (err instanceof MoverServiceNotFound)
            throw new ClientError({ resource: "Resource not found" }, 404);
        else if (err instanceof MoverServiceWeightExceeded)
            throw new ClientError(
                { weight: "Weight exceeds mover's limit" },
                422,
            );
        else if (err instanceof MoverServiceItemNotFound)
            throw new ClientError(
                { items: "Some of the items don't exist" },
                422,
            );
        else if (err instanceof MoverServiceMoverOnMission)
            throw new ClientError(
                { mover: "Cannot load as mover is on mission" },
                422,
            );
        else throw err;
    }
}

export { createMover, getMovers, updateMoverItems };
