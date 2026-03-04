import { Model, Schema, model } from "mongoose";
import { Service } from "typedi";
import { ItemSchema } from "./item.model";
import z from "zod";

export enum QuestStateType {
    resting,
    loading,
    onMission,
}

export const MoverSchema = z.object({
    name: z.string("Name must be a valid string"),
    weightLimit: z.number("Weight limit must be a valid number"),
    questState: z.enum(
        ["resting", "loading", "onMission"],
        "Quest state is either resting, loading or onMission",
    ),
    items: z
        .array(ItemSchema, "Items must be a valid array of item objects")
        .optional(),
});
export type MoverSchemaType = z.infer<typeof MoverSchema>;

@Service()
export default class MoverModel {
    protected _client: Model<MoverSchemaType>;

    constructor() {
        this._client = model<MoverSchemaType>(
            "Mover",
            new Schema<MoverSchemaType>(
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    weightLimit: {
                        type: Number,
                        required: true,
                        min: 0,
                    },
                    questState: {
                        type: String,
                        enum: ["resting", "loading", "onMission"],
                        default: "resting",
                    },
                    items: {
                        type: [{ type: Schema.Types.ObjectId, ref: "Item" }],
                        default: [],
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
