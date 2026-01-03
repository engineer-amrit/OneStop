import type { Request } from "express";
import { blockHandler } from "../classes/controllers/blockHandler.js";
import { CustomError } from "../classes/customError.js";
import type { Ienv } from "@schema/common";

type Config = Pick<Ienv, "API_KEY">

export const apiMiddleware = (config: Config, header: string) => {
    return blockHandler.createMiddleware(async (
        req: Request,
    ) => {

        const apiKey = req.headers[header];
        // check if the api key is present
        if (!apiKey || apiKey !== config.API_KEY) {
            throw new CustomError({
                status: 403,
                message: "Forbidden",
                extraDetails: "Forbidden request, please use " + header + " header with a valid API key",
            })
        }
    }, "API Key Validation Middleware");
}

