import { Inject, Service } from "typedi";
import MoverModel from "../models/mover.model";
import ActivityModel from "../models/activity.model";
import mongoose from "mongoose";

export class MissionServiceMoverNotFound extends Error {}

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
}

export default MissionService;
