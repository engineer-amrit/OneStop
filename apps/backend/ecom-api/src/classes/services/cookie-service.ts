import type { CookieOptions, Response } from "express";
import config from "@/config/config.js";

export const COOKIE_NAMES = {
    ACCESS: "accessToken",
    REFRESH: "refreshToken",
} as const;

export class CookieService {
    private base: CookieOptions = {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "lax",
        domain: config.NODE_ENV === "production" ? config.DOMAIN : undefined,
    };

    private csrf: CookieOptions = {
        httpOnly: false, // must be readable by JS
        secure: config.NODE_ENV === "production",
        sameSite: "lax",
        domain: config.NODE_ENV === "production" ? config.DOMAIN : undefined,
        maxAge: 24 * 60 * 60 * 1000, // 24h
    };

    private access: CookieOptions = {
        ...this.base,
        maxAge: 15 * 60 * 1000, // 15 min
    };

    private refresh: CookieOptions = {
        ...this.base,
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
