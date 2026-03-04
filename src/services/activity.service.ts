import { Inject, Service } from "typedi";
import ActivityModel from "../models/activity.model";

@Service()
class ActivityService {
    @Inject(() => ActivityModel)
    private activityModel!: ActivityModel;

    /**
     * Retrieves all activities.
     *
     * @returns An array of ActivitySchemaType objects
     */
    public async getAll() {
        const activities = await this.activityModel.client
            .find()
            .populate("mover");

        return activities;
    }
}

export default ActivityService;
