import { blockHandler, CustomLogger } from "../../classes/index.js";


export function getAccessLogger(accessLogger: CustomLogger) {
    return blockHandler.createMiddleware(async (req, res) => {
        const start = Date.now();

        res.on("finish", () => {
            const duration = Date.now() - start;

            const log = {
                status: res.statusCode,
                responseTime: duration,
                ...(res.locals.message && { message: res.locals.message }),
            };

            if (res.statusCode >= 500) {
                accessLogger.error(req, log);
            } else if (res.statusCode >= 400) {
                accessLogger.warn(req, log);
            } else {
                accessLogger.info(req, log);
            }
        });
    }, "error in access-logger middleware");
}