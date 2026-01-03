import jwt from "jsonwebtoken";
import type { Request } from "express";
import { block } from "@/classes/controllers/blockHandler.js";
import { generalLogger } from "@/utils/logger.js";
import { CustomError } from "@utils/api";
import type { JwtPayload, TokenService } from "@/classes/services/token-service.js";
import type { RefreshToken } from "@/classes/services/refreshToken-service.js";
import type { UserService } from "@/classes/services/user-service.js";
import type { CookieService } from "@/classes/services/cookie-service.js";

const { TokenExpiredError, JsonWebTokenError } = jwt;


export type RequestWithUser = Request & {
  decoded: JwtPayload
}

export class TokenVerifierMiddleware {
  constructor(
    private tokenService: TokenService,
    private refreshToken: RefreshToken,
    private userService: UserService,
    private cookieService: CookieService,
  ) { }

  verify = block.createMiddleware(async (req, res) => {
    const { accessToken } = req.cookies;

    try {

      (req as RequestWithUser).decoded = this.tokenService.verify(accessToken);

    } catch (error) {

      const { refreshToken } = req.cookies;
      // If token is missing or expired, try refreshing it
      if ((!accessToken || error instanceof TokenExpiredError) && refreshToken) {

        const { userId } = await this.refreshToken.verify(refreshToken)
        const user = await this.userService.getById(userId)
        const payload: JwtPayload = {
          sub: user.id,
          role: user.role.name
        }
        const newAccessToken = this.tokenService.create(payload);
        const newRefreshToken = await this.refreshToken.create(user.id);

        this.cookieService.setAuth(res, {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken
        });

        (req as RequestWithUser).decoded = payload;

        generalLogger.info(req, {
          action: "Token refreshed",
          message: "Token refreshed successfully",
        });
      }
      else if (!refreshToken) {
        throw new CustomError({
          status: 401,
          message: "Session expired. Please log in again",
          extraDetails: "Refresh token not found",
        });
      }
      else if (error instanceof JsonWebTokenError) {
        throw new CustomError({
          status: 401,
          message: "Session expired. Please log in again.",
          extraDetails: "Invalid access token",
        });
      } else {
        throw new CustomError({
          status: 500,
          message: "Authentication failed",
          extraDetails: (error as Error).message,
        });
      }
    }

  }, "Error in token verifier middleware");

}