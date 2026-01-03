import { type TokenService } from "./token-service.js";
import type { UserService } from "./user-service.js";
import { type Phone } from "@schema/ecom";
import type { AuthUserDto } from "ecom";
import type { RefreshToken } from "./refreshToken-service.js";

export class AuthService {
    constructor(
        private token: TokenService,
        private user: UserService,
        private refreshToken: RefreshToken,
    ) { }

    async login(data: Phone) {
        let user: Pick<AuthUserDto, "id" | "role"> | null = await this.user.findByPhone(data.phone);
        if (!user) {
            user = await this.user.init(data.phone);
        }
        const payload = {
            sub: user.id,
            role: user.role.name
        }
        const accessToken = this.token.create(payload);
        const refreshToken = await this.refreshToken.create(user.id);
        return { accessToken, refreshToken };
    }

    async logout(refreshTokenId: string) {
        await this.refreshToken.delete(refreshTokenId);
    }

}

