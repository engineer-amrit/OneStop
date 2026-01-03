import { blockHandler, CustomError, type CustomLogger } from "@utils/api";
import type { CookieService } from "@/classes/services/cookie-service.js";
import type { TokenService } from "@/classes/services/token-service.js";

export class CsrfSetMiddleware {

    private methods = ["POST", "PUT", "PATCH", "DELETE"];
    constructor(private cookieService: CookieService,
        private tokenService: TokenService,
        private logger: CustomLogger
    ) { }

    setCsrfToken = blockHandler.createMiddleware(async (req, res) => {
        if (this.methods.includes(req.method)) {
            const token = req.header("x-csrf-token") || ""
            const valid = this.tokenService.verifyCsrfToken(token);
            if (!valid) {
                const newToken = this.tokenService.createCsrfToken();
                this.cookieService.setCsrf(res, newToken);
                this.logger.info(req, {
                    action: "CSRF token set",
                    message: "New CSRF token has been set for the request",
                });
                throw new CustomError({
                    message: "CSRF token set. Please retry the request.",
                    status: 403,
                });
            }
        }
    }, "error in setting CSRF token")
}