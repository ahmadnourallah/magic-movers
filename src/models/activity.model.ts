import mongoose, { Model, Schema, model } from "mongoose";
import { Service } from "typedi";

export type ActivitySchemaType = {
    mover: mongoose.Types.ObjectId;
    state: "resting" | "loading" | "onMission";
};

@Service()
export default class ActivityModel {
    protected _client: Model<ActivitySchemaType>;

    constructor() {
        this._client = model<ActivitySchemaType>(
            "Activity",
            new Schema<ActivitySchemaType>(
                {
                    mover: {
                        type: Schema.Types.ObjectId,
                        ref: "Mover",
                        required: true,
                    },
                    state: {
                        type: String,
                        enum: ["resting", "loading", "onMission"],
                        required: true,
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
