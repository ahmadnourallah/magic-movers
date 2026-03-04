import { Model, Schema, model } from "mongoose";
import { Service } from "typedi";
import z from "zod";

export const ItemSchema = z.object({
    name: z.string("Name must be a valid string"),
    weight: z.number("Weight must be a valid number"),
});
export type ItemSchemaType = z.infer<typeof ItemSchema>;

@Service()
export default class ItemModel {
    protected _client: Model<ItemSchemaType>;

    constructor() {
        this._client = model<ItemSchemaType>(
            "Item",
            new Schema<ItemSchemaType>(
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    weight: {
                        type: Number,
                        required: true,
                        min: 0,
                    },
                },
                {
                    timestamps: true,
                },
            ),
        );
    }

    public get client() {
        return this._client;
    }
}
