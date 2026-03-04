import { NextFunction, Request, Response } from "express";
import ActivityService from "../services/activity.service";
import Container from "typedi";

const activityService = Container.get(ActivityService);

async function getActivities(req: Request, res: Response, next: NextFunction) {
    const activities = await activityService.getAll();

    res.status(200).json({
        status: "success",
        data: { activities },
    });
}

export { getActivities };
