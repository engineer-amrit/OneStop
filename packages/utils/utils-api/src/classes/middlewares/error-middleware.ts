import type { NextFunction, Request, Response } from "express";
import type { Ienv } from "@schema/common";
import { MulterError } from "multer";
import type { CustomLogger, LogEntry } from "../file/index.js";
import { formatError } from "./error-formattor.js";

type Confg = Pick<Ienv, "NODE_ENV">
export class ErrorHandler {
  private config: Confg;
  private logger: CustomLogger;

  constructor(conf: Confg, logger: CustomLogger) {
    this.config = conf;
    this.logger = logger
  }

  // Format the error for consistent response & loggin
  private writeLog(req: Request, logPayload: LogEntry, status: number) {
    // Logging
    if (status >= 500) {
      this.logger.error(req, logPayload);
    } else {
      this.logger.warn(req, logPayload);
    }
  }

  // The middleware function to be used in Express
  public middleware = (error: ReturnType<typeof formatError> | MulterError, req: Request, res: Response, ___: NextFunction) => {
    let resultError: ReturnType<typeof formatError>["resultError"];
    let logPayload: LogEntry;

    if (error instanceof MulterError) {
      resultError = {
        status: 400,
        message: "Multer Error" + error.field,
        extraDetails: error.message,
      }
      logPayload = {
        status: resultError.status,
        message: resultError.message,
      }
    } else {
      resultError = error.resultError;
      logPayload = error.logPayload;
    }

    const { status, stack, ...rest } = resultError;

    this.writeLog(req, logPayload, status);
    // // Development stack trace
    if (this.config.NODE_ENV === "development" && stack) {
      console.error(stack);
    }
    if (this.config.NODE_ENV === "development") console.log(JSON.stringify(rest, null, 2));

    // // Send response
    res.status(status).json({
      ...rest
    });
  };
}

