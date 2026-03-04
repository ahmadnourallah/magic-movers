import "reflect-metadata";
import {
    serverErrorHandler,
    clientErrorHandler,
    ClientError,
} from "./middleware/error.middleware";
import express, { NextFunction, Request, Response } from "express";
import { DB_URL } from "./config/env.config";
import jsonParser from "./middleware/jsonParser.middleware";
import mongoose from "mongoose";

const app = express();

mongoose.connect(DB_URL);

app.use(express.urlencoded({ extended: true }));
app.use(jsonParser);

app.use((req: Request, res: Response, next: NextFunction) => {
    throw new ClientError({ resource: "Resource not found" }, 404);
});

app.use(clientErrorHandler);
app.use(serverErrorHandler);

export default app;
