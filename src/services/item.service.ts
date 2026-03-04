import { Inject, Service } from "typedi";
import ItemModel, { ItemSchemaType } from "../models/item.model";

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

    /**
     * Retrieves all items.
     *
     * @returns An array of ItemSchemaType objects
     */
    public async getAll() {
        const items = await this.itemModel.client.find();

        return items;
    }
}

export default ItemService;
