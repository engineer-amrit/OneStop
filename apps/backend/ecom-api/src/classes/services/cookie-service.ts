import type { CookieOptions, Response } from "express";
import config from "@/config/config.js";

const COOKIE_NAMES = {
    ACCESS: "accessToken",
    REFRESH: "refreshToken",
} as const;

export class CookieService {

    private base: CookieOptions = {
        secure: config.NODE_ENV === "production",
        sameSite: "lax",
        domain: config.DOMAIN,
    }
    private major: CookieOptions = {
        httpOnly: true,
        ...this.base,
    };

    private csrf: CookieOptions = {
        httpOnly: false, // must be readable by JS
        ...this.base,
    };

    private access: CookieOptions = {
        ...this.major,
        maxAge: 15 * 60 * 1000, // 15 min
    };

    private refresh: CookieOptions = {
        ...this.major,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    setAuth(res: Response, tokens: {
        accessToken: string;
        refreshToken: string;
    }) {
        res.cookie(COOKIE_NAMES.ACCESS, tokens.accessToken, this.access);
        res.cookie(COOKIE_NAMES.REFRESH, tokens.refreshToken, this.refresh);
    }

    clearAuth(res: Response) {
        res.clearCookie(COOKIE_NAMES.ACCESS, this.base);
        res.clearCookie(COOKIE_NAMES.REFRESH, this.base);
    }

    setCsrf(res: Response, token: string) {
        res.cookie("csrf_token", token, this.csrf);
    }

    clearCsrf(res: Response) {
        res.clearCookie("csrf_token", this.csrf);
    }
}
