import { Inject, Service } from "typedi";
import MoverModel, { MoverSchemaType } from "../models/mover.model";

@Service()
class MoverService {
    @Inject(() => MoverModel)
    private moverModel!: MoverModel;

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
     * Retrieves all users, sorted by completedMissions.
     *
     * @returns An array of MoverSchemaType objects
     */
    public async getAll() {
        const movers = await this.moverModel.client
            .find()
            .sort("completedMissions");

        return movers;
    }
}

export default MoverService;
