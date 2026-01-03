import winston from "winston";
import path from "path";
import { ensureDirectoryExists } from "../../utils-fns/file/ensure-dir.js";
import type { Request } from "express";
import DailyRotateFile from "winston-daily-rotate-file";
import type { Ienv } from "@schema/common";




interface RequestWithUser extends Request {
  decoded?: {
    sub: string;
  };
}


export interface LogEntry {
  status?: number;
  action?: string;
  responseTime?: number;
  message?: string;
}

export class CustomLogger {
  private logger: winston.Logger;
  private config: Pick<Ienv, "NODE_ENV">;

  constructor(type: "access" | "general", config: Pick<Ienv, "NODE_ENV">, logPath: string) {

    ensureDirectoryExists(logPath);
    this.config = config;
    const isAccess = type === "access";
    const transports: winston.transport[] = [];

    const commonFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    );

    // Console logger for development
    if (this.config.NODE_ENV === "development") {
      transports.push(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.printf(({ level, message }) => {
            const msg = typeof message === "object" ? JSON.stringify(message) : message;
            return `${level}: ${msg}`;
          })
        )
      }));
    }

    // Helper to create rotated file transport
    const createRotatingTransport = (
      folder: string,
      level: string,
      filterFn?: (info: winston.Logform.TransformableInfo) => boolean
    ) => {
      const dir = path.join(logPath, folder);
      ensureDirectoryExists(dir);

      const filters = filterFn
        ? winston.format((info) => (filterFn(info) ? info : false))()
        : winston.format((info) => info)();

      return new DailyRotateFile({
        filename: path.join(dir, `${folder}-%DATE%.log`),
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "10m",
        maxFiles: "30d",
        level,
        utc: true,
        format: winston.format.combine(filters, commonFormat),
      });
    };

    // Setup transports
    if (isAccess) {
      transports.push(createRotatingTransport("access", "info"));
    } else {
      transports.push(createRotatingTransport("info", "info", (info) => info.level === "info"));
      transports.push(createRotatingTransport("warn", "warn", (info) => info.level === "warn"));
      transports.push(createRotatingTransport("error", "error"));
    }

    this.logger = winston.createLogger({
      level: "info",
      transports,
    });

  }

  private baseLog(req: Request | RequestWithUser, log: LogEntry) {

    const Log = {
      userId: ("decoded" in req && req.decoded) ? req.decoded.sub : "guest",
      method: req.method,
      url: req.originalUrl,
      status: log.status,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      referrer: req.headers['referer'] || req.headers['referrer'],
      ...log
    };
    return { message: Log };
  }

  info(req: Request, log: LogEntry) {
    this.logger.info(this.baseLog(req, log));
  }

  warn(req: Request, log: LogEntry) {
    this.logger.warn(this.baseLog(req, log));
  }

  error(req: Request, log: LogEntry) {
    this.logger.error(this.baseLog(req, log));
  }
}

