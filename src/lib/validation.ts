import type { NextFunction, Request, Response } from "express";
import type { ValidationResultError } from "./types";
import { ClientError } from "../middleware/error.middleware";
import z from "zod";

function validateRequest<T extends z.ZodTypeAny>(
    schema: T,
    reqProperty: "body" | "query" | "params",
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await schema.parseAsync(req[reqProperty]);
            if (reqProperty === "query") req.validQuery = result;
            else req[reqProperty] = result;
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors: ValidationResultError[] = [];

                for (let issue of error.issues)
                    validationErrors.push({ [issue.path[0]]: issue.message });

                throw new ClientError(validationErrors);
            }
            next(error);
        }
    };
}

export { validateRequest };
