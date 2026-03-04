import { NextFunction, Request, Response } from "express";
import { ClientError } from "../middleware/error.middleware";
import MissionService, {
    MissionServiceMoverNotFound,
} from "../services/mission.service";
import Container from "typedi";

const missionService = Container.get(MissionService);

async function startMission(req: Request, res: Response, next: NextFunction) {
    const { moverId } = req.body;

    try {
        const mover = await missionService.start(moverId);

        res.status(200).json({
            status: "success",
            data: { mover },
        });
    } catch (err) {
        if (err instanceof MissionServiceMoverNotFound)
            throw new ClientError({ mover: "Mover does not exist" }, 422);
        else throw err;
    }
}

export { startMission };
