import { Inject, Service } from "typedi";
import ItemModel, { ItemSchemaType } from "../models/item.model";

export class ItemServiceNotFound extends Error {}

@Service()
class ItemService {
    @Inject(() => ItemModel)
    private itemModel!: ItemModel;

    /**
     * Creates a new item.
     *
     * @param - Item's data
     * @returns ItemSchemaType object
     */
    public async create(data: ItemSchemaType) {
        const item = await this.itemModel.client.create({
            ...data,
        });

        return item;
    }
}

export default ItemService;
