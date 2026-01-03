import type { ApiError } from "common";
import { CustomError } from "../customError.js";
import { ZodError } from "zod";
import type { LogEntry } from "../file/index.js";

export const formatError = (error: unknown, eName: string) => {
    const resultError: ApiError & {
        status: number;
        stack?: string;
    } = {
        status: 500,
        message: eName || "Internal Server Error",
    };
    if (error instanceof CustomError) {
        resultError.status = error.status;
        resultError.message = error.message;
        if (error.extraDetails)
            resultError.extraDetails = error.extraDetails;
        resultError.stack = error.stack;

    } else if (error instanceof ZodError) {
        resultError.status = 400;
        resultError.message = eName
        resultError.errors = error.issues.map(({ path, message }) => ({ path, message })) as ApiError["errors"]
        resultError.stack = error.stack;
    } else if (error instanceof Error) {
        resultError.message = eName;
        resultError.extraDetails = error.message
        resultError.stack = error.stack;
    }

    const logPayload: LogEntry = {
        status: resultError.status,
        message: resultError.message,
    };

    return { logPayload, resultError }
}