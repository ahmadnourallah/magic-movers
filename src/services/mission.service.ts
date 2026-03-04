import { Inject, Service } from "typedi";
import MoverModel from "../models/mover.model";
import ActivityModel from "../models/activity.model";
import mongoose from "mongoose";

export class MissionServiceMoverNotFound extends Error {}
export class MissionServiceMoverNotOnMission extends Error {}

@Service()
class MissionService {
    @Inject(() => MoverModel)
    private moverModel!: MoverModel;
    @Inject(() => ActivityModel)
    private activityModel!: ActivityModel;

    /**
     * Starts a new mission.
     *
     * @param - Mover's id
     * @returns MoverSchemaType object
     */
    public async start(moverId: string) {
        if (!mongoose.Types.ObjectId.isValid(moverId))
            throw new MissionServiceMoverNotFound();

        const mover = await this.moverModel.client.findOne({ _id: moverId });

        if (!mover) throw new MissionServiceMoverNotFound();

        mover.questState = "onMission";

        await this.activityModel.client.create({
            mover: new mongoose.Types.ObjectId(moverId),
            state: "onMission",
        });

        return await mover.save();
    }

    /**
     * Ends a mover's mission.
     *
     * @param - Mover's id
     * @returns MoverSchemaType object
     */
    public async end(moverId: string) {
        if (!mongoose.Types.ObjectId.isValid(moverId))
            throw new MissionServiceMoverNotFound();

        const mover = await this.moverModel.client.findOne({ _id: moverId });

        if (!mover) throw new MissionServiceMoverNotFound();

        if (mover.questState !== "onMission")
            throw new MissionServiceMoverNotOnMission();

        mover.questState = "resting";
        mover.completedMissions = mover.completedMissions + 1;

        await this.activityModel.client.create({
            mover: new mongoose.Types.ObjectId(moverId),
            state: "resting",
        });

        return await mover.save();
    }
}

export default MissionService;
