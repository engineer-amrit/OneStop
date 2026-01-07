import { block } from "@/classes/controllers/blockHandler.js";
import type { CustomLogger, LogEntry } from "@utils/api";



export class AccessLoggerMiddleware {
    constructor(
        private log: CustomLogger,
        private skipLogUrls: string[] = []
    ) { }

    logger = block.createMiddleware(async (req, res) => {
        if (this.skipLogUrls.includes(req.url)) return;

        const start = Date.now();

        const logRequest = (entry?: Partial<LogEntry>) => {
            const logEntry: LogEntry = {
                status: res.statusCode,
                responseTime: Date.now() - start,
                ...entry,
            };

            // Determine log level based on status code
            if (res.statusCode >= 500) {
                this.log.error(req, logEntry);
            } else if (res.statusCode >= 400) {
                this.log.warn(req, logEntry);
            } else {
                this.log.info(req, logEntry);
            }
        };

        // Normal completed response
        res.on('finish', () => logRequest());

        // Aborted connection before finishing
        res.on('close', () => {
            if (!res.writableEnded) {
                logRequest({ message: 'Connection closed before response finished' });
            }
        });

        // Response errors
        res.on('error', (err: Error) => {
            logRequest({ message: `Response error: ${err.message}` });
        });
    }, "access-logger");
}
