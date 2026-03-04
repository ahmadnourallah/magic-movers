import { Inject, Service } from "typedi";
import MoverModel, { MoverSchemaType } from "../models/mover.model";
import ItemModel from "../models/item.model";
import mongoose from "mongoose";
import ActivityModel from "../models/activity.model";

export class MoverServiceWeightExceeded extends Error {}
export class MoverServiceNotFound extends Error {}
export class MoverServiceItemNotFound extends Error {}
export class MoverServiceMoverOnMission extends Error {}

@Service()
class MoverService {
    @Inject(() => MoverModel)
    private moverModel!: MoverModel;
    @Inject(() => ItemModel)
    private itemModel!: ItemModel;
    @Inject(() => ActivityModel)
    private activityModel!: ActivityModel;

    /**
     * Creates a new mover.
     *
     * @param - Mover's data
     * @returns MoverSchemaType object
     */
    public async create(data: Omit<MoverSchemaType, "completedMissions">) {
        const mover = await this.moverModel.client.create({
            ...data,
        });

        return mover;
    }

    /**
     * Retrieves all movers, sorted by completedMissions.
     *
     * @returns An array of MoverSchemaType objects
     */
    public async getAll() {
        const movers = await this.moverModel.client
            .find()
            .populate("items")
            .sort("completedMissions");

        return movers;
    }

    /**
     * Updates the items of a mover.
     *
     * @returns The updated mover.
     */
    public async updateItems({
        id,
        itemIds,
    }: {
        id: string;
        itemIds: string[];
    }) {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new MoverServiceNotFound();

        const mover = await this.moverModel.client.findOne({ _id: id });

        if (!mover) throw new MoverServiceNotFound();
        if (mover.questState === "onMission")
            throw new MoverServiceMoverOnMission();

        const oldItems = Array.isArray(mover.items) ? mover.items.slice() : [];
        const newItems = [];

        for (const itemId of itemIds) {
            if (!mongoose.Types.ObjectId.isValid(itemId))
                throw new MoverServiceItemNotFound();

            const item = await this.itemModel.client.findOne({
                _id: itemId,
            });

            if (!item) throw new MoverServiceItemNotFound();

            if (item.weight > mover.weightLimit)
                throw new MoverServiceWeightExceeded();

            if (!oldItems.includes(itemId))
                newItems.push(new mongoose.Types.ObjectId(itemId));
        }

        const updateItems = [...oldItems, ...newItems];

        mover.questState = "loading";
        mover.items = updateItems;

        await this.activityModel.client.create({
            mover: new mongoose.Types.ObjectId(mover.id),
            state: "loading",
        });

        return await mover.save();
    }
}

export default MoverService;
