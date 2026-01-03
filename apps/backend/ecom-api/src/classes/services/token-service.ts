import type { RoleName } from "ecom";
import Jwt from "jsonwebtoken";
import config from "@/config/config.js";

export type JwtPayload = {
    sub: string;
    role: RoleName;
};

export class TokenService {

    create(payload: JwtPayload): string {
        return Jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: "15m",
        });
    }

    verify(token: string): JwtPayload {
        const decoded = Jwt.verify(token, config.JWT_SECRET);

        if (typeof decoded !== "object" || !("sub" in decoded)) {
            throw new Error("Invalid token payload");
        }

        return decoded as JwtPayload;
    }

    createCsrfToken(): string {
        return Jwt.sign({ csrf: true }, config.CSRF_SECRET, {
            expiresIn: "24h",
        });
    }
    verifyCsrfToken(token: string): boolean {
        try {
            const decoded = Jwt.verify(token, config.CSRF_SECRET);
            return typeof decoded === "object" && "csrf" in decoded;
        } catch {
            return false;
        }
    }
}

export const tokenService = new TokenService();